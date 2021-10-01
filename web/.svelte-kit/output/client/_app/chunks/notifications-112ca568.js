import { W as t, C as e } from "./vendor-4ee6881a.js";
const s = (function (s) {
	const n = e([]);
	function o(t, e = "default", s) {
		n.update((n) => [
			...n,
			{
				id: "_" + Math.random().toString(36).substr(2, 9),
				type: e,
				message: t,
				timeout: s,
			},
		]);
	}
	const r = t(n, (t, e) => {
			if ((e(t), t.length > 0)) {
				const e = setTimeout(() => {
					n.update((t) => (t.shift(), t));
				}, t[0].timeout);
				return () => {
					clearTimeout(e);
				};
			}
		}),
		{ subscribe: u } = r;
	return {
		subscribe: u,
		send: o,
		default: (t, e) => o(t, "default", e),
		danger: (t, e) => o(t, "danger", e),
		warning: (t, e) => o(t, "warning", e),
		info: (t, e) => o(t, "info", e),
		success: (t, e) => o(t, "success", e),
	};
})();
export { s as n };
