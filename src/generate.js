import {
	createDirIfNotExists,
	readFile,
	readFilesFromDir,
	writeFile
} from './lib/file.js';
import {
	header,
	hlekkur,
	htmlListString,
	tabletemplate,
	teksti,
	template
} from './lib/html.js';
import { parseTeamsJson } from './lib/parse.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
	await createDirIfNotExists(OUTPUT_DIR);
	const files = await readFilesFromDir(INPUT_DIR);
	const teamsFile = files.find(file => file.includes('teams'));
	const teamsData = typeof teamsFile === 'string' && await readFile(teamsFile);
	if (typeof teamsData !== 'string') {
		throw new Error('readFile skilaði ekki streng fyrir teamsData')
	}
	const { leikir, tbody } = await parseTeamsJson(teamsData, files)
	leikir.sort((a, b) => a.date - b.date)
	const sortleikir = leikir.map(stak => stak.html)
	tbody.sort((a, b) => b[1] - a[1])
	try {
		await writeFile('./dist/leikir.html',
			template('Leikir',
				header('Leikir',
					hlekkur('/', 'forsíða'),
					hlekkur('/stada.html', 'staðan')),
				`${htmlListString('leikir', '', false, sortleikir)}`,
				hlekkur('/', 'til baka')))
		await writeFile('./dist/stada.html',
			template('Staðan',
				header('Staðan',
					hlekkur('/', 'forsíða'),
					hlekkur('/leikir.html', 'leikir'),),
				tabletemplate(['lið', 'stig'], tbody), // TODO útfæra töflu hérna af object stada
				hlekkur('/', 'til baka')))
		await writeFile('./dist/index.html',
			template('Forsíða',
				header('Forsíða',
					hlekkur('/leikir.html', 'leikir'),
					hlekkur('/stada.html', 'staðan')),
				teksti(),
				''))
	} catch (e) {
		console.error(e)
	}
}

main().catch((error) => {
	console.error('error generating', error);
});