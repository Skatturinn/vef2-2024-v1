import { beforeAll, describe, expect, it, test } from '@jest/globals';
import { parseTeamsJson } from './parse';

describe('parse', () => {
	let obj1;
	let obj2;
	let obj3;
	let obj4;
	let obj5;
	let obj6;
	const p = '<p class="leikir__dagsetning">02/02/2024</p><ul class="leikir__leikirnir"></ul>';
	const d = {
		leikir: [
			{
				date: new Date('2024-02-02T15:20:53.955Z'),
				html:
					p
			}
		],
		tbody: [['boltaliðið', 0]]
	}
	beforeAll(async () => {
		obj1 = await parseTeamsJson('{}', ['']);
		obj2 = await parseTeamsJson('["boltaliðið"]', ['data\\gameday-1230.json'])
		obj3 = await parseTeamsJson('', ['data\\gameday-1230.json'])
		obj4 = await parseTeamsJson('["boltaliðið"]', ['./test/data/test.json'])
		obj5 = await parseTeamsJson('["boltaliðið"]', ['./test/data/test2.json'])
		obj6 = await parseTeamsJson(`["Boltaliðið",
			"Dripplararnir",
			"Skotföstu kempurnar",
			"Markaskorarnir",
			"Sigurliðið",
			"Risaeðlurnar",
			"Framherjarnir",
			"Fljótu fæturnir",
			"Vinningshópurinn",
			"Ósigrandi skotfólkið",
			"Óhemjurnar",
			"Hraðaliðið"
		  ]`, ['data/gameday-1230.json'])
	});
	describe('parseTeamsJson', () => {
		it('Should return a object of leikir and tbody of valid or emptu obj', () => {
			expect(obj1).toEqual({});
			expect(obj2).toEqual(d);
			expect(obj3).toEqual({});
			expect(obj4).toEqual({ leikir: [], tbody: [['boltaliðið', 0]] });
			expect(obj5).toEqual({ leikir: [], tbody: [['boltaliðið', 0]] });
			expect(obj6).toBeInstanceOf(Object)
		});
	});
});

test('ólögleg gögn', () => {
	expect(() => { })
})