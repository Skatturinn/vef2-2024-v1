/**
 * @param {string | any} title
 * @param {string | any} header
 * @param {string | any} main
 * @param {string | any} footer 
 * @returns {string}
*/
export function template(title, header, main, footer) {
	return (
		`<!DOCTYPE html>
  		<html lang="is">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${title}</title>
				<link rel="stylesheet" href="./styles.css">
				<script type="module" src="./scripts.js"></script>
			</head>
			<body>
				<a href="#efni" class="sr-only">Tæknibúðin,Beint í efnið.</a>
				<header>${header}</header>
				<main id="efni">${String(main).replaceAll('>,<', '><')}</main>
				<footer>
				${footer}
				</footer>
			</body>
  		</html>`);
}
/**
 * 
 * @param {Boolean} site 
 * @param {Object} stak 
 * @param {string} teams 
 * @returns 
 */
export function returnMatchLi(site, stak, teams, vann) {
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
		return `
		<li class="${(vann === 0.5 && 'jafn') || vann ? 'vann' : 'tap'}">
		<h2 class="teamname">${name}</h2>
		<p class="stada">
		<div class="stada__ord">Skoruðu</div>
		<div class="stada__stig">${score}</div>
		<div class="stada__stig__ord">stig</div>
		<div class="stada__vollur">${site ? 'Á heimmavelli' : 'Á útivelli'}</div>
		</li>`
	} return ''
}

/**
 * 
 * @param {any} linur 
 * @returns {string}
 */
export function tabletemplate(linur) {
	return (
		`<table>
			<thead class="tafla">
				<tr class="row">
					<th><button class="sort"><h2>Númer</h2></button></th>
					<th><button class="sort"><h2>Heiti</h2></button></th>
					<th><button class="sort"><h2>Einingar</h2></button></th>
					<th><button class="sort"><h2>Kennslummisseri</h2></button></th>
					<th><button class="sort"><h2>Námsstig</h2></button></th>
					<th><button class="sort"><h2>Kennsluskrá</h2></button></th>
	  			</tr>
			</thead>
			<tbody class="tafla">
				${linur}
			</tbody>
  		</table>`)
}