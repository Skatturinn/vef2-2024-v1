/**
 * 
 * @param {boolean} test1 
 * @param {boolean} test2 
 * @returns {number}
 */
export function stigagjof(test1, test2) {
	return (test1 ? 3 : false)
		|| (test2 ? 0 : 1)
}

/**
 * 
 * @param {number} homeScore 
 * @param {number} awayScore 
 * @returns {Array<number>}
 */
export function stig(homeScore, awayScore) {
	const homestig = stigagjof(homeScore > awayScore, homeScore < awayScore)
	return [homestig, stigagjof(!homestig, homestig === 3)]
}

export function calculateStandings() {
	return 0;
}
