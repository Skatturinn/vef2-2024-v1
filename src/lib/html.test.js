import { describe, expect, it, test } from '@jest/globals';
import { header, hlekkur, returnMatchdiv, tabletemplate, teksti, template } from './html.js';

describe('template', () => {
	it('tekruinn js týpur og skilar html template streng', () => {
		expect(template(['test', 'what'], 'test', `<ol>${['<li>test</li>', '<li>jest</li>', '<li>quest</li>']}</ol>`, [1, 2, 3])).toContain(
			String([1, 2, 3]))
	})
})

describe('hlekkur', () => {
	it('teku inn slóð og teksta og skilar html hlekk', () => {
		expect(hlekkur('/index.html', '')).toContain('/index.html');
		expect(hlekkur('https://www.elli.vip/', '')).toContain('elli');
		expect(hlekkur('o', '')).toEqual('ekki hlekkur')
	})
})

describe('returnMatchdiv', () => {
	it('skilar div fyrir frammistöðu liðs í html', () => {
		expect(returnMatchdiv('s', {}, [], 1)).toContain('jafn');
		expect(returnMatchdiv(false, {}, [], 0)).toContain('tap');
		expect(returnMatchdiv(false, true, [], 3)).toContain('vann');
		expect(returnMatchdiv(false, {}, [], 0)).toContain('Á útivelli');
	})
})

describe('tabletemplate', () => {
	it('tekur inn lögleg gögn og skilar html töflu', () => {
		expect(tabletemplate([''], [['']])).toBe(
			`<table class="tafla">
	<thead>
		<tr class="row"><th></th></tr>
	</thead>
	<tbody><tr><td></td></tr>
		</tbody>
  </table>`);
	})
})

test('ólögleg gildi skila villu', () => {
	expect(() => { tabletemplate('', '') }).toThrow(TypeError);
	expect(() => { tabletemplate([''], ['']) }).toThrow(TypeError)
})

describe('header', () => {
	it('tekur inn streng fyrir header og börnum í nav', () => {
		expect(header('test', 'what', 'já')).toContain('já</li></ul></nav>');
	})
})


describe('teksti', () => {
	it('skilar html teksta eftir chatgpr fyrir forsidu', () => {
		expect(teksti()).toContain('</')
	})
})