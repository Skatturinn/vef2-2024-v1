/**
 * skilar html formi fyrir vefsíðu
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
				<a href="#efni" class="sr-only">Beint í efnið.</a>
				<header>${header}</header>
				<main id="efni">${main}</main>
				<footer>
				${footer}
				</footer>
			</body>
  		</html>`);
}
/**
 * 
 * @param {string} href 
 * @param {string} content 
 * @returns {string}
 */
export function hlekkur(href, content) {
	return `<a href="${href}">${content}</a>`
}

/**
 * skilar div fyrir frammistöðu liðs í leik
 * @param {Boolean} site 
 * @param {string} name 
 * @param {number} score
 * @param {number} stig
 * @returns 
 */
export function returnMatchdiv(site, name, score, stig) {
	return `
		<div class="${(stig === 1 && 'jafn') || stig ? 'vann' : 'tap'}">
		<h2 class="teamname">${name}</h2>
		<p class="stada">
		<div class="stada__ord">Skoruðu</div>
		<div class="stada__stig">${score}</div>
		<div class="stada__stig__ord">stig</div>
		<div class="stada__vollur">${site ? 'Á heimmavelli' : 'Á útivelli'}</div>
		</div>`
}

/**
 * býr til html töflu þar sem lína í fylkinu tbody er lína í töflunni
 * @param {Array<string>} thead 
 * @param {Array<Array<string>>} tbody 
 * @returns {string}
 */
export function tabletemplate(thead, tbody) {
	let table = `<table class="tafla">
	<thead>
		<tr class="row">`
	if (Array.isArray(thead)) {
		thead.forEach((stak) => {
			table += `<th>${stak}</th>`;
		})
	}
	table += `</tr>
	</thead>
	<tbody>`
	tbody.forEach(stak => {
		if (Array.isArray(stak) && stak.length === thead.length) {
			table += '<tr>'
			for (const innihald of stak) {
				table += `<td>${innihald}</td>`;
			}
			table += '</tr>'
		}
	})
	table += `
		</tbody>
  </table>`
	return table
}

/**
 * býr til ol eða ul lista
 * @param {string} className 
 * @param {Boolean} ordered 
 * @param  {...any} children 
 * @returns {string}
 */
export function htmlListString(className, ordered, ...children) {
	const listType = ordered ? 'ol' : 'ul';
	let list = `<${listType} class="${className}">`
	if (children) {
		try {
			children.forEach(child => {
				const li = (stak) => typeof stak === 'string' && stak.slice(0, 3) === '<li' ? stak : `<li>${stak}</li>`
				if (Array.isArray(child)) {
					child.forEach(grandchild => {
						list += li(grandchild)
					})
				} else {
					list += li(child)
				}
			})
		} catch (e) {
			console.error(e)
		}
	}
	list += `</${listType}>`
	return list
}

/**
 * chatgpt gefur okkur teksta fyrir forsíðu
 * @returns {string}
 */
export function teksti() {
	return `<section id="um-okkur">
        <h2>Um Okkur</h2>

        <article>
            <h3>Velkomin(n) á Íþróttavefinn!</h3>
            <p>Þú hefur komið á vefsíðu sem er heimili íþróttanna á Íslandi. Íþróttavefurinn er uppfærður daglega með ferskustu fréttum, viðtölum, myndböndum og stöðu yfir alls kyns íþróttaleiki hér á landi.</p>
        </article>

        <article>
            <h3>Misjafnir Leikir, Ein Vefsíða</h3>
            <p>Á Íþróttavefnum fylgjum við öllum stórum og smáum íþróttaleikjum, frá meistaraflokkum í fótbolta og handbolta, upp í unglinga- og barnadeildir. Við sérhæfum okkur í að veita þér þær ferskustu og áreiðanlegustu upplýsingar um leiki, stöðu liða og atburði sem tengjast íþróttum.</p>
        </article>

        <article>
            <h3>Liða Stöða og Tíðindi á Einum Stað</h3>
            <p>Á vefsíðunni okkar finnur þú stöðu yfir lið í meistaraflokkum, einstök viðtöl við leikmenn og þjálfara, ásamt því að fylgja leikjum í beinni. Við leggjum áherslu á að gera þér kleift að uppfæra þig á því sem gerist á velli, í hringi eða á borði.</p>
        </article>

        <article>
            <h3>Fylgstu Með Okkur!</h3>
            <p>Fylgdu okkur á samfélagsmiðlum fyrir daglegar uppfærslur, spennandi myndbönd og samfélagsleg samræðu. Þú ert einnig velkominn í að hafa samband við okkur með ábendingum, hugmyndum eða ef þú vilt deila þínu álitum um íþróttaleiki á Íslandi.</p>
        </article>
    </section>`

}