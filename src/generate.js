import {
	createDirIfNotExists,
	readFilesFromDir,
	writeFile
} from './lib/file.js';
import {
	hlekkur,
	htmlListString,
	tabletemplate,
	teksti,
	template
} from './lib/html.js';
import {
	parseTeamsJson
} from './lib/parse.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
	await createDirIfNotExists(OUTPUT_DIR);
	const files = await readFilesFromDir(INPUT_DIR);
	const teamsFile = files.find(file => file.includes('teams'));
	const { leikir, tbody } = await parseTeamsJson(teamsFile, files)
	leikir.sort((a, b) => a.date - b.date)
	const sortleikir = leikir.map(stak => stak.html)
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