// const homeAway = [home, away];

export function nameScoreValidation(stak, teams) {
	const { name, score } =
		typeof stak?.score === 'string' &&
			Number.isInteger(stak?.name)
			&& stak?.name >= 0
			? { name: stak.score, score: stak.name }
			: stak;
	if (
		typeof name === 'string' &&
		teams?.includes(name) &&
		Number.isInteger(score) &&
		score >= 0
	) {
		return { name, score }
	}
	return false
}