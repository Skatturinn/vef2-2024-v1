import { parse } from 'path';
import {
	createDirIfNotExists,
	readFile,
	readFilesFromDir,
	writeFile,
} from './lib/file.js';
import {
	hlekkur,
	htmlListString,
	returnMatchdiv,
	tabletemplate,
	teksti,
	template
} from './lib/html.js';
import { stig } from './lib/score.js';
import { nameScoreValidation } from './lib/validation.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

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
	const leikir = []
	for await (const file of files) {
		if (!parse(file)?.name.includes('gameday')) {
			continue;
		}
		const fileContents = await readFile(file);
		const fcJson = fileContents && JSON.parse(fileContents)
		if (!fcJson?.date ||
			!fcJson?.games ||
			fcJson.date !== (new Date(fcJson.date)).toISOString()) // athugar hvort dagsetning séu iso
		{
			continue
		}
		const leikur = []
		for (const { home, away } of Array.from(fcJson.games)) {
			const heima = nameScoreValidation(home, teams);
			const uti = nameScoreValidation(away, teams);
			if (heima && uti) {
				const vann = stig(heima.score, uti.score)
				stada[heima.name] += vann[0];
				stada[uti.name] += vann[1];
				leikur.push(htmlListString('leikur__lid', false, // búum til lista fyrir hvern leik
					returnMatchdiv(true, heima.name, heima.score, vann[0]),
					returnMatchdiv(false, uti.name, uti.score, vann[1]))
				)
				stada[heima.name] += vann[0];
				stada[uti.name] += vann[1];
			}
		}
		leikir.push({
			date: new Date(fcJson.date),
			html: `<p class="leikir__dagsetning">${fcJson.date}</p>${htmlListString('leikir__leikirnir', false, leikur)}`
		})
	}
	leikir.sort((a, b) => a.date - b.date)
	const sortleikir = leikir.map(stak => stak.html)
	const tbody = teams.map(stak =>
		[stak, stada[stak]])
	const nav = `<nav>${htmlListString('hlekkir', false,
		hlekkur('/', 'forsíða'),
		hlekkur('/leikir.html', 'leikir'),
		hlekkur('/stada.html', 'staðan')
	)}</nav>`;
	try {
		await writeFile('./dist/leikir.html',
			template('leikir',
				`<h1>leikir</h1>${nav}`,
				`${htmlListString('leikir', false, sortleikir)}`,
				hlekkur('/', 'til baka')))
		await writeFile('./dist/stada.html',
			template('staðan',
				`<h1>staðan</h1>${nav}`,
				tabletemplate(['lið', 'stig'], tbody), // TODO útfæra töflu hérna af object stada
				hlekkur('/', 'til baka')))
		await writeFile('./dist/index.html',
			template('forsíða',
				`<h1>Forsíða</h1>${nav}`,
				teksti(),
				''))
	} catch (e) {
		console.error(e)
	}

}

main().catch((error) => {
	console.error('error generating', error);
});