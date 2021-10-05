import { s as t } from './typingInterval-fc0bdcfd.js';
const e = async ({ currentNode: e, text: i }, n) => {
	e.classList.add('typing');
	for (let s = 0; s <= i.length; s++)
		'<' === i[s] && (s = i.indexOf('>', s)), (e.innerHTML = i.slice(0, s)), await t(n.interval);
	e.classList.replace('typing', 'finished-typing');
};
export { e };
