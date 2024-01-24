import { describe, expect, it } from '@jest/globals';
import { tabletemplate, template } from './html.js';

describe('tekurinn inn allar js týpur og skilar html streng', () => {
	it('', () => {
		expect(template(['test', 'what'], 'test', `<ol>${['<li>test</li>', '<li>jest</li>', '<li>quest</li>']}</ol>`, [1, 2, 3])).toBe(
			`<!DOCTYPE html>
			<html lang="is">
					<head>
							<meta charset="utf-8">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<title>test</title>
							<link rel="stylesheet" href="./styles.css">
							<script type="module" src="./scripts.js"></script>
					</head>
					<body>
							<a href="#efni" class="sr-only">Tæknibúðin,Beint í efnið.</a>
							<header>test</header>
							<main id="efni"><ol><li>test</li><li>jest</li><li>quest</li></ol></main>
							<footer>
							<li>test</li>,<li>jest</li>,<li>quest</li>
							</footer>
					</body>
			</html>`)
	})
})

describe('tekur inn gildi og skilar html streng', () => {
	expect(tabletemplate(2)).toBe(
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
				2
			</tbody>
  		</table>`)
})