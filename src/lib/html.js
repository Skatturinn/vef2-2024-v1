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
				<a href="#efni" class="sr-only">Beint í efnið.</a>
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
 * @param {string} name 
 * @param {number} score
 * @param {number} stig
 * @returns 
 */
export function returnMatchLi(site, name, score, stig) {
	return `
		<li class="${(stig === 1 && 'jafn') || stig ? 'vann' : 'tap'}">
		<h2 class="teamname">${name}</h2>
		<p class="stada">
		<div class="stada__ord">Skoruðu</div>
		<div class="stada__stig">${score}</div>
		<div class="stada__stig__ord">stig</div>
		<div class="stada__vollur">${site ? 'Á heimmavelli' : 'Á útivelli'}</div>
		</li>`
}

/**
 * 
 * @param {Array<string>} thead 
 * @param {Array<Array<string>>} tbody 
 * @returns {string}
 */
export function tabletemplate(thead, tbody) {
	let table = `<table>
	<thead class="tafla">
		<tr class="row">`
	let tablebody = ''
	if (Array.isArray(thead)) {
		thead.forEach((stak, numer) => {
			table += `<th>${stak}</th>`;
			try {
				if (tbody[numer].length() === thead.length() && Array.isArray(tbody[numer])) {
					for (const body of tbody) {
						tablebody += `<td>${body}</td>`;
					}
				} else {
					for (let step = 0; step < thead.length(); step += 1) {
						tablebody += '<td></td>';
					}
				}
			} catch (e) {
				console.error(e)
			}
		})
	}
	table += `</tr>
	</thead>
	<tbody class="tafla">
		${tablebody}
	</tbody>
  </table>`
	return table
}


export function htmlListString(className, ordered, ...children) {
	const listType = ordered ? 'ol' : 'ul';
	let list = `<${listType}>`
	if (children) {
		try {
			children.forEach(child => {
				list += typeof child === 'string' && child.includes('</') ? child : `<li>${child}</li>`
			})
		} catch (e) {
			console.error(e)
		}
	}
	list += `<${listType}`
	return list
}






// export function createElement(tag, attributes, ...children) {
// 	const element = document.createElement(tag);
// 	for (const key in attributes) {
// 		if (Object.prototype.hasOwnProperty.call(attributes, key)) {
// 			element[key] = attributes[key];
// 		}
// 	}
// 	children.forEach(child => {
// 		if (typeof child === 'string') {
// 			element.innerHTML += child;
// 		} else {
// 			element.appendChild(child);
// 		}
// 	});
// 	return element;
// }