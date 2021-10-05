import { e } from './writeEffect-cec32d00.js';
import { t } from './onAnimationEnd-2ec3a3dd.js';
import './typingInterval-fc0bdcfd.js';
const a = async ({ elements: a }, o) => {
	if (o.cascade) a.forEach((e) => (e.currentNode.textContent = ''));
	else {
		const { getLongestTextElement: e } = await import('./index-e1a95a2a.js'),
			c = e(a);
		t(c, () => o.dispatch('done'));
	}
	for (const t of a) o.cascade ? await e(t, o) : e(t, o);
	o.cascade && o.dispatch('done');
};
export { a as mode };
