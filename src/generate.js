import { parse } from 'path';
import {
	createDirIfNotExists,
	readFile,
	readFilesFromDir,
	writeFile,
} from './lib/file.js';
import { returnMatchLi, template } from './lib/html.js';
import { stig } from './lib/score.js';
import { nameScoreValidation } from './lib/validation.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';
// planið les in skjöl rá string af json
// breyta í json senda í template
// senda template í write file
// TODO writfefile
// fs.writeFile(path.join('dist', 'index.html'), wfile);
// hann er búin að búa til dir vantar bara fileanna
// const ip = './dist/index.html';
// const a = parse('/dist/index.html')
// console.log(await direxists(a.dir))
async function main() {
	await createDirIfNotExists(OUTPUT_DIR);

	const files = await readFilesFromDir(INPUT_DIR);
	const teamsFile = files.find(file => file.includes('teams'));
	let teams = (teamsFile ? await readFile(teamsFile) : '')
	teams = teams ? JSON.parse(teams) : [];
	const stada = {};
	if (!teams) {
		throw new Error('tókst ekki að finna lið í teams.json')
	} else {
		for (const stak of teams) {
			stada[stak] = 0;
		}
	}
	// console.log(stada)
	let leikir = ''
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
		let leikur = ''
		for (const { home, away } of Array.from(fcJson.games)) {
			// TODO búta þetta upp í .js skrárnar
			const heima = nameScoreValidation(home, teams);
			const uti = nameScoreValidation(away, teams);
			if (heima && uti) {
				const vann = stig(heima.score, uti.score)
				stada[heima.name] += vann[0];
				stada[uti.name] += vann[1];
				// TODO breyta .push í html fall(p?, returnmatchli....)
				leikur += (`
			<li class="leikur">
			<ul class="leikur__lid">
			${returnMatchLi(true, heima.name, heima.score, vann[0])}
			${returnMatchLi(false, uti.name, uti.score, vann[1])}
			</ul>
			</li>
			`)
				stada[heima.name] += vann[0];
				stada[uti.name] += vann[1];
			}
		}
		leikir += (`
		<li class="leikir_dag">
			<p class="leikir__dagsetning">${fcJson.date}</p>
			<ul class="leikir__leikirnir">${leikur}</ul>
		</li>`)
	}
	// console.log(stada[teams])
	try {
		await writeFile('./dist/leikir.html',
			template('leikir', '<h1>leikir</h1>',
				`<ul class="leikir">${String(leikir).replaceAll(',', '')}</ul>`,
				''))
		await writeFile('./dist/stada.html',
			template('staða',
				'<h1>staða í deildinni</h1>',
				'', // TODO útfæra töflu hérna af object stada
				''))
		await writeFile('./dist/index.html',
			template('forsíða',
				'<h1>Forsíða</h1>',
				'<h2>Lýsingaorð</h2><p>Hefur einhvern teksta</p>',
				''))
	} catch (e) {
		console.error(e)
	}

}

main().catch((error) => {
	console.error('error generating', error);
});

// - `index.html`, forsíða sem hefur einhvern lýsingartexta (í versta falli `lorem ipsum` texta).
// - `leikir.html`, síða sem birtir alla leiki í deildinni, raðaða eftir dagsetningu leiks (elsta dagsetning efst).
// - `stada.html`, tafla með stöðu í deildinni
//   - raðað eftir stöðu (flest stig efst) þar sem stig eru gefin:
//     - 3 stig fyrir sigur
//     - 1 stig fyrir jafntefli
//     - 0 stig fyrir tap
//   - eingöngu þarf að sýna nafn liðs og stig

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