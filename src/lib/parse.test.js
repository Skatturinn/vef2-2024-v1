import { beforeAll, describe, expect, it } from '@jest/globals';
import { parseTeamsJson } from './parse';

describe('parse', () => {
	let obj1;
	let obj2;
	let obj3;
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
	});
	describe.only('parseTeamsJson', () => {
		it('should have a test', () => {
			expect(obj1).toEqual({});
			expect(obj2).toEqual(d);
			expect(obj3).toEqual({})
		});
	});
});
