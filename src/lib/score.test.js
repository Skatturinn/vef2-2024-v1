import { describe, expect, it } from '@jest/globals';
import { stig, stigagjof } from './score';

describe('score', () => {
	describe.only('calculateStandings', () => {
		it('should have a test', () => {
			expect(stig()).toBe(0);
		});
	});
});

describe('score', () => {
	describe.only('calculateStandings', () => {
		it('should have a test', () => {
			expect(stigagjof()).toBe();
		});
	});
});
