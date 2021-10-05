export {
	a4 as createElement,
	a5 as getElements,
	a6 as hasSingleTextNode
} from './vendor-c51b7936.js';
export { o as rng, e as sleep, s as typingInterval } from './typingInterval-fc0bdcfd.js';
export { e as getRandomElement, n as unwriteEffect } from './getRandomElement-33ceb352.js';
export { o as isInRange } from './isInRange-9f8459d8.js';
export { e as writeEffect } from './writeEffect-cec32d00.js';
export { t as onAnimationEnd } from './onAnimationEnd-2ec3a3dd.js';
const a = (e) => e.childNodes.forEach((e) => e.remove()),
	r = (e, t) => t.text.length - e.text.length,
	d = (e) => e.sort(r)[0].currentNode;
export { a as cleanChildNodes, d as getLongestTextElement };
