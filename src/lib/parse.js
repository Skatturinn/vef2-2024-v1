import { parse } from 'path';
import {
	readFile
} from './file.js';
import {
	htmlListString,
	returnMatchdiv
} from './html.js';
import { stig } from './score.js';
import { nameScoreValidation } from './validation.js';

/**
 * 
 * @param {string} data 
 * @param {Array<string>} files 
 * @returns {Promise<object>}
 */
export async function parseTeamsJson(data, files) {
	const stada = {};
	const leikir = [];
	let teams;
	try {
		teams = JSON.parse(data);
		if (!teams || typeof teams[Symbol.iterator] !== 'function') {
			return {}
		}
	} catch (e) {
		console.error(e)
		return {}
	}
	for (const stak of teams) {
		stada[stak] = 0;
	}
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
				leikur.push(htmlListString('leikir__lid', false, // búum til lista fyrir hvern leik
					returnMatchdiv(true, heima.name, heima.score, vann[0]),
					returnMatchdiv(false, uti.name, uti.score, vann[1]))
				)
				stada[heima.name] += vann[0];
				stada[uti.name] += vann[1];
			}
		}
		const stringDagsetning = String(
			fcJson.date.slice(0, 10).split('-').reverse()
		).replaceAll(',', '/')
		leikir.push({
			date: new Date(fcJson.date),
			html: `<p class="leikir__dagsetning">${stringDagsetning}</p>${htmlListString('leikir__leikirnir', false, leikur)}`
		})
	}
	const tbody = teams.map(stak =>
		[stak, stada[stak]])
	return { leikir, tbody };
}
