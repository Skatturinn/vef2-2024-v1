import { parse } from 'path';
import {
	createDirIfNotExists,
	readFile,
	readFilesFromDir,
	writeFile,
} from './lib/file.js';
import { returnMatchLi, template } from './lib/html.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';
// planið les in skjöl rá string af json
// breyta í json senda í template
// senda template í write file
// TODO writfefile
// fs.writeFile(path.join('dist', 'index.html'), wfile);
// hann er búin að búa til dir vantar bara fileanna
const ip = './dist/index.html';
// const a = parse('/dist/index.html')
// console.log(await direxists(a.dir))
async function main() {
	await createDirIfNotExists(OUTPUT_DIR);

	const files = await readFilesFromDir(INPUT_DIR);
	let a
	files?.forEach(stak => {
		if (stak.includes('teams')) {
			a = stak
		}
	})
	let teams = (a ? await readFile(a) : '')
	teams = teams ? JSON.parse(teams) : ''
	if (!teams) {
		throw new Error('tókst ekki að finna lið í teams.json')
	}
	const leikir = []
	for await (const file of files) {
		if (!parse(file)?.name.includes('gameday')) {
			continue;
		}
		const fileContents = await readFile(file);
		const fcJson = fileContents && JSON.parse(fileContents)
		if (!fcJson?.date ||
			!fcJson?.games ||
			fcJson.date !== (new Date(fcJson.date)).toISOString()) { // athugar hvort dagsetning séu iso
			continue
		}
		const leikur = []
		for (const { home, away } of Array.from(fcJson.games)) {
			const vann = (home?.score > away?.score ? 1 : false)
				|| (home?.score < away?.score ? 0 : 0.5)
			leikur.push(`
			<li class="leikur">
			<ul class="leikur__lid">
			${returnMatchLi(true, home, teams, vann)}
			${returnMatchLi(false, away, teams, -(1 - vann))}
			</ul>
			</li>
			`)
		}
		leikir.push(`
		<li class="leikir_dag">
			<p class="leikir__dagsetning">${fcJson.date}</p>
			<ul class="leikir__leikirnir">${leikur}</ul>
		</li>`)
	}
	// console.log(leikir)
	try {
		await writeFile('./dist/leikir.html', template('leikir', '<h1>leikir</h1>', `<ul class="leikir">${String(leikir).replaceAll(',', '')}</ul>`, ''))
	} catch (e) {
		console.log(e)
	}

}

// - `home`, heimalið, ætti að vera hlutur, sjá að neðan, ef ekki skal sleppa færslu
// - `away`, útilið, ætti að vera hlutur, sjá að neðan, ef ekki skal sleppa færslu

// Þar sem `home` og `away` eru hlutir með eftirfarandi gildum:

// - `name`, nafn liðs, ætti að vera strengur
// - `score`, skor liðs í leik, ætti að vera jákvæð heiltala
main().catch((error) => {
	console.error('error generating', error);
});


// Undir möppunni `data/` eru JSON skrár með leikdögum sem heita allar `gameday-X.json` þar sem `X` er eitthvert gildi (alveg handahófskennt), formið er:

// - `date`, dagsetning leikja á ISO 8601 formi (t.d. `2024-01-01T00:00:00.000Z`), verður að vera til staðar annars eru gögn ólögleg
// - `games`, fylki af leikjum, verður að vera til staðar annars eru gögn ólögleg
//   - `home`, heimalið, ætti að vera hlutur, sjá að neðan, ef ekki skal sleppa færslu
//   - `away`, útilið, ætti að vera hlutur, sjá að neðan, ef ekki skal sleppa færslu

// Þar sem `home` og `away` eru hlutir með eftirfarandi gildum:

// - `name`, nafn liðs, ætti að vera strengur
// - `score`, skor liðs í leik, ætti að vera jákvæð heiltala

// Einnig er skrá `teams.json` sem inniheldur öll lögleg lið í deildinni.

// Skrifa skal forrit sem les inn þessi gögn og varpar yfir í HTML skrár sem birta gögnin.