import { describe, expect, it, test } from '@jest/globals';
import { stig, stigagjof } from './score';

describe('score', () => {
	describe('stig', () => {
		it('Should return point for both teams', () => {
			expect(stig(1, 1)).toEqual([1, 1])
			expect(stig(1, 0)).toEqual([3, 0]);
			expect(stig(0, 1)).toEqual([0, 3]);
		});
	});
});

describe('score', () => {
	describe('stigagjof', () => {
		it('Should return 3 for win,0 for loss,1 for draw', () => {
			expect(stigagjof(true, true)).toBe(3);
			expect(stigagjof(false, true)).toBe(0);
			expect(stigagjof(false, false)).toBe(1)
		});
	});
});

test('ólögleg gildi skila villu', () => {
	expect(() => { stig(false, 1) }).toThrow(('Inntök þurfa að vera tölur'));
	expect(() => { stig(2, {}) }).toThrow(TypeError);
})