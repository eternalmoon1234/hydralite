import { e, n as t } from './getRandomElement-33ceb352.js';
import { e as o } from './writeEffect-cec32d00.js';
import './typingInterval-fc0bdcfd.js';
const a = async (e, { currentNode: a, text: n }, r) => {
		await o({ currentNode: a, text: n }, r);
		const c = n.replaceAll('&', '&amp;');
		a.innerHTML === c && (await t(a, r));
	},
	n = async ({ node: t, elements: o }, n) => {
		for (;;)
			if (n.loop) for (const e of o) await a(0, e, n);
			else if (n.loopRandom) {
				const t = e(o);
				await a(0, t, n);
			}
	};
export { n as mode };
