function t() {}
const e = (t) => t;
function n(t, e) {
	for (const n in e) t[n] = e[n];
	return t;
}
function r(t) {
	return t();
}
function i() {
	return Object.create(null);
}
function o(t) {
	t.forEach(r);
}
function s(t) {
	return 'function' == typeof t;
}
function u(t, e) {
	return t != t ? e == e : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
}
function a(e, ...n) {
	if (null == e) return t;
	const r = e.subscribe(...n);
	return r.unsubscribe ? () => r.unsubscribe() : r;
}
function c(t, e, n) {
	t.$$.on_destroy.push(a(e, n));
}
function h(t, e, n, r) {
	if (t) {
		const i = f(t, e, n, r);
		return t[0](i);
	}
}
function f(t, e, r, i) {
	return t[1] && i ? n(r.ctx.slice(), t[1](i(e))) : r.ctx;
}
function l(t, e, n, r) {
	if (t[2] && r) {
		const i = t[2](r(n));
		if (void 0 === e.dirty) return i;
		if ('object' == typeof i) {
			const t = [],
				n = Math.max(e.dirty.length, i.length);
			for (let r = 0; r < n; r += 1) t[r] = e.dirty[r] | i[r];
			return t;
		}
		return e.dirty | i;
	}
	return e.dirty;
}
function p(t, e, n, r, i, o) {
	if (i) {
		const s = f(e, n, r, o);
		t.p(s, i);
	}
}
function d(t) {
	if (t.ctx.length > 32) {
		const e = [],
			n = t.ctx.length / 32;
		for (let t = 0; t < n; t++) e[t] = -1;
		return e;
	}
	return -1;
}
function v(t) {
	return null == t ? '' : t;
}
const y = 'undefined' != typeof window;
let g = y ? () => window.performance.now() : () => Date.now(),
	m = y ? (t) => requestAnimationFrame(t) : t;
const b = new Set();
function w(t) {
	b.forEach((e) => {
		e.c(t) || (b.delete(e), e.f());
	}),
		0 !== b.size && m(w);
}
function E(t) {
	let e;
	return (
		0 === b.size && m(w),
		{
			promise: new Promise((n) => {
				b.add((e = { c: t, f: n }));
			}),
			abort() {
				b.delete(e);
			}
		}
	);
}
let I = !1;
function _(t, e, n, r) {
	for (; t < e; ) {
		const i = t + ((e - t) >> 1);
		n(i) <= r ? (t = i + 1) : (e = i);
	}
	return t;
}
function T(t) {
	if (!t) return document;
	const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
	return e && e.host ? e : t.ownerDocument;
}
function A(t) {
	const e = x('style');
	return (
		(function (t, e) {
			!(function (t, e) {
				t.appendChild(e);
			})(t.head || t, e);
		})(T(t), e),
		e
	);
}
function N(t, e) {
	if (I) {
		for (
			!(function (t) {
				if (t.hydrate_init) return;
				t.hydrate_init = !0;
				let e = t.childNodes;
				if ('HEAD' === t.nodeName) {
					const t = [];
					for (let n = 0; n < e.length; n++) {
						const r = e[n];
						void 0 !== r.claim_order && t.push(r);
					}
					e = t;
				}
				const n = new Int32Array(e.length + 1),
					r = new Int32Array(e.length);
				n[0] = -1;
				let i = 0;
				for (let a = 0; a < e.length; a++) {
					const t = e[a].claim_order,
						o =
							(i > 0 && e[n[i]].claim_order <= t ? i + 1 : _(1, i, (t) => e[n[t]].claim_order, t)) -
							1;
					r[a] = n[o] + 1;
					const s = o + 1;
					(n[s] = a), (i = Math.max(s, i));
				}
				const o = [],
					s = [];
				let u = e.length - 1;
				for (let a = n[i] + 1; 0 != a; a = r[a - 1]) {
					for (o.push(e[a - 1]); u >= a; u--) s.push(e[u]);
					u--;
				}
				for (; u >= 0; u--) s.push(e[u]);
				o.reverse(), s.sort((t, e) => t.claim_order - e.claim_order);
				for (let a = 0, c = 0; a < s.length; a++) {
					for (; c < o.length && s[a].claim_order >= o[c].claim_order; ) c++;
					const e = c < o.length ? o[c] : null;
					t.insertBefore(s[a], e);
				}
			})(t),
				(void 0 === t.actual_end_child ||
					(null !== t.actual_end_child && t.actual_end_child.parentElement !== t)) &&
					(t.actual_end_child = t.firstChild);
			null !== t.actual_end_child && void 0 === t.actual_end_child.claim_order;

		)
			t.actual_end_child = t.actual_end_child.nextSibling;
		e !== t.actual_end_child
			? (void 0 === e.claim_order && e.parentNode === t) || t.insertBefore(e, t.actual_end_child)
			: (t.actual_end_child = e.nextSibling);
	} else (e.parentNode === t && null === e.nextSibling) || t.appendChild(e);
}
function S(t, e, n) {
	I && !n ? N(t, e) : (e.parentNode === t && e.nextSibling == n) || t.insertBefore(e, n || null);
}
function D(t) {
	t.parentNode.removeChild(t);
}
function x(t) {
	return document.createElement(t);
}
function L(t) {
	return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function O(t) {
	return document.createTextNode(t);
}
function k() {
	return O(' ');
}
function R() {
	return O('');
}
function P(t, e, n, r) {
	return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function C(t, e, n) {
	null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function U(t) {
	return Array.from(t.childNodes);
}
function V(t, e, n, r, i = !1) {
	!(function (t) {
		void 0 === t.claim_info && (t.claim_info = { last_index: 0, total_claimed: 0 });
	})(t);
	const o = (() => {
		for (let r = t.claim_info.last_index; r < t.length; r++) {
			const o = t[r];
			if (e(o)) {
				const e = n(o);
				return void 0 === e ? t.splice(r, 1) : (t[r] = e), i || (t.claim_info.last_index = r), o;
			}
		}
		for (let r = t.claim_info.last_index - 1; r >= 0; r--) {
			const o = t[r];
			if (e(o)) {
				const e = n(o);
				return (
					void 0 === e ? t.splice(r, 1) : (t[r] = e),
					i ? void 0 === e && t.claim_info.last_index-- : (t.claim_info.last_index = r),
					o
				);
			}
		}
		return r();
	})();
	return (o.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), o;
}
function F(t, e, n, r) {
	return V(
		t,
		(t) => t.nodeName === e,
		(t) => {
			const e = [];
			for (let r = 0; r < t.attributes.length; r++) {
				const i = t.attributes[r];
				n[i.name] || e.push(i.name);
			}
			e.forEach((e) => t.removeAttribute(e));
		},
		() => r(e)
	);
}
function j(t, e, n) {
	return F(t, e, n, x);
}
function M(t, e, n) {
	return F(t, e, n, L);
}
function q(t, e) {
	return V(
		t,
		(t) => 3 === t.nodeType,
		(t) => {
			const n = '' + e;
			if (t.data.startsWith(n)) {
				if (t.data.length !== n.length) return t.splitText(n.length);
			} else t.data = n;
		},
		() => O(e),
		!0
	);
}
function B(t) {
	return q(t, ' ');
}
function G(t, e) {
	(e = '' + e), t.wholeText !== e && (t.data = e);
}
function z(t, e) {
	t.value = null == e ? '' : e;
}
function $(t, e, n, r) {
	t.style.setProperty(e, n, r ? 'important' : '');
}
function H(t, e, n) {
	t.classList[n ? 'add' : 'remove'](e);
}
function K(t, e, n = !1) {
	const r = document.createEvent('CustomEvent');
	return r.initCustomEvent(t, n, !1, e), r;
}
function W(t, e = document.body) {
	return Array.from(e.querySelectorAll(t));
}
const Q = new Set();
let X,
	Y = 0;
function J(t, e, n, r, i, o, s, u = 0) {
	const a = 16.666 / r;
	let c = '{\n';
	for (let y = 0; y <= 1; y += a) {
		const t = e + (n - e) * o(y);
		c += 100 * y + `%{${s(t, 1 - t)}}\n`;
	}
	const h = c + `100% {${s(n, 1 - n)}}\n}`,
		f = `__svelte_${(function (t) {
			let e = 5381,
				n = t.length;
			for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
			return e >>> 0;
		})(h)}_${u}`,
		l = T(t);
	Q.add(l);
	const p = l.__svelte_stylesheet || (l.__svelte_stylesheet = A(t).sheet),
		d = l.__svelte_rules || (l.__svelte_rules = {});
	d[f] || ((d[f] = !0), p.insertRule(`@keyframes ${f} ${h}`, p.cssRules.length));
	const v = t.style.animation || '';
	return (t.style.animation = `${v ? `${v}, ` : ''}${f} ${r}ms linear ${i}ms 1 both`), (Y += 1), f;
}
function Z(t, e) {
	const n = (t.style.animation || '').split(', '),
		r = n.filter(e ? (t) => t.indexOf(e) < 0 : (t) => -1 === t.indexOf('__svelte')),
		i = n.length - r.length;
	i &&
		((t.style.animation = r.join(', ')),
		(Y -= i),
		Y ||
			m(() => {
				Y ||
					(Q.forEach((t) => {
						const e = t.__svelte_stylesheet;
						let n = e.cssRules.length;
						for (; n--; ) e.deleteRule(n);
						t.__svelte_rules = {};
					}),
					Q.clear());
			}));
}
function tt(n, r, i, o) {
	if (!r) return t;
	const s = n.getBoundingClientRect();
	if (r.left === s.left && r.right === s.right && r.top === s.top && r.bottom === s.bottom)
		return t;
	const {
		delay: u = 0,
		duration: a = 300,
		easing: c = e,
		start: h = g() + u,
		end: f = h + a,
		tick: l = t,
		css: p
	} = i(n, { from: r, to: s }, o);
	let d,
		v = !0,
		y = !1;
	function m() {
		p && Z(n, d), (v = !1);
	}
	return (
		E((t) => {
			if ((!y && t >= h && (y = !0), y && t >= f && (l(1, 0), m()), !v)) return !1;
			if (y) {
				const e = 0 + 1 * c((t - h) / a);
				l(e, 1 - e);
			}
			return !0;
		}),
		p && (d = J(n, 0, 1, a, u, c, p)),
		u || (y = !0),
		l(0, 1),
		m
	);
}
function et(t) {
	const e = getComputedStyle(t);
	if ('absolute' !== e.position && 'fixed' !== e.position) {
		const { width: n, height: r } = e,
			i = t.getBoundingClientRect();
		(t.style.position = 'absolute'), (t.style.width = n), (t.style.height = r), nt(t, i);
	}
}
function nt(t, e) {
	const n = t.getBoundingClientRect();
	if (e.left !== n.left || e.top !== n.top) {
		const r = getComputedStyle(t),
			i = 'none' === r.transform ? '' : r.transform;
		t.style.transform = `${i} translate(${e.left - n.left}px, ${e.top - n.top}px)`;
	}
}
function rt(t) {
	X = t;
}
function it() {
	if (!X) throw new Error('Function called outside component initialization');
	return X;
}
function ot(t) {
	it().$$.on_mount.push(t);
}
function st(t) {
	it().$$.after_update.push(t);
}
function ut(t, e) {
	it().$$.context.set(t, e);
}
const at = [],
	ct = [],
	ht = [],
	ft = [],
	lt = Promise.resolve();
let pt = !1;
function dt(t) {
	ht.push(t);
}
let vt = !1;
const yt = new Set();
function gt() {
	if (!vt) {
		vt = !0;
		do {
			for (let t = 0; t < at.length; t += 1) {
				const e = at[t];
				rt(e), mt(e.$$);
			}
			for (rt(null), at.length = 0; ct.length; ) ct.pop()();
			for (let t = 0; t < ht.length; t += 1) {
				const e = ht[t];
				yt.has(e) || (yt.add(e), e());
			}
			ht.length = 0;
		} while (at.length);
		for (; ft.length; ) ft.pop()();
		(pt = !1), (vt = !1), yt.clear();
	}
}
function mt(t) {
	if (null !== t.fragment) {
		t.update(), o(t.before_update);
		const e = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(dt);
	}
}
let bt;
function wt(t, e, n) {
	t.dispatchEvent(K(`${e ? 'intro' : 'outro'}${n}`));
}
const Et = new Set();
let It;
function _t() {
	It = { r: 0, c: [], p: It };
}
function Tt() {
	It.r || o(It.c), (It = It.p);
}
function At(t, e) {
	t && t.i && (Et.delete(t), t.i(e));
}
function Nt(t, e, n, r) {
	if (t && t.o) {
		if (Et.has(t)) return;
		Et.add(t),
			It.c.push(() => {
				Et.delete(t), r && (n && t.d(1), r());
			}),
			t.o(e);
	}
}
const St = { duration: 0 };
function Dt(n, r, i, u) {
	let a = r(n, i),
		c = u ? 0 : 1,
		h = null,
		f = null,
		l = null;
	function p() {
		l && Z(n, l);
	}
	function d(t, e) {
		const n = t.b - c;
		return (
			(e *= Math.abs(n)),
			{ a: c, b: t.b, d: n, duration: e, start: t.start, end: t.start + e, group: t.group }
		);
	}
	function v(r) {
		const { delay: i = 0, duration: s = 300, easing: u = e, tick: v = t, css: y } = a || St,
			m = { start: g() + i, b: r };
		r || ((m.group = It), (It.r += 1)),
			h || f
				? (f = m)
				: (y && (p(), (l = J(n, c, r, s, i, u, y))),
				  r && v(0, 1),
				  (h = d(m, s)),
				  dt(() => wt(n, r, 'start')),
				  E((t) => {
						if (
							(f &&
								t > f.start &&
								((h = d(f, s)),
								(f = null),
								wt(n, h.b, 'start'),
								y && (p(), (l = J(n, c, h.b, h.duration, 0, u, a.css)))),
							h)
						)
							if (t >= h.end)
								v((c = h.b), 1 - c),
									wt(n, h.b, 'end'),
									f || (h.b ? p() : --h.group.r || o(h.group.c)),
									(h = null);
							else if (t >= h.start) {
								const e = t - h.start;
								(c = h.a + h.d * u(e / h.duration)), v(c, 1 - c);
							}
						return !(!h && !f);
				  }));
	}
	return {
		run(t) {
			s(a)
				? (bt ||
						((bt = Promise.resolve()),
						bt.then(() => {
							bt = null;
						})),
				  bt).then(() => {
						(a = a()), v(t);
				  })
				: v(t);
		},
		end() {
			p(), (h = f = null);
		}
	};
}
function xt(t, e) {
	t.f(),
		(function (t, e) {
			Nt(t, 1, 1, () => {
				e.delete(t.key);
			});
		})(t, e);
}
function Lt(t, e, n, r, i, o, s, u, a, c, h, f) {
	let l = t.length,
		p = o.length,
		d = l;
	const v = {};
	for (; d--; ) v[t[d].key] = d;
	const y = [],
		g = new Map(),
		m = new Map();
	for (d = p; d--; ) {
		const t = f(i, o, d),
			u = n(t);
		let a = s.get(u);
		a ? r && a.p(t, e) : ((a = c(u, t)), a.c()),
			g.set(u, (y[d] = a)),
			u in v && m.set(u, Math.abs(d - v[u]));
	}
	const b = new Set(),
		w = new Set();
	function E(t) {
		At(t, 1), t.m(u, h), s.set(t.key, t), (h = t.first), p--;
	}
	for (; l && p; ) {
		const e = y[p - 1],
			n = t[l - 1],
			r = e.key,
			i = n.key;
		e === n
			? ((h = e.first), l--, p--)
			: g.has(i)
			? !s.has(r) || b.has(r)
				? E(e)
				: w.has(i)
				? l--
				: m.get(r) > m.get(i)
				? (w.add(r), E(e))
				: (b.add(i), l--)
			: (a(n, s), l--);
	}
	for (; l--; ) {
		const e = t[l];
		g.has(e.key) || a(e, s);
	}
	for (; p; ) E(y[p - 1]);
	return y;
}
function Ot(t, e) {
	const n = {},
		r = {},
		i = { $$scope: 1 };
	let o = t.length;
	for (; o--; ) {
		const s = t[o],
			u = e[o];
		if (u) {
			for (const t in s) t in u || (r[t] = 1);
			for (const t in u) i[t] || ((n[t] = u[t]), (i[t] = 1));
			t[o] = u;
		} else for (const t in s) i[t] = 1;
	}
	for (const s in r) s in n || (n[s] = void 0);
	return n;
}
function kt(t) {
	return 'object' == typeof t && null !== t ? t : {};
}
function Rt(t) {
	t && t.c();
}
function Pt(t, e) {
	t && t.l(e);
}
function Ct(t, e, n, i) {
	const { fragment: u, on_mount: a, on_destroy: c, after_update: h } = t.$$;
	u && u.m(e, n),
		i ||
			dt(() => {
				const e = a.map(r).filter(s);
				c ? c.push(...e) : o(e), (t.$$.on_mount = []);
			}),
		h.forEach(dt);
}
function Ut(t, e) {
	const n = t.$$;
	null !== n.fragment &&
		(o(n.on_destroy),
		n.fragment && n.fragment.d(e),
		(n.on_destroy = n.fragment = null),
		(n.ctx = []));
}
function Vt(t, e) {
	-1 === t.$$.dirty[0] && (at.push(t), pt || ((pt = !0), lt.then(gt)), t.$$.dirty.fill(0)),
		(t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Ft(e, n, r, s, u, a, c, h = [-1]) {
	const f = X;
	rt(e);
	const l = (e.$$ = {
		fragment: null,
		ctx: null,
		props: a,
		update: t,
		not_equal: u,
		bound: i(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(f ? f.$$.context : n.context || []),
		callbacks: i(),
		dirty: h,
		skip_bound: !1,
		root: n.target || f.$$.root
	});
	c && c(l.root);
	let p = !1;
	if (
		((l.ctx = r
			? r(e, n.props || {}, (t, n, ...r) => {
					const i = r.length ? r[0] : n;
					return (
						l.ctx &&
							u(l.ctx[t], (l.ctx[t] = i)) &&
							(!l.skip_bound && l.bound[t] && l.bound[t](i), p && Vt(e, t)),
						n
					);
			  })
			: []),
		l.update(),
		(p = !0),
		o(l.before_update),
		(l.fragment = !!s && s(l.ctx)),
		n.target)
	) {
		if (n.hydrate) {
			I = !0;
			const t = U(n.target);
			l.fragment && l.fragment.l(t), t.forEach(D);
		} else l.fragment && l.fragment.c();
		n.intro && At(e.$$.fragment), Ct(e, n.target, n.anchor, n.customElement), (I = !1), gt();
	}
	rt(f);
}
class jt {
	$destroy() {
		Ut(this, 1), (this.$destroy = t);
	}
	$on(t, e) {
		const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
		return (
			n.push(e),
			() => {
				const t = n.indexOf(e);
				-1 !== t && n.splice(t, 1);
			}
		);
	}
	$set(t) {
		var e;
		this.$$set &&
			((e = t), 0 !== Object.keys(e).length) &&
			((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
	}
}
const Mt = [];
function qt(e, n = t) {
	let r;
	const i = new Set();
	function o(t) {
		if (u(e, t) && ((e = t), r)) {
			const t = !Mt.length;
			for (const n of i) n[1](), Mt.push(n, e);
			if (t) {
				for (let t = 0; t < Mt.length; t += 2) Mt[t][0](Mt[t + 1]);
				Mt.length = 0;
			}
		}
	}
	return {
		set: o,
		update: function (t) {
			o(t(e));
		},
		subscribe: function (s, u = t) {
			const a = [s, u];
			return (
				i.add(a),
				1 === i.size && (r = n(o) || t),
				s(e),
				() => {
					i.delete(a), 0 === i.size && (r(), (r = null));
				}
			);
		}
	};
}
function Bt(e, n, r) {
	const i = !Array.isArray(e),
		u = i ? [e] : e,
		c = n.length < 2;
	return {
		subscribe: qt(r, (e) => {
			let r = !1;
			const h = [];
			let f = 0,
				l = t;
			const p = () => {
					if (f) return;
					l();
					const r = n(i ? h[0] : h, e);
					c ? e(r) : (l = s(r) ? r : t);
				},
				d = u.map((t, e) =>
					a(
						t,
						(t) => {
							(h[e] = t), (f &= ~(1 << e)), r && p();
						},
						() => {
							f |= 1 << e;
						}
					)
				);
			return (
				(r = !0),
				p(),
				function () {
					o(d), l();
				}
			);
		}).subscribe
	};
}
function Gt(t) {
	const e = t - 1;
	return e * e * e + 1;
}
var zt = {
	$: (t) => ('string' == typeof t ? document.querySelector(t) : t),
	extend: (...t) => Object.assign(...t),
	cumulativeOffset(t) {
		let e = 0,
			n = 0;
		do {
			(e += t.offsetTop || 0), (n += t.offsetLeft || 0), (t = t.offsetParent);
		} while (t);
		return { top: e, left: n };
	},
	directScroll: (t) => t && t !== document && t !== document.body,
	scrollTop(t, e) {
		let n = void 0 !== e;
		return this.directScroll(t)
			? n
				? (t.scrollTop = e)
				: t.scrollTop
			: n
			? (document.documentElement.scrollTop = document.body.scrollTop = e)
			: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	},
	scrollLeft(t, e) {
		let n = void 0 !== e;
		return this.directScroll(t)
			? n
				? (t.scrollLeft = e)
				: t.scrollLeft
			: n
			? (document.documentElement.scrollLeft = document.body.scrollLeft = e)
			: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	}
};
const $t = {
		container: 'body',
		duration: 500,
		delay: 0,
		offset: 0,
		easing: function (t) {
			return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
		},
		onStart: t,
		onDone: t,
		onAborting: t,
		scrollX: !1,
		scrollY: !0
	},
	Ht = (t) => {
		let {
			offset: e,
			duration: n,
			delay: r,
			easing: i,
			x: o = 0,
			y: s = 0,
			scrollX: u,
			scrollY: a,
			onStart: c,
			onDone: h,
			container: f,
			onAborting: l,
			element: p
		} = t;
		'function' == typeof e && (e = e());
		var d = zt.cumulativeOffset(f),
			v = p ? zt.cumulativeOffset(p) : { top: s, left: o },
			y = zt.scrollLeft(f),
			m = zt.scrollTop(f),
			b = v.left - d.left + e,
			w = v.top - d.top + e,
			I = b - y,
			_ = w - m;
		let T = !0,
			A = !1,
			N = g() + r,
			S = N + n;
		function D(t) {
			t || ((A = !0), c(p, { x: o, y: s }));
		}
		function x(t) {
			var e, n, r;
			(e = f), (n = m + _ * t), (r = y + I * t), u && zt.scrollLeft(e, r), a && zt.scrollTop(e, n);
		}
		function L() {
			T = !1;
		}
		return (
			E((t) => {
				if ((!A && t >= N && D(!1), A && t >= S && (x(1), L(), h(p, { x: o, y: s })), !T))
					return l(p, { x: o, y: s }), !1;
				if (A) {
					x(0 + 1 * i((t - N) / n));
				}
				return !0;
			}),
			D(r),
			x(0),
			L
		);
	},
	Kt = (t) =>
		Ht(
			((t) => {
				let e = zt.extend({}, $t, t);
				return (e.container = zt.$(e.container)), (e.element = zt.$(e.element)), e;
			})(t)
		);
function Wt(t, { from: e, to: n }, r = {}) {
	const i = getComputedStyle(t),
		o = 'none' === i.transform ? '' : i.transform,
		[u, a] = i.transformOrigin.split(' ').map(parseFloat),
		c = e.left + (e.width * u) / n.width - (n.left + u),
		h = e.top + (e.height * a) / n.height - (n.top + a),
		{ delay: f = 0, duration: l = (t) => 120 * Math.sqrt(t), easing: p = Gt } = r;
	return {
		delay: f,
		duration: s(l) ? l(Math.sqrt(c * c + h * h)) : l,
		easing: p,
		css: (t, r) => {
			const i = r * c,
				s = r * h,
				u = t + (r * e.width) / n.width,
				a = t + (r * e.height) / n.height;
			return `transform: ${o} translate(${i}px, ${s}px) scale(${u}, ${a});`;
		}
	};
}
function Qt(
	t,
	{ delay: e = 0, duration: n = 400, easing: r = Gt, x: i = 0, y: o = 0, opacity: s = 0 } = {}
) {
	const u = getComputedStyle(t),
		a = +u.opacity,
		c = 'none' === u.transform ? '' : u.transform,
		h = a * (1 - s);
	return {
		delay: e,
		duration: n,
		easing: r,
		css: (t, e) =>
			`\n\t\t\ttransform: ${c} translate(${(1 - t) * i}px, ${(1 - t) * o}px);\n\t\t\topacity: ${
				a - h * e
			}`
	};
}
const Xt = (t, e) => {
		const n = document.createElement(e);
		return (n.textContent = t), n;
	},
	Yt = (t) => 1 === t.childNodes.length && 3 === t.childNodes[0].nodeType,
	Jt = (t) => {
		if (Yt(t)) {
			const e = t.textContent,
				n = Xt(t.textContent, 'p');
			return (t.textContent = ''), t.appendChild(n), [{ currentNode: n, text: e }];
		}
		return [...t.children].map((t) => {
			const e = t.innerHTML.replaceAll('&amp;', '&');
			return { currentNode: t, text: e };
		});
	},
	Zt = async (t, e) => {
		const { mode: n } =
				((e.loop || e.loopRandom) && (await import('./loopTypewriter-5def1fff.js'))) ||
				(e.scramble && (await import('./scramble-a9f0f719.js'))) ||
				(await import('./typewriter-da64ac31.js')),
			r = Jt(t);
		if (e.delay > 0) {
			const { sleep: n } = await import('./index-e1a95a2a.js');
			await n(e.delay), t.classList.remove('delay');
		}
		n({ node: t, elements: r }, e);
	};
function te(e) {
	let n, r, i, o, u;
	const a = e[10].default,
		c = h(a, e, e[9], null);
	return {
		c() {
			(n = x('div')), c && c.c(), this.h();
		},
		l(t) {
			n = j(t, 'DIV', { class: !0, style: !0 });
			var e = U(n);
			c && c.l(e), e.forEach(D), this.h();
		},
		h() {
			C(n, 'class', 'typewriter-container svelte-1xd0fu9'),
				$(n, '--cursor-color', 'string' == typeof e[0] ? e[0] : 'black'),
				H(n, 'cursor', e[0]),
				H(n, 'delay', e[2].delay > 0);
		},
		m(a, h) {
			var f;
			S(a, n, h),
				c && c.m(n, null),
				(i = !0),
				o || ((f = r = Zt.call(null, n, e[2])), (u = f && s(f.destroy) ? f.destroy : t), (o = !0));
		},
		p(t, e) {
			c && c.p && (!i || 512 & e) && p(c, a, t, t[9], i ? l(a, t[9], e, null) : d(t[9]), null),
				(!i || 1 & e) && $(n, '--cursor-color', 'string' == typeof t[0] ? t[0] : 'black'),
				r && s(r.update) && 4 & e && r.update.call(null, t[2]),
				1 & e && H(n, 'cursor', t[0]),
				4 & e && H(n, 'delay', t[2].delay > 0);
		},
		i(t) {
			i || (At(c, t), (i = !0));
		},
		o(t) {
			Nt(c, t), (i = !1);
		},
		d(t) {
			t && D(n), c && c.d(t), (o = !1), u();
		}
	};
}
function ee(e) {
	let n,
		r,
		i = e[1],
		o = te(e);
	return {
		c() {
			o.c(), (n = R());
		},
		l(t) {
			o.l(t), (n = R());
		},
		m(t, e) {
			o.m(t, e), S(t, n, e), (r = !0);
		},
		p(e, [r]) {
			2 & r && u(i, (i = e[1]))
				? (_t(), Nt(o, 1, 1, t), Tt(), (o = te(e)), o.c(), At(o), o.m(n.parentNode, n))
				: o.p(e, r);
		},
		i(t) {
			r || (At(o), (r = !0));
		},
		o(t) {
			Nt(o), (r = !1);
		},
		d(t) {
			t && D(n), o.d(t);
		}
	};
}
function ne(t, e, n) {
	let r,
		{ $$slots: i = {}, $$scope: o } = e,
		{ interval: s = 30 } = e,
		{ cascade: u = !1 } = e,
		{ loop: a = !1 } = e,
		{ loopRandom: c = !1 } = e,
		{ scramble: h = !1 } = e,
		{ cursor: f = !0 } = e,
		{ delay: l = 0 } = e,
		p = !1,
		d = {};
	const v = (function () {
		const t = it();
		return (e, n) => {
			const r = t.$$.callbacks[e];
			if (r) {
				const i = K(e, n);
				r.slice().forEach((e) => {
					e.call(t, i);
				});
			}
		};
	})();
	var y;
	return (
		(y = () => p && n(1, (d = {}))),
		it().$$.before_update.push(y),
		ot(() => (p = !0)),
		(t.$$set = (t) => {
			'interval' in t && n(3, (s = t.interval)),
				'cascade' in t && n(4, (u = t.cascade)),
				'loop' in t && n(5, (a = t.loop)),
				'loopRandom' in t && n(6, (c = t.loopRandom)),
				'scramble' in t && n(7, (h = t.scramble)),
				'cursor' in t && n(0, (f = t.cursor)),
				'delay' in t && n(8, (l = t.delay)),
				'$$scope' in t && n(9, (o = t.$$scope));
		}),
		(t.$$.update = () => {
			505 & t.$$.dirty &&
				n(
					2,
					(r = {
						interval: s,
						cascade: u,
						loop: a,
						loopRandom: c,
						scramble: h,
						cursor: f,
						delay: l,
						dispatch: v
					})
				);
		}),
		[f, d, r, s, u, a, c, h, l, o, i]
	);
}
class re extends jt {
	constructor(t) {
		super(),
			Ft(this, t, ne, ee, u, {
				interval: 3,
				cascade: 4,
				loop: 5,
				loopRandom: 6,
				scramble: 7,
				cursor: 0,
				delay: 8
			});
	}
}
function ie(t) {
	if (t.__esModule) return t;
	var e = Object.defineProperty({}, '__esModule', { value: !0 });
	return (
		Object.keys(t).forEach(function (n) {
			var r = Object.getOwnPropertyDescriptor(t, n);
			Object.defineProperty(
				e,
				n,
				r.get
					? r
					: {
							enumerable: !0,
							get: function () {
								return t[n];
							}
					  }
			);
		}),
		e
	);
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var oe = function (
	t,
	e
) {
	return (oe =
		Object.setPrototypeOf ||
		({ __proto__: [] } instanceof Array &&
			function (t, e) {
				t.__proto__ = e;
			}) ||
		function (t, e) {
			for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
		})(t, e);
};
function se(t, e) {
	function n() {
		this.constructor = t;
	}
	oe(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
}
var ue = function () {
	return (ue =
		Object.assign ||
		function (t) {
			for (var e, n = 1, r = arguments.length; n < r; n++)
				for (var i in (e = arguments[n]))
					Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
			return t;
		}).apply(this, arguments);
};
function ae(t, e, n, r) {
	return new (n || (n = Promise))(function (i, o) {
		function s(t) {
			try {
				a(r.next(t));
			} catch (e) {
				o(e);
			}
		}
		function u(t) {
			try {
				a(r.throw(t));
			} catch (e) {
				o(e);
			}
		}
		function a(t) {
			var e;
			t.done
				? i(t.value)
				: ((e = t.value),
				  e instanceof n
						? e
						: new n(function (t) {
								t(e);
						  })).then(s, u);
		}
		a((r = r.apply(t, e || [])).next());
	});
}
function ce(t, e) {
	var n,
		r,
		i,
		o,
		s = {
			label: 0,
			sent: function () {
				if (1 & i[0]) throw i[1];
				return i[1];
			},
			trys: [],
			ops: []
		};
	return (
		(o = { next: u(0), throw: u(1), return: u(2) }),
		'function' == typeof Symbol &&
			(o[Symbol.iterator] = function () {
				return this;
			}),
		o
	);
	function u(o) {
		return function (u) {
			return (function (o) {
				if (n) throw new TypeError('Generator is already executing.');
				for (; s; )
					try {
						if (
							((n = 1),
							r &&
								(i =
									2 & o[0]
										? r.return
										: o[0]
										? r.throw || ((i = r.return) && i.call(r), 0)
										: r.next) &&
								!(i = i.call(r, o[1])).done)
						)
							return i;
						switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
							case 0:
							case 1:
								i = o;
								break;
							case 4:
								return s.label++, { value: o[1], done: !1 };
							case 5:
								s.label++, (r = o[1]), (o = [0]);
								continue;
							case 7:
								(o = s.ops.pop()), s.trys.pop();
								continue;
							default:
								if (
									!((i = s.trys),
									(i = i.length > 0 && i[i.length - 1]) || (6 !== o[0] && 2 !== o[0]))
								) {
									s = 0;
									continue;
								}
								if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
									s.label = o[1];
									break;
								}
								if (6 === o[0] && s.label < i[1]) {
									(s.label = i[1]), (i = o);
									break;
								}
								if (i && s.label < i[2]) {
									(s.label = i[2]), s.ops.push(o);
									break;
								}
								i[2] && s.ops.pop(), s.trys.pop();
								continue;
						}
						o = e.call(t, s);
					} catch (u) {
						(o = [6, u]), (r = 0);
					} finally {
						n = i = 0;
					}
				if (5 & o[0]) throw o[1];
				return { value: o[0] ? o[1] : void 0, done: !0 };
			})([o, u]);
		};
	}
}
function he(t) {
	var e = 'function' == typeof Symbol && Symbol.iterator,
		n = e && t[e],
		r = 0;
	if (n) return n.call(t);
	if (t && 'number' == typeof t.length)
		return {
			next: function () {
				return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t };
			}
		};
	throw new TypeError(e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function fe(t, e) {
	var n = 'function' == typeof Symbol && t[Symbol.iterator];
	if (!n) return t;
	var r,
		i,
		o = n.call(t),
		s = [];
	try {
		for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; ) s.push(r.value);
	} catch (u) {
		i = { error: u };
	} finally {
		try {
			r && !r.done && (n = o.return) && n.call(o);
		} finally {
			if (i) throw i.error;
		}
	}
	return s;
}
function le() {
	for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(fe(arguments[e]));
	return t;
}
function pe() {
	for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
	var r = Array(t),
		i = 0;
	for (e = 0; e < n; e++)
		for (var o = arguments[e], s = 0, u = o.length; s < u; s++, i++) r[i] = o[s];
	return r;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function de(t, e) {
	if (!(e instanceof Object)) return e;
	switch (e.constructor) {
		case Date:
			return new Date(e.getTime());
		case Object:
			void 0 === t && (t = {});
			break;
		case Array:
			t = [];
			break;
		default:
			return e;
	}
	for (var n in e) e.hasOwnProperty(n) && (t[n] = de(t[n], e[n]));
	return t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ve = (function () {
	function t() {
		var t = this;
		(this.reject = function () {}),
			(this.resolve = function () {}),
			(this.promise = new Promise(function (e, n) {
				(t.resolve = e), (t.reject = n);
			}));
	}
	return (
		(t.prototype.wrapCallback = function (t) {
			var e = this;
			return function (n, r) {
				n ? e.reject(n) : e.resolve(r),
					'function' == typeof t &&
						(e.promise.catch(function () {}), 1 === t.length ? t(n) : t(n, r));
			};
		}),
		t
	);
})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ye() {
	return 'undefined' != typeof navigator && 'string' == typeof navigator.userAgent
		? navigator.userAgent
		: '';
}
function ge() {
	try {
		return '[object process]' === Object.prototype.toString.call(global.process);
	} catch (t) {
		return !1;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var me = (function (t) {
		function e(n, r) {
			var i = t.call(this, r) || this;
			return (
				(i.code = n),
				(i.name = 'FirebaseError'),
				Object.setPrototypeOf(i, e.prototype),
				Error.captureStackTrace && Error.captureStackTrace(i, be.prototype.create),
				i
			);
		}
		return se(e, t), e;
	})(Error),
	be = (function () {
		function t(t, e, n) {
			(this.service = t), (this.serviceName = e), (this.errors = n);
		}
		return (
			(t.prototype.create = function (t) {
				for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
				for (
					var r = e[0] || {},
						i = this.service + '/' + t,
						o = this.errors[t],
						s = o ? we(o, r) : 'Error',
						u = this.serviceName + ': ' + s + ' (' + i + ').',
						a = new me(i, u),
						c = 0,
						h = Object.keys(r);
					c < h.length;
					c++
				) {
					var f = h[c];
					'_' !== f.slice(-1) &&
						(f in a &&
							console.warn(
								'Overwriting FirebaseError base field "' + f + '" can cause unexpected behavior.'
							),
						(a[f] = r[f]));
				}
				return a;
			}),
			t
		);
	})();
function we(t, e) {
	return t.replace(Ee, function (t, n) {
		var r = e[n];
		return null != r ? String(r) : '<' + n + '?>';
	});
}
var Ee = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ie(t, e) {
	return Object.prototype.hasOwnProperty.call(t, e);
}
function _e(t, e) {
	var n = new Te(t, e);
	return n.subscribe.bind(n);
}
var Te = (function () {
	function t(t, e) {
		var n = this;
		(this.observers = []),
			(this.unsubscribes = []),
			(this.observerCount = 0),
			(this.task = Promise.resolve()),
			(this.finalized = !1),
			(this.onNoObservers = e),
			this.task
				.then(function () {
					t(n);
				})
				.catch(function (t) {
					n.error(t);
				});
	}
	return (
		(t.prototype.next = function (t) {
			this.forEachObserver(function (e) {
				e.next(t);
			});
		}),
		(t.prototype.error = function (t) {
			this.forEachObserver(function (e) {
				e.error(t);
			}),
				this.close(t);
		}),
		(t.prototype.complete = function () {
			this.forEachObserver(function (t) {
				t.complete();
			}),
				this.close();
		}),
		(t.prototype.subscribe = function (t, e, n) {
			var r,
				i = this;
			if (void 0 === t && void 0 === e && void 0 === n) throw new Error('Missing Observer.');
			void 0 ===
				(r = (function (t, e) {
					if ('object' != typeof t || null === t) return !1;
					for (var n = 0, r = e; n < r.length; n++) {
						var i = r[n];
						if (i in t && 'function' == typeof t[i]) return !0;
					}
					return !1;
				})(t, ['next', 'error', 'complete'])
					? t
					: { next: t, error: e, complete: n }).next && (r.next = Ae),
				void 0 === r.error && (r.error = Ae),
				void 0 === r.complete && (r.complete = Ae);
			var o = this.unsubscribeOne.bind(this, this.observers.length);
			return (
				this.finalized &&
					this.task.then(function () {
						try {
							i.finalError ? r.error(i.finalError) : r.complete();
						} catch (t) {}
					}),
				this.observers.push(r),
				o
			);
		}),
		(t.prototype.unsubscribeOne = function (t) {
			void 0 !== this.observers &&
				void 0 !== this.observers[t] &&
				(delete this.observers[t],
				(this.observerCount -= 1),
				0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this));
		}),
		(t.prototype.forEachObserver = function (t) {
			if (!this.finalized) for (var e = 0; e < this.observers.length; e++) this.sendOne(e, t);
		}),
		(t.prototype.sendOne = function (t, e) {
			var n = this;
			this.task.then(function () {
				if (void 0 !== n.observers && void 0 !== n.observers[t])
					try {
						e(n.observers[t]);
					} catch (r) {
						'undefined' != typeof console && console.error && console.error(r);
					}
			});
		}),
		(t.prototype.close = function (t) {
			var e = this;
			this.finalized ||
				((this.finalized = !0),
				void 0 !== t && (this.finalError = t),
				this.task.then(function () {
					(e.observers = void 0), (e.onNoObservers = void 0);
				}));
		}),
		t
	);
})();
function Ae() {}
var Ne = (function () {
		function t(t, e, n) {
			(this.name = t),
				(this.instanceFactory = e),
				(this.type = n),
				(this.multipleInstances = !1),
				(this.serviceProps = {}),
				(this.instantiationMode = 'LAZY');
		}
		return (
			(t.prototype.setInstantiationMode = function (t) {
				return (this.instantiationMode = t), this;
			}),
			(t.prototype.setMultipleInstances = function (t) {
				return (this.multipleInstances = t), this;
			}),
			(t.prototype.setServiceProps = function (t) {
				return (this.serviceProps = t), this;
			}),
			t
		);
	})(),
	Se = (function () {
		function t(t, e) {
			(this.name = t),
				(this.container = e),
				(this.component = null),
				(this.instances = new Map()),
				(this.instancesDeferred = new Map());
		}
		return (
			(t.prototype.get = function (t) {
				void 0 === t && (t = '[DEFAULT]');
				var e = this.normalizeInstanceIdentifier(t);
				if (!this.instancesDeferred.has(e)) {
					var n = new ve();
					this.instancesDeferred.set(e, n);
					try {
						var r = this.getOrInitializeService(e);
						r && n.resolve(r);
					} catch (i) {}
				}
				return this.instancesDeferred.get(e).promise;
			}),
			(t.prototype.getImmediate = function (t) {
				var e = ue({ identifier: '[DEFAULT]', optional: !1 }, t),
					n = e.identifier,
					r = e.optional,
					i = this.normalizeInstanceIdentifier(n);
				try {
					var o = this.getOrInitializeService(i);
					if (!o) {
						if (r) return null;
						throw Error('Service ' + this.name + ' is not available');
					}
					return o;
				} catch (s) {
					if (r) return null;
					throw s;
				}
			}),
			(t.prototype.getComponent = function () {
				return this.component;
			}),
			(t.prototype.setComponent = function (t) {
				var e, n;
				if (t.name !== this.name)
					throw Error('Mismatching Component ' + t.name + ' for Provider ' + this.name + '.');
				if (this.component)
					throw Error('Component for ' + this.name + ' has already been provided');
				if (
					((this.component = t),
					(function (t) {
						return 'EAGER' === t.instantiationMode;
					})(
						/**
						 * @license
						 * Copyright 2019 Google LLC
						 *
						 * Licensed under the Apache License, Version 2.0 (the "License");
						 * you may not use this file except in compliance with the License.
						 * You may obtain a copy of the License at
						 *
						 *   http://www.apache.org/licenses/LICENSE-2.0
						 *
						 * Unless required by applicable law or agreed to in writing, software
						 * distributed under the License is distributed on an "AS IS" BASIS,
						 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
						 * See the License for the specific language governing permissions and
						 * limitations under the License.
						 */ t
					))
				)
					try {
						this.getOrInitializeService('[DEFAULT]');
					} catch (h) {}
				try {
					for (var r = he(this.instancesDeferred.entries()), i = r.next(); !i.done; i = r.next()) {
						var o = fe(i.value, 2),
							s = o[0],
							u = o[1],
							a = this.normalizeInstanceIdentifier(s);
						try {
							var c = this.getOrInitializeService(a);
							u.resolve(c);
						} catch (h) {}
					}
				} catch (f) {
					e = { error: f };
				} finally {
					try {
						i && !i.done && (n = r.return) && n.call(r);
					} finally {
						if (e) throw e.error;
					}
				}
			}),
			(t.prototype.clearInstance = function (t) {
				void 0 === t && (t = '[DEFAULT]'),
					this.instancesDeferred.delete(t),
					this.instances.delete(t);
			}),
			(t.prototype.delete = function () {
				return ae(this, void 0, void 0, function () {
					var t;
					return ce(this, function (e) {
						switch (e.label) {
							case 0:
								return (
									(t = Array.from(this.instances.values())),
									[
										4,
										Promise.all(
											le(
												t
													.filter(function (t) {
														return 'INTERNAL' in t;
													})
													.map(function (t) {
														return t.INTERNAL.delete();
													}),
												t
													.filter(function (t) {
														return '_delete' in t;
													})
													.map(function (t) {
														return t._delete();
													})
											)
										)
									]
								);
							case 1:
								return e.sent(), [2];
						}
					});
				});
			}),
			(t.prototype.isComponentSet = function () {
				return null != this.component;
			}),
			(t.prototype.getOrInitializeService = function (t) {
				var e = this.instances.get(t);
				return (
					!e &&
						this.component &&
						((e = this.component.instanceFactory(
							this.container,
							(function (t) {
								return '[DEFAULT]' === t ? void 0 : t;
							})(t)
						)),
						this.instances.set(t, e)),
					e || null
				);
			}),
			(t.prototype.normalizeInstanceIdentifier = function (t) {
				return this.component ? (this.component.multipleInstances ? t : '[DEFAULT]') : t;
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var De,
	xe = (function () {
		function t(t) {
			(this.name = t), (this.providers = new Map());
		}
		return (
			(t.prototype.addComponent = function (t) {
				var e = this.getProvider(t.name);
				if (e.isComponentSet())
					throw new Error('Component ' + t.name + ' has already been registered with ' + this.name);
				e.setComponent(t);
			}),
			(t.prototype.addOrOverwriteComponent = function (t) {
				this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
					this.addComponent(t);
			}),
			(t.prototype.getProvider = function (t) {
				if (this.providers.has(t)) return this.providers.get(t);
				var e = new Se(t, this);
				return this.providers.set(t, e), e;
			}),
			(t.prototype.getProviders = function () {
				return Array.from(this.providers.values());
			}),
			t
		);
	})();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */ function Le() {
	for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
	var r = Array(t),
		i = 0;
	for (e = 0; e < n; e++)
		for (var o = arguments[e], s = 0, u = o.length; s < u; s++, i++) r[i] = o[s];
	return r;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Oe,
	ke,
	Re = [];
((ke = Oe || (Oe = {}))[(ke.DEBUG = 0)] = 'DEBUG'),
	(ke[(ke.VERBOSE = 1)] = 'VERBOSE'),
	(ke[(ke.INFO = 2)] = 'INFO'),
	(ke[(ke.WARN = 3)] = 'WARN'),
	(ke[(ke.ERROR = 4)] = 'ERROR'),
	(ke[(ke.SILENT = 5)] = 'SILENT');
var Pe,
	Ce = {
		debug: Oe.DEBUG,
		verbose: Oe.VERBOSE,
		info: Oe.INFO,
		warn: Oe.WARN,
		error: Oe.ERROR,
		silent: Oe.SILENT
	},
	Ue = Oe.INFO,
	Ve =
		(((De = {})[Oe.DEBUG] = 'log'),
		(De[Oe.VERBOSE] = 'log'),
		(De[Oe.INFO] = 'info'),
		(De[Oe.WARN] = 'warn'),
		(De[Oe.ERROR] = 'error'),
		De),
	Fe = function (t, e) {
		for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
		if (!(e < t.logLevel)) {
			var i = new Date().toISOString(),
				o = Ve[e];
			if (!o)
				throw new Error('Attempted to log a message with an invalid logType (value: ' + e + ')');
			console[o].apply(console, Le(['[' + i + ']  ' + t.name + ':'], n));
		}
	},
	je = (function () {
		function t(t) {
			(this.name = t),
				(this._logLevel = Ue),
				(this._logHandler = Fe),
				(this._userLogHandler = null),
				Re.push(this);
		}
		return (
			Object.defineProperty(t.prototype, 'logLevel', {
				get: function () {
					return this._logLevel;
				},
				set: function (t) {
					if (!(t in Oe)) throw new TypeError('Invalid value "' + t + '" assigned to `logLevel`');
					this._logLevel = t;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.setLogLevel = function (t) {
				this._logLevel = 'string' == typeof t ? Ce[t] : t;
			}),
			Object.defineProperty(t.prototype, 'logHandler', {
				get: function () {
					return this._logHandler;
				},
				set: function (t) {
					if ('function' != typeof t)
						throw new TypeError('Value assigned to `logHandler` must be a function');
					this._logHandler = t;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'userLogHandler', {
				get: function () {
					return this._userLogHandler;
				},
				set: function (t) {
					this._userLogHandler = t;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.debug = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				this._userLogHandler && this._userLogHandler.apply(this, Le([this, Oe.DEBUG], t)),
					this._logHandler.apply(this, Le([this, Oe.DEBUG], t));
			}),
			(t.prototype.log = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				this._userLogHandler && this._userLogHandler.apply(this, Le([this, Oe.VERBOSE], t)),
					this._logHandler.apply(this, Le([this, Oe.VERBOSE], t));
			}),
			(t.prototype.info = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				this._userLogHandler && this._userLogHandler.apply(this, Le([this, Oe.INFO], t)),
					this._logHandler.apply(this, Le([this, Oe.INFO], t));
			}),
			(t.prototype.warn = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				this._userLogHandler && this._userLogHandler.apply(this, Le([this, Oe.WARN], t)),
					this._logHandler.apply(this, Le([this, Oe.WARN], t));
			}),
			(t.prototype.error = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				this._userLogHandler && this._userLogHandler.apply(this, Le([this, Oe.ERROR], t)),
					this._logHandler.apply(this, Le([this, Oe.ERROR], t));
			}),
			t
		);
	})();
function Me(t) {
	Re.forEach(function (e) {
		e.setLogLevel(t);
	});
}
var qe,
	Be =
		(((Pe = {})['no-app'] =
			"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()"),
		(Pe['bad-app-name'] = "Illegal App name: '{$appName}"),
		(Pe['duplicate-app'] = "Firebase App named '{$appName}' already exists"),
		(Pe['app-deleted'] = "Firebase App named '{$appName}' already deleted"),
		(Pe['invalid-app-argument'] =
			'firebase.{$appName}() takes either no argument or a Firebase App instance.'),
		(Pe['invalid-log-argument'] = 'First argument to `onLog` must be null or a function.'),
		Pe),
	Ge = new be('app', 'Firebase', Be),
	ze =
		(((qe = {})['@firebase/app'] = 'fire-core'),
		(qe['@firebase/analytics'] = 'fire-analytics'),
		(qe['@firebase/auth'] = 'fire-auth'),
		(qe['@firebase/database'] = 'fire-rtdb'),
		(qe['@firebase/functions'] = 'fire-fn'),
		(qe['@firebase/installations'] = 'fire-iid'),
		(qe['@firebase/messaging'] = 'fire-fcm'),
		(qe['@firebase/performance'] = 'fire-perf'),
		(qe['@firebase/remote-config'] = 'fire-rc'),
		(qe['@firebase/storage'] = 'fire-gcs'),
		(qe['@firebase/firestore'] = 'fire-fst'),
		(qe['fire-js'] = 'fire-js'),
		(qe['firebase-wrapper'] = 'fire-js-all'),
		qe),
	$e = new je('@firebase/app'),
	He = (function () {
		function t(t, e, n) {
			var r,
				i,
				o = this;
			(this.firebase_ = n),
				(this.isDeleted_ = !1),
				(this.name_ = e.name),
				(this.automaticDataCollectionEnabled_ = e.automaticDataCollectionEnabled || !1),
				(this.options_ = de(void 0, t)),
				(this.container = new xe(e.name)),
				this._addComponent(
					new Ne(
						'app',
						function () {
							return o;
						},
						'PUBLIC'
					)
				);
			try {
				for (
					var s = he(this.firebase_.INTERNAL.components.values()), u = s.next();
					!u.done;
					u = s.next()
				) {
					var a = u.value;
					this._addComponent(a);
				}
			} catch (c) {
				r = { error: c };
			} finally {
				try {
					u && !u.done && (i = s.return) && i.call(s);
				} finally {
					if (r) throw r.error;
				}
			}
		}
		return (
			Object.defineProperty(t.prototype, 'automaticDataCollectionEnabled', {
				get: function () {
					return this.checkDestroyed_(), this.automaticDataCollectionEnabled_;
				},
				set: function (t) {
					this.checkDestroyed_(), (this.automaticDataCollectionEnabled_ = t);
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'name', {
				get: function () {
					return this.checkDestroyed_(), this.name_;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'options', {
				get: function () {
					return this.checkDestroyed_(), this.options_;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.delete = function () {
				var t = this;
				return new Promise(function (e) {
					t.checkDestroyed_(), e();
				})
					.then(function () {
						return (
							t.firebase_.INTERNAL.removeApp(t.name_),
							Promise.all(
								t.container.getProviders().map(function (t) {
									return t.delete();
								})
							)
						);
					})
					.then(function () {
						t.isDeleted_ = !0;
					});
			}),
			(t.prototype._getService = function (t, e) {
				return (
					void 0 === e && (e = '[DEFAULT]'),
					this.checkDestroyed_(),
					this.container.getProvider(t).getImmediate({ identifier: e })
				);
			}),
			(t.prototype._removeServiceInstance = function (t, e) {
				void 0 === e && (e = '[DEFAULT]'), this.container.getProvider(t).clearInstance(e);
			}),
			(t.prototype._addComponent = function (t) {
				try {
					this.container.addComponent(t);
				} catch (e) {
					$e.debug('Component ' + t.name + ' failed to register with FirebaseApp ' + this.name, e);
				}
			}),
			(t.prototype._addOrOverwriteComponent = function (t) {
				this.container.addOrOverwriteComponent(t);
			}),
			(t.prototype.checkDestroyed_ = function () {
				if (this.isDeleted_) throw Ge.create('app-deleted', { appName: this.name_ });
			}),
			t
		);
	})();
(He.prototype.name && He.prototype.options) || He.prototype.delete || console.log('dc');
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ke(t) {
	var e = {},
		n = new Map(),
		r = {
			__esModule: !0,
			initializeApp: function (n, i) {
				void 0 === i && (i = {});
				if ('object' != typeof i || null === i) {
					i = { name: i };
				}
				var o = i;
				void 0 === o.name && (o.name = '[DEFAULT]');
				var s = o.name;
				if ('string' != typeof s || !s) throw Ge.create('bad-app-name', { appName: String(s) });
				if (Ie(e, s)) throw Ge.create('duplicate-app', { appName: s });
				var u = new t(n, o, r);
				return (e[s] = u), u;
			},
			app: i,
			registerVersion: function (t, e, n) {
				var r,
					i = null !== (r = ze[t]) && void 0 !== r ? r : t;
				n && (i += '-' + n);
				var s = i.match(/\s|\//),
					u = e.match(/\s|\//);
				if (s || u) {
					var a = ['Unable to register library "' + i + '" with version "' + e + '":'];
					return (
						s && a.push('library name "' + i + '" contains illegal characters (whitespace or "/")'),
						s && u && a.push('and'),
						u && a.push('version name "' + e + '" contains illegal characters (whitespace or "/")'),
						void $e.warn(a.join(' '))
					);
				}
				o(
					new Ne(
						i + '-version',
						function () {
							return { library: i, version: e };
						},
						'VERSION'
					)
				);
			},
			setLogLevel: Me,
			onLog: function (t, e) {
				if (null !== t && 'function' != typeof t)
					throw Ge.create('invalid-log-argument', { appName: name });
				!(function (t, e) {
					for (
						var n = function (n) {
								var r = null;
								e && e.level && (r = Ce[e.level]),
									(n.userLogHandler =
										null === t
											? null
											: function (e, n) {
													for (var i = [], o = 2; o < arguments.length; o++)
														i[o - 2] = arguments[o];
													var s = i
														.map(function (t) {
															if (null == t) return null;
															if ('string' == typeof t) return t;
															if ('number' == typeof t || 'boolean' == typeof t)
																return t.toString();
															if (t instanceof Error) return t.message;
															try {
																return JSON.stringify(t);
															} catch (e) {
																return null;
															}
														})
														.filter(function (t) {
															return t;
														})
														.join(' ');
													n >= (null != r ? r : e.logLevel) &&
														t({ level: Oe[n].toLowerCase(), message: s, args: i, type: e.name });
											  });
							},
							r = 0,
							i = Re;
						r < i.length;
						r++
					)
						n(i[r]);
				})(
					/**
					 * @license
					 * Copyright 2019 Google LLC
					 *
					 * Licensed under the Apache License, Version 2.0 (the "License");
					 * you may not use this file except in compliance with the License.
					 * You may obtain a copy of the License at
					 *
					 *   http://www.apache.org/licenses/LICENSE-2.0
					 *
					 * Unless required by applicable law or agreed to in writing, software
					 * distributed under the License is distributed on an "AS IS" BASIS,
					 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
					 * See the License for the specific language governing permissions and
					 * limitations under the License.
					 */ t,
					e
				);
			},
			apps: null,
			SDK_VERSION: '7.20.0',
			INTERNAL: {
				registerComponent: o,
				removeApp: function (t) {
					delete e[t];
				},
				components: n,
				useAsService: function (t, e) {
					if ('serverAuth' === e) return null;
					return e;
				}
			}
		};
	function i(t) {
		if (!Ie(e, (t = t || '[DEFAULT]'))) throw Ge.create('no-app', { appName: t });
		return e[t];
	}
	function o(o) {
		var s,
			u,
			a = o.name;
		if (n.has(a))
			return (
				$e.debug('There were multiple attempts to register component ' + a + '.'),
				'PUBLIC' === o.type ? r[a] : null
			);
		if ((n.set(a, o), 'PUBLIC' === o.type)) {
			var c = function (t) {
				if ((void 0 === t && (t = i()), 'function' != typeof t[a]))
					throw Ge.create('invalid-app-argument', { appName: a });
				return t[a]();
			};
			void 0 !== o.serviceProps && de(c, o.serviceProps),
				(r[a] = c),
				(t.prototype[a] = function () {
					for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
					var n = this._getService.bind(this, a);
					return n.apply(this, o.multipleInstances ? t : []);
				});
		}
		try {
			for (var h = he(Object.keys(e)), f = h.next(); !f.done; f = h.next()) {
				var l = f.value;
				e[l]._addComponent(o);
			}
		} catch (p) {
			s = { error: p };
		} finally {
			try {
				f && !f.done && (u = h.return) && u.call(h);
			} finally {
				if (s) throw s.error;
			}
		}
		return 'PUBLIC' === o.type ? r[a] : null;
	}
	return (
		(r.default = r),
		Object.defineProperty(r, 'apps', {
			get: function () {
				return Object.keys(e).map(function (t) {
					return e[t];
				});
			}
		}),
		(i.App = t),
		r
	);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var We = (function t() {
		var e = Ke(He);
		return (
			(e.INTERNAL = ue(ue({}, e.INTERNAL), {
				createFirebaseNamespace: t,
				extendNamespace: function (t) {
					de(e, t);
				},
				createSubscribe: _e,
				ErrorFactory: be,
				deepExtend: de
			})),
			e
		);
	})(),
	Qe = (function () {
		function t(t) {
			this.container = t;
		}
		return (
			(t.prototype.getPlatformInfoString = function () {
				return this.container
					.getProviders()
					.map(function (t) {
						if (
							(function (t) {
								var e = t.getComponent();
								return 'VERSION' === (null == e ? void 0 : e.type);
							})(
								/**
								 * @license
								 * Copyright 2019 Google LLC
								 *
								 * Licensed under the Apache License, Version 2.0 (the "License");
								 * you may not use this file except in compliance with the License.
								 * You may obtain a copy of the License at
								 *
								 *   http://www.apache.org/licenses/LICENSE-2.0
								 *
								 * Unless required by applicable law or agreed to in writing, software
								 * distributed under the License is distributed on an "AS IS" BASIS,
								 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
								 * See the License for the specific language governing permissions and
								 * limitations under the License.
								 */ t
							)
						) {
							var e = t.getImmediate();
							return e.library + '/' + e.version;
						}
						return null;
					})
					.filter(function (t) {
						return t;
					})
					.join(' ');
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if ('object' == typeof self && self.self === self && void 0 !== self.firebase) {
	$e.warn(
		'\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  '
	);
	var Xe = self.firebase.SDK_VERSION;
	Xe &&
		Xe.indexOf('LITE') >= 0 &&
		$e.warn(
			'\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    '
		);
}
var Ye = We.initializeApp;
We.initializeApp = function () {
	for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
	return (
		ge() &&
			$e.warn(
				'\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '
			),
		Ye.apply(void 0, t)
	);
};
var Je,
	Ze,
	tn = We;
function en(t) {
	return t && 'object' == typeof t && 'default' in t ? t : { default: t };
}
(Je = tn).INTERNAL.registerComponent(
	new Ne(
		'platform-logger',
		function (t) {
			return new Qe(t);
		},
		'PRIVATE'
	)
),
	Je.registerVersion('@firebase/app', '0.6.11', Ze),
	Je.registerVersion('fire-js', '');
var nn = en(
	ie(Object.freeze({ __proto__: null, [Symbol.toStringTag]: 'Module', default: tn, firebase: tn }))
);
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
nn.default.registerVersion('firebase', '7.24.0', 'app');
var rn = nn.default,
	on = function (t, e) {
		return (on =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (t, e) {
					t.__proto__ = e;
				}) ||
			function (t, e) {
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			})(t, e);
	};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function sn(t) {
	var e = 'function' == typeof Symbol && Symbol.iterator,
		n = e && t[e],
		r = 0;
	if (n) return n.call(t);
	if (t && 'number' == typeof t.length)
		return {
			next: function () {
				return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t };
			}
		};
	throw new TypeError(e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
var un,
	an =
		'undefined' != typeof globalThis
			? globalThis
			: 'undefined' != typeof window
			? window
			: 'undefined' != typeof global
			? global
			: 'undefined' != typeof self
			? self
			: {},
	cn = cn || {},
	hn = an || self;
function fn() {}
function ln(t) {
	var e = typeof t;
	return 'object' != e ? e : t ? (Array.isArray(t) ? 'array' : e) : 'null';
}
function pn(t) {
	var e = ln(t);
	return 'array' == e || ('object' == e && 'number' == typeof t.length);
}
function dn(t) {
	var e = typeof t;
	return ('object' == e && null != t) || 'function' == e;
}
var vn = 'closure_uid_' + ((1e9 * Math.random()) >>> 0),
	yn = 0;
function gn(t, e, n) {
	return t.call.apply(t.bind, arguments);
}
function mn(t, e, n) {
	if (!t) throw Error();
	if (2 < arguments.length) {
		var r = Array.prototype.slice.call(arguments, 2);
		return function () {
			var n = Array.prototype.slice.call(arguments);
			return Array.prototype.unshift.apply(n, r), t.apply(e, n);
		};
	}
	return function () {
		return t.apply(e, arguments);
	};
}
function bn(t, e, n) {
	return (bn =
		Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code')
			? gn
			: mn).apply(null, arguments);
}
function wn(t, e) {
	var n = Array.prototype.slice.call(arguments, 1);
	return function () {
		var e = n.slice();
		return e.push.apply(e, arguments), t.apply(this, e);
	};
}
var En = Date.now;
function In(t, e) {
	function n() {}
	(n.prototype = e.prototype),
		(t.S = e.prototype),
		(t.prototype = new n()),
		(t.prototype.constructor = t);
}
function _n() {
	(this.j = this.j), (this.i = this.i);
}
(_n.prototype.j = !1),
	(_n.prototype.ja = function () {
		var t;
		!this.j &&
			((this.j = !0), this.G(), 0) &&
			((t = this), (Object.prototype.hasOwnProperty.call(t, vn) && t[vn]) || (t[vn] = ++yn));
	}),
	(_n.prototype.G = function () {
		if (this.i) for (; this.i.length; ) this.i.shift()();
	});
var Tn = Array.prototype.indexOf
		? function (t, e) {
				return Array.prototype.indexOf.call(t, e, void 0);
		  }
		: function (t, e) {
				if ('string' == typeof t)
					return 'string' != typeof e || 1 != e.length ? -1 : t.indexOf(e, 0);
				for (var n = 0; n < t.length; n++) if (n in t && t[n] === e) return n;
				return -1;
		  },
	An = Array.prototype.forEach
		? function (t, e, n) {
				Array.prototype.forEach.call(t, e, n);
		  }
		: function (t, e, n) {
				for (var r = t.length, i = 'string' == typeof t ? t.split('') : t, o = 0; o < r; o++)
					o in i && e.call(n, i[o], o, t);
		  };
function Nn(t) {
	return Array.prototype.concat.apply([], arguments);
}
function Sn(t) {
	var e = t.length;
	if (0 < e) {
		for (var n = Array(e), r = 0; r < e; r++) n[r] = t[r];
		return n;
	}
	return [];
}
function Dn(t) {
	return /^[\s\xa0]*$/.test(t);
}
var xn,
	Ln = String.prototype.trim
		? function (t) {
				return t.trim();
		  }
		: function (t) {
				return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1];
		  };
function On(t, e) {
	return -1 != t.indexOf(e);
}
function kn(t, e) {
	return t < e ? -1 : t > e ? 1 : 0;
}
t: {
	var Rn = hn.navigator;
	if (Rn) {
		var Pn = Rn.userAgent;
		if (Pn) {
			xn = Pn;
			break t;
		}
	}
	xn = '';
}
function Cn(t, e, n) {
	for (var r in t) e.call(n, t[r], r, t);
}
function Un(t) {
	var e = {};
	for (var n in t) e[n] = t[n];
	return e;
}
var Vn =
	'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
		' '
	);
function Fn(t, e) {
	for (var n, r, i = 1; i < arguments.length; i++) {
		for (n in (r = arguments[i])) t[n] = r[n];
		for (var o = 0; o < Vn.length; o++)
			(n = Vn[o]), Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
	}
}
function jn(t) {
	return jn[' '](t), t;
}
jn[' '] = fn;
var Mn,
	qn,
	Bn = On(xn, 'Opera'),
	Gn = On(xn, 'Trident') || On(xn, 'MSIE'),
	zn = On(xn, 'Edge'),
	$n = zn || Gn,
	Hn =
		On(xn, 'Gecko') &&
		!(On(xn.toLowerCase(), 'webkit') && !On(xn, 'Edge')) &&
		!(On(xn, 'Trident') || On(xn, 'MSIE')) &&
		!On(xn, 'Edge'),
	Kn = On(xn.toLowerCase(), 'webkit') && !On(xn, 'Edge');
function Wn() {
	var t = hn.document;
	return t ? t.documentMode : void 0;
}
t: {
	var Qn = '',
		Xn =
			((qn = xn),
			Hn
				? /rv:([^\);]+)(\)|;)/.exec(qn)
				: zn
				? /Edge\/([\d\.]+)/.exec(qn)
				: Gn
				? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(qn)
				: Kn
				? /WebKit\/(\S+)/.exec(qn)
				: Bn
				? /(?:Version)[ \/]?(\S+)/.exec(qn)
				: void 0);
	if ((Xn && (Qn = Xn ? Xn[1] : ''), Gn)) {
		var Yn = Wn();
		if (null != Yn && Yn > parseFloat(Qn)) {
			Mn = String(Yn);
			break t;
		}
	}
	Mn = Qn;
}
var Jn,
	Zn = {};
function tr(t) {
	return (function (t, e) {
		var n = Zn;
		return Object.prototype.hasOwnProperty.call(n, t) ? n[t] : (n[t] = e(t));
	})(t, function () {
		for (
			var e = 0,
				n = Ln(String(Mn)).split('.'),
				r = Ln(String(t)).split('.'),
				i = Math.max(n.length, r.length),
				o = 0;
			0 == e && o < i;
			o++
		) {
			var s = n[o] || '',
				u = r[o] || '';
			do {
				if (
					((s = /(\d*)(\D*)(.*)/.exec(s) || ['', '', '', '']),
					(u = /(\d*)(\D*)(.*)/.exec(u) || ['', '', '', '']),
					0 == s[0].length && 0 == u[0].length)
				)
					break;
				(e =
					kn(
						0 == s[1].length ? 0 : parseInt(s[1], 10),
						0 == u[1].length ? 0 : parseInt(u[1], 10)
					) ||
					kn(0 == s[2].length, 0 == u[2].length) ||
					kn(s[2], u[2])),
					(s = s[3]),
					(u = u[3]);
			} while (0 == e);
		}
		return 0 <= e;
	});
}
if (hn.document && Gn) {
	var er = Wn();
	Jn = er || parseInt(Mn, 10) || void 0;
} else Jn = void 0;
var nr = Jn,
	rr = !Gn || 9 <= Number(nr),
	ir = Gn && !tr('9'),
	or = (function () {
		if (!hn.addEventListener || !Object.defineProperty) return !1;
		var t = !1,
			e = Object.defineProperty({}, 'passive', {
				get: function () {
					t = !0;
				}
			});
		try {
			hn.addEventListener('test', fn, e), hn.removeEventListener('test', fn, e);
		} catch (n) {}
		return t;
	})();
function sr(t, e) {
	(this.type = t), (this.a = this.target = e), (this.defaultPrevented = !1);
}
function ur(t, e) {
	if (
		(sr.call(this, t ? t.type : ''),
		(this.relatedTarget = this.a = this.target = null),
		(this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0),
		(this.key = ''),
		(this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
		(this.pointerId = 0),
		(this.pointerType = ''),
		(this.c = null),
		t)
	) {
		var n = (this.type = t.type),
			r = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : null;
		if (((this.target = t.target || t.srcElement), (this.a = e), (e = t.relatedTarget))) {
			if (Hn) {
				t: {
					try {
						jn(e.nodeName);
						var i = !0;
						break t;
					} catch (o) {}
					i = !1;
				}
				i || (e = null);
			}
		} else 'mouseover' == n ? (e = t.fromElement) : 'mouseout' == n && (e = t.toElement);
		(this.relatedTarget = e),
			r
				? ((this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX),
				  (this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY),
				  (this.screenX = r.screenX || 0),
				  (this.screenY = r.screenY || 0))
				: ((this.clientX = void 0 !== t.clientX ? t.clientX : t.pageX),
				  (this.clientY = void 0 !== t.clientY ? t.clientY : t.pageY),
				  (this.screenX = t.screenX || 0),
				  (this.screenY = t.screenY || 0)),
			(this.button = t.button),
			(this.key = t.key || ''),
			(this.ctrlKey = t.ctrlKey),
			(this.altKey = t.altKey),
			(this.shiftKey = t.shiftKey),
			(this.metaKey = t.metaKey),
			(this.pointerId = t.pointerId || 0),
			(this.pointerType =
				'string' == typeof t.pointerType ? t.pointerType : ar[t.pointerType] || ''),
			(this.c = t),
			t.defaultPrevented && this.b();
	}
}
(sr.prototype.b = function () {
	this.defaultPrevented = !0;
}),
	In(ur, sr);
var ar = { 2: 'touch', 3: 'pen', 4: 'mouse' };
ur.prototype.b = function () {
	ur.S.b.call(this);
	var t = this.c;
	if (t.preventDefault) t.preventDefault();
	else if (((t.returnValue = !1), ir))
		try {
			(t.ctrlKey || (112 <= t.keyCode && 123 >= t.keyCode)) && (t.keyCode = -1);
		} catch (e) {}
};
var cr = 'closure_listenable_' + ((1e6 * Math.random()) | 0),
	hr = 0;
function fr(t, e, n, r, i) {
	(this.listener = t),
		(this.proxy = null),
		(this.src = e),
		(this.type = n),
		(this.capture = !!r),
		(this.ca = i),
		(this.key = ++hr),
		(this.Y = this.Z = !1);
}
function lr(t) {
	(t.Y = !0), (t.listener = null), (t.proxy = null), (t.src = null), (t.ca = null);
}
function pr(t) {
	(this.src = t), (this.a = {}), (this.b = 0);
}
function dr(t, e) {
	var n = e.type;
	if (n in t.a) {
		var r,
			i = t.a[n],
			o = Tn(i, e);
		(r = 0 <= o) && Array.prototype.splice.call(i, o, 1),
			r && (lr(e), 0 == t.a[n].length && (delete t.a[n], t.b--));
	}
}
function vr(t, e, n, r) {
	for (var i = 0; i < t.length; ++i) {
		var o = t[i];
		if (!o.Y && o.listener == e && o.capture == !!n && o.ca == r) return i;
	}
	return -1;
}
pr.prototype.add = function (t, e, n, r, i) {
	var o = t.toString();
	(t = this.a[o]) || ((t = this.a[o] = []), this.b++);
	var s = vr(t, e, r, i);
	return (
		-1 < s
			? ((e = t[s]), n || (e.Z = !1))
			: (((e = new fr(e, this.src, o, !!r, i)).Z = n), t.push(e)),
		e
	);
};
var yr = 'closure_lm_' + ((1e6 * Math.random()) | 0),
	gr = {};
function mr(t, e, n, r, i) {
	if (r && r.once) return wr(t, e, n, r, i);
	if (Array.isArray(e)) {
		for (var o = 0; o < e.length; o++) mr(t, e[o], n, r, i);
		return null;
	}
	return (n = Dr(n)), t && t[cr] ? t.va(e, n, dn(r) ? !!r.capture : !!r, i) : br(t, e, n, !1, r, i);
}
function br(t, e, n, r, i, o) {
	if (!e) throw Error('Invalid event type');
	var s = dn(i) ? !!i.capture : !!i;
	if (s && !rr) return null;
	var u = Nr(t);
	if ((u || (t[yr] = u = new pr(t)), (n = u.add(e, n, r, s, o)).proxy)) return n;
	if (
		((r = (function () {
			var t = Ar,
				e = rr
					? function (n) {
							return t.call(e.src, e.listener, n);
					  }
					: function (n) {
							if (!(n = t.call(e.src, e.listener, n))) return n;
					  };
			return e;
		})()),
		(n.proxy = r),
		(r.src = t),
		(r.listener = n),
		t.addEventListener)
	)
		or || (i = s), void 0 === i && (i = !1), t.addEventListener(e.toString(), r, i);
	else if (t.attachEvent) t.attachEvent(_r(e.toString()), r);
	else {
		if (!t.addListener || !t.removeListener)
			throw Error('addEventListener and attachEvent are unavailable.');
		t.addListener(r);
	}
	return n;
}
function wr(t, e, n, r, i) {
	if (Array.isArray(e)) {
		for (var o = 0; o < e.length; o++) wr(t, e[o], n, r, i);
		return null;
	}
	return (n = Dr(n)), t && t[cr] ? t.wa(e, n, dn(r) ? !!r.capture : !!r, i) : br(t, e, n, !0, r, i);
}
function Er(t, e, n, r, i) {
	if (Array.isArray(e)) for (var o = 0; o < e.length; o++) Er(t, e[o], n, r, i);
	else
		(r = dn(r) ? !!r.capture : !!r),
			(n = Dr(n)),
			t && t[cr]
				? ((t = t.c),
				  (e = String(e).toString()) in t.a &&
						-1 < (n = vr((o = t.a[e]), n, r, i)) &&
						(lr(o[n]),
						Array.prototype.splice.call(o, n, 1),
						0 == o.length && (delete t.a[e], t.b--)))
				: t &&
				  (t = Nr(t)) &&
				  ((e = t.a[e.toString()]),
				  (t = -1),
				  e && (t = vr(e, n, r, i)),
				  (n = -1 < t ? e[t] : null) && Ir(n));
}
function Ir(t) {
	if ('number' != typeof t && t && !t.Y) {
		var e = t.src;
		if (e && e[cr]) dr(e.c, t);
		else {
			var n = t.type,
				r = t.proxy;
			e.removeEventListener
				? e.removeEventListener(n, r, t.capture)
				: e.detachEvent
				? e.detachEvent(_r(n), r)
				: e.addListener && e.removeListener && e.removeListener(r),
				(n = Nr(e)) ? (dr(n, t), 0 == n.b && ((n.src = null), (e[yr] = null))) : lr(t);
		}
	}
}
function _r(t) {
	return t in gr ? gr[t] : (gr[t] = 'on' + t);
}
function Tr(t, e) {
	var n = t.listener,
		r = t.ca || t.src;
	return t.Z && Ir(t), n.call(r, e);
}
function Ar(t, e) {
	if (t.Y) return !0;
	if (!rr) {
		if (!e)
			t: {
				e = ['window', 'event'];
				for (var n = hn, r = 0; r < e.length; r++)
					if (null == (n = n[e[r]])) {
						e = null;
						break t;
					}
				e = n;
			}
		return Tr(t, (e = new ur(e, this)));
	}
	return Tr(t, new ur(e, this));
}
function Nr(t) {
	return (t = t[yr]) instanceof pr ? t : null;
}
var Sr = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0);
function Dr(t) {
	return 'function' == ln(t)
		? t
		: (t[Sr] ||
				(t[Sr] = function (e) {
					return t.handleEvent(e);
				}),
		  t[Sr]);
}
function xr() {
	_n.call(this), (this.c = new pr(this)), (this.J = this), (this.C = null);
}
function Lr(t, e, n, r) {
	if (!(e = t.c.a[String(e)])) return !0;
	e = e.concat();
	for (var i = !0, o = 0; o < e.length; ++o) {
		var s = e[o];
		if (s && !s.Y && s.capture == n) {
			var u = s.listener,
				a = s.ca || s.src;
			s.Z && dr(t.c, s), (i = !1 !== u.call(a, r) && i);
		}
	}
	return i && !r.defaultPrevented;
}
In(xr, _n),
	(xr.prototype[cr] = !0),
	((un = xr.prototype).addEventListener = function (t, e, n, r) {
		mr(this, t, e, n, r);
	}),
	(un.removeEventListener = function (t, e, n, r) {
		Er(this, t, e, n, r);
	}),
	(un.dispatchEvent = function (t) {
		var e,
			n = this.C;
		if (n) for (e = []; n; n = n.C) e.push(n);
		n = this.J;
		var r = t.type || t;
		if ('string' == typeof t) t = new sr(t, n);
		else if (t instanceof sr) t.target = t.target || n;
		else {
			var i = t;
			Fn((t = new sr(r, n)), i);
		}
		if (((i = !0), e))
			for (var o = e.length - 1; 0 <= o; o--) {
				var s = (t.a = e[o]);
				i = Lr(s, r, !0, t) && i;
			}
		if (((i = Lr((s = t.a = n), r, !0, t) && i), (i = Lr(s, r, !1, t) && i), e))
			for (o = 0; o < e.length; o++) i = Lr((s = t.a = e[o]), r, !1, t) && i;
		return i;
	}),
	(un.G = function () {
		if ((xr.S.G.call(this), this.c)) {
			var t,
				e = this.c;
			for (t in e.a) {
				for (var n = e.a[t], r = 0; r < n.length; r++) lr(n[r]);
				delete e.a[t], e.b--;
			}
		}
		this.C = null;
	}),
	(un.va = function (t, e, n, r) {
		return this.c.add(String(t), e, !1, n, r);
	}),
	(un.wa = function (t, e, n, r) {
		return this.c.add(String(t), e, !0, n, r);
	});
var Or = hn.JSON.stringify;
function kr() {
	this.b = this.a = null;
}
var Rr,
	Pr = new ((function () {
		function t(t, e, n) {
			(this.f = n), (this.c = t), (this.g = e), (this.b = 0), (this.a = null);
		}
		return (
			(t.prototype.get = function () {
				var t;
				return (
					0 < this.b
						? (this.b--, (t = this.a), (this.a = t.next), (t.next = null))
						: (t = this.c()),
					t
				);
			}),
			t
		);
	})())(
		function () {
			return new Ur();
		},
		function (t) {
			t.reset();
		},
		100
	);
function Cr() {
	var t = Mr,
		e = null;
	return t.a && ((e = t.a), (t.a = t.a.next), t.a || (t.b = null), (e.next = null)), e;
}
function Ur() {
	this.next = this.b = this.a = null;
}
function Vr(t) {
	hn.setTimeout(function () {
		throw t;
	}, 0);
}
function Fr(t, e) {
	Rr ||
		(function () {
			var t = hn.Promise.resolve(void 0);
			Rr = function () {
				t.then(qr);
			};
		})(),
		jr || (Rr(), (jr = !0)),
		Mr.add(t, e);
}
(kr.prototype.add = function (t, e) {
	var n = Pr.get();
	n.set(t, e), this.b ? (this.b.next = n) : (this.a = n), (this.b = n);
}),
	(Ur.prototype.set = function (t, e) {
		(this.a = t), (this.b = e), (this.next = null);
	}),
	(Ur.prototype.reset = function () {
		this.next = this.b = this.a = null;
	});
var jr = !1,
	Mr = new kr();
function qr() {
	for (var t; (t = Cr()); ) {
		try {
			t.a.call(t.b);
		} catch (n) {
			Vr(n);
		}
		var e = Pr;
		e.g(t), e.b < e.f && (e.b++, (t.next = e.a), (e.a = t));
	}
	jr = !1;
}
function Br(t, e) {
	xr.call(this),
		(this.b = t || 1),
		(this.a = e || hn),
		(this.f = bn(this.Ya, this)),
		(this.g = En());
}
function Gr(t) {
	(t.aa = !1), t.M && (t.a.clearTimeout(t.M), (t.M = null));
}
function zr(t, e, n) {
	if ('function' == ln(t)) n && (t = bn(t, n));
	else {
		if (!t || 'function' != typeof t.handleEvent) throw Error('Invalid listener argument');
		t = bn(t.handleEvent, t);
	}
	return 2147483647 < Number(e) ? -1 : hn.setTimeout(t, e || 0);
}
function $r(t) {
	t.a = zr(function () {
		(t.a = null), t.c && ((t.c = !1), $r(t));
	}, t.h);
	var e = t.b;
	(t.b = null), t.g.apply(null, e);
}
In(Br, xr),
	((un = Br.prototype).aa = !1),
	(un.M = null),
	(un.Ya = function () {
		if (this.aa) {
			var t = En() - this.g;
			0 < t && t < 0.8 * this.b
				? (this.M = this.a.setTimeout(this.f, this.b - t))
				: (this.M && (this.a.clearTimeout(this.M), (this.M = null)),
				  this.dispatchEvent('tick'),
				  this.aa && (Gr(this), this.start()));
		}
	}),
	(un.start = function () {
		(this.aa = !0), this.M || ((this.M = this.a.setTimeout(this.f, this.b)), (this.g = En()));
	}),
	(un.G = function () {
		Br.S.G.call(this), Gr(this), delete this.a;
	});
var Hr = (function (t) {
	function e(e, n, r) {
		var i = t.call(this) || this;
		return (i.g = null != r ? e.bind(r) : e), (i.h = n), (i.b = null), (i.c = !1), (i.a = null), i;
	}
	return (
		(function (t, e) {
			function n() {
				this.constructor = t;
			}
			on(t, e),
				(t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
		})(e, t),
		(e.prototype.f = function (t) {
			(this.b = arguments), this.a ? (this.c = !0) : $r(this);
		}),
		(e.prototype.G = function () {
			t.prototype.G.call(this),
				this.a && (hn.clearTimeout(this.a), (this.a = null), (this.c = !1), (this.b = null));
		}),
		e
	);
})(_n);
function Kr(t) {
	_n.call(this), (this.b = t), (this.a = {});
}
In(Kr, _n);
var Wr = [];
function Qr(t, e, n, r) {
	Array.isArray(n) || (n && (Wr[0] = n.toString()), (n = Wr));
	for (var i = 0; i < n.length; i++) {
		var o = mr(e, n[i], r || t.handleEvent, !1, t.b || t);
		if (!o) break;
		t.a[o.key] = o;
	}
}
function Xr(t) {
	Cn(
		t.a,
		function (t, e) {
			this.a.hasOwnProperty(e) && Ir(t);
		},
		t
	),
		(t.a = {});
}
function Yr() {
	this.a = !0;
}
function Jr(t, e, n, r) {
	t.info(function () {
		return (
			'XMLHTTP TEXT (' +
			e +
			'): ' +
			(function (t, e) {
				if (!t.a) return e;
				if (!e) return null;
				try {
					var n = JSON.parse(e);
					if (n)
						for (t = 0; t < n.length; t++)
							if (Array.isArray(n[t])) {
								var r = n[t];
								if (!(2 > r.length)) {
									var i = r[1];
									if (Array.isArray(i) && !(1 > i.length)) {
										var o = i[0];
										if ('noop' != o && 'stop' != o && 'close' != o)
											for (var s = 1; s < i.length; s++) i[s] = '';
									}
								}
							}
					return Or(n);
				} catch (u) {
					return e;
				}
			})(t, n) +
			(r ? ' ' + r : '')
		);
	});
}
(Kr.prototype.G = function () {
	Kr.S.G.call(this), Xr(this);
}),
	(Kr.prototype.handleEvent = function () {
		throw Error('EventHandler.handleEvent not implemented');
	}),
	(Yr.prototype.info = function () {});
var Zr = null;
function ti() {
	return (Zr = Zr || new xr());
}
function ei(t) {
	sr.call(this, 'serverreachability', t);
}
function ni(t) {
	var e = ti();
	e.dispatchEvent(new ei(e, t));
}
function ri(t) {
	sr.call(this, 'statevent', t);
}
function ii(t) {
	var e = ti();
	e.dispatchEvent(new ri(e, t));
}
function oi(t) {
	sr.call(this, 'timingevent', t);
}
function si(t, e) {
	if ('function' != ln(t)) throw Error('Fn must not be null and must be a function');
	return hn.setTimeout(function () {
		t();
	}, e);
}
In(ei, sr), In(ri, sr), In(oi, sr);
var ui = { NO_ERROR: 0, Za: 1, gb: 2, fb: 3, bb: 4, eb: 5, hb: 6, Da: 7, TIMEOUT: 8, kb: 9 },
	ai = {
		ab: 'complete',
		ob: 'success',
		Ea: 'error',
		Da: 'abort',
		mb: 'ready',
		nb: 'readystatechange',
		TIMEOUT: 'timeout',
		ib: 'incrementaldata',
		lb: 'progress',
		cb: 'downloadprogress',
		pb: 'uploadprogress'
	};
function ci() {}
function hi(t) {
	var e;
	return (e = t.a) || (e = t.a = {}), e;
}
function fi() {}
ci.prototype.a = null;
var li,
	pi = { OPEN: 'a', $a: 'b', Ea: 'c', jb: 'd' };
function di() {
	sr.call(this, 'd');
}
function vi() {
	sr.call(this, 'c');
}
function yi() {}
function gi(t, e, n, r) {
	(this.g = t),
		(this.c = e),
		(this.f = n),
		(this.T = r || 1),
		(this.J = new Kr(this)),
		(this.P = mi),
		(t = $n ? 125 : void 0),
		(this.R = new Br(t)),
		(this.B = null),
		(this.b = !1),
		(this.j = this.l = this.i = this.H = this.u = this.U = this.o = null),
		(this.s = []),
		(this.a = null),
		(this.D = 0),
		(this.h = this.m = null),
		(this.N = -1),
		(this.A = !1),
		(this.O = 0),
		(this.F = null),
		(this.W = this.C = this.V = this.I = !1);
}
In(di, sr), In(vi, sr), In(yi, ci), (li = new yi());
var mi = 45e3,
	bi = {},
	wi = {};
function Ei(t, e, n) {
	(t.H = 1), (t.i = Gi(Vi(e))), (t.j = n), (t.I = !0), Ii(t, null);
}
function Ii(t, e) {
	(t.u = En()), Ai(t), (t.l = Vi(t.i));
	var n = t.l,
		r = t.T;
	Array.isArray(r) || (r = [String(r)]),
		no(n.b, 't', r),
		(t.D = 0),
		(t.a = Yo(t.g, t.g.C ? e : null)),
		0 < t.O && (t.F = new Hr(bn(t.Ca, t, t.a), t.O)),
		Qr(t.J, t.a, 'readystatechange', t.Wa),
		(e = t.B ? Un(t.B) : {}),
		t.j
			? (t.m || (t.m = 'POST'),
			  (e['Content-Type'] = 'application/x-www-form-urlencoded'),
			  t.a.ba(t.l, t.m, t.j, e))
			: ((t.m = 'GET'), t.a.ba(t.l, t.m, null, e)),
		ni(1),
		(function (t, e, n, r, i, o) {
			t.info(function () {
				if (t.a)
					if (o)
						for (var s = '', u = o.split('&'), a = 0; a < u.length; a++) {
							var c = u[a].split('=');
							if (1 < c.length) {
								var h = c[0];
								c = c[1];
								var f = h.split('_');
								s =
									2 <= f.length && 'type' == f[1]
										? s + (h + '=') + c + '&'
										: s + (h + '=redacted&');
							}
						}
					else s = null;
				else s = o;
				return 'XMLHTTP REQ (' + r + ') [attempt ' + i + ']: ' + e + '\n' + n + '\n' + s;
			});
		})(t.c, t.m, t.l, t.f, t.T, t.j);
}
function _i(t, e, n) {
	for (var r = !0; !t.A && t.D < n.length; ) {
		var i = Ti(t, n);
		if (i == wi) {
			4 == e && ((t.h = 4), ii(14), (r = !1)), Jr(t.c, t.f, null, '[Incomplete Response]');
			break;
		}
		if (i == bi) {
			(t.h = 4), ii(15), Jr(t.c, t.f, n, '[Invalid Chunk]'), (r = !1);
			break;
		}
		Jr(t.c, t.f, i, null), Li(t, i);
	}
	4 == e && 0 == n.length && ((t.h = 1), ii(16), (r = !1)),
		(t.b = t.b && r),
		r
			? 0 < n.length &&
			  !t.W &&
			  ((t.W = !0),
			  (e = t.g).a == t &&
					e.V &&
					!e.F &&
					(e.c.info('Great, no buffering proxy detected. Bytes received: ' + n.length),
					Go(e),
					(e.F = !0)))
			: (Jr(t.c, t.f, n, '[Invalid Chunked Response]'), xi(t), Di(t));
}
function Ti(t, e) {
	var n = t.D,
		r = e.indexOf('\n', n);
	return -1 == r
		? wi
		: ((n = Number(e.substring(n, r))),
		  isNaN(n) ? bi : (r += 1) + n > e.length ? wi : ((e = e.substr(r, n)), (t.D = r + n), e));
}
function Ai(t) {
	(t.U = En() + t.P), Ni(t, t.P);
}
function Ni(t, e) {
	if (null != t.o) throw Error('WatchDog timer not null');
	t.o = si(bn(t.Ua, t), e);
}
function Si(t) {
	t.o && (hn.clearTimeout(t.o), (t.o = null));
}
function Di(t) {
	0 == t.g.v || t.A || Ho(t.g, t);
}
function xi(t) {
	Si(t);
	var e = t.F;
	e && 'function' == typeof e.ja && e.ja(),
		(t.F = null),
		Gr(t.R),
		Xr(t.J),
		t.a && ((e = t.a), (t.a = null), e.abort(), e.ja());
}
function Li(t, e) {
	try {
		var n = t.g;
		if (0 != n.v && (n.a == t || co(n.b, t)))
			if (((n.I = t.N), !t.C && co(n.b, t) && 3 == n.v)) {
				try {
					var r = n.ka.a.parse(e);
				} catch (y) {
					r = null;
				}
				if (Array.isArray(r) && 3 == r.length) {
					var i = r;
					if (0 == i[0]) {
						t: if (!n.j) {
							if (n.a) {
								if (!(n.a.u + 3e3 < t.u)) break t;
								$o(n), Po(n);
							}
							Bo(n), ii(18);
						}
					} else
						(n.oa = i[1]),
							0 < n.oa - n.P &&
								37500 > i[2] &&
								n.H &&
								0 == n.o &&
								!n.m &&
								(n.m = si(bn(n.Ra, n), 6e3));
					if (1 >= ao(n.b) && n.ea) {
						try {
							n.ea();
						} catch (y) {}
						n.ea = void 0;
					}
				} else Wo(n, 11);
			} else if (((t.C || n.a == t) && $o(n), !Dn(e)))
				for (e = r = n.ka.a.parse(e), r = 0; r < e.length; r++)
					if (((i = e[r]), (n.P = i[0]), (i = i[1]), 2 == n.v))
						if ('c' == i[0]) {
							(n.J = i[1]), (n.ga = i[2]);
							var o = i[3];
							null != o && ((n.ha = o), n.c.info('VER=' + n.ha));
							var s = i[4];
							null != s && ((n.pa = s), n.c.info('SVER=' + n.pa));
							var u = i[5];
							if (null != u && 'number' == typeof u && 0 < u) {
								var a = 1.5 * u;
								(n.D = a), n.c.info('backChannelRequestTimeoutMs_=' + a);
							}
							a = n;
							var c = t.a;
							if (c) {
								var h = c.a ? c.a.getResponseHeader('X-Client-Wire-Protocol') : null;
								if (h) {
									var f = a.b;
									!f.a &&
										(On(h, 'spdy') || On(h, 'quic') || On(h, 'h2')) &&
										((f.f = f.g), (f.a = new Set()), f.b && (ho(f, f.b), (f.b = null)));
								}
								if (a.A) {
									var l = c.a ? c.a.getResponseHeader('X-HTTP-Session-Id') : null;
									l && ((a.na = l), Bi(a.B, a.A, l));
								}
							}
							(n.v = 3),
								n.f && n.f.ta(),
								n.V && ((n.N = En() - t.u), n.c.info('Handshake RTT: ' + n.N + 'ms'));
							var p = t;
							if ((((a = n).la = Xo(a, a.C ? a.ga : null, a.fa)), p.C)) {
								fo(a.b, p);
								var d = p,
									v = a.D;
								v && d.setTimeout(v), d.o && (Si(d), Ai(d)), (a.a = p);
							} else qo(a);
							0 < n.g.length && Vo(n);
						} else ('stop' != i[0] && 'close' != i[0]) || Wo(n, 7);
					else
						3 == n.v &&
							('stop' == i[0] || 'close' == i[0]
								? 'stop' == i[0]
									? Wo(n, 7)
									: Ro(n)
								: 'noop' != i[0] && n.f && n.f.sa(i),
							(n.o = 0));
		ni(4);
	} catch (y) {}
}
function Oi(t, e) {
	if (t.forEach && 'function' == typeof t.forEach) t.forEach(e, void 0);
	else if (pn(t) || 'string' == typeof t) An(t, e, void 0);
	else {
		if (t.L && 'function' == typeof t.L) var n = t.L();
		else if (t.K && 'function' == typeof t.K) n = void 0;
		else if (pn(t) || 'string' == typeof t) {
			n = [];
			for (var r = t.length, i = 0; i < r; i++) n.push(i);
		} else for (i in ((n = []), (r = 0), t)) n[r++] = i;
		i = (r = (function (t) {
			if (t.K && 'function' == typeof t.K) return t.K();
			if ('string' == typeof t) return t.split('');
			if (pn(t)) {
				for (var e = [], n = t.length, r = 0; r < n; r++) e.push(t[r]);
				return e;
			}
			for (r in ((e = []), (n = 0), t)) e[n++] = t[r];
			return e;
		})(t)).length;
		for (var o = 0; o < i; o++) e.call(void 0, r[o], n && n[o], t);
	}
}
function ki(t, e) {
	(this.b = {}), (this.a = []), (this.c = 0);
	var n = arguments.length;
	if (1 < n) {
		if (n % 2) throw Error('Uneven number of arguments');
		for (var r = 0; r < n; r += 2) this.set(arguments[r], arguments[r + 1]);
	} else if (t)
		if (t instanceof ki) for (n = t.L(), r = 0; r < n.length; r++) this.set(n[r], t.get(n[r]));
		else for (r in t) this.set(r, t[r]);
}
function Ri(t) {
	if (t.c != t.a.length) {
		for (var e = 0, n = 0; e < t.a.length; ) {
			var r = t.a[e];
			Pi(t.b, r) && (t.a[n++] = r), e++;
		}
		t.a.length = n;
	}
	if (t.c != t.a.length) {
		var i = {};
		for (n = e = 0; e < t.a.length; ) Pi(i, (r = t.a[e])) || ((t.a[n++] = r), (i[r] = 1)), e++;
		t.a.length = n;
	}
}
function Pi(t, e) {
	return Object.prototype.hasOwnProperty.call(t, e);
}
((un = gi.prototype).setTimeout = function (t) {
	this.P = t;
}),
	(un.Wa = function (t) {
		t = t.target;
		var e = this.F;
		e && 3 == xo(t) ? e.f() : this.Ca(t);
	}),
	(un.Ca = function (t) {
		try {
			if (t == this.a)
				t: {
					var e = xo(this.a),
						n = this.a.ua(),
						r = this.a.X();
					if (!(3 > e || (3 == e && !$n && !this.a.$()))) {
						this.A || 4 != e || 7 == n || ni(8 == n || 0 >= r ? 3 : 2), Si(this);
						var i = this.a.X();
						this.N = i;
						var o = this.a.$();
						if (
							((this.b = 200 == i),
							(function (t, e, n, r, i, o, s) {
								t.info(function () {
									return (
										'XMLHTTP RESP (' +
										r +
										') [ attempt ' +
										i +
										']: ' +
										e +
										'\n' +
										n +
										'\n' +
										o +
										' ' +
										s
									);
								});
							})(this.c, this.m, this.l, this.f, this.T, e, i),
							this.b)
						) {
							if (this.V && !this.C) {
								e: {
									if (this.a) {
										var s,
											u = this.a;
										if (
											(s = u.a ? u.a.getResponseHeader('X-HTTP-Initial-Response') : null) &&
											!Dn(s)
										) {
											var a = s;
											break e;
										}
									}
									a = null;
								}
								if (!a) {
									(this.b = !1), (this.h = 3), ii(12), xi(this), Di(this);
									break t;
								}
								Jr(this.c, this.f, a, 'Initial handshake response via X-HTTP-Initial-Response'),
									(this.C = !0),
									Li(this, a);
							}
							this.I
								? (_i(this, e, o),
								  $n && this.b && 3 == e && (Qr(this.J, this.R, 'tick', this.Va), this.R.start()))
								: (Jr(this.c, this.f, o, null), Li(this, o)),
								4 == e && xi(this),
								this.b && !this.A && (4 == e ? Ho(this.g, this) : ((this.b = !1), Ai(this)));
						} else
							400 == i && 0 < o.indexOf('Unknown SID')
								? ((this.h = 3), ii(12))
								: ((this.h = 0), ii(13)),
								xi(this),
								Di(this);
					}
				}
		} catch (mv) {}
	}),
	(un.Va = function () {
		if (this.a) {
			var t = xo(this.a),
				e = this.a.$();
			this.D < e.length && (Si(this), _i(this, t, e), this.b && 4 != t && Ai(this));
		}
	}),
	(un.cancel = function () {
		(this.A = !0), xi(this);
	}),
	(un.Ua = function () {
		this.o = null;
		var t = En();
		0 <= t - this.U
			? ((function (t, e) {
					t.info(function () {
						return 'TIMEOUT: ' + e;
					});
			  })(this.c, this.l),
			  2 != this.H && (ni(3), ii(17)),
			  xi(this),
			  (this.h = 2),
			  Di(this))
			: Ni(this, this.U - t);
	}),
	((un = ki.prototype).K = function () {
		Ri(this);
		for (var t = [], e = 0; e < this.a.length; e++) t.push(this.b[this.a[e]]);
		return t;
	}),
	(un.L = function () {
		return Ri(this), this.a.concat();
	}),
	(un.get = function (t, e) {
		return Pi(this.b, t) ? this.b[t] : e;
	}),
	(un.set = function (t, e) {
		Pi(this.b, t) || (this.c++, this.a.push(t)), (this.b[t] = e);
	}),
	(un.forEach = function (t, e) {
		for (var n = this.L(), r = 0; r < n.length; r++) {
			var i = n[r],
				o = this.get(i);
			t.call(e, o, i, this);
		}
	});
var Ci =
	/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
function Ui(t, e) {
	if (
		((this.c = this.j = this.f = ''),
		(this.h = null),
		(this.i = this.g = ''),
		(this.a = !1),
		t instanceof Ui)
	) {
		(this.a = void 0 !== e ? e : t.a),
			Fi(this, t.f),
			(this.j = t.j),
			ji(this, t.c),
			Mi(this, t.h),
			(this.g = t.g),
			(e = t.b);
		var n = new Ji();
		(n.c = e.c), e.a && ((n.a = new ki(e.a)), (n.b = e.b)), qi(this, n), (this.i = t.i);
	} else
		t && (n = String(t).match(Ci))
			? ((this.a = !!e),
			  Fi(this, n[1] || '', !0),
			  (this.j = zi(n[2] || '')),
			  ji(this, n[3] || '', !0),
			  Mi(this, n[4]),
			  (this.g = zi(n[5] || '', !0)),
			  qi(this, n[6] || '', !0),
			  (this.i = zi(n[7] || '')))
			: ((this.a = !!e), (this.b = new Ji(null, this.a)));
}
function Vi(t) {
	return new Ui(t);
}
function Fi(t, e, n) {
	(t.f = n ? zi(e, !0) : e), t.f && (t.f = t.f.replace(/:$/, ''));
}
function ji(t, e, n) {
	t.c = n ? zi(e, !0) : e;
}
function Mi(t, e) {
	if (e) {
		if (((e = Number(e)), isNaN(e) || 0 > e)) throw Error('Bad port number ' + e);
		t.h = e;
	} else t.h = null;
}
function qi(t, e, n) {
	e instanceof Ji
		? ((t.b = e),
		  (function (t, e) {
				e &&
					!t.f &&
					(Zi(t),
					(t.c = null),
					t.a.forEach(function (t, e) {
						var n = e.toLowerCase();
						e != n && (to(this, e), no(this, n, t));
					}, t)),
					(t.f = e);
		  })(t.b, t.a))
		: (n || (e = $i(e, Xi)), (t.b = new Ji(e, t.a)));
}
function Bi(t, e, n) {
	t.b.set(e, n);
}
function Gi(t) {
	return (
		Bi(
			t,
			'zx',
			Math.floor(2147483648 * Math.random()).toString(36) +
				Math.abs(Math.floor(2147483648 * Math.random()) ^ En()).toString(36)
		),
		t
	);
}
function zi(t, e) {
	return t ? (e ? decodeURI(t.replace(/%25/g, '%2525')) : decodeURIComponent(t)) : '';
}
function $i(t, e, n) {
	return 'string' == typeof t
		? ((t = encodeURI(t).replace(e, Hi)), n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, '%$1')), t)
		: null;
}
function Hi(t) {
	return '%' + (((t = t.charCodeAt(0)) >> 4) & 15).toString(16) + (15 & t).toString(16);
}
Ui.prototype.toString = function () {
	var t = [],
		e = this.f;
	e && t.push($i(e, Ki, !0), ':');
	var n = this.c;
	return (
		(n || 'file' == e) &&
			(t.push('//'),
			(e = this.j) && t.push($i(e, Ki, !0), '@'),
			t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
			null != (n = this.h) && t.push(':', String(n))),
		(n = this.g) &&
			(this.c && '/' != n.charAt(0) && t.push('/'),
			t.push($i(n, '/' == n.charAt(0) ? Qi : Wi, !0))),
		(n = this.b.toString()) && t.push('?', n),
		(n = this.i) && t.push('#', $i(n, Yi)),
		t.join('')
	);
};
var Ki = /[#\/\?@]/g,
	Wi = /[#\?:]/g,
	Qi = /[#\?]/g,
	Xi = /[#\?@]/g,
	Yi = /#/g;
function Ji(t, e) {
	(this.b = this.a = null), (this.c = t || null), (this.f = !!e);
}
function Zi(t) {
	t.a ||
		((t.a = new ki()),
		(t.b = 0),
		t.c &&
			(function (t, e) {
				if (t) {
					t = t.split('&');
					for (var n = 0; n < t.length; n++) {
						var r = t[n].indexOf('='),
							i = null;
						if (0 <= r) {
							var o = t[n].substring(0, r);
							i = t[n].substring(r + 1);
						} else o = t[n];
						e(o, i ? decodeURIComponent(i.replace(/\+/g, ' ')) : '');
					}
				}
			})(t.c, function (e, n) {
				t.add(decodeURIComponent(e.replace(/\+/g, ' ')), n);
			}));
}
function to(t, e) {
	Zi(t),
		(e = ro(t, e)),
		Pi(t.a.b, e) &&
			((t.c = null),
			(t.b -= t.a.get(e).length),
			Pi((t = t.a).b, e) && (delete t.b[e], t.c--, t.a.length > 2 * t.c && Ri(t)));
}
function eo(t, e) {
	return Zi(t), (e = ro(t, e)), Pi(t.a.b, e);
}
function no(t, e, n) {
	to(t, e), 0 < n.length && ((t.c = null), t.a.set(ro(t, e), Sn(n)), (t.b += n.length));
}
function ro(t, e) {
	return (e = String(e)), t.f && (e = e.toLowerCase()), e;
}
function io(t, e) {
	(this.b = t), (this.a = e);
}
function oo(t) {
	(this.g = t || so),
		hn.PerformanceNavigationTiming
			? (t =
					0 < (t = hn.performance.getEntriesByType('navigation')).length &&
					('hq' == t[0].nextHopProtocol || 'h2' == t[0].nextHopProtocol))
			: (t = !!(hn.ia && hn.ia.ya && hn.ia.ya() && hn.ia.ya().qb)),
		(this.f = t ? this.g : 1),
		(this.a = null),
		1 < this.f && (this.a = new Set()),
		(this.b = null),
		(this.c = []);
}
((un = Ji.prototype).add = function (t, e) {
	Zi(this), (this.c = null), (t = ro(this, t));
	var n = this.a.get(t);
	return n || this.a.set(t, (n = [])), n.push(e), (this.b += 1), this;
}),
	(un.forEach = function (t, e) {
		Zi(this),
			this.a.forEach(function (n, r) {
				An(
					n,
					function (n) {
						t.call(e, n, r, this);
					},
					this
				);
			}, this);
	}),
	(un.L = function () {
		Zi(this);
		for (var t = this.a.K(), e = this.a.L(), n = [], r = 0; r < e.length; r++)
			for (var i = t[r], o = 0; o < i.length; o++) n.push(e[r]);
		return n;
	}),
	(un.K = function (t) {
		Zi(this);
		var e = [];
		if ('string' == typeof t) eo(this, t) && (e = Nn(e, this.a.get(ro(this, t))));
		else {
			t = this.a.K();
			for (var n = 0; n < t.length; n++) e = Nn(e, t[n]);
		}
		return e;
	}),
	(un.set = function (t, e) {
		return (
			Zi(this),
			(this.c = null),
			eo(this, (t = ro(this, t))) && (this.b -= this.a.get(t).length),
			this.a.set(t, [e]),
			(this.b += 1),
			this
		);
	}),
	(un.get = function (t, e) {
		return t && 0 < (t = this.K(t)).length ? String(t[0]) : e;
	}),
	(un.toString = function () {
		if (this.c) return this.c;
		if (!this.a) return '';
		for (var t = [], e = this.a.L(), n = 0; n < e.length; n++) {
			var r = e[n],
				i = encodeURIComponent(String(r));
			r = this.K(r);
			for (var o = 0; o < r.length; o++) {
				var s = i;
				'' !== r[o] && (s += '=' + encodeURIComponent(String(r[o]))), t.push(s);
			}
		}
		return (this.c = t.join('&'));
	});
var so = 10;
function uo(t) {
	return !!t.b || (!!t.a && t.a.size >= t.f);
}
function ao(t) {
	return t.b ? 1 : t.a ? t.a.size : 0;
}
function co(t, e) {
	return t.b ? t.b == e : !!t.a && t.a.has(e);
}
function ho(t, e) {
	t.a ? t.a.add(e) : (t.b = e);
}
function fo(t, e) {
	t.b && t.b == e ? (t.b = null) : t.a && t.a.has(e) && t.a.delete(e);
}
function lo(t) {
	var e, n;
	if (null != t.b) return t.c.concat(t.b.s);
	if (null != t.a && 0 !== t.a.size) {
		var r = t.c;
		try {
			for (var i = sn(t.a.values()), o = i.next(); !o.done; o = i.next()) {
				var s = o.value;
				r = r.concat(s.s);
			}
		} catch (u) {
			e = { error: u };
		} finally {
			try {
				o && !o.done && (n = i.return) && n.call(i);
			} finally {
				if (e) throw e.error;
			}
		}
		return r;
	}
	return Sn(t.c);
}
function po() {}
function vo() {
	this.a = new po();
}
function yo(t, e, n) {
	var r = n || '';
	try {
		Oi(t, function (t, n) {
			var i = t;
			dn(t) && (i = Or(t)), e.push(r + n + '=' + encodeURIComponent(i));
		});
	} catch (i) {
		throw (e.push(r + 'type=' + encodeURIComponent('_badmap')), i);
	}
}
function go(t, e, n, r, i) {
	try {
		(e.onload = null), (e.onerror = null), (e.onabort = null), (e.ontimeout = null), i(r);
	} catch (o) {}
}
(oo.prototype.cancel = function () {
	var t, e;
	if (((this.c = lo(this)), this.b)) this.b.cancel(), (this.b = null);
	else if (this.a && 0 !== this.a.size) {
		try {
			for (var n = sn(this.a.values()), r = n.next(); !r.done; r = n.next()) {
				r.value.cancel();
			}
		} catch (i) {
			t = { error: i };
		} finally {
			try {
				r && !r.done && (e = n.return) && e.call(n);
			} finally {
				if (t) throw t.error;
			}
		}
		this.a.clear();
	}
}),
	(po.prototype.stringify = function (t) {
		return hn.JSON.stringify(t, void 0);
	}),
	(po.prototype.parse = function (t) {
		return hn.JSON.parse(t, void 0);
	});
var mo = hn.JSON.parse;
function bo(t) {
	xr.call(this),
		(this.headers = new ki()),
		(this.H = t || null),
		(this.b = !1),
		(this.s = this.a = null),
		(this.B = ''),
		(this.h = 0),
		(this.f = ''),
		(this.g = this.A = this.l = this.u = !1),
		(this.o = 0),
		(this.m = null),
		(this.I = wo),
		(this.D = this.F = !1);
}
In(bo, xr);
var wo = '',
	Eo = /^https?$/i,
	Io = ['POST', 'PUT'];
function _o(t) {
	return 'content-type' == t.toLowerCase();
}
function To(t, e) {
	(t.b = !1), t.a && ((t.g = !0), t.a.abort(), (t.g = !1)), (t.f = e), (t.h = 5), Ao(t), So(t);
}
function Ao(t) {
	t.u || ((t.u = !0), t.dispatchEvent('complete'), t.dispatchEvent('error'));
}
function No(t) {
	if (t.b && void 0 !== cn && (!t.s[1] || 4 != xo(t) || 2 != t.X()))
		if (t.l && 4 == xo(t)) zr(t.za, 0, t);
		else if ((t.dispatchEvent('readystatechange'), 4 == xo(t))) {
			t.b = !1;
			try {
				var e,
					n = t.X();
				t: switch (n) {
					case 200:
					case 201:
					case 202:
					case 204:
					case 206:
					case 304:
					case 1223:
						var r = !0;
						break t;
					default:
						r = !1;
				}
				if (!(e = r)) {
					var i;
					if ((i = 0 === n)) {
						var o = String(t.B).match(Ci)[1] || null;
						if (!o && hn.self && hn.self.location) {
							var s = hn.self.location.protocol;
							o = s.substr(0, s.length - 1);
						}
						i = !Eo.test(o ? o.toLowerCase() : '');
					}
					e = i;
				}
				if (e) t.dispatchEvent('complete'), t.dispatchEvent('success');
				else {
					t.h = 6;
					try {
						var u = 2 < xo(t) ? t.a.statusText : '';
					} catch (a) {
						u = '';
					}
					(t.f = u + ' [' + t.X() + ']'), Ao(t);
				}
			} finally {
				So(t);
			}
		}
}
function So(t, e) {
	if (t.a) {
		Do(t);
		var n = t.a,
			r = t.s[0] ? fn : null;
		(t.a = null), (t.s = null), e || t.dispatchEvent('ready');
		try {
			n.onreadystatechange = r;
		} catch (i) {}
	}
}
function Do(t) {
	t.a && t.D && (t.a.ontimeout = null), t.m && (hn.clearTimeout(t.m), (t.m = null));
}
function xo(t) {
	return t.a ? t.a.readyState : 0;
}
function Lo(t, e, n) {
	t: {
		for (r in n) {
			var r = !1;
			break t;
		}
		r = !0;
	}
	r ||
		((n = (function (t) {
			var e = '';
			return (
				Cn(t, function (t, n) {
					(e += n), (e += ':'), (e += t), (e += '\r\n');
				}),
				e
			);
		})(n)),
		'string' == typeof t ? null != n && encodeURIComponent(String(n)) : Bi(t, e, n));
}
function Oo(t, e, n) {
	return (n && n.internalChannelParams && n.internalChannelParams[t]) || e;
}
function ko(t) {
	(this.pa = 0),
		(this.g = []),
		(this.c = new Yr()),
		(this.ga =
			this.la =
			this.B =
			this.fa =
			this.a =
			this.na =
			this.A =
			this.W =
			this.i =
			this.O =
			this.l =
				null),
		(this.La = this.R = 0),
		(this.Ia = Oo('failFast', !1, t)),
		(this.H = this.m = this.j = this.h = this.f = null),
		(this.T = !0),
		(this.I = this.oa = this.P = -1),
		(this.U = this.o = this.u = 0),
		(this.Fa = Oo('baseRetryDelayMs', 5e3, t)),
		(this.Ma = Oo('retryDelaySeedMs', 1e4, t)),
		(this.Ja = Oo('forwardChannelMaxRetries', 2, t)),
		(this.ma = Oo('forwardChannelRequestTimeoutMs', 2e4, t)),
		(this.Ka = (t && t.g) || void 0),
		(this.D = void 0),
		(this.C = (t && t.supportsCrossDomainXhr) || !1),
		(this.J = ''),
		(this.b = new oo(t && t.concurrentRequestLimit)),
		(this.ka = new vo()),
		(this.da = (t && t.fastHandshake) || !1),
		(this.Ga = (t && t.b) || !1),
		t && t.f && (this.c.a = !1),
		t && t.forceLongPolling && (this.T = !1),
		(this.V = (!this.da && this.T && t && t.c) || !1),
		(this.ea = void 0),
		(this.N = 0),
		(this.F = !1),
		(this.s = null);
}
function Ro(t) {
	if ((Co(t), 3 == t.v)) {
		var e = t.R++,
			n = Vi(t.B);
		Bi(n, 'SID', t.J),
			Bi(n, 'RID', e),
			Bi(n, 'TYPE', 'terminate'),
			jo(t, n),
			((e = new gi(t, t.c, e, void 0)).H = 2),
			(e.i = Gi(Vi(n))),
			(n = !1),
			hn.navigator && hn.navigator.sendBeacon && (n = hn.navigator.sendBeacon(e.i.toString(), '')),
			!n && hn.Image && ((new Image().src = e.i), (n = !0)),
			n || ((e.a = Yo(e.g, null)), e.a.ba(e.i)),
			(e.u = En()),
			Ai(e);
	}
	Qo(t);
}
function Po(t) {
	t.a && (Go(t), t.a.cancel(), (t.a = null));
}
function Co(t) {
	Po(t),
		t.j && (hn.clearTimeout(t.j), (t.j = null)),
		$o(t),
		t.b.cancel(),
		t.h && ('number' == typeof t.h && hn.clearTimeout(t.h), (t.h = null));
}
function Uo(t, e) {
	t.g.push(new io(t.La++, e)), 3 == t.v && Vo(t);
}
function Vo(t) {
	uo(t.b) || t.h || ((t.h = !0), Fr(t.Ba, t), (t.u = 0));
}
function Fo(t, e) {
	var n;
	n = e ? e.f : t.R++;
	var r = Vi(t.B);
	Bi(r, 'SID', t.J),
		Bi(r, 'RID', n),
		Bi(r, 'AID', t.P),
		jo(t, r),
		t.i && t.l && Lo(r, t.i, t.l),
		(n = new gi(t, t.c, n, t.u + 1)),
		null === t.i && (n.B = t.l),
		e && (t.g = e.s.concat(t.g)),
		(e = Mo(t, n, 1e3)),
		n.setTimeout(Math.round(0.5 * t.ma) + Math.round(0.5 * t.ma * Math.random())),
		ho(t.b, n),
		Ei(n, r, e);
}
function jo(t, e) {
	t.f &&
		Oi({}, function (t, n) {
			Bi(e, n, t);
		});
}
function Mo(t, e, n) {
	n = Math.min(t.g.length, n);
	var r = t.f ? bn(t.f.Ha, t.f, t) : null;
	t: for (var i = t.g, o = -1; ; ) {
		var s = ['count=' + n];
		-1 == o ? (0 < n ? ((o = i[0].b), s.push('ofs=' + o)) : (o = 0)) : s.push('ofs=' + o);
		for (var u = !0, a = 0; a < n; a++) {
			var c = i[a].b,
				h = i[a].a;
			if (0 > (c -= o)) (o = Math.max(0, i[a].b - 100)), (u = !1);
			else
				try {
					yo(h, s, 'req' + c + '_');
				} catch (f) {
					r && r(h);
				}
		}
		if (u) {
			r = s.join('&');
			break t;
		}
	}
	return (t = t.g.splice(0, n)), (e.s = t), r;
}
function qo(t) {
	t.a || t.j || ((t.U = 1), Fr(t.Aa, t), (t.o = 0));
}
function Bo(t) {
	return !(t.a || t.j || 3 <= t.o) && (t.U++, (t.j = si(bn(t.Aa, t), Ko(t, t.o))), t.o++, !0);
}
function Go(t) {
	null != t.s && (hn.clearTimeout(t.s), (t.s = null));
}
function zo(t) {
	(t.a = new gi(t, t.c, 'rpc', t.U)), null === t.i && (t.a.B = t.l), (t.a.O = 0);
	var e = Vi(t.la);
	Bi(e, 'RID', 'rpc'),
		Bi(e, 'SID', t.J),
		Bi(e, 'CI', t.H ? '0' : '1'),
		Bi(e, 'AID', t.P),
		jo(t, e),
		Bi(e, 'TYPE', 'xmlhttp'),
		t.i && t.l && Lo(e, t.i, t.l),
		t.D && t.a.setTimeout(t.D);
	var n = t.a;
	(t = t.ga), (n.H = 1), (n.i = Gi(Vi(e))), (n.j = null), (n.I = !0), Ii(n, t);
}
function $o(t) {
	null != t.m && (hn.clearTimeout(t.m), (t.m = null));
}
function Ho(t, e) {
	var n = null;
	if (t.a == e) {
		$o(t), Go(t), (t.a = null);
		var r = 2;
	} else {
		if (!co(t.b, e)) return;
		(n = e.s), fo(t.b, e), (r = 1);
	}
	if (((t.I = e.N), 0 != t.v))
		if (e.b)
			if (1 == r) {
				(n = e.j ? e.j.length : 0), (e = En() - e.u);
				var i = t.u;
				(r = ti()).dispatchEvent(new oi(r, n, e, i)), Vo(t);
			} else qo(t);
		else if (
			3 == (i = e.h) ||
			(0 == i && 0 < t.I) ||
			!(
				(1 == r &&
					(function (t, e) {
						return !(
							ao(t.b) >= t.b.f - (t.h ? 1 : 0) ||
							(t.h
								? ((t.g = e.s.concat(t.g)), 0)
								: 1 == t.v ||
								  2 == t.v ||
								  t.u >= (t.Ia ? 0 : t.Ja) ||
								  ((t.h = si(bn(t.Ba, t, e), Ko(t, t.u))), t.u++, 0))
						);
					})(t, e)) ||
				(2 == r && Bo(t))
			)
		)
			switch ((n && 0 < n.length && ((e = t.b), (e.c = e.c.concat(n))), i)) {
				case 1:
					Wo(t, 5);
					break;
				case 4:
					Wo(t, 10);
					break;
				case 3:
					Wo(t, 6);
					break;
				default:
					Wo(t, 2);
			}
}
function Ko(t, e) {
	var n = t.Fa + Math.floor(Math.random() * t.Ma);
	return t.f || (n *= 2), n * e;
}
function Wo(t, e) {
	if ((t.c.info('Error code ' + e), 2 == e)) {
		var n = null;
		t.f && (n = null);
		var r = bn(t.Xa, t);
		n ||
			((n = new Ui('//www.google.com/images/cleardot.gif')),
			(hn.location && 'http' == hn.location.protocol) || Fi(n, 'https'),
			Gi(n)),
			(function (t, e) {
				var n = new Yr();
				if (hn.Image) {
					var r = new Image();
					(r.onload = wn(go, n, r, 'TestLoadImage: loaded', !0, e)),
						(r.onerror = wn(go, n, r, 'TestLoadImage: error', !1, e)),
						(r.onabort = wn(go, n, r, 'TestLoadImage: abort', !1, e)),
						(r.ontimeout = wn(go, n, r, 'TestLoadImage: timeout', !1, e)),
						hn.setTimeout(function () {
							r.ontimeout && r.ontimeout();
						}, 1e4),
						(r.src = t);
				} else e(!1);
			})(n.toString(), r);
	} else ii(2);
	(t.v = 0), t.f && t.f.ra(e), Qo(t), Co(t);
}
function Qo(t) {
	(t.v = 0),
		(t.I = -1),
		t.f &&
			((0 == lo(t.b).length && 0 == t.g.length) || ((t.b.c.length = 0), Sn(t.g), (t.g.length = 0)),
			t.f.qa());
}
function Xo(t, e, n) {
	var r = (function (t) {
		return t instanceof Ui ? Vi(t) : new Ui(t, void 0);
	})(n);
	if ('' != r.c) e && ji(r, e + '.' + r.c), Mi(r, r.h);
	else {
		var i = hn.location;
		r = (function (t, e, n, r) {
			var i = new Ui(null, void 0);
			return t && Fi(i, t), e && ji(i, e), n && Mi(i, n), r && (i.g = r), i;
		})(i.protocol, e ? e + '.' + i.hostname : i.hostname, +i.port, n);
	}
	return (
		t.W &&
			Cn(t.W, function (t, e) {
				Bi(r, e, t);
			}),
		(e = t.A),
		(n = t.na),
		e && n && Bi(r, e, n),
		Bi(r, 'VER', t.ha),
		jo(t, r),
		r
	);
}
function Yo(t, e) {
	if (e && !t.C) throw Error("Can't create secondary domain capable XhrIo object.");
	return ((e = new bo(t.Ka)).F = t.C), e;
}
function Jo() {}
function Zo() {
	if (Gn && !(10 <= Number(nr))) throw Error('Environmental error: no available transport.');
}
function ts(t, e) {
	xr.call(this),
		(this.a = new ko(e)),
		(this.l = t),
		(this.b = (e && e.messageUrlParams) || null),
		(t = (e && e.messageHeaders) || null),
		e &&
			e.clientProtocolHeaderRequired &&
			(t ? (t['X-Client-Protocol'] = 'webchannel') : (t = { 'X-Client-Protocol': 'webchannel' })),
		(this.a.l = t),
		(t = (e && e.initMessageHeaders) || null),
		e &&
			e.messageContentType &&
			(t
				? (t['X-WebChannel-Content-Type'] = e.messageContentType)
				: (t = { 'X-WebChannel-Content-Type': e.messageContentType })),
		e &&
			e.a &&
			(t ? (t['X-WebChannel-Client-Profile'] = e.a) : (t = { 'X-WebChannel-Client-Profile': e.a })),
		(this.a.O = t),
		(t = e && e.httpHeadersOverwriteParam) && !Dn(t) && (this.a.i = t),
		(this.h = (e && e.supportsCrossDomainXhr) || !1),
		(this.g = (e && e.sendRawJson) || !1),
		(e = e && e.httpSessionIdParam) &&
			!Dn(e) &&
			((this.a.A = e), null !== (t = this.b) && e in t && e in (t = this.b) && delete t[e]),
		(this.f = new rs(this));
}
function es(t) {
	di.call(this);
	var e = t.__sm__;
	if (e) {
		t: {
			for (var n in e) {
				t = n;
				break t;
			}
			t = void 0;
		}
		(this.c = t)
			? ((t = this.c), (this.data = null !== e && t in e ? e[t] : void 0))
			: (this.data = e);
	} else this.data = t;
}
function ns() {
	vi.call(this), (this.status = 1);
}
function rs(t) {
	this.a = t;
}
((un = bo.prototype).ba = function (t, e, n, r) {
	if (this.a)
		throw Error(
			'[goog.net.XhrIo] Object is active with another request=' + this.B + '; newUri=' + t
		);
	(e = e ? e.toUpperCase() : 'GET'),
		(this.B = t),
		(this.f = ''),
		(this.h = 0),
		(this.u = !1),
		(this.b = !0),
		(this.a = new XMLHttpRequest()),
		(this.s = this.H ? hi(this.H) : hi(li)),
		(this.a.onreadystatechange = bn(this.za, this));
	try {
		(this.A = !0), this.a.open(e, String(t), !0), (this.A = !1);
	} catch (o) {
		return void To(this, o);
	}
	t = n || '';
	var i = new ki(this.headers);
	r &&
		Oi(r, function (t, e) {
			i.set(e, t);
		}),
		(r = (function (t) {
			t: {
				for (
					var e = _o, n = t.length, r = 'string' == typeof t ? t.split('') : t, i = 0;
					i < n;
					i++
				)
					if (i in r && e.call(void 0, r[i], i, t)) {
						e = i;
						break t;
					}
				e = -1;
			}
			return 0 > e ? null : 'string' == typeof t ? t.charAt(e) : t[e];
		})(i.L())),
		(n = hn.FormData && t instanceof hn.FormData),
		!(0 <= Tn(Io, e)) ||
			r ||
			n ||
			i.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8'),
		i.forEach(function (t, e) {
			this.a.setRequestHeader(e, t);
		}, this),
		this.I && (this.a.responseType = this.I),
		'withCredentials' in this.a &&
			this.a.withCredentials !== this.F &&
			(this.a.withCredentials = this.F);
	try {
		Do(this),
			0 < this.o &&
				((this.D = (function (t) {
					return Gn && tr(9) && 'number' == typeof t.timeout && void 0 !== t.ontimeout;
				})(this.a))
					? ((this.a.timeout = this.o), (this.a.ontimeout = bn(this.xa, this)))
					: (this.m = zr(this.xa, this.o, this))),
			(this.l = !0),
			this.a.send(t),
			(this.l = !1);
	} catch (o) {
		To(this, o);
	}
}),
	(un.xa = function () {
		void 0 !== cn &&
			this.a &&
			((this.f = 'Timed out after ' + this.o + 'ms, aborting'),
			(this.h = 8),
			this.dispatchEvent('timeout'),
			this.abort(8));
	}),
	(un.abort = function (t) {
		this.a &&
			this.b &&
			((this.b = !1),
			(this.g = !0),
			this.a.abort(),
			(this.g = !1),
			(this.h = t || 7),
			this.dispatchEvent('complete'),
			this.dispatchEvent('abort'),
			So(this));
	}),
	(un.G = function () {
		this.a &&
			(this.b && ((this.b = !1), (this.g = !0), this.a.abort(), (this.g = !1)), So(this, !0)),
			bo.S.G.call(this);
	}),
	(un.za = function () {
		this.j || (this.A || this.l || this.g ? No(this) : this.Ta());
	}),
	(un.Ta = function () {
		No(this);
	}),
	(un.X = function () {
		try {
			return 2 < xo(this) ? this.a.status : -1;
		} catch (qn) {
			return -1;
		}
	}),
	(un.$ = function () {
		try {
			return this.a ? this.a.responseText : '';
		} catch (qn) {
			return '';
		}
	}),
	(un.Na = function (t) {
		if (this.a) {
			var e = this.a.responseText;
			return t && 0 == e.indexOf(t) && (e = e.substring(t.length)), mo(e);
		}
	}),
	(un.ua = function () {
		return this.h;
	}),
	(un.Qa = function () {
		return 'string' == typeof this.f ? this.f : String(this.f);
	}),
	((un = ko.prototype).ha = 8),
	(un.v = 1),
	(un.Ba = function (t) {
		if (this.h)
			if (((this.h = null), 1 == this.v)) {
				if (!t) {
					(this.R = Math.floor(1e5 * Math.random())), (t = this.R++);
					var e,
						n = new gi(this, this.c, t, void 0),
						r = this.l;
					if (
						(this.O && (r ? Fn((r = Un(r)), this.O) : (r = this.O)),
						null === this.i && (n.B = r),
						this.da)
					)
						t: {
							for (var i = (e = 0); i < this.g.length; i++) {
								var o = this.g[i];
								if (
									void 0 ===
									(o =
										'__data__' in o.a && 'string' == typeof (o = o.a.__data__) ? o.length : void 0)
								)
									break;
								if (4096 < (e += o)) {
									e = i;
									break t;
								}
								if (4096 === e || i === this.g.length - 1) {
									e = i + 1;
									break t;
								}
							}
							e = 1e3;
						}
					else e = 1e3;
					(e = Mo(this, n, e)),
						Bi((i = Vi(this.B)), 'RID', t),
						Bi(i, 'CVER', 22),
						this.A && Bi(i, 'X-HTTP-Session-Id', this.A),
						jo(this, i),
						this.i && r && Lo(i, this.i, r),
						ho(this.b, n),
						this.Ga && Bi(i, 'TYPE', 'init'),
						this.da
							? (Bi(i, '$req', e), Bi(i, 'SID', 'null'), (n.V = !0), Ei(n, i, null))
							: Ei(n, i, e),
						(this.v = 2);
				}
			} else 3 == this.v && (t ? Fo(this, t) : 0 == this.g.length || uo(this.b) || Fo(this));
	}),
	(un.Aa = function () {
		if (((this.j = null), zo(this), this.V && !(this.F || null == this.a || 0 >= this.N))) {
			var t = 2 * this.N;
			this.c.info('BP detection timer enabled: ' + t), (this.s = si(bn(this.Sa, this), t));
		}
	}),
	(un.Sa = function () {
		this.s &&
			((this.s = null),
			this.c.info('BP detection timeout reached.'),
			this.c.info('Buffering proxy detected and switch to long-polling!'),
			(this.H = !1),
			(this.F = !0),
			Po(this),
			zo(this));
	}),
	(un.Ra = function () {
		null != this.m && ((this.m = null), Po(this), Bo(this), ii(19));
	}),
	(un.Xa = function (t) {
		t
			? (this.c.info('Successfully pinged google.com'), ii(2))
			: (this.c.info('Failed to ping google.com'), ii(1));
	}),
	((un = Jo.prototype).ta = function () {}),
	(un.sa = function () {}),
	(un.ra = function () {}),
	(un.qa = function () {}),
	(un.Ha = function () {}),
	(Zo.prototype.a = function (t, e) {
		return new ts(t, e);
	}),
	In(ts, xr),
	((un = ts.prototype).addEventListener = function (t, e, n, r) {
		ts.S.addEventListener.call(this, t, e, n, r);
	}),
	(un.removeEventListener = function (t, e, n, r) {
		ts.S.removeEventListener.call(this, t, e, n, r);
	}),
	(un.Oa = function () {
		(this.a.f = this.f), this.h && (this.a.C = !0);
		var t = this.a,
			e = this.l,
			n = this.b || void 0;
		ii(0), (t.fa = e), (t.W = n || {}), (t.H = t.T), (t.B = Xo(t, null, t.fa)), Vo(t);
	}),
	(un.close = function () {
		Ro(this.a);
	}),
	(un.Pa = function (t) {
		if ('string' == typeof t) {
			var e = {};
			(e.__data__ = t), Uo(this.a, e);
		} else this.g ? (((e = {}).__data__ = Or(t)), Uo(this.a, e)) : Uo(this.a, t);
	}),
	(un.G = function () {
		(this.a.f = null), delete this.f, Ro(this.a), delete this.a, ts.S.G.call(this);
	}),
	In(es, di),
	In(ns, vi),
	In(rs, Jo),
	(rs.prototype.ta = function () {
		this.a.dispatchEvent('a');
	}),
	(rs.prototype.sa = function (t) {
		this.a.dispatchEvent(new es(t));
	}),
	(rs.prototype.ra = function (t) {
		this.a.dispatchEvent(new ns(t));
	}),
	(rs.prototype.qa = function () {
		this.a.dispatchEvent('b');
	}),
	(Zo.prototype.createWebChannel = Zo.prototype.a),
	(ts.prototype.send = ts.prototype.Pa),
	(ts.prototype.open = ts.prototype.Oa),
	(ts.prototype.close = ts.prototype.close),
	(ui.NO_ERROR = 0),
	(ui.TIMEOUT = 8),
	(ui.HTTP_ERROR = 6),
	(ai.COMPLETE = 'complete'),
	(fi.EventType = pi),
	(pi.OPEN = 'a'),
	(pi.CLOSE = 'b'),
	(pi.ERROR = 'c'),
	(pi.MESSAGE = 'd'),
	(xr.prototype.listen = xr.prototype.va),
	(bo.prototype.listenOnce = bo.prototype.wa),
	(bo.prototype.getLastError = bo.prototype.Qa),
	(bo.prototype.getLastErrorCode = bo.prototype.ua),
	(bo.prototype.getStatus = bo.prototype.X),
	(bo.prototype.getResponseJson = bo.prototype.Na),
	(bo.prototype.getResponseText = bo.prototype.$),
	(bo.prototype.send = bo.prototype.ba);
var is = ui,
	os = ai,
	ss = fi,
	us = bo,
	as = {
		OK: 'ok',
		CANCELLED: 'cancelled',
		UNKNOWN: 'unknown',
		INVALID_ARGUMENT: 'invalid-argument',
		DEADLINE_EXCEEDED: 'deadline-exceeded',
		NOT_FOUND: 'not-found',
		ALREADY_EXISTS: 'already-exists',
		PERMISSION_DENIED: 'permission-denied',
		UNAUTHENTICATED: 'unauthenticated',
		RESOURCE_EXHAUSTED: 'resource-exhausted',
		FAILED_PRECONDITION: 'failed-precondition',
		ABORTED: 'aborted',
		OUT_OF_RANGE: 'out-of-range',
		UNIMPLEMENTED: 'unimplemented',
		INTERNAL: 'internal',
		UNAVAILABLE: 'unavailable',
		DATA_LOSS: 'data-loss'
	},
	cs = (function (t) {
		function e(e, n) {
			var r = this;
			return (
				((r = t.call(this, n) || this).code = e),
				(r.message = n),
				(r.name = 'FirebaseError'),
				(r.toString = function () {
					return r.name + ': [code=' + r.code + ']: ' + r.message;
				}),
				r
			);
		}
		return se(e, t), e;
	})(Error),
	hs = new je('@firebase/firestore');
function fs() {
	return hs.logLevel;
}
function ls(t) {
	for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
	if (hs.logLevel <= Oe.DEBUG) {
		var r = e.map(vs);
		hs.debug.apply(hs, pe(['Firestore (7.24.0): ' + t], r));
	}
}
function ps(t) {
	for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
	if (hs.logLevel <= Oe.ERROR) {
		var r = e.map(vs);
		hs.error.apply(hs, pe(['Firestore (7.24.0): ' + t], r));
	}
}
function ds(t) {
	for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
	if (hs.logLevel <= Oe.WARN) {
		var r = e.map(vs);
		hs.warn.apply(hs, pe(['Firestore (7.24.0): ' + t], r));
	}
}
function vs(t) {
	if ('string' == typeof t) return t;
	try {
		return (e = t), JSON.stringify(e);
	} catch (n) {
		return t;
	}
	/**
	 * @license
	 * Copyright 2020 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */ var e;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ys(t) {
	void 0 === t && (t = 'Unexpected state');
	var e = 'FIRESTORE (7.24.0) INTERNAL ASSERTION FAILED: ' + t;
	throw (ps(e), new Error(e));
}
function gs(t, e) {
	t || ys();
}
function ms(t, e) {
	return t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bs(t) {
	var e = 0;
	for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
	return e;
}
function ws(t, e) {
	for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}
function Es(t) {
	for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
	return !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Is = (function () {
		function t(t, e, n) {
			void 0 === e ? (e = 0) : e > t.length && ys(),
				void 0 === n ? (n = t.length - e) : n > t.length - e && ys(),
				(this.segments = t),
				(this.offset = e),
				(this.t = n);
		}
		return (
			Object.defineProperty(t.prototype, 'length', {
				get: function () {
					return this.t;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.isEqual = function (e) {
				return 0 === t.i(this, e);
			}),
			(t.prototype.child = function (e) {
				var n = this.segments.slice(this.offset, this.limit());
				return (
					e instanceof t
						? e.forEach(function (t) {
								n.push(t);
						  })
						: n.push(e),
					this.o(n)
				);
			}),
			(t.prototype.limit = function () {
				return this.offset + this.length;
			}),
			(t.prototype.u = function (t) {
				return (t = void 0 === t ? 1 : t), this.o(this.segments, this.offset + t, this.length - t);
			}),
			(t.prototype.h = function () {
				return this.o(this.segments, this.offset, this.length - 1);
			}),
			(t.prototype.l = function () {
				return this.segments[this.offset];
			}),
			(t.prototype._ = function () {
				return this.get(this.length - 1);
			}),
			(t.prototype.get = function (t) {
				return this.segments[this.offset + t];
			}),
			(t.prototype.m = function () {
				return 0 === this.length;
			}),
			(t.prototype.T = function (t) {
				if (t.length < this.length) return !1;
				for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
				return !0;
			}),
			(t.prototype.I = function (t) {
				if (this.length + 1 !== t.length) return !1;
				for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
				return !0;
			}),
			(t.prototype.forEach = function (t) {
				for (var e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
			}),
			(t.prototype.A = function () {
				return this.segments.slice(this.offset, this.limit());
			}),
			(t.i = function (t, e) {
				for (var n = Math.min(t.length, e.length), r = 0; r < n; r++) {
					var i = t.get(r),
						o = e.get(r);
					if (i < o) return -1;
					if (i > o) return 1;
				}
				return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
			}),
			t
		);
	})(),
	_s = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.prototype.o = function (t, n, r) {
				return new e(t, n, r);
			}),
			(e.prototype.R = function () {
				return this.A().join('/');
			}),
			(e.prototype.toString = function () {
				return this.R();
			}),
			(e.g = function () {
				for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
				for (var r = [], i = 0, o = t; i < o.length; i++) {
					var s = o[i];
					if (s.indexOf('//') >= 0)
						throw new cs(
							as.INVALID_ARGUMENT,
							'Invalid segment (' + s + '). Paths must not contain // in them.'
						);
					r.push.apply(
						r,
						s.split('/').filter(function (t) {
							return t.length > 0;
						})
					);
				}
				return new e(r);
			}),
			(e.P = function () {
				return new e([]);
			}),
			e
		);
	})(Is),
	Ts = /^[_a-zA-Z][_a-zA-Z0-9]*$/,
	As = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.prototype.o = function (t, n, r) {
				return new e(t, n, r);
			}),
			(e.V = function (t) {
				return Ts.test(t);
			}),
			(e.prototype.R = function () {
				return this.A()
					.map(function (t) {
						return (
							(t = t.replace('\\', '\\\\').replace('`', '\\`')), e.V(t) || (t = '`' + t + '`'), t
						);
					})
					.join('.');
			}),
			(e.prototype.toString = function () {
				return this.R();
			}),
			(e.prototype.p = function () {
				return 1 === this.length && '__name__' === this.get(0);
			}),
			(e.v = function () {
				return new e(['__name__']);
			}),
			(e.S = function (t) {
				for (
					var n = [],
						r = '',
						i = 0,
						o = function () {
							if (0 === r.length)
								throw new cs(
									as.INVALID_ARGUMENT,
									'Invalid field path (' +
										t +
										"). Paths must not be empty, begin with '.', end with '.', or contain '..'"
								);
							n.push(r), (r = '');
						},
						s = !1;
					i < t.length;

				) {
					var u = t[i];
					if ('\\' === u) {
						if (i + 1 === t.length)
							throw new cs(as.INVALID_ARGUMENT, 'Path has trailing escape character: ' + t);
						var a = t[i + 1];
						if ('\\' !== a && '.' !== a && '`' !== a)
							throw new cs(as.INVALID_ARGUMENT, 'Path has invalid escape sequence: ' + t);
						(r += a), (i += 2);
					} else '`' === u ? ((s = !s), i++) : '.' !== u || s ? ((r += u), i++) : (o(), i++);
				}
				if ((o(), s)) throw new cs(as.INVALID_ARGUMENT, 'Unterminated ` in path: ' + t);
				return new e(n);
			}),
			(e.P = function () {
				return new e([]);
			}),
			e
		);
	})(Is),
	Ns = (function () {
		function t(t) {
			this.path = t;
		}
		return (
			(t.D = function (e) {
				return new t(_s.g(e));
			}),
			(t.C = function (e) {
				return new t(_s.g(e).u(5));
			}),
			(t.prototype.N = function (t) {
				return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
			}),
			(t.prototype.isEqual = function (t) {
				return null !== t && 0 === _s.i(this.path, t.path);
			}),
			(t.prototype.toString = function () {
				return this.path.toString();
			}),
			(t.i = function (t, e) {
				return _s.i(t.path, e.path);
			}),
			(t.F = function (t) {
				return t.length % 2 == 0;
			}),
			(t.$ = function (e) {
				return new t(new _s(e.slice()));
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ss(t, e) {
	if (0 !== e.length)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Function ' +
				t +
				'() does not support arguments, but was called with ' +
				$s(e.length, 'argument') +
				'.'
		);
}
function Ds(t, e, n) {
	if (e.length !== n)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Function ' +
				t +
				'() requires ' +
				$s(n, 'argument') +
				', but was called with ' +
				$s(e.length, 'argument') +
				'.'
		);
}
function xs(t, e, n) {
	if (e.length < n)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Function ' +
				t +
				'() requires at least ' +
				$s(n, 'argument') +
				', but was called with ' +
				$s(e.length, 'argument') +
				'.'
		);
}
function Ls(t, e, n, r) {
	if (e.length < n || e.length > r)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Function ' +
				t +
				'() requires between ' +
				n +
				' and ' +
				r +
				' arguments, but was called with ' +
				$s(e.length, 'argument') +
				'.'
		);
}
function Os(t, e, n, r) {
	Vs(t, e, zs(n) + ' argument', r);
}
function ks(t, e, n, r) {
	void 0 !== r && Os(t, e, n, r);
}
function Rs(t, e, n, r) {
	Vs(t, e, n + ' option', r);
}
function Ps(t, e, n, r) {
	void 0 !== r && Rs(t, e, n, r);
}
function Cs(t, e, n, r, i) {
	void 0 !== r &&
		(function (t, e, n, r, i) {
			for (var o = [], s = 0, u = i; s < u.length; s++) {
				var a = u[s];
				if (a === r) return;
				o.push(js(a));
			}
			var c = js(r);
			throw new cs(
				as.INVALID_ARGUMENT,
				'Invalid value ' +
					c +
					' provided to function ' +
					t +
					'() for option "' +
					n +
					'". Acceptable values: ' +
					o.join(', ')
			);
		})(t, 0, n, r, i);
}
function Us(t, e, n, r) {
	if (
		!e.some(function (t) {
			return t === r;
		})
	)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Invalid value ' +
				js(r) +
				' provided to function ' +
				t +
				'() for its ' +
				zs(n) +
				' argument. Acceptable values: ' +
				e.join(', ')
		);
	return r;
}
function Vs(t, e, n, r) {
	if (
		!('object' === e
			? Fs(r)
			: 'non-empty string' === e
			? 'string' == typeof r && '' !== r
			: typeof r === e)
	) {
		var i = js(r);
		throw new cs(
			as.INVALID_ARGUMENT,
			'Function ' + t + '() requires its ' + n + ' to be of type ' + e + ', but it was: ' + i
		);
	}
}
function Fs(t) {
	return (
		'object' == typeof t &&
		null !== t &&
		(Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t))
	);
}
function js(t) {
	if (void 0 === t) return 'undefined';
	if (null === t) return 'null';
	if ('string' == typeof t)
		return t.length > 20 && (t = t.substring(0, 20) + '...'), JSON.stringify(t);
	if ('number' == typeof t || 'boolean' == typeof t) return '' + t;
	if ('object' == typeof t) {
		if (t instanceof Array) return 'an array';
		var e = (function (t) {
			if (t.constructor) {
				var e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
				if (e && e.length > 1) return e[1];
			}
			return null;
		})(t);
		return e ? 'a custom ' + e + ' object' : 'an object';
	}
	return 'function' == typeof t ? 'a function' : ys();
}
function Ms(t, e, n) {
	if (void 0 === n)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Function ' + t + '() requires a valid ' + zs(e) + ' argument, but it was undefined.'
		);
}
function qs(t, e, n) {
	ws(e, function (e, r) {
		if (n.indexOf(e) < 0)
			throw new cs(
				as.INVALID_ARGUMENT,
				"Unknown option '" +
					e +
					"' passed to function " +
					t +
					'(). Available options: ' +
					n.join(', ')
			);
	});
}
function Bs(t, e, n, r) {
	var i = js(r);
	return new cs(
		as.INVALID_ARGUMENT,
		'Function ' + t + '() requires its ' + zs(n) + ' argument to be a ' + e + ', but it was: ' + i
	);
}
function Gs(t, e, n) {
	if (n <= 0)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Function ' +
				t +
				'() requires its ' +
				zs(e) +
				' argument to be a positive number, but it was: ' +
				n +
				'.'
		);
}
function zs(t) {
	switch (t) {
		case 1:
			return 'first';
		case 2:
			return 'second';
		case 3:
			return 'third';
		default:
			return t + 'th';
	}
}
function $s(t, e) {
	return t + ' ' + e + (1 === t ? '' : 's');
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hs(t) {
	var e = 'undefined' != typeof self && (self.crypto || self.msCrypto),
		n = new Uint8Array(t);
	if (e && 'function' == typeof e.getRandomValues) e.getRandomValues(n);
	else for (var r = 0; r < t; r++) n[r] = Math.floor(256 * Math.random());
	return n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ks = (function () {
	function t() {}
	return (
		(t.k = function () {
			for (
				var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
					e = Math.floor(256 / t.length) * t.length,
					n = '';
				n.length < 20;

			)
				for (var r = Hs(40), i = 0; i < r.length; ++i)
					n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
			return n;
		}),
		t
	);
})();
function Ws(t, e) {
	return t < e ? -1 : t > e ? 1 : 0;
}
function Qs(t, e, n) {
	return (
		t.length === e.length &&
		t.every(function (t, r) {
			return n(t, e[r]);
		})
	);
}
function Xs(t) {
	return t + '\0';
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ys = (function () {
	function t(t) {
		this.M = t;
	}
	return (
		(t.fromBase64String = function (e) {
			return new t(atob(e));
		}),
		(t.fromUint8Array = function (e) {
			return new t(
				(function (t) {
					for (var e = '', n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
					return e;
				})(e)
			);
		}),
		(t.prototype.toBase64 = function () {
			return (t = this.M), btoa(t);
			var t;
		}),
		(t.prototype.toUint8Array = function () {
			return (function (t) {
				for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
				return e;
			})(this.M);
		}),
		(t.prototype.O = function () {
			return 2 * this.M.length;
		}),
		(t.prototype.L = function (t) {
			return Ws(this.M, t.M);
		}),
		(t.prototype.isEqual = function (t) {
			return this.M === t.M;
		}),
		t
	);
})();
Ys.B = new Ys('');
var Js = (function () {
	function t(t) {
		this.q = t;
	}
	return (
		(t.fromBase64String = function (e) {
			try {
				return new t(Ys.fromBase64String(e));
			} catch (n) {
				throw new cs(as.INVALID_ARGUMENT, 'Failed to construct Bytes from Base64 string: ' + n);
			}
		}),
		(t.fromUint8Array = function (e) {
			return new t(Ys.fromUint8Array(e));
		}),
		(t.prototype.toBase64 = function () {
			return this.q.toBase64();
		}),
		(t.prototype.toUint8Array = function () {
			return this.q.toUint8Array();
		}),
		(t.prototype.toString = function () {
			return 'Bytes(base64: ' + this.toBase64() + ')';
		}),
		(t.prototype.isEqual = function (t) {
			return this.q.isEqual(t.q);
		}),
		t
	);
})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Zs() {
	if ('undefined' == typeof Uint8Array)
		throw new cs(as.UNIMPLEMENTED, 'Uint8Arrays are not available in this environment.');
}
function tu() {
	if ('undefined' == typeof atob)
		throw new cs(as.UNIMPLEMENTED, 'Blobs are unavailable in Firestore in this environment.');
}
var eu = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.fromBase64String = function (t) {
				Ds('Blob.fromBase64String', arguments, 1),
					Os('Blob.fromBase64String', 'string', 1, t),
					tu();
				try {
					return new e(Ys.fromBase64String(t));
				} catch (n) {
					throw new cs(as.INVALID_ARGUMENT, 'Failed to construct Blob from Base64 string: ' + n);
				}
			}),
			(e.fromUint8Array = function (t) {
				if ((Ds('Blob.fromUint8Array', arguments, 1), Zs(), !(t instanceof Uint8Array)))
					throw Bs('Blob.fromUint8Array', 'Uint8Array', 1, t);
				return new e(Ys.fromUint8Array(t));
			}),
			(e.prototype.toBase64 = function () {
				return Ds('Blob.toBase64', arguments, 0), tu(), t.prototype.toBase64.call(this);
			}),
			(e.prototype.toUint8Array = function () {
				return Ds('Blob.toUint8Array', arguments, 0), Zs(), t.prototype.toUint8Array.call(this);
			}),
			(e.prototype.toString = function () {
				return 'Blob(base64: ' + this.toBase64() + ')';
			}),
			e
		);
	})(Js),
	nu = function (t, e, n, r, i, o) {
		(this.U = t),
			(this.persistenceKey = e),
			(this.host = n),
			(this.ssl = r),
			(this.forceLongPolling = i),
			(this.W = o);
	},
	ru = (function () {
		function t(t, e) {
			(this.projectId = t), (this.database = e || '(default)');
		}
		return (
			Object.defineProperty(t.prototype, 'j', {
				get: function () {
					return '(default)' === this.database;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.isEqual = function (e) {
				return e instanceof t && e.projectId === this.projectId && e.database === this.database;
			}),
			(t.prototype.L = function (t) {
				return Ws(this.projectId, t.projectId) || Ws(this.database, t.database);
			}),
			t
		);
	})(),
	iu = (function () {
		function t(t, e) {
			(this.K = t), (this.G = e), (this.H = {});
		}
		return (
			(t.prototype.get = function (t) {
				var e = this.K(t),
					n = this.H[e];
				if (void 0 !== n)
					for (var r = 0, i = n; r < i.length; r++) {
						var o = i[r],
							s = o[0],
							u = o[1];
						if (this.G(s, t)) return u;
					}
			}),
			(t.prototype.has = function (t) {
				return void 0 !== this.get(t);
			}),
			(t.prototype.set = function (t, e) {
				var n = this.K(t),
					r = this.H[n];
				if (void 0 !== r) {
					for (var i = 0; i < r.length; i++) if (this.G(r[i][0], t)) return void (r[i] = [t, e]);
					r.push([t, e]);
				} else this.H[n] = [[t, e]];
			}),
			(t.prototype.delete = function (t) {
				var e = this.K(t),
					n = this.H[e];
				if (void 0 === n) return !1;
				for (var r = 0; r < n.length; r++)
					if (this.G(n[r][0], t)) return 1 === n.length ? delete this.H[e] : n.splice(r, 1), !0;
				return !1;
			}),
			(t.prototype.forEach = function (t) {
				ws(this.H, function (e, n) {
					for (var r = 0, i = n; r < i.length; r++) {
						var o = i[r],
							s = o[0],
							u = o[1];
						t(s, u);
					}
				});
			}),
			(t.prototype.m = function () {
				return Es(this.H);
			}),
			t
		);
	})(),
	ou = (function () {
		function t(t, e) {
			if (((this.seconds = t), (this.nanoseconds = e), e < 0))
				throw new cs(as.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + e);
			if (e >= 1e9) throw new cs(as.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + e);
			if (t < -62135596800)
				throw new cs(as.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + t);
			if (t >= 253402300800)
				throw new cs(as.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + t);
		}
		return (
			(t.now = function () {
				return t.fromMillis(Date.now());
			}),
			(t.fromDate = function (e) {
				return t.fromMillis(e.getTime());
			}),
			(t.fromMillis = function (e) {
				var n = Math.floor(e / 1e3);
				return new t(n, 1e6 * (e - 1e3 * n));
			}),
			(t.prototype.toDate = function () {
				return new Date(this.toMillis());
			}),
			(t.prototype.toMillis = function () {
				return 1e3 * this.seconds + this.nanoseconds / 1e6;
			}),
			(t.prototype.Y = function (t) {
				return this.seconds === t.seconds
					? Ws(this.nanoseconds, t.nanoseconds)
					: Ws(this.seconds, t.seconds);
			}),
			(t.prototype.isEqual = function (t) {
				return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
			}),
			(t.prototype.toString = function () {
				return 'Timestamp(seconds=' + this.seconds + ', nanoseconds=' + this.nanoseconds + ')';
			}),
			(t.prototype.toJSON = function () {
				return { seconds: this.seconds, nanoseconds: this.nanoseconds };
			}),
			(t.prototype.valueOf = function () {
				var t = this.seconds - -62135596800;
				return String(t).padStart(12, '0') + '.' + String(this.nanoseconds).padStart(9, '0');
			}),
			t
		);
	})(),
	su = (function () {
		function t(t) {
			this.timestamp = t;
		}
		return (
			(t.J = function (e) {
				return new t(e);
			}),
			(t.min = function () {
				return new t(new ou(0, 0));
			}),
			(t.prototype.L = function (t) {
				return this.timestamp.Y(t.timestamp);
			}),
			(t.prototype.isEqual = function (t) {
				return this.timestamp.isEqual(t.timestamp);
			}),
			(t.prototype.X = function () {
				return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
			}),
			(t.prototype.toString = function () {
				return 'SnapshotVersion(' + this.timestamp.toString() + ')';
			}),
			(t.prototype.Z = function () {
				return this.timestamp;
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function uu(t) {
	return null == t;
}
function au(t) {
	return 0 === t && 1 / t == -1 / 0;
}
function cu(t) {
	return (
		'number' == typeof t &&
		Number.isInteger(t) &&
		!au(t) &&
		t <= Number.MAX_SAFE_INTEGER &&
		t >= Number.MIN_SAFE_INTEGER
	);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var hu = function (t, e, n, r, i, o, s) {
	void 0 === e && (e = null),
		void 0 === n && (n = []),
		void 0 === r && (r = []),
		void 0 === i && (i = null),
		void 0 === o && (o = null),
		void 0 === s && (s = null),
		(this.path = t),
		(this.collectionGroup = e),
		(this.orderBy = n),
		(this.filters = r),
		(this.limit = i),
		(this.startAt = o),
		(this.endAt = s),
		(this.tt = null);
};
function fu(t, e, n, r, i, o, s) {
	return (
		void 0 === e && (e = null),
		void 0 === n && (n = []),
		void 0 === r && (r = []),
		void 0 === i && (i = null),
		void 0 === o && (o = null),
		void 0 === s && (s = null),
		new hu(t, e, n, r, i, o, s)
	);
}
function lu(t) {
	var e = ms(t);
	if (null === e.tt) {
		var n = e.path.R();
		null !== e.collectionGroup && (n += '|cg:' + e.collectionGroup),
			(n += '|f:'),
			(n += e.filters
				.map(function (t) {
					return (e = t).field.R() + e.op.toString() + ra(e.value);
					var e;
				})
				.join(',')),
			(n += '|ob:'),
			(n += e.orderBy
				.map(function (t) {
					return (e = t).field.R() + e.dir;
					var e;
				})
				.join(',')),
			uu(e.limit) || ((n += '|l:'), (n += e.limit)),
			e.startAt && ((n += '|lb:'), (n += uh(e.startAt))),
			e.endAt && ((n += '|ub:'), (n += uh(e.endAt))),
			(e.tt = n);
	}
	return e.tt;
}
function pu(t, e) {
	if (t.limit !== e.limit) return !1;
	if (t.orderBy.length !== e.orderBy.length) return !1;
	for (var n = 0; n < t.orderBy.length; n++) if (!lh(t.orderBy[n], e.orderBy[n])) return !1;
	if (t.filters.length !== e.filters.length) return !1;
	for (var r = 0; r < t.filters.length; r++)
		if (
			((i = t.filters[r]),
			(o = e.filters[r]),
			i.op !== o.op || !i.field.isEqual(o.field) || !Zu(i.value, o.value))
		)
			return !1;
	var i, o;
	return (
		t.collectionGroup === e.collectionGroup &&
		!!t.path.isEqual(e.path) &&
		!!ch(t.startAt, e.startAt) &&
		ch(t.endAt, e.endAt)
	);
}
function du(t) {
	return Ns.F(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var vu,
	yu,
	gu = (function () {
		function t(t, e, n, r, i, o, s) {
			void 0 === i && (i = su.min()),
				void 0 === o && (o = su.min()),
				void 0 === s && (s = Ys.B),
				(this.target = t),
				(this.targetId = e),
				(this.et = n),
				(this.sequenceNumber = r),
				(this.nt = i),
				(this.lastLimboFreeSnapshotVersion = o),
				(this.resumeToken = s);
		}
		return (
			(t.prototype.st = function (e) {
				return new t(
					this.target,
					this.targetId,
					this.et,
					e,
					this.nt,
					this.lastLimboFreeSnapshotVersion,
					this.resumeToken
				);
			}),
			(t.prototype.it = function (e, n) {
				return new t(
					this.target,
					this.targetId,
					this.et,
					this.sequenceNumber,
					n,
					this.lastLimboFreeSnapshotVersion,
					e
				);
			}),
			(t.prototype.rt = function (e) {
				return new t(
					this.target,
					this.targetId,
					this.et,
					this.sequenceNumber,
					this.nt,
					e,
					this.resumeToken
				);
			}),
			t
		);
	})(),
	mu = function (t) {
		this.count = t;
	};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bu(t) {
	switch (t) {
		case as.OK:
			return ys();
		case as.CANCELLED:
		case as.UNKNOWN:
		case as.DEADLINE_EXCEEDED:
		case as.RESOURCE_EXHAUSTED:
		case as.INTERNAL:
		case as.UNAVAILABLE:
		case as.UNAUTHENTICATED:
			return !1;
		case as.INVALID_ARGUMENT:
		case as.NOT_FOUND:
		case as.ALREADY_EXISTS:
		case as.PERMISSION_DENIED:
		case as.FAILED_PRECONDITION:
		case as.ABORTED:
		case as.OUT_OF_RANGE:
		case as.UNIMPLEMENTED:
		case as.DATA_LOSS:
			return !0;
		default:
			return ys();
	}
}
function wu(t) {
	if (void 0 === t) return ps('GRPC error has no .code'), as.UNKNOWN;
	switch (t) {
		case vu.OK:
			return as.OK;
		case vu.CANCELLED:
			return as.CANCELLED;
		case vu.UNKNOWN:
			return as.UNKNOWN;
		case vu.DEADLINE_EXCEEDED:
			return as.DEADLINE_EXCEEDED;
		case vu.RESOURCE_EXHAUSTED:
			return as.RESOURCE_EXHAUSTED;
		case vu.INTERNAL:
			return as.INTERNAL;
		case vu.UNAVAILABLE:
			return as.UNAVAILABLE;
		case vu.UNAUTHENTICATED:
			return as.UNAUTHENTICATED;
		case vu.INVALID_ARGUMENT:
			return as.INVALID_ARGUMENT;
		case vu.NOT_FOUND:
			return as.NOT_FOUND;
		case vu.ALREADY_EXISTS:
			return as.ALREADY_EXISTS;
		case vu.PERMISSION_DENIED:
			return as.PERMISSION_DENIED;
		case vu.FAILED_PRECONDITION:
			return as.FAILED_PRECONDITION;
		case vu.ABORTED:
			return as.ABORTED;
		case vu.OUT_OF_RANGE:
			return as.OUT_OF_RANGE;
		case vu.UNIMPLEMENTED:
			return as.UNIMPLEMENTED;
		case vu.DATA_LOSS:
			return as.DATA_LOSS;
		default:
			return ys();
	}
}
((yu = vu || (vu = {}))[(yu.OK = 0)] = 'OK'),
	(yu[(yu.CANCELLED = 1)] = 'CANCELLED'),
	(yu[(yu.UNKNOWN = 2)] = 'UNKNOWN'),
	(yu[(yu.INVALID_ARGUMENT = 3)] = 'INVALID_ARGUMENT'),
	(yu[(yu.DEADLINE_EXCEEDED = 4)] = 'DEADLINE_EXCEEDED'),
	(yu[(yu.NOT_FOUND = 5)] = 'NOT_FOUND'),
	(yu[(yu.ALREADY_EXISTS = 6)] = 'ALREADY_EXISTS'),
	(yu[(yu.PERMISSION_DENIED = 7)] = 'PERMISSION_DENIED'),
	(yu[(yu.UNAUTHENTICATED = 16)] = 'UNAUTHENTICATED'),
	(yu[(yu.RESOURCE_EXHAUSTED = 8)] = 'RESOURCE_EXHAUSTED'),
	(yu[(yu.FAILED_PRECONDITION = 9)] = 'FAILED_PRECONDITION'),
	(yu[(yu.ABORTED = 10)] = 'ABORTED'),
	(yu[(yu.OUT_OF_RANGE = 11)] = 'OUT_OF_RANGE'),
	(yu[(yu.UNIMPLEMENTED = 12)] = 'UNIMPLEMENTED'),
	(yu[(yu.INTERNAL = 13)] = 'INTERNAL'),
	(yu[(yu.UNAVAILABLE = 14)] = 'UNAVAILABLE'),
	(yu[(yu.DATA_LOSS = 15)] = 'DATA_LOSS');
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Eu = (function () {
		function t(t, e) {
			(this.i = t), (this.root = e || _u.EMPTY);
		}
		return (
			(t.prototype.ot = function (e, n) {
				return new t(this.i, this.root.ot(e, n, this.i).copy(null, null, _u.at, null, null));
			}),
			(t.prototype.remove = function (e) {
				return new t(this.i, this.root.remove(e, this.i).copy(null, null, _u.at, null, null));
			}),
			(t.prototype.get = function (t) {
				for (var e = this.root; !e.m(); ) {
					var n = this.i(t, e.key);
					if (0 === n) return e.value;
					n < 0 ? (e = e.left) : n > 0 && (e = e.right);
				}
				return null;
			}),
			(t.prototype.indexOf = function (t) {
				for (var e = 0, n = this.root; !n.m(); ) {
					var r = this.i(t, n.key);
					if (0 === r) return e + n.left.size;
					r < 0 ? (n = n.left) : ((e += n.left.size + 1), (n = n.right));
				}
				return -1;
			}),
			(t.prototype.m = function () {
				return this.root.m();
			}),
			Object.defineProperty(t.prototype, 'size', {
				get: function () {
					return this.root.size;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.ct = function () {
				return this.root.ct();
			}),
			(t.prototype.ut = function () {
				return this.root.ut();
			}),
			(t.prototype.ht = function (t) {
				return this.root.ht(t);
			}),
			(t.prototype.forEach = function (t) {
				this.ht(function (e, n) {
					return t(e, n), !1;
				});
			}),
			(t.prototype.toString = function () {
				var t = [];
				return (
					this.ht(function (e, n) {
						return t.push(e + ':' + n), !1;
					}),
					'{' + t.join(', ') + '}'
				);
			}),
			(t.prototype.lt = function (t) {
				return this.root.lt(t);
			}),
			(t.prototype._t = function () {
				return new Iu(this.root, null, this.i, !1);
			}),
			(t.prototype.ft = function (t) {
				return new Iu(this.root, t, this.i, !1);
			}),
			(t.prototype.dt = function () {
				return new Iu(this.root, null, this.i, !0);
			}),
			(t.prototype.wt = function (t) {
				return new Iu(this.root, t, this.i, !0);
			}),
			t
		);
	})(),
	Iu = (function () {
		function t(t, e, n, r) {
			(this.Tt = r), (this.Et = []);
			for (var i = 1; !t.m(); )
				if (((i = e ? n(t.key, e) : 1), r && (i *= -1), i < 0)) t = this.Tt ? t.left : t.right;
				else {
					if (0 === i) {
						this.Et.push(t);
						break;
					}
					this.Et.push(t), (t = this.Tt ? t.right : t.left);
				}
		}
		return (
			(t.prototype.It = function () {
				var t = this.Et.pop(),
					e = { key: t.key, value: t.value };
				if (this.Tt) for (t = t.left; !t.m(); ) this.Et.push(t), (t = t.right);
				else for (t = t.right; !t.m(); ) this.Et.push(t), (t = t.left);
				return e;
			}),
			(t.prototype.At = function () {
				return this.Et.length > 0;
			}),
			(t.prototype.Rt = function () {
				if (0 === this.Et.length) return null;
				var t = this.Et[this.Et.length - 1];
				return { key: t.key, value: t.value };
			}),
			t
		);
	})(),
	_u = (function () {
		function t(e, n, r, i, o) {
			(this.key = e),
				(this.value = n),
				(this.color = null != r ? r : t.RED),
				(this.left = null != i ? i : t.EMPTY),
				(this.right = null != o ? o : t.EMPTY),
				(this.size = this.left.size + 1 + this.right.size);
		}
		return (
			(t.prototype.copy = function (e, n, r, i, o) {
				return new t(
					null != e ? e : this.key,
					null != n ? n : this.value,
					null != r ? r : this.color,
					null != i ? i : this.left,
					null != o ? o : this.right
				);
			}),
			(t.prototype.m = function () {
				return !1;
			}),
			(t.prototype.ht = function (t) {
				return this.left.ht(t) || t(this.key, this.value) || this.right.ht(t);
			}),
			(t.prototype.lt = function (t) {
				return this.right.lt(t) || t(this.key, this.value) || this.left.lt(t);
			}),
			(t.prototype.min = function () {
				return this.left.m() ? this : this.left.min();
			}),
			(t.prototype.ct = function () {
				return this.min().key;
			}),
			(t.prototype.ut = function () {
				return this.right.m() ? this.key : this.right.ut();
			}),
			(t.prototype.ot = function (t, e, n) {
				var r = this,
					i = n(t, r.key);
				return (r =
					i < 0
						? r.copy(null, null, null, r.left.ot(t, e, n), null)
						: 0 === i
						? r.copy(null, e, null, null, null)
						: r.copy(null, null, null, null, r.right.ot(t, e, n))).gt();
			}),
			(t.prototype.Pt = function () {
				if (this.left.m()) return t.EMPTY;
				var e = this;
				return (
					e.left.yt() || e.left.left.yt() || (e = e.Vt()),
					(e = e.copy(null, null, null, e.left.Pt(), null)).gt()
				);
			}),
			(t.prototype.remove = function (e, n) {
				var r,
					i = this;
				if (n(e, i.key) < 0)
					i.left.m() || i.left.yt() || i.left.left.yt() || (i = i.Vt()),
						(i = i.copy(null, null, null, i.left.remove(e, n), null));
				else {
					if (
						(i.left.yt() && (i = i.bt()),
						i.right.m() || i.right.yt() || i.right.left.yt() || (i = i.vt()),
						0 === n(e, i.key))
					) {
						if (i.right.m()) return t.EMPTY;
						(r = i.right.min()), (i = i.copy(r.key, r.value, null, null, i.right.Pt()));
					}
					i = i.copy(null, null, null, null, i.right.remove(e, n));
				}
				return i.gt();
			}),
			(t.prototype.yt = function () {
				return this.color;
			}),
			(t.prototype.gt = function () {
				var t = this;
				return (
					t.right.yt() && !t.left.yt() && (t = t.St()),
					t.left.yt() && t.left.left.yt() && (t = t.bt()),
					t.left.yt() && t.right.yt() && (t = t.Dt()),
					t
				);
			}),
			(t.prototype.Vt = function () {
				var t = this.Dt();
				return (
					t.right.left.yt() &&
						(t = (t = (t = t.copy(null, null, null, null, t.right.bt())).St()).Dt()),
					t
				);
			}),
			(t.prototype.vt = function () {
				var t = this.Dt();
				return t.left.left.yt() && (t = (t = t.bt()).Dt()), t;
			}),
			(t.prototype.St = function () {
				var e = this.copy(null, null, t.RED, null, this.right.left);
				return this.right.copy(null, null, this.color, e, null);
			}),
			(t.prototype.bt = function () {
				var e = this.copy(null, null, t.RED, this.left.right, null);
				return this.left.copy(null, null, this.color, null, e);
			}),
			(t.prototype.Dt = function () {
				var t = this.left.copy(null, null, !this.left.color, null, null),
					e = this.right.copy(null, null, !this.right.color, null, null);
				return this.copy(null, null, !this.color, t, e);
			}),
			(t.prototype.Ct = function () {
				var t = this.Nt();
				return Math.pow(2, t) <= this.size + 1;
			}),
			(t.prototype.Nt = function () {
				if (this.yt() && this.left.yt()) throw ys();
				if (this.right.yt()) throw ys();
				var t = this.left.Nt();
				if (t !== this.right.Nt()) throw ys();
				return t + (this.yt() ? 0 : 1);
			}),
			t
		);
	})();
(_u.EMPTY = null),
	(_u.RED = !0),
	(_u.at = !1),
	(_u.EMPTY = new ((function () {
		function t() {
			this.size = 0;
		}
		return (
			Object.defineProperty(t.prototype, 'key', {
				get: function () {
					throw ys();
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'value', {
				get: function () {
					throw ys();
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'color', {
				get: function () {
					throw ys();
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'left', {
				get: function () {
					throw ys();
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'right', {
				get: function () {
					throw ys();
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.copy = function (t, e, n, r, i) {
				return this;
			}),
			(t.prototype.ot = function (t, e, n) {
				return new _u(t, e);
			}),
			(t.prototype.remove = function (t, e) {
				return this;
			}),
			(t.prototype.m = function () {
				return !0;
			}),
			(t.prototype.ht = function (t) {
				return !1;
			}),
			(t.prototype.lt = function (t) {
				return !1;
			}),
			(t.prototype.ct = function () {
				return null;
			}),
			(t.prototype.ut = function () {
				return null;
			}),
			(t.prototype.yt = function () {
				return !1;
			}),
			(t.prototype.Ct = function () {
				return !0;
			}),
			(t.prototype.Nt = function () {
				return 0;
			}),
			t
		);
	})())());
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Tu = (function () {
		function t(t) {
			(this.i = t), (this.data = new Eu(this.i));
		}
		return (
			(t.prototype.has = function (t) {
				return null !== this.data.get(t);
			}),
			(t.prototype.first = function () {
				return this.data.ct();
			}),
			(t.prototype.last = function () {
				return this.data.ut();
			}),
			Object.defineProperty(t.prototype, 'size', {
				get: function () {
					return this.data.size;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.indexOf = function (t) {
				return this.data.indexOf(t);
			}),
			(t.prototype.forEach = function (t) {
				this.data.ht(function (e, n) {
					return t(e), !1;
				});
			}),
			(t.prototype.Ft = function (t, e) {
				for (var n = this.data.ft(t[0]); n.At(); ) {
					var r = n.It();
					if (this.i(r.key, t[1]) >= 0) return;
					e(r.key);
				}
			}),
			(t.prototype.xt = function (t, e) {
				var n;
				for (n = void 0 !== e ? this.data.ft(e) : this.data._t(); n.At(); )
					if (!t(n.It().key)) return;
			}),
			(t.prototype.$t = function (t) {
				var e = this.data.ft(t);
				return e.At() ? e.It().key : null;
			}),
			(t.prototype._t = function () {
				return new Au(this.data._t());
			}),
			(t.prototype.ft = function (t) {
				return new Au(this.data.ft(t));
			}),
			(t.prototype.add = function (t) {
				return this.copy(this.data.remove(t).ot(t, !0));
			}),
			(t.prototype.delete = function (t) {
				return this.has(t) ? this.copy(this.data.remove(t)) : this;
			}),
			(t.prototype.m = function () {
				return this.data.m();
			}),
			(t.prototype.kt = function (t) {
				var e = this;
				return (
					e.size < t.size && ((e = t), (t = this)),
					t.forEach(function (t) {
						e = e.add(t);
					}),
					e
				);
			}),
			(t.prototype.isEqual = function (e) {
				if (!(e instanceof t)) return !1;
				if (this.size !== e.size) return !1;
				for (var n = this.data._t(), r = e.data._t(); n.At(); ) {
					var i = n.It().key,
						o = r.It().key;
					if (0 !== this.i(i, o)) return !1;
				}
				return !0;
			}),
			(t.prototype.A = function () {
				var t = [];
				return (
					this.forEach(function (e) {
						t.push(e);
					}),
					t
				);
			}),
			(t.prototype.toString = function () {
				var t = [];
				return (
					this.forEach(function (e) {
						return t.push(e);
					}),
					'SortedSet(' + t.toString() + ')'
				);
			}),
			(t.prototype.copy = function (e) {
				var n = new t(this.i);
				return (n.data = e), n;
			}),
			t
		);
	})(),
	Au = (function () {
		function t(t) {
			this.Mt = t;
		}
		return (
			(t.prototype.It = function () {
				return this.Mt.It().key;
			}),
			(t.prototype.At = function () {
				return this.Mt.At();
			}),
			t
		);
	})(),
	Nu = new Eu(Ns.i);
function Su() {
	return Nu;
}
function Du() {
	return Su();
}
var xu = new Eu(Ns.i);
function Lu() {
	return xu;
}
var Ou = new Eu(Ns.i),
	ku = new Tu(Ns.i);
function Ru() {
	for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
	for (var n = ku, r = 0, i = t; r < i.length; r++) {
		var o = i[r];
		n = n.add(o);
	}
	return n;
}
var Pu = new Tu(Ws);
function Cu() {
	return Pu;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Uu = (function () {
		function t(t) {
			(this.i = t
				? function (e, n) {
						return t(e, n) || Ns.i(e.key, n.key);
				  }
				: function (t, e) {
						return Ns.i(t.key, e.key);
				  }),
				(this.Ot = Lu()),
				(this.Lt = new Eu(this.i));
		}
		return (
			(t.Bt = function (e) {
				return new t(e.i);
			}),
			(t.prototype.has = function (t) {
				return null != this.Ot.get(t);
			}),
			(t.prototype.get = function (t) {
				return this.Ot.get(t);
			}),
			(t.prototype.first = function () {
				return this.Lt.ct();
			}),
			(t.prototype.last = function () {
				return this.Lt.ut();
			}),
			(t.prototype.m = function () {
				return this.Lt.m();
			}),
			(t.prototype.indexOf = function (t) {
				var e = this.Ot.get(t);
				return e ? this.Lt.indexOf(e) : -1;
			}),
			Object.defineProperty(t.prototype, 'size', {
				get: function () {
					return this.Lt.size;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.forEach = function (t) {
				this.Lt.ht(function (e, n) {
					return t(e), !1;
				});
			}),
			(t.prototype.add = function (t) {
				var e = this.delete(t.key);
				return e.copy(e.Ot.ot(t.key, t), e.Lt.ot(t, null));
			}),
			(t.prototype.delete = function (t) {
				var e = this.get(t);
				return e ? this.copy(this.Ot.remove(t), this.Lt.remove(e)) : this;
			}),
			(t.prototype.isEqual = function (e) {
				if (!(e instanceof t)) return !1;
				if (this.size !== e.size) return !1;
				for (var n = this.Lt._t(), r = e.Lt._t(); n.At(); ) {
					var i = n.It().key,
						o = r.It().key;
					if (!i.isEqual(o)) return !1;
				}
				return !0;
			}),
			(t.prototype.toString = function () {
				var t = [];
				return (
					this.forEach(function (e) {
						t.push(e.toString());
					}),
					0 === t.length ? 'DocumentSet ()' : 'DocumentSet (\n  ' + t.join('  \n') + '\n)'
				);
			}),
			(t.prototype.copy = function (e, n) {
				var r = new t();
				return (r.i = this.i), (r.Ot = e), (r.Lt = n), r;
			}),
			t
		);
	})(),
	Vu = (function () {
		function t() {
			this.qt = new Eu(Ns.i);
		}
		return (
			(t.prototype.track = function (t) {
				var e = t.doc.key,
					n = this.qt.get(e);
				n
					? 0 !== t.type && 3 === n.type
						? (this.qt = this.qt.ot(e, t))
						: 3 === t.type && 1 !== n.type
						? (this.qt = this.qt.ot(e, { type: n.type, doc: t.doc }))
						: 2 === t.type && 2 === n.type
						? (this.qt = this.qt.ot(e, { type: 2, doc: t.doc }))
						: 2 === t.type && 0 === n.type
						? (this.qt = this.qt.ot(e, { type: 0, doc: t.doc }))
						: 1 === t.type && 0 === n.type
						? (this.qt = this.qt.remove(e))
						: 1 === t.type && 2 === n.type
						? (this.qt = this.qt.ot(e, { type: 1, doc: n.doc }))
						: 0 === t.type && 1 === n.type
						? (this.qt = this.qt.ot(e, { type: 2, doc: t.doc }))
						: ys()
					: (this.qt = this.qt.ot(e, t));
			}),
			(t.prototype.Ut = function () {
				var t = [];
				return (
					this.qt.ht(function (e, n) {
						t.push(n);
					}),
					t
				);
			}),
			t
		);
	})(),
	Fu = (function () {
		function t(t, e, n, r, i, o, s, u) {
			(this.query = t),
				(this.docs = e),
				(this.Qt = n),
				(this.docChanges = r),
				(this.Wt = i),
				(this.fromCache = o),
				(this.jt = s),
				(this.Kt = u);
		}
		return (
			(t.Gt = function (e, n, r, i) {
				var o = [];
				return (
					n.forEach(function (t) {
						o.push({ type: 0, doc: t });
					}),
					new t(e, n, Uu.Bt(n), o, r, i, !0, !1)
				);
			}),
			Object.defineProperty(t.prototype, 'hasPendingWrites', {
				get: function () {
					return !this.Wt.m();
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.isEqual = function (t) {
				if (
					!(
						this.fromCache === t.fromCache &&
						this.jt === t.jt &&
						this.Wt.isEqual(t.Wt) &&
						Hc(this.query, t.query) &&
						this.docs.isEqual(t.docs) &&
						this.Qt.isEqual(t.Qt)
					)
				)
					return !1;
				var e = this.docChanges,
					n = t.docChanges;
				if (e.length !== n.length) return !1;
				for (var r = 0; r < e.length; r++)
					if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
				return !0;
			}),
			t
		);
	})(),
	ju = (function () {
		function t(t, e, n, r, i) {
			(this.nt = t), (this.zt = e), (this.Ht = n), (this.Yt = r), (this.Jt = i);
		}
		return (
			(t.Xt = function (e, n) {
				var r = new Map();
				return r.set(e, Mu.Zt(e, n)), new t(su.min(), r, Cu(), Su(), Ru());
			}),
			t
		);
	})(),
	Mu = (function () {
		function t(t, e, n, r, i) {
			(this.resumeToken = t), (this.te = e), (this.ee = n), (this.ne = r), (this.se = i);
		}
		return (
			(t.Zt = function (e, n) {
				return new t(Ys.B, n, Ru(), Ru(), Ru());
			}),
			t
		);
	})(),
	qu = function (t, e, n, r) {
		(this.ie = t), (this.removedTargetIds = e), (this.key = n), (this.re = r);
	},
	Bu = function (t, e) {
		(this.targetId = t), (this.oe = e);
	},
	Gu = function (t, e, n, r) {
		void 0 === n && (n = Ys.B),
			void 0 === r && (r = null),
			(this.state = t),
			(this.targetIds = e),
			(this.resumeToken = n),
			(this.cause = r);
	},
	zu = (function () {
		function t() {
			(this.ae = 0), (this.ce = Ku()), (this.ue = Ys.B), (this.he = !1), (this.le = !0);
		}
		return (
			Object.defineProperty(t.prototype, 'te', {
				get: function () {
					return this.he;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'resumeToken', {
				get: function () {
					return this.ue;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, '_e', {
				get: function () {
					return 0 !== this.ae;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'fe', {
				get: function () {
					return this.le;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.de = function (t) {
				t.O() > 0 && ((this.le = !0), (this.ue = t));
			}),
			(t.prototype.we = function () {
				var t = Ru(),
					e = Ru(),
					n = Ru();
				return (
					this.ce.forEach(function (r, i) {
						switch (i) {
							case 0:
								t = t.add(r);
								break;
							case 2:
								e = e.add(r);
								break;
							case 1:
								n = n.add(r);
								break;
							default:
								ys();
						}
					}),
					new Mu(this.ue, this.he, t, e, n)
				);
			}),
			(t.prototype.me = function () {
				(this.le = !1), (this.ce = Ku());
			}),
			(t.prototype.Te = function (t, e) {
				(this.le = !0), (this.ce = this.ce.ot(t, e));
			}),
			(t.prototype.Ee = function (t) {
				(this.le = !0), (this.ce = this.ce.remove(t));
			}),
			(t.prototype.Ie = function () {
				this.ae += 1;
			}),
			(t.prototype.Ae = function () {
				this.ae -= 1;
			}),
			(t.prototype.Re = function () {
				(this.le = !0), (this.he = !0);
			}),
			t
		);
	})(),
	$u = (function () {
		function t(t) {
			(this.ge = t),
				(this.Pe = new Map()),
				(this.ye = Su()),
				(this.Ve = Hu()),
				(this.pe = new Tu(Ws));
		}
		return (
			(t.prototype.be = function (t) {
				for (var e = 0, n = t.ie; e < n.length; e++) {
					var r = n[e];
					t.re instanceof Lc ? this.ve(r, t.re) : t.re instanceof Oc && this.Se(r, t.key, t.re);
				}
				for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
					var s = o[i];
					this.Se(s, t.key, t.re);
				}
			}),
			(t.prototype.De = function (t) {
				var e = this;
				this.Ce(t, function (n) {
					var r = e.Ne(n);
					switch (t.state) {
						case 0:
							e.Fe(n) && r.de(t.resumeToken);
							break;
						case 1:
							r.Ae(), r._e || r.me(), r.de(t.resumeToken);
							break;
						case 2:
							r.Ae(), r._e || e.removeTarget(n);
							break;
						case 3:
							e.Fe(n) && (r.Re(), r.de(t.resumeToken));
							break;
						case 4:
							e.Fe(n) && (e.xe(n), r.de(t.resumeToken));
							break;
						default:
							ys();
					}
				});
			}),
			(t.prototype.Ce = function (t, e) {
				var n = this;
				t.targetIds.length > 0
					? t.targetIds.forEach(e)
					: this.Pe.forEach(function (t, r) {
							n.Fe(r) && e(r);
					  });
			}),
			(t.prototype.$e = function (t) {
				var e = t.targetId,
					n = t.oe.count,
					r = this.ke(e);
				if (r) {
					var i = r.target;
					if (du(i))
						if (0 === n) {
							var o = new Ns(i.path);
							this.Se(e, o, new Oc(o, su.min()));
						} else gs(1 === n);
					else this.Me(e) !== n && (this.xe(e), (this.pe = this.pe.add(e)));
				}
			}),
			(t.prototype.Oe = function (t) {
				var e = this,
					n = new Map();
				this.Pe.forEach(function (r, i) {
					var o = e.ke(i);
					if (o) {
						if (r.te && du(o.target)) {
							var s = new Ns(o.target.path);
							null !== e.ye.get(s) || e.Le(i, s) || e.Se(i, s, new Oc(s, t));
						}
						r.fe && (n.set(i, r.we()), r.me());
					}
				});
				var r = Ru();
				this.Ve.forEach(function (t, n) {
					var i = !0;
					n.xt(function (t) {
						var n = e.ke(t);
						return !n || 2 === n.et || ((i = !1), !1);
					}),
						i && (r = r.add(t));
				});
				var i = new ju(t, n, this.pe, this.ye, r);
				return (this.ye = Su()), (this.Ve = Hu()), (this.pe = new Tu(Ws)), i;
			}),
			(t.prototype.ve = function (t, e) {
				if (this.Fe(t)) {
					var n = this.Le(t, e.key) ? 2 : 0;
					this.Ne(t).Te(e.key, n),
						(this.ye = this.ye.ot(e.key, e)),
						(this.Ve = this.Ve.ot(e.key, this.Be(e.key).add(t)));
				}
			}),
			(t.prototype.Se = function (t, e, n) {
				if (this.Fe(t)) {
					var r = this.Ne(t);
					this.Le(t, e) ? r.Te(e, 1) : r.Ee(e),
						(this.Ve = this.Ve.ot(e, this.Be(e).delete(t))),
						n && (this.ye = this.ye.ot(e, n));
				}
			}),
			(t.prototype.removeTarget = function (t) {
				this.Pe.delete(t);
			}),
			(t.prototype.Me = function (t) {
				var e = this.Ne(t).we();
				return this.ge.qe(t).size + e.ee.size - e.se.size;
			}),
			(t.prototype.Ie = function (t) {
				this.Ne(t).Ie();
			}),
			(t.prototype.Ne = function (t) {
				var e = this.Pe.get(t);
				return e || ((e = new zu()), this.Pe.set(t, e)), e;
			}),
			(t.prototype.Be = function (t) {
				var e = this.Ve.get(t);
				return e || ((e = new Tu(Ws)), (this.Ve = this.Ve.ot(t, e))), e;
			}),
			(t.prototype.Fe = function (t) {
				var e = null !== this.ke(t);
				return e || ls('WatchChangeAggregator', 'Detected inactive target', t), e;
			}),
			(t.prototype.ke = function (t) {
				var e = this.Pe.get(t);
				return e && e._e ? null : this.ge.Ue(t);
			}),
			(t.prototype.xe = function (t) {
				var e = this;
				this.Pe.set(t, new zu()),
					this.ge.qe(t).forEach(function (n) {
						e.Se(t, n, null);
					});
			}),
			(t.prototype.Le = function (t, e) {
				return this.ge.qe(t).has(e);
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hu() {
	return new Eu(Ns.i);
}
function Ku() {
	return new Eu(Ns.i);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Wu(t) {
	var e, n;
	return (
		'server_timestamp' ===
		(null ===
			(n = (
				(null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}
			).__type__) || void 0 === n
			? void 0
			: n.stringValue)
	);
}
function Qu(t) {
	var e = t.mapValue.fields.__previous_value__;
	return Wu(e) ? Qu(e) : e;
}
function Xu(t) {
	var e = oa(t.mapValue.fields.__local_write_time__.timestampValue);
	return new ou(e.seconds, e.nanos);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Yu = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function Ju(t) {
	return 'nullValue' in t
		? 0
		: 'booleanValue' in t
		? 1
		: 'integerValue' in t || 'doubleValue' in t
		? 2
		: 'timestampValue' in t
		? 3
		: 'stringValue' in t
		? 5
		: 'bytesValue' in t
		? 6
		: 'referenceValue' in t
		? 7
		: 'geoPointValue' in t
		? 8
		: 'arrayValue' in t
		? 9
		: 'mapValue' in t
		? Wu(t)
			? 4
			: 10
		: ys();
}
function Zu(t, e) {
	var n,
		r = Ju(t);
	if (r !== Ju(e)) return !1;
	switch (r) {
		case 0:
			return !0;
		case 1:
			return t.booleanValue === e.booleanValue;
		case 4:
			return Xu(t).isEqual(Xu(e));
		case 3:
			return (function (t, e) {
				if (
					'string' == typeof t.timestampValue &&
					'string' == typeof e.timestampValue &&
					t.timestampValue.length === e.timestampValue.length
				)
					return t.timestampValue === e.timestampValue;
				var n = oa(t.timestampValue),
					r = oa(e.timestampValue);
				return n.seconds === r.seconds && n.nanos === r.nanos;
			})(t, e);
		case 5:
			return t.stringValue === e.stringValue;
		case 6:
			return (n = e), ua(t.bytesValue).isEqual(ua(n.bytesValue));
		case 7:
			return t.referenceValue === e.referenceValue;
		case 8:
			return (function (t, e) {
				return (
					sa(t.geoPointValue.latitude) === sa(e.geoPointValue.latitude) &&
					sa(t.geoPointValue.longitude) === sa(e.geoPointValue.longitude)
				);
			})(t, e);
		case 2:
			return (function (t, e) {
				if ('integerValue' in t && 'integerValue' in e)
					return sa(t.integerValue) === sa(e.integerValue);
				if ('doubleValue' in t && 'doubleValue' in e) {
					var n = sa(t.doubleValue),
						r = sa(e.doubleValue);
					return n === r ? au(n) === au(r) : isNaN(n) && isNaN(r);
				}
				return !1;
			})(t, e);
		case 9:
			return Qs(t.arrayValue.values || [], e.arrayValue.values || [], Zu);
		case 10:
			return (function (t, e) {
				var n = t.mapValue.fields || {},
					r = e.mapValue.fields || {};
				if (bs(n) !== bs(r)) return !1;
				for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !Zu(n[i], r[i]))) return !1;
				return !0;
			})(t, e);
		default:
			return ys();
	}
}
function ta(t, e) {
	return (
		void 0 !==
		(t.values || []).find(function (t) {
			return Zu(t, e);
		})
	);
}
function ea(t, e) {
	var n,
		r,
		i,
		o,
		s = Ju(t),
		u = Ju(e);
	if (s !== u) return Ws(s, u);
	switch (s) {
		case 0:
			return 0;
		case 1:
			return Ws(t.booleanValue, e.booleanValue);
		case 2:
			return (
				(r = e),
				(i = sa((n = t).integerValue || n.doubleValue)),
				(o = sa(r.integerValue || r.doubleValue)),
				i < o ? -1 : i > o ? 1 : i === o ? 0 : isNaN(i) ? (isNaN(o) ? 0 : -1) : 1
			);
		case 3:
			return na(t.timestampValue, e.timestampValue);
		case 4:
			return na(Xu(t), Xu(e));
		case 5:
			return Ws(t.stringValue, e.stringValue);
		case 6:
			return (function (t, e) {
				var n = ua(t),
					r = ua(e);
				return n.L(r);
			})(t.bytesValue, e.bytesValue);
		case 7:
			return (function (t, e) {
				for (var n = t.split('/'), r = e.split('/'), i = 0; i < n.length && i < r.length; i++) {
					var o = Ws(n[i], r[i]);
					if (0 !== o) return o;
				}
				return Ws(n.length, r.length);
			})(t.referenceValue, e.referenceValue);
		case 8:
			return (function (t, e) {
				var n = Ws(sa(t.latitude), sa(e.latitude));
				return 0 !== n ? n : Ws(sa(t.longitude), sa(e.longitude));
			})(t.geoPointValue, e.geoPointValue);
		case 9:
			return (function (t, e) {
				for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
					var o = ea(n[i], r[i]);
					if (o) return o;
				}
				return Ws(n.length, r.length);
			})(t.arrayValue, e.arrayValue);
		case 10:
			return (function (t, e) {
				var n = t.fields || {},
					r = Object.keys(n),
					i = e.fields || {},
					o = Object.keys(i);
				r.sort(), o.sort();
				for (var s = 0; s < r.length && s < o.length; ++s) {
					var u = Ws(r[s], o[s]);
					if (0 !== u) return u;
					var a = ea(n[r[s]], i[o[s]]);
					if (0 !== a) return a;
				}
				return Ws(r.length, o.length);
			})(t.mapValue, e.mapValue);
		default:
			throw ys();
	}
}
function na(t, e) {
	if ('string' == typeof t && 'string' == typeof e && t.length === e.length) return Ws(t, e);
	var n = oa(t),
		r = oa(e),
		i = Ws(n.seconds, r.seconds);
	return 0 !== i ? i : Ws(n.nanos, r.nanos);
}
function ra(t) {
	return ia(t);
}
function ia(t) {
	return 'nullValue' in t
		? 'null'
		: 'booleanValue' in t
		? '' + t.booleanValue
		: 'integerValue' in t
		? '' + t.integerValue
		: 'doubleValue' in t
		? '' + t.doubleValue
		: 'timestampValue' in t
		? ((e = t.timestampValue), 'time(' + (n = oa(e)).seconds + ',' + n.nanos + ')')
		: 'stringValue' in t
		? t.stringValue
		: 'bytesValue' in t
		? ua(t.bytesValue).toBase64()
		: 'referenceValue' in t
		? ((i = t.referenceValue), Ns.C(i).toString())
		: 'geoPointValue' in t
		? 'geo(' + (r = t.geoPointValue).latitude + ',' + r.longitude + ')'
		: 'arrayValue' in t
		? (function (t) {
				for (var e = '[', n = !0, r = 0, i = t.values || []; r < i.length; r++)
					n ? (n = !1) : (e += ','), (e += ia(i[r]));
				return e + ']';
		  })(t.arrayValue)
		: 'mapValue' in t
		? (function (t) {
				for (
					var e = '{', n = !0, r = 0, i = Object.keys(t.fields || {}).sort();
					r < i.length;
					r++
				) {
					var o = i[r];
					n ? (n = !1) : (e += ','), (e += o + ':' + ia(t.fields[o]));
				}
				return e + '}';
		  })(t.mapValue)
		: ys();
	var e, n, r, i;
}
function oa(t) {
	if ((gs(!!t), 'string' == typeof t)) {
		var e = 0,
			n = Yu.exec(t);
		if ((gs(!!n), n[1])) {
			var r = n[1];
			(r = (r + '000000000').substr(0, 9)), (e = Number(r));
		}
		var i = new Date(t);
		return { seconds: Math.floor(i.getTime() / 1e3), nanos: e };
	}
	return { seconds: sa(t.seconds), nanos: sa(t.nanos) };
}
function sa(t) {
	return 'number' == typeof t ? t : 'string' == typeof t ? Number(t) : 0;
}
function ua(t) {
	return 'string' == typeof t ? Ys.fromBase64String(t) : Ys.fromUint8Array(t);
}
function aa(t, e) {
	return {
		referenceValue:
			'projects/' + t.projectId + '/databases/' + t.database + '/documents/' + e.path.R()
	};
}
function ca(t) {
	return !!t && 'integerValue' in t;
}
function ha(t) {
	return !!t && 'arrayValue' in t;
}
function fa(t) {
	return !!t && 'nullValue' in t;
}
function la(t) {
	return !!t && 'doubleValue' in t && isNaN(Number(t.doubleValue));
}
function pa(t) {
	return !!t && 'mapValue' in t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var da = { asc: 'ASCENDING', desc: 'DESCENDING' },
	va = {
		'<': 'LESS_THAN',
		'<=': 'LESS_THAN_OR_EQUAL',
		'>': 'GREATER_THAN',
		'>=': 'GREATER_THAN_OR_EQUAL',
		'==': 'EQUAL',
		'!=': 'NOT_EQUAL',
		'array-contains': 'ARRAY_CONTAINS',
		in: 'IN',
		'not-in': 'NOT_IN',
		'array-contains-any': 'ARRAY_CONTAINS_ANY'
	},
	ya = function (t, e) {
		(this.U = t), (this.Qe = e);
	};
function ga(t) {
	return { integerValue: '' + t };
}
function ma(t, e) {
	if (t.Qe) {
		if (isNaN(e)) return { doubleValue: 'NaN' };
		if (e === 1 / 0) return { doubleValue: 'Infinity' };
		if (e === -1 / 0) return { doubleValue: '-Infinity' };
	}
	return { doubleValue: au(e) ? '-0' : e };
}
function ba(t, e) {
	return cu(e) ? ga(e) : ma(t, e);
}
function wa(t, e) {
	return t.Qe
		? new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, '').replace('Z', '') +
				'.' +
				('000000000' + e.nanoseconds).slice(-9) +
				'Z'
		: { seconds: '' + e.seconds, nanos: e.nanoseconds };
}
function Ea(t, e) {
	return t.Qe ? e.toBase64() : e.toUint8Array();
}
function Ia(t, e) {
	return wa(t, e.Z());
}
function _a(t) {
	return gs(!!t), su.J(((e = oa(t)), new ou(e.seconds, e.nanos)));
	var e;
}
function Ta(t, e) {
	return ((n = t), new _s(['projects', n.projectId, 'databases', n.database]))
		.child('documents')
		.child(e)
		.R();
	var n;
}
function Aa(t) {
	var e = _s.g(t);
	return gs(Wa(e)), e;
}
function Na(t, e) {
	return Ta(t.U, e.path);
}
function Sa(t, e) {
	var n = Aa(e);
	return (
		gs(n.get(1) === t.U.projectId),
		gs((!n.get(3) && !t.U.database) || n.get(3) === t.U.database),
		new Ns(Oa(n))
	);
}
function Da(t, e) {
	return Ta(t.U, e);
}
function xa(t) {
	var e = Aa(t);
	return 4 === e.length ? _s.P() : Oa(e);
}
function La(t) {
	return new _s(['projects', t.U.projectId, 'databases', t.U.database]).R();
}
function Oa(t) {
	return gs(t.length > 4 && 'documents' === t.get(4)), t.u(5);
}
function ka(t, e, n) {
	return { name: Na(t, e), fields: n.proto.mapValue.fields };
}
function Ra(t, e) {
	var n, r, i;
	if (e instanceof mc) n = { update: ka(t, e.key, e.value) };
	else if (e instanceof Tc) n = { delete: Na(t, e.key) };
	else if (e instanceof bc) n = { update: ka(t, e.key, e.data), updateMask: Ka(e.We) };
	else if (e instanceof Ec)
		n = {
			transform: {
				document: Na(t, e.key),
				fieldTransforms: e.fieldTransforms.map(function (t) {
					return (function (t, e) {
						var n = e.transform;
						if (n instanceof Za)
							return { fieldPath: e.field.R(), setToServerValue: 'REQUEST_TIME' };
						if (n instanceof tc)
							return { fieldPath: e.field.R(), appendMissingElements: { values: n.elements } };
						if (n instanceof nc)
							return { fieldPath: e.field.R(), removeAllFromArray: { values: n.elements } };
						if (n instanceof ic) return { fieldPath: e.field.R(), increment: n.je };
						throw ys();
					})(0, t);
				})
			}
		};
	else {
		if (!(e instanceof Ac)) return ys();
		n = { verify: Na(t, e.key) };
	}
	return (
		e.Ge.Ke ||
			(n.currentDocument =
				((r = t),
				void 0 !== (i = e.Ge).updateTime
					? { updateTime: Ia(r, i.updateTime) }
					: void 0 !== i.exists
					? { exists: i.exists }
					: ys())),
		n
	);
}
function Pa(t, e) {
	var n,
		r = e.currentDocument
			? void 0 !== (n = e.currentDocument).updateTime
				? hc.updateTime(_a(n.updateTime))
				: void 0 !== n.exists
				? hc.exists(n.exists)
				: hc.ze()
			: hc.ze();
	if (e.update) {
		e.update.name;
		var i = Sa(t, e.update.name),
			o = new Nc({ mapValue: { fields: e.update.fields } });
		if (e.updateMask) {
			var s = (function (t) {
				var e = t.fieldPaths || [];
				return new uc(
					e.map(function (t) {
						return As.S(t);
					})
				);
			})(e.updateMask);
			return new bc(i, o, s, r);
		}
		return new mc(i, o, r);
	}
	if (e.delete) {
		var u = Sa(t, e.delete);
		return new Tc(u, r);
	}
	if (e.transform) {
		var a = Sa(t, e.transform.document),
			c = e.transform.fieldTransforms.map(function (e) {
				return (function (t, e) {
					var n = null;
					if ('setToServerValue' in e) gs('REQUEST_TIME' === e.setToServerValue), (n = new Za());
					else if ('appendMissingElements' in e) {
						var r = e.appendMissingElements.values || [];
						n = new tc(r);
					} else if ('removeAllFromArray' in e) {
						var i = e.removeAllFromArray.values || [];
						n = new nc(i);
					} else 'increment' in e ? (n = new ic(t, e.increment)) : ys();
					var o = As.S(e.fieldPath);
					return new ac(o, n);
				})(t, e);
			});
		return gs(!0 === r.exists), new Ec(a, c);
	}
	if (e.verify) {
		var h = Sa(t, e.verify);
		return new Ac(h, r);
	}
	return ys();
}
function Ca(t, e) {
	return { documents: [Da(t, e.path)] };
}
function Ua(t, e) {
	var n = { structuredQuery: {} },
		r = e.path;
	null !== e.collectionGroup
		? ((n.parent = Da(t, r)),
		  (n.structuredQuery.from = [{ collectionId: e.collectionGroup, allDescendants: !0 }]))
		: ((n.parent = Da(t, r.h())), (n.structuredQuery.from = [{ collectionId: r._() }]));
	var i = (function (t) {
		if (0 !== t.length) {
			var e = t.map(function (t) {
				return (function (t) {
					if ('==' === t.op) {
						if (la(t.value)) return { unaryFilter: { field: Ga(t.field), op: 'IS_NAN' } };
						if (fa(t.value)) return { unaryFilter: { field: Ga(t.field), op: 'IS_NULL' } };
					} else if ('!=' === t.op) {
						if (la(t.value)) return { unaryFilter: { field: Ga(t.field), op: 'IS_NOT_NAN' } };
						if (fa(t.value)) return { unaryFilter: { field: Ga(t.field), op: 'IS_NOT_NULL' } };
					}
					return { fieldFilter: { field: Ga(t.field), op: Ba(t.op), value: t.value } };
				})(t);
			});
			return 1 === e.length ? e[0] : { compositeFilter: { op: 'AND', filters: e } };
		}
	})(e.filters);
	i && (n.structuredQuery.where = i);
	var o = (function (t) {
		if (0 !== t.length)
			return t.map(function (t) {
				return { field: Ga((e = t).field), direction: qa(e.dir) };
				var e;
			});
	})(e.orderBy);
	o && (n.structuredQuery.orderBy = o);
	var s,
		u,
		a = ((s = t), (u = e.limit), s.Qe || uu(u) ? u : { value: u });
	return (
		null !== a && (n.structuredQuery.limit = a),
		e.startAt && (n.structuredQuery.startAt = ja(e.startAt)),
		e.endAt && (n.structuredQuery.endAt = ja(e.endAt)),
		n
	);
}
function Va(t) {
	var e = xa(t.parent),
		n = t.structuredQuery,
		r = n.from ? n.from.length : 0,
		i = null;
	if (r > 0) {
		gs(1 === r);
		var o = n.from[0];
		o.allDescendants ? (i = o.collectionId) : (e = e.child(o.collectionId));
	}
	var s = [];
	n.where && (s = Fa(n.where));
	var u = [];
	n.orderBy &&
		(u = n.orderBy.map(function (t) {
			return new hh(
				za((e = t).field),
				(function (t) {
					switch (t) {
						case 'ASCENDING':
							return 'asc';
						case 'DESCENDING':
							return 'desc';
						default:
							return;
					}
				})(e.direction)
			);
			var e;
		}));
	var a,
		c,
		h = null;
	n.limit && ((a = n.limit), (h = uu((c = 'object' == typeof a ? a.value : a)) ? null : c));
	var f = null;
	n.startAt && (f = Ma(n.startAt));
	var l = null;
	return n.endAt && (l = Ma(n.endAt)), Bc(Pc(e, i, u, s, h, 'F', f, l));
}
function Fa(t) {
	return t
		? void 0 !== t.unaryFilter
			? [Ha(t)]
			: void 0 !== t.fieldFilter
			? [$a(t)]
			: void 0 !== t.compositeFilter
			? t.compositeFilter.filters
					.map(function (t) {
						return Fa(t);
					})
					.reduce(function (t, e) {
						return t.concat(e);
					})
			: ys()
		: [];
}
function ja(t) {
	return { before: t.before, values: t.position };
}
function Ma(t) {
	var e = !!t.before,
		n = t.values || [];
	return new sh(n, e);
}
function qa(t) {
	return da[t];
}
function Ba(t) {
	return va[t];
}
function Ga(t) {
	return { fieldPath: t.R() };
}
function za(t) {
	return As.S(t.fieldPath);
}
function $a(t) {
	return Yc.create(
		za(t.fieldFilter.field),
		(function (t) {
			switch (t) {
				case 'EQUAL':
					return '==';
				case 'NOT_EQUAL':
					return '!=';
				case 'GREATER_THAN':
					return '>';
				case 'GREATER_THAN_OR_EQUAL':
					return '>=';
				case 'LESS_THAN':
					return '<';
				case 'LESS_THAN_OR_EQUAL':
					return '<=';
				case 'ARRAY_CONTAINS':
					return 'array-contains';
				case 'IN':
					return 'in';
				case 'NOT_IN':
					return 'not-in';
				case 'ARRAY_CONTAINS_ANY':
					return 'array-contains-any';
				case 'OPERATOR_UNSPECIFIED':
				default:
					return ys();
			}
		})(t.fieldFilter.op),
		t.fieldFilter.value
	);
}
function Ha(t) {
	switch (t.unaryFilter.op) {
		case 'IS_NAN':
			var e = za(t.unaryFilter.field);
			return Yc.create(e, '==', { doubleValue: NaN });
		case 'IS_NULL':
			var n = za(t.unaryFilter.field);
			return Yc.create(n, '==', { nullValue: 'NULL_VALUE' });
		case 'IS_NOT_NAN':
			var r = za(t.unaryFilter.field);
			return Yc.create(r, '!=', { doubleValue: NaN });
		case 'IS_NOT_NULL':
			var i = za(t.unaryFilter.field);
			return Yc.create(i, '!=', { nullValue: 'NULL_VALUE' });
		case 'OPERATOR_UNSPECIFIED':
		default:
			return ys();
	}
}
function Ka(t) {
	var e = [];
	return (
		t.fields.forEach(function (t) {
			return e.push(t.R());
		}),
		{ fieldPaths: e }
	);
}
function Wa(t) {
	return t.length >= 4 && 'projects' === t.get(0) && 'databases' === t.get(2);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Qa = function () {
	this.He = void 0;
};
function Xa(t, e, n) {
	return t instanceof Za
		? ((i = e),
		  (o = {
				fields: {
					__type__: { stringValue: 'server_timestamp' },
					__local_write_time__: {
						timestampValue: { seconds: (r = n).seconds, nanos: r.nanoseconds }
					}
				}
		  }),
		  i && (o.fields.__previous_value__ = i),
		  { mapValue: o })
		: t instanceof tc
		? ec(t, e)
		: t instanceof nc
		? rc(t, e)
		: (function (t, e) {
				var n = Ja(t, e),
					r = oc(n) + oc(t.je);
				return ca(n) && ca(t.je) ? ga(r) : ma(t.serializer, r);
		  })(t, e);
	var r, i, o;
}
function Ya(t, e, n) {
	return t instanceof tc ? ec(t, e) : t instanceof nc ? rc(t, e) : n;
}
function Ja(t, e) {
	return t instanceof ic
		? ca((r = e)) || ((n = r) && 'doubleValue' in n)
			? e
			: { integerValue: 0 }
		: null;
	var n, r;
}
var Za = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return se(e, t), e;
	})(Qa),
	tc = (function (t) {
		function e(e) {
			var n = this;
			return ((n = t.call(this) || this).elements = e), n;
		}
		return se(e, t), e;
	})(Qa);
function ec(t, e) {
	for (
		var n = sc(e),
			r = function (t) {
				n.some(function (e) {
					return Zu(e, t);
				}) || n.push(t);
			},
			i = 0,
			o = t.elements;
		i < o.length;
		i++
	)
		r(o[i]);
	return { arrayValue: { values: n } };
}
var nc = (function (t) {
	function e(e) {
		var n = this;
		return ((n = t.call(this) || this).elements = e), n;
	}
	return se(e, t), e;
})(Qa);
function rc(t, e) {
	for (
		var n = sc(e),
			r = function (t) {
				n = n.filter(function (e) {
					return !Zu(e, t);
				});
			},
			i = 0,
			o = t.elements;
		i < o.length;
		i++
	)
		r(o[i]);
	return { arrayValue: { values: n } };
}
var ic = (function (t) {
	function e(e, n) {
		var r = this;
		return ((r = t.call(this) || this).serializer = e), (r.je = n), r;
	}
	return se(e, t), e;
})(Qa);
function oc(t) {
	return sa(t.integerValue || t.doubleValue);
}
function sc(t) {
	return ha(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var uc = (function () {
		function t(t) {
			(this.fields = t), t.sort(As.i);
		}
		return (
			(t.prototype.Ye = function (t) {
				for (var e = 0, n = this.fields; e < n.length; e++) if (n[e].T(t)) return !0;
				return !1;
			}),
			(t.prototype.isEqual = function (t) {
				return Qs(this.fields, t.fields, function (t, e) {
					return t.isEqual(e);
				});
			}),
			t
		);
	})(),
	ac = function (t, e) {
		(this.field = t), (this.transform = e);
	},
	cc = function (t, e) {
		(this.version = t), (this.transformResults = e);
	},
	hc = (function () {
		function t(t, e) {
			(this.updateTime = t), (this.exists = e);
		}
		return (
			(t.ze = function () {
				return new t();
			}),
			(t.exists = function (e) {
				return new t(void 0, e);
			}),
			(t.updateTime = function (e) {
				return new t(e);
			}),
			Object.defineProperty(t.prototype, 'Ke', {
				get: function () {
					return void 0 === this.updateTime && void 0 === this.exists;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.isEqual = function (t) {
				return (
					this.exists === t.exists &&
					(this.updateTime
						? !!t.updateTime && this.updateTime.isEqual(t.updateTime)
						: !t.updateTime)
				);
			}),
			t
		);
	})();
function fc(t, e) {
	return void 0 !== t.updateTime
		? e instanceof Lc && e.version.isEqual(t.updateTime)
		: void 0 === t.exists || t.exists === e instanceof Lc;
}
var lc = function () {};
function pc(t, e, n) {
	return t instanceof mc
		? ((i = n), new Lc((r = t).key, i.version, r.value, { hasCommittedMutations: !0 }))
		: t instanceof bc
		? (function (t, e, n) {
				if (!fc(t.Ge, e)) return new kc(t.key, n.version);
				var r = wc(t, e);
				return new Lc(t.key, n.version, r, { hasCommittedMutations: !0 });
		  })(t, e, n)
		: t instanceof Ec
		? (function (t, e, n) {
				if ((gs(null != n.transformResults), !fc(t.Ge, e))) return new kc(t.key, n.version);
				var r = Ic(t, e),
					i = (function (t, e, n) {
						var r = [];
						gs(t.length === n.length);
						for (var i = 0; i < n.length; i++) {
							var o = t[i],
								s = o.transform,
								u = null;
							e instanceof Lc && (u = e.field(o.field)), r.push(Ya(s, u, n[i]));
						}
						return r;
					})(t.fieldTransforms, e, n.transformResults),
					o = n.version,
					s = _c(t, r.data(), i);
				return new Lc(t.key, o, s, { hasCommittedMutations: !0 });
		  })(t, e, n)
		: (function (t, e, n) {
				return new Oc(t.key, n.version, { hasCommittedMutations: !0 });
		  })(t, 0, n);
	var r, i;
}
function dc(t, e, n, r) {
	return t instanceof mc
		? (function (t, e) {
				if (!fc(t.Ge, e)) return e;
				var n = gc(e);
				return new Lc(t.key, n, t.value, { Je: !0 });
		  })(t, e)
		: t instanceof bc
		? (function (t, e) {
				if (!fc(t.Ge, e)) return e;
				var n = gc(e),
					r = wc(t, e);
				return new Lc(t.key, n, r, { Je: !0 });
		  })(t, e)
		: t instanceof Ec
		? (function (t, e, n, r) {
				if (!fc(t.Ge, e)) return e;
				var i = Ic(t, e),
					o = (function (t, e, n, r) {
						for (var i = [], o = 0, s = t; o < s.length; o++) {
							var u = s[o],
								a = u.transform,
								c = null;
							n instanceof Lc && (c = n.field(u.field)),
								null === c && r instanceof Lc && (c = r.field(u.field)),
								i.push(Xa(a, c, e));
						}
						return i;
					})(t.fieldTransforms, n, e, r),
					s = _c(t, i.data(), o);
				return new Lc(t.key, i.version, s, { Je: !0 });
		  })(t, e, r, n)
		: ((o = e), fc((i = t).Ge, o) ? new Oc(i.key, su.min()) : o);
	var i, o;
}
function vc(t, e) {
	return t instanceof Ec
		? (function (t, e) {
				for (var n = null, r = 0, i = t.fieldTransforms; r < i.length; r++) {
					var o = i[r],
						s = e instanceof Lc ? e.field(o.field) : void 0,
						u = Ja(o.transform, s || null);
					null != u && (n = null == n ? new Sc().set(o.field, u) : n.set(o.field, u));
				}
				return n ? n.Xe() : null;
		  })(t, e)
		: null;
}
function yc(t, e) {
	return (
		t.type === e.type &&
		!!t.key.isEqual(e.key) &&
		!!t.Ge.isEqual(e.Ge) &&
		(0 === t.type
			? t.value.isEqual(e.value)
			: 1 === t.type
			? t.data.isEqual(e.data) && t.We.isEqual(e.We)
			: 2 !== t.type ||
			  Qs(t.fieldTransforms, t.fieldTransforms, function (t, e) {
					return (
						(r = e),
						(n = t).field.isEqual(r.field) &&
							((i = n.transform),
							(o = r.transform),
							(i instanceof tc && o instanceof tc) || (i instanceof nc && o instanceof nc)
								? Qs(i.elements, o.elements, Zu)
								: i instanceof ic && o instanceof ic
								? Zu(i.je, o.je)
								: i instanceof Za && o instanceof Za)
					);
					var n, r, i, o;
			  }))
	);
}
function gc(t) {
	return t instanceof Lc ? t.version : su.min();
}
var mc = (function (t) {
		function e(e, n, r) {
			var i = this;
			return ((i = t.call(this) || this).key = e), (i.value = n), (i.Ge = r), (i.type = 0), i;
		}
		return se(e, t), e;
	})(lc),
	bc = (function (t) {
		function e(e, n, r, i) {
			var o = this;
			return (
				((o = t.call(this) || this).key = e), (o.data = n), (o.We = r), (o.Ge = i), (o.type = 1), o
			);
		}
		return se(e, t), e;
	})(lc);
function wc(t, e) {
	return (
		(n = t),
		(r = e instanceof Lc ? e.data() : Nc.empty()),
		(i = new Sc(r)),
		n.We.fields.forEach(function (t) {
			if (!t.m()) {
				var e = n.data.field(t);
				null !== e ? i.set(t, e) : i.delete(t);
			}
		}),
		i.Xe()
	);
	var n, r, i;
}
var Ec = (function (t) {
	function e(e, n) {
		var r = this;
		return (
			((r = t.call(this) || this).key = e),
			(r.fieldTransforms = n),
			(r.type = 2),
			(r.Ge = hc.exists(!0)),
			r
		);
	}
	return se(e, t), e;
})(lc);
function Ic(t, e) {
	return e;
}
function _c(t, e, n) {
	for (var r = new Sc(e), i = 0; i < t.fieldTransforms.length; i++) {
		var o = t.fieldTransforms[i];
		r.set(o.field, n[i]);
	}
	return r.Xe();
}
var Tc = (function (t) {
		function e(e, n) {
			var r = this;
			return ((r = t.call(this) || this).key = e), (r.Ge = n), (r.type = 3), r;
		}
		return se(e, t), e;
	})(lc),
	Ac = (function (t) {
		function e(e, n) {
			var r = this;
			return ((r = t.call(this) || this).key = e), (r.Ge = n), (r.type = 4), r;
		}
		return se(e, t), e;
	})(lc),
	Nc = (function () {
		function t(t) {
			this.proto = t;
		}
		return (
			(t.empty = function () {
				return new t({ mapValue: {} });
			}),
			(t.prototype.field = function (t) {
				if (t.m()) return this.proto;
				for (var e = this.proto, n = 0; n < t.length - 1; ++n) {
					if (!e.mapValue.fields) return null;
					if (!pa((e = e.mapValue.fields[t.get(n)]))) return null;
				}
				return (e = (e.mapValue.fields || {})[t._()]) || null;
			}),
			(t.prototype.isEqual = function (t) {
				return Zu(this.proto, t.proto);
			}),
			t
		);
	})(),
	Sc = (function () {
		function t(t) {
			void 0 === t && (t = Nc.empty()), (this.Ze = t), (this.tn = new Map());
		}
		return (
			(t.prototype.set = function (t, e) {
				return this.en(t, e), this;
			}),
			(t.prototype.delete = function (t) {
				return this.en(t, null), this;
			}),
			(t.prototype.en = function (t, e) {
				for (var n = this.tn, r = 0; r < t.length - 1; ++r) {
					var i = t.get(r),
						o = n.get(i);
					o instanceof Map
						? (n = o)
						: o && 10 === Ju(o)
						? ((o = new Map(Object.entries(o.mapValue.fields || {}))), n.set(i, o), (n = o))
						: ((o = new Map()), n.set(i, o), (n = o));
				}
				n.set(t._(), e);
			}),
			(t.prototype.Xe = function () {
				var t = this.nn(As.P(), this.tn);
				return null != t ? new Nc(t) : this.Ze;
			}),
			(t.prototype.nn = function (t, e) {
				var n = this,
					r = !1,
					i = this.Ze.field(t),
					o = pa(i) ? Object.assign({}, i.mapValue.fields) : {};
				return (
					e.forEach(function (e, i) {
						if (e instanceof Map) {
							var s = n.nn(t.child(i), e);
							null != s && ((o[i] = s), (r = !0));
						} else null !== e ? ((o[i] = e), (r = !0)) : o.hasOwnProperty(i) && (delete o[i], (r = !0));
					}),
					r ? { mapValue: { fields: o } } : null
				);
			}),
			t
		);
	})();
function Dc(t) {
	var e = [];
	return (
		ws(t.fields || {}, function (t, n) {
			var r = new As([t]);
			if (pa(n)) {
				var i = Dc(n.mapValue).fields;
				if (0 === i.length) e.push(r);
				else
					for (var o = 0, s = i; o < s.length; o++) {
						var u = s[o];
						e.push(r.child(u));
					}
			} else e.push(r);
		}),
		new uc(e)
	);
}
var xc = function (t, e) {
		(this.key = t), (this.version = e);
	},
	Lc = (function (t) {
		function e(e, n, r, i) {
			var o = this;
			return (
				((o = t.call(this, e, n) || this).sn = r),
				(o.Je = !!i.Je),
				(o.hasCommittedMutations = !!i.hasCommittedMutations),
				o
			);
		}
		return (
			se(e, t),
			(e.prototype.field = function (t) {
				return this.sn.field(t);
			}),
			(e.prototype.data = function () {
				return this.sn;
			}),
			(e.prototype.rn = function () {
				return this.sn.proto;
			}),
			(e.prototype.isEqual = function (t) {
				return (
					t instanceof e &&
					this.key.isEqual(t.key) &&
					this.version.isEqual(t.version) &&
					this.Je === t.Je &&
					this.hasCommittedMutations === t.hasCommittedMutations &&
					this.sn.isEqual(t.sn)
				);
			}),
			(e.prototype.toString = function () {
				return (
					'Document(' +
					this.key +
					', ' +
					this.version +
					', ' +
					this.sn.toString() +
					', {hasLocalMutations: ' +
					this.Je +
					'}), {hasCommittedMutations: ' +
					this.hasCommittedMutations +
					'})'
				);
			}),
			Object.defineProperty(e.prototype, 'hasPendingWrites', {
				get: function () {
					return this.Je || this.hasCommittedMutations;
				},
				enumerable: !1,
				configurable: !0
			}),
			e
		);
	})(xc),
	Oc = (function (t) {
		function e(e, n, r) {
			var i = this;
			return (
				((i = t.call(this, e, n) || this).hasCommittedMutations = !(
					!r || !r.hasCommittedMutations
				)),
				i
			);
		}
		return (
			se(e, t),
			(e.prototype.toString = function () {
				return 'NoDocument(' + this.key + ', ' + this.version + ')';
			}),
			Object.defineProperty(e.prototype, 'hasPendingWrites', {
				get: function () {
					return this.hasCommittedMutations;
				},
				enumerable: !1,
				configurable: !0
			}),
			(e.prototype.isEqual = function (t) {
				return (
					t instanceof e &&
					t.hasCommittedMutations === this.hasCommittedMutations &&
					t.version.isEqual(this.version) &&
					t.key.isEqual(this.key)
				);
			}),
			e
		);
	})(xc),
	kc = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.prototype.toString = function () {
				return 'UnknownDocument(' + this.key + ', ' + this.version + ')';
			}),
			Object.defineProperty(e.prototype, 'hasPendingWrites', {
				get: function () {
					return !0;
				},
				enumerable: !1,
				configurable: !0
			}),
			(e.prototype.isEqual = function (t) {
				return t instanceof e && t.version.isEqual(this.version) && t.key.isEqual(this.key);
			}),
			e
		);
	})(xc),
	Rc = function (t, e, n, r, i, o, s, u) {
		void 0 === e && (e = null),
			void 0 === n && (n = []),
			void 0 === r && (r = []),
			void 0 === i && (i = null),
			void 0 === o && (o = 'F'),
			void 0 === s && (s = null),
			void 0 === u && (u = null),
			(this.path = t),
			(this.collectionGroup = e),
			(this.on = n),
			(this.filters = r),
			(this.limit = i),
			(this.an = o),
			(this.startAt = s),
			(this.endAt = u),
			(this.cn = null),
			(this.un = null),
			this.startAt,
			this.endAt;
	};
function Pc(t, e, n, r, i, o, s, u) {
	return new Rc(t, e, n, r, i, o, s, u);
}
function Cc(t) {
	return new Rc(t);
}
function Uc(t) {
	return !uu(t.limit) && 'F' === t.an;
}
function Vc(t) {
	return !uu(t.limit) && 'L' === t.an;
}
function Fc(t) {
	return t.on.length > 0 ? t.on[0].field : null;
}
function jc(t) {
	for (var e = 0, n = t.filters; e < n.length; e++) {
		var r = n[e];
		if (r.hn()) return r.field;
	}
	return null;
}
function Mc(t) {
	return null !== t.collectionGroup;
}
function qc(t) {
	var e = ms(t);
	if (null === e.cn) {
		e.cn = [];
		var n = jc(e),
			r = Fc(e);
		if (null !== n && null === r) n.p() || e.cn.push(new hh(n)), e.cn.push(new hh(As.v(), 'asc'));
		else {
			for (var i = !1, o = 0, s = e.on; o < s.length; o++) {
				var u = s[o];
				e.cn.push(u), u.field.p() && (i = !0);
			}
			if (!i) {
				var a = e.on.length > 0 ? e.on[e.on.length - 1].dir : 'asc';
				e.cn.push(new hh(As.v(), a));
			}
		}
	}
	return e.cn;
}
function Bc(t) {
	var e = ms(t);
	if (!e.un)
		if ('F' === e.an)
			e.un = fu(e.path, e.collectionGroup, qc(e), e.filters, e.limit, e.startAt, e.endAt);
		else {
			for (var n = [], r = 0, i = qc(e); r < i.length; r++) {
				var o = i[r],
					s = 'desc' === o.dir ? 'asc' : 'desc';
				n.push(new hh(o.field, s));
			}
			var u = e.endAt ? new sh(e.endAt.position, !e.endAt.before) : null,
				a = e.startAt ? new sh(e.startAt.position, !e.startAt.before) : null;
			e.un = fu(e.path, e.collectionGroup, n, e.filters, e.limit, u, a);
		}
	return e.un;
}
function Gc(t, e, n) {
	return new Rc(
		t.path,
		t.collectionGroup,
		t.on.slice(),
		t.filters.slice(),
		e,
		n,
		t.startAt,
		t.endAt
	);
}
function zc(t, e) {
	return new Rc(
		t.path,
		t.collectionGroup,
		t.on.slice(),
		t.filters.slice(),
		t.limit,
		t.an,
		e,
		t.endAt
	);
}
function $c(t, e) {
	return new Rc(
		t.path,
		t.collectionGroup,
		t.on.slice(),
		t.filters.slice(),
		t.limit,
		t.an,
		t.startAt,
		e
	);
}
function Hc(t, e) {
	return pu(Bc(t), Bc(e)) && t.an === e.an;
}
function Kc(t) {
	return lu(Bc(t)) + '|lt:' + t.an;
}
function Wc(t) {
	return (
		'Query(target=' +
		((e = Bc(t)),
		(n = e.path.R()),
		null !== e.collectionGroup && (n += ' collectionGroup=' + e.collectionGroup),
		e.filters.length > 0 &&
			(n +=
				', filters: [' +
				e.filters
					.map(function (t) {
						return (e = t).field.R() + ' ' + e.op + ' ' + ra(e.value);
						var e;
					})
					.join(', ') +
				']'),
		uu(e.limit) || (n += ', limit: ' + e.limit),
		e.orderBy.length > 0 &&
			(n +=
				', orderBy: [' +
				e.orderBy
					.map(function (t) {
						return (e = t).field.R() + ' (' + e.dir + ')';
						var e;
					})
					.join(', ') +
				']'),
		e.startAt && (n += ', startAt: ' + uh(e.startAt)),
		e.endAt && (n += ', endAt: ' + uh(e.endAt)),
		'Target(' + n + '); limitType=') +
		t.an +
		')'
	);
	var e, n;
}
function Qc(t, e) {
	return (
		(n = t),
		(i = (r = e).key.path),
		(null !== n.collectionGroup
			? r.key.N(n.collectionGroup) && n.path.T(i)
			: Ns.F(n.path)
			? n.path.isEqual(i)
			: n.path.I(i)) &&
			(function (t, e) {
				for (var n = 0, r = t.on; n < r.length; n++) {
					var i = r[n];
					if (!i.field.p() && null === e.field(i.field)) return !1;
				}
				return !0;
			})(t, e) &&
			(function (t, e) {
				for (var n = 0, r = t.filters; n < r.length; n++) if (!r[n].matches(e)) return !1;
				return !0;
			})(t, e) &&
			(function (t, e) {
				return !((t.startAt && !ah(t.startAt, qc(t), e)) || (t.endAt && ah(t.endAt, qc(t), e)));
			})(t, e)
	);
	var n, r, i;
}
function Xc(t) {
	return function (e, n) {
		for (var r = !1, i = 0, o = qc(t); i < o.length; i++) {
			var s = o[i],
				u = fh(s, e, n);
			if (0 !== u) return u;
			r = r || s.field.p();
		}
		return 0;
	};
}
var Yc = (function (t) {
		function e(e, n, r) {
			var i = this;
			return ((i = t.call(this) || this).field = e), (i.op = n), (i.value = r), i;
		}
		return (
			se(e, t),
			(e.create = function (t, n, r) {
				if (t.p()) return 'in' === n || 'not-in' === n ? this.ln(t, n, r) : new Jc(t, n, r);
				if (fa(r)) {
					if ('==' !== n && '!=' !== n)
						throw new cs(
							as.INVALID_ARGUMENT,
							"Invalid query. Null only supports '==' and '!=' comparisons."
						);
					return new e(t, n, r);
				}
				if (la(r)) {
					if ('==' !== n && '!=' !== n)
						throw new cs(
							as.INVALID_ARGUMENT,
							"Invalid query. NaN only supports '==' and '!=' comparisons."
						);
					return new e(t, n, r);
				}
				return 'array-contains' === n
					? new nh(t, r)
					: 'in' === n
					? new rh(t, r)
					: 'not-in' === n
					? new ih(t, r)
					: 'array-contains-any' === n
					? new oh(t, r)
					: new e(t, n, r);
			}),
			(e.ln = function (t, e, n) {
				return 'in' === e ? new Zc(t, n) : new th(t, n);
			}),
			(e.prototype.matches = function (t) {
				var e = t.field(this.field);
				return '!=' === this.op
					? null !== e && this._n(ea(e, this.value))
					: null !== e && Ju(this.value) === Ju(e) && this._n(ea(e, this.value));
			}),
			(e.prototype._n = function (t) {
				switch (this.op) {
					case '<':
						return t < 0;
					case '<=':
						return t <= 0;
					case '==':
						return 0 === t;
					case '!=':
						return 0 !== t;
					case '>':
						return t > 0;
					case '>=':
						return t >= 0;
					default:
						return ys();
				}
			}),
			(e.prototype.hn = function () {
				return ['<', '<=', '>', '>=', '!=', 'not-in'].indexOf(this.op) >= 0;
			}),
			e
		);
	})(function () {}),
	Jc = (function (t) {
		function e(e, n, r) {
			var i = this;
			return ((i = t.call(this, e, n, r) || this).key = Ns.C(r.referenceValue)), i;
		}
		return (
			se(e, t),
			(e.prototype.matches = function (t) {
				var e = Ns.i(t.key, this.key);
				return this._n(e);
			}),
			e
		);
	})(Yc),
	Zc = (function (t) {
		function e(e, n) {
			var r = this;
			return ((r = t.call(this, e, 'in', n) || this).keys = eh('in', n)), r;
		}
		return (
			se(e, t),
			(e.prototype.matches = function (t) {
				return this.keys.some(function (e) {
					return e.isEqual(t.key);
				});
			}),
			e
		);
	})(Yc),
	th = (function (t) {
		function e(e, n) {
			var r = this;
			return ((r = t.call(this, e, 'not-in', n) || this).keys = eh('not-in', n)), r;
		}
		return (
			se(e, t),
			(e.prototype.matches = function (t) {
				return !this.keys.some(function (e) {
					return e.isEqual(t.key);
				});
			}),
			e
		);
	})(Yc);
function eh(t, e) {
	var n;
	return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map(function (
		t
	) {
		return Ns.C(t.referenceValue);
	});
}
var nh = (function (t) {
		function e(e, n) {
			return t.call(this, e, 'array-contains', n) || this;
		}
		return (
			se(e, t),
			(e.prototype.matches = function (t) {
				var e = t.field(this.field);
				return ha(e) && ta(e.arrayValue, this.value);
			}),
			e
		);
	})(Yc),
	rh = (function (t) {
		function e(e, n) {
			return t.call(this, e, 'in', n) || this;
		}
		return (
			se(e, t),
			(e.prototype.matches = function (t) {
				var e = t.field(this.field);
				return null !== e && ta(this.value.arrayValue, e);
			}),
			e
		);
	})(Yc),
	ih = (function (t) {
		function e(e, n) {
			return t.call(this, e, 'not-in', n) || this;
		}
		return (
			se(e, t),
			(e.prototype.matches = function (t) {
				if (ta(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) return !1;
				var e = t.field(this.field);
				return null !== e && !ta(this.value.arrayValue, e);
			}),
			e
		);
	})(Yc),
	oh = (function (t) {
		function e(e, n) {
			return t.call(this, e, 'array-contains-any', n) || this;
		}
		return (
			se(e, t),
			(e.prototype.matches = function (t) {
				var e = this,
					n = t.field(this.field);
				return (
					!(!ha(n) || !n.arrayValue.values) &&
					n.arrayValue.values.some(function (t) {
						return ta(e.value.arrayValue, t);
					})
				);
			}),
			e
		);
	})(Yc),
	sh = function (t, e) {
		(this.position = t), (this.before = e);
	};
function uh(t) {
	return (
		(t.before ? 'b' : 'a') +
		':' +
		t.position
			.map(function (t) {
				return ra(t);
			})
			.join(',')
	);
}
function ah(t, e, n) {
	for (var r = 0, i = 0; i < t.position.length; i++) {
		var o = e[i],
			s = t.position[i];
		if (
			((r = o.field.p() ? Ns.i(Ns.C(s.referenceValue), n.key) : ea(s, n.field(o.field))),
			'desc' === o.dir && (r *= -1),
			0 !== r)
		)
			break;
	}
	return t.before ? r <= 0 : r < 0;
}
function ch(t, e) {
	if (null === t) return null === e;
	if (null === e) return !1;
	if (t.before !== e.before || t.position.length !== e.position.length) return !1;
	for (var n = 0; n < t.position.length; n++) if (!Zu(t.position[n], e.position[n])) return !1;
	return !0;
}
var hh = function (t, e) {
	void 0 === e && (e = 'asc'), (this.field = t), (this.dir = e);
};
function fh(t, e, n) {
	var r,
		i,
		o,
		s,
		u = t.field.p()
			? Ns.i(e.key, n.key)
			: ((r = t.field),
			  (i = n),
			  (o = e.field(r)),
			  (s = i.field(r)),
			  null !== o && null !== s ? ea(o, s) : ys());
	switch (t.dir) {
		case 'asc':
			return u;
		case 'desc':
			return -1 * u;
		default:
			return ys();
	}
}
function lh(t, e) {
	return t.dir === e.dir && t.field.isEqual(e.field);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ph = function () {
		var t = this;
		this.promise = new Promise(function (e, n) {
			(t.resolve = e), (t.reject = n);
		});
	},
	dh = (function () {
		function t(t, e, n, r, i) {
			void 0 === n && (n = 1e3),
				void 0 === r && (r = 1.5),
				void 0 === i && (i = 6e4),
				(this.fn = t),
				(this.dn = e),
				(this.wn = n),
				(this.mn = r),
				(this.Tn = i),
				(this.En = 0),
				(this.In = null),
				(this.An = Date.now()),
				this.reset();
		}
		return (
			(t.prototype.reset = function () {
				this.En = 0;
			}),
			(t.prototype.Rn = function () {
				this.En = this.Tn;
			}),
			(t.prototype.gn = function (t) {
				var e = this;
				this.cancel();
				var n = Math.floor(this.En + this.Pn()),
					r = Math.max(0, Date.now() - this.An),
					i = Math.max(0, n - r);
				i > 0 &&
					ls(
						'ExponentialBackoff',
						'Backing off for ' +
							i +
							' ms (base delay: ' +
							this.En +
							' ms, delay with jitter: ' +
							n +
							' ms, last attempt: ' +
							r +
							' ms ago)'
					),
					(this.In = this.fn.yn(this.dn, i, function () {
						return (e.An = Date.now()), t();
					})),
					(this.En *= this.mn),
					this.En < this.wn && (this.En = this.wn),
					this.En > this.Tn && (this.En = this.Tn);
			}),
			(t.prototype.Vn = function () {
				null !== this.In && (this.In.pn(), (this.In = null));
			}),
			(t.prototype.cancel = function () {
				null !== this.In && (this.In.cancel(), (this.In = null));
			}),
			(t.prototype.Pn = function () {
				return (Math.random() - 0.5) * this.En;
			}),
			t
		);
	})(),
	vh = (function () {
		function t(t) {
			var e = this;
			(this.bn = null),
				(this.vn = null),
				(this.result = void 0),
				(this.error = void 0),
				(this.Sn = !1),
				(this.Dn = !1),
				t(
					function (t) {
						(e.Sn = !0), (e.result = t), e.bn && e.bn(t);
					},
					function (t) {
						(e.Sn = !0), (e.error = t), e.vn && e.vn(t);
					}
				);
		}
		return (
			(t.prototype.catch = function (t) {
				return this.next(void 0, t);
			}),
			(t.prototype.next = function (e, n) {
				var r = this;
				return (
					this.Dn && ys(),
					(this.Dn = !0),
					this.Sn
						? this.error
							? this.Cn(n, this.error)
							: this.Nn(e, this.result)
						: new t(function (t, i) {
								(r.bn = function (n) {
									r.Nn(e, n).next(t, i);
								}),
									(r.vn = function (e) {
										r.Cn(n, e).next(t, i);
									});
						  })
				);
			}),
			(t.prototype.Fn = function () {
				var t = this;
				return new Promise(function (e, n) {
					t.next(e, n);
				});
			}),
			(t.prototype.xn = function (e) {
				try {
					var n = e();
					return n instanceof t ? n : t.resolve(n);
				} catch (r) {
					return t.reject(r);
				}
			}),
			(t.prototype.Nn = function (e, n) {
				return e
					? this.xn(function () {
							return e(n);
					  })
					: t.resolve(n);
			}),
			(t.prototype.Cn = function (e, n) {
				return e
					? this.xn(function () {
							return e(n);
					  })
					: t.reject(n);
			}),
			(t.resolve = function (e) {
				return new t(function (t, n) {
					t(e);
				});
			}),
			(t.reject = function (e) {
				return new t(function (t, n) {
					n(e);
				});
			}),
			(t.$n = function (e) {
				return new t(function (t, n) {
					var r = 0,
						i = 0,
						o = !1;
					e.forEach(function (e) {
						++r,
							e.next(
								function () {
									++i, o && i === r && t();
								},
								function (t) {
									return n(t);
								}
							);
					}),
						(o = !0),
						i === r && t();
				});
			}),
			(t.kn = function (e) {
				for (
					var n = t.resolve(!1),
						r = function (e) {
							n = n.next(function (n) {
								return n ? t.resolve(n) : e();
							});
						},
						i = 0,
						o = e;
					i < o.length;
					i++
				)
					r(o[i]);
				return n;
			}),
			(t.forEach = function (t, e) {
				var n = this,
					r = [];
				return (
					t.forEach(function (t, i) {
						r.push(e.call(n, t, i));
					}),
					this.$n(r)
				);
			}),
			t
		);
	})(),
	yh = (function () {
		function t(e, n, r) {
			(this.name = e),
				(this.version = n),
				(this.Mn = r),
				12.2 === t.On(ye()) &&
					ps(
						'Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.'
					);
		}
		return (
			(t.delete = function (t) {
				return ls('SimpleDb', 'Removing database:', t), Ih(window.indexedDB.deleteDatabase(t)).Fn();
			}),
			(t.Ln = function () {
				if ('undefined' == typeof indexedDB) return !1;
				if (t.Bn()) return !0;
				var e = ye(),
					n = t.On(e),
					r = 0 < n && n < 10,
					i = t.qn(e),
					o = 0 < i && i < 4.5;
				return !(
					e.indexOf('MSIE ') > 0 ||
					e.indexOf('Trident/') > 0 ||
					e.indexOf('Edge/') > 0 ||
					r ||
					o
				);
			}),
			(t.Bn = function () {
				var t;
				return (
					'undefined' != typeof process &&
					'YES' === (null === (t = process.env) || void 0 === t ? void 0 : t.Un)
				);
			}),
			(t.Qn = function (t, e) {
				return t.store(e);
			}),
			(t.On = function (t) {
				var e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
					n = e ? e[1].split('_').slice(0, 2).join('.') : '-1';
				return Number(n);
			}),
			(t.qn = function (t) {
				var e = t.match(/Android ([\d.]+)/i),
					n = e ? e[1].split('.').slice(0, 2).join('.') : '-1';
				return Number(n);
			}),
			(t.prototype.Wn = function (t) {
				return ae(this, void 0, void 0, function () {
					var e,
						n = this;
					return ce(this, function (r) {
						switch (r.label) {
							case 0:
								return this.db
									? [3, 2]
									: (ls('SimpleDb', 'Opening database:', this.name),
									  (e = this),
									  [
											4,
											new Promise(function (e, r) {
												var i = indexedDB.open(n.name, n.version);
												(i.onsuccess = function (t) {
													var n = t.target.result;
													e(n);
												}),
													(i.onblocked = function () {
														r(
															new mh(
																t,
																'Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed.'
															)
														);
													}),
													(i.onerror = function (e) {
														var n = e.target.error;
														'VersionError' === n.name
															? r(
																	new cs(
																		as.FAILED_PRECONDITION,
																		'A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.'
																	)
															  )
															: r(new mh(t, n));
													}),
													(i.onupgradeneeded = function (t) {
														ls(
															'SimpleDb',
															'Database "' + n.name + '" requires upgrade from version:',
															t.oldVersion
														);
														var e = t.target.result;
														n.Mn.createOrUpgrade(e, i.transaction, t.oldVersion, n.version).next(
															function () {
																ls(
																	'SimpleDb',
																	'Database upgrade to version ' + n.version + ' complete'
																);
															}
														);
													});
											})
									  ]);
							case 1:
								(e.db = r.sent()), (r.label = 2);
							case 2:
								return [
									2,
									(this.jn &&
										(this.db.onversionchange = function (t) {
											return n.jn(t);
										}),
									this.db)
								];
						}
					});
				});
			}),
			(t.prototype.Kn = function (t) {
				(this.jn = t),
					this.db &&
						(this.db.onversionchange = function (e) {
							return t(e);
						});
			}),
			(t.prototype.runTransaction = function (t, e, n, r) {
				return ae(this, void 0, void 0, function () {
					var i, o, s, u, a;
					return ce(this, function (c) {
						switch (c.label) {
							case 0:
								(i = 'readonly' === e),
									(o = 0),
									(s = function () {
										var e, s, a, c, h;
										return ce(this, function (f) {
											switch (f.label) {
												case 0:
													++o, (f.label = 1);
												case 1:
													return f.trys.push([1, 4, , 5]), [4, u.Wn(t)];
												case 2:
													return (
														(u.db = f.sent()),
														(e = wh.open(u.db, t, i ? 'readonly' : 'readwrite', n)),
														(s = r(e)
															.catch(function (t) {
																return e.abort(t), vh.reject(t);
															})
															.Fn()),
														(a = {}),
														s.catch(function () {}),
														[4, e.Gn]
													);
												case 3:
													return [2, ((a.value = (f.sent(), s)), a)];
												case 4:
													return (
														(c = f.sent()),
														(h = 'FirebaseError' !== c.name && o < 3),
														ls(
															'SimpleDb',
															'Transaction failed with error:',
															c.message,
															'Retrying:',
															h
														),
														u.close(),
														h ? [3, 5] : [2, { value: Promise.reject(c) }]
													);
												case 5:
													return [2];
											}
										});
									}),
									(u = this),
									(c.label = 1);
							case 1:
								return [5, s()];
							case 2:
								if ('object' == typeof (a = c.sent())) return [2, a.value];
								c.label = 3;
							case 3:
								return [3, 1];
							case 4:
								return [2];
						}
					});
				});
			}),
			(t.prototype.close = function () {
				this.db && this.db.close(), (this.db = void 0);
			}),
			t
		);
	})(),
	gh = (function () {
		function t(t) {
			(this.zn = t), (this.Hn = !1), (this.Yn = null);
		}
		return (
			Object.defineProperty(t.prototype, 'Sn', {
				get: function () {
					return this.Hn;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'Jn', {
				get: function () {
					return this.Yn;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'cursor', {
				set: function (t) {
					this.zn = t;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.done = function () {
				this.Hn = !0;
			}),
			(t.prototype.Xn = function (t) {
				this.Yn = t;
			}),
			(t.prototype.delete = function () {
				return Ih(this.zn.delete());
			}),
			t
		);
	})(),
	mh = (function (t) {
		function e(e, n) {
			var r = this;
			return (
				((r =
					t.call(this, as.UNAVAILABLE, "IndexedDB transaction '" + e + "' failed: " + n) ||
					this).name = 'IndexedDbTransactionError'),
				r
			);
		}
		return se(e, t), e;
	})(cs);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bh(t) {
	return 'IndexedDbTransactionError' === t.name;
}
var wh = (function () {
		function t(t, e) {
			var n = this;
			(this.action = t),
				(this.transaction = e),
				(this.aborted = !1),
				(this.Zn = new ph()),
				(this.transaction.oncomplete = function () {
					n.Zn.resolve();
				}),
				(this.transaction.onabort = function () {
					e.error ? n.Zn.reject(new mh(t, e.error)) : n.Zn.resolve();
				}),
				(this.transaction.onerror = function (e) {
					var r = Th(e.target.error);
					n.Zn.reject(new mh(t, r));
				});
		}
		return (
			(t.open = function (e, n, r, i) {
				try {
					return new t(n, e.transaction(i, r));
				} catch (o) {
					throw new mh(n, o);
				}
			}),
			Object.defineProperty(t.prototype, 'Gn', {
				get: function () {
					return this.Zn.promise;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.abort = function (t) {
				t && this.Zn.reject(t),
					this.aborted ||
						(ls('SimpleDb', 'Aborting transaction:', t ? t.message : 'Client-initiated abort'),
						(this.aborted = !0),
						this.transaction.abort());
			}),
			(t.prototype.store = function (t) {
				var e = this.transaction.objectStore(t);
				return new Eh(e);
			}),
			t
		);
	})(),
	Eh = (function () {
		function t(t) {
			this.store = t;
		}
		return (
			(t.prototype.put = function (t, e) {
				var n;
				return (
					void 0 !== e
						? (ls('SimpleDb', 'PUT', this.store.name, t, e), (n = this.store.put(e, t)))
						: (ls('SimpleDb', 'PUT', this.store.name, '<auto-key>', t), (n = this.store.put(t))),
					Ih(n)
				);
			}),
			(t.prototype.add = function (t) {
				return ls('SimpleDb', 'ADD', this.store.name, t, t), Ih(this.store.add(t));
			}),
			(t.prototype.get = function (t) {
				var e = this;
				return Ih(this.store.get(t)).next(function (n) {
					return void 0 === n && (n = null), ls('SimpleDb', 'GET', e.store.name, t, n), n;
				});
			}),
			(t.prototype.delete = function (t) {
				return ls('SimpleDb', 'DELETE', this.store.name, t), Ih(this.store.delete(t));
			}),
			(t.prototype.count = function () {
				return ls('SimpleDb', 'COUNT', this.store.name), Ih(this.store.count());
			}),
			(t.prototype.ts = function (t, e) {
				var n = this.cursor(this.options(t, e)),
					r = [];
				return this.es(n, function (t, e) {
					r.push(e);
				}).next(function () {
					return r;
				});
			}),
			(t.prototype.ns = function (t, e) {
				ls('SimpleDb', 'DELETE ALL', this.store.name);
				var n = this.options(t, e);
				n.ss = !1;
				var r = this.cursor(n);
				return this.es(r, function (t, e, n) {
					return n.delete();
				});
			}),
			(t.prototype.rs = function (t, e) {
				var n;
				e ? (n = t) : ((n = {}), (e = t));
				var r = this.cursor(n);
				return this.es(r, e);
			}),
			(t.prototype.os = function (t) {
				var e = this.cursor({});
				return new vh(function (n, r) {
					(e.onerror = function (t) {
						var e = Th(t.target.error);
						r(e);
					}),
						(e.onsuccess = function (e) {
							var r = e.target.result;
							r
								? t(r.primaryKey, r.value).next(function (t) {
										t ? r.continue() : n();
								  })
								: n();
						});
				});
			}),
			(t.prototype.es = function (t, e) {
				var n = [];
				return new vh(function (r, i) {
					(t.onerror = function (t) {
						i(t.target.error);
					}),
						(t.onsuccess = function (t) {
							var i = t.target.result;
							if (i) {
								var o = new gh(i),
									s = e(i.primaryKey, i.value, o);
								if (s instanceof vh) {
									var u = s.catch(function (t) {
										return o.done(), vh.reject(t);
									});
									n.push(u);
								}
								o.Sn ? r() : null === o.Jn ? i.continue() : i.continue(o.Jn);
							} else r();
						});
				}).next(function () {
					return vh.$n(n);
				});
			}),
			(t.prototype.options = function (t, e) {
				var n = void 0;
				return void 0 !== t && ('string' == typeof t ? (n = t) : (e = t)), { index: n, range: e };
			}),
			(t.prototype.cursor = function (t) {
				var e = 'next';
				if ((t.reverse && (e = 'prev'), t.index)) {
					var n = this.store.index(t.index);
					return t.ss ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
				}
				return this.store.openCursor(t.range, e);
			}),
			t
		);
	})();
function Ih(t) {
	return new vh(function (e, n) {
		(t.onsuccess = function (t) {
			var n = t.target.result;
			e(n);
		}),
			(t.onerror = function (t) {
				var e = Th(t.target.error);
				n(e);
			});
	});
}
var _h = !1;
function Th(t) {
	var e = yh.On(ye());
	if (e >= 12.2 && e < 13) {
		var n = 'An internal error was encountered in the Indexed Database server';
		if (t.message.indexOf(n) >= 0) {
			var r = new cs(
				'internal',
				"IOS_INDEXEDDB_BUG1: IndexedDb has thrown '" +
					n +
					"'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."
			);
			return (
				_h ||
					((_h = !0),
					setTimeout(function () {
						throw r;
					}, 0)),
				r
			);
		}
	}
	return t;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ah() {
	return 'undefined' != typeof window ? window : null;
}
function Nh() {
	return 'undefined' != typeof document ? document : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Sh = (function () {
		function t(t, e, n, r, i) {
			(this.cs = t),
				(this.dn = e),
				(this.us = n),
				(this.op = r),
				(this.hs = i),
				(this.ls = new ph()),
				(this.then = this.ls.promise.then.bind(this.ls.promise)),
				this.ls.promise.catch(function (t) {});
		}
		return (
			(t._s = function (e, n, r, i, o) {
				var s = new t(e, n, Date.now() + r, i, o);
				return s.start(r), s;
			}),
			(t.prototype.start = function (t) {
				var e = this;
				this.fs = setTimeout(function () {
					return e.ds();
				}, t);
			}),
			(t.prototype.pn = function () {
				return this.ds();
			}),
			(t.prototype.cancel = function (t) {
				null !== this.fs &&
					(this.clearTimeout(),
					this.ls.reject(new cs(as.CANCELLED, 'Operation cancelled' + (t ? ': ' + t : ''))));
			}),
			(t.prototype.ds = function () {
				var t = this;
				this.cs.ws(function () {
					return null !== t.fs
						? (t.clearTimeout(),
						  t.op().then(function (e) {
								return t.ls.resolve(e);
						  }))
						: Promise.resolve();
				});
			}),
			(t.prototype.clearTimeout = function () {
				null !== this.fs && (this.hs(this), clearTimeout(this.fs), (this.fs = null));
			}),
			t
		);
	})(),
	Dh = (function () {
		function t() {
			var t = this;
			(this.Ts = Promise.resolve()),
				(this.Es = []),
				(this.Is = !1),
				(this.As = []),
				(this.Rs = null),
				(this.gs = !1),
				(this.Ps = []),
				(this.ys = new dh(this, 'async_queue_retry')),
				(this.Vs = function () {
					var e = Nh();
					e && ls('AsyncQueue', 'Visibility state changed to  ', e.visibilityState), t.ys.Vn();
				});
			var e = Nh();
			e &&
				'function' == typeof e.addEventListener &&
				e.addEventListener('visibilitychange', this.Vs);
		}
		return (
			Object.defineProperty(t.prototype, 'ps', {
				get: function () {
					return this.Is;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.ws = function (t) {
				this.enqueue(t);
			}),
			(t.prototype.bs = function (t) {
				this.vs(), this.Ss(t);
			}),
			(t.prototype.Ds = function () {
				if (!this.Is) {
					this.Is = !0;
					var t = Nh();
					t &&
						'function' == typeof t.removeEventListener &&
						t.removeEventListener('visibilitychange', this.Vs);
				}
			}),
			(t.prototype.enqueue = function (t) {
				return this.vs(), this.Is ? new Promise(function (t) {}) : this.Ss(t);
			}),
			(t.prototype.Cs = function (t) {
				var e = this;
				this.ws(function () {
					return e.Es.push(t), e.Ns();
				});
			}),
			(t.prototype.Ns = function () {
				return ae(this, void 0, void 0, function () {
					var t,
						e = this;
					return ce(this, function (n) {
						switch (n.label) {
							case 0:
								if (0 === this.Es.length) return [3, 5];
								n.label = 1;
							case 1:
								return n.trys.push([1, 3, , 4]), [4, this.Es[0]()];
							case 2:
								return n.sent(), this.Es.shift(), this.ys.reset(), [3, 4];
							case 3:
								if (!bh((t = n.sent()))) throw t;
								return ls('AsyncQueue', 'Operation failed with retryable error: ' + t), [3, 4];
							case 4:
								this.Es.length > 0 &&
									this.ys.gn(function () {
										return e.Ns();
									}),
									(n.label = 5);
							case 5:
								return [2];
						}
					});
				});
			}),
			(t.prototype.Ss = function (t) {
				var e = this,
					n = this.Ts.then(function () {
						return (
							(e.gs = !0),
							t()
								.catch(function (t) {
									throw (
										((e.Rs = t),
										(e.gs = !1),
										ps(
											'INTERNAL UNHANDLED ERROR: ',
											((r = (n = t).message || ''),
											n.stack &&
												(r = n.stack.includes(n.message) ? n.stack : n.message + '\n' + n.stack),
											r)
										),
										t)
									);
									var n, r;
								})
								.then(function (t) {
									return (e.gs = !1), t;
								})
						);
					});
				return (this.Ts = n), n;
			}),
			(t.prototype.yn = function (t, e, n) {
				var r = this;
				this.vs(), this.Ps.indexOf(t) > -1 && (e = 0);
				var i = Sh._s(this, t, e, n, function (t) {
					return r.Fs(t);
				});
				return this.As.push(i), i;
			}),
			(t.prototype.vs = function () {
				this.Rs && ys();
			}),
			(t.prototype.xs = function () {}),
			(t.prototype.$s = function () {
				return ae(this, void 0, void 0, function () {
					var t;
					return ce(this, function (e) {
						switch (e.label) {
							case 0:
								return [4, (t = this.Ts)];
							case 1:
								e.sent(), (e.label = 2);
							case 2:
								if (t !== this.Ts) return [3, 0];
								e.label = 3;
							case 3:
								return [2];
						}
					});
				});
			}),
			(t.prototype.ks = function (t) {
				for (var e = 0, n = this.As; e < n.length; e++) if (n[e].dn === t) return !0;
				return !1;
			}),
			(t.prototype.Ms = function (t) {
				var e = this;
				return this.$s().then(function () {
					e.As.sort(function (t, e) {
						return t.us - e.us;
					});
					for (var n = 0, r = e.As; n < r.length; n++) {
						var i = r[n];
						if ((i.pn(), 'all' !== t && i.dn === t)) break;
					}
					return e.$s();
				});
			}),
			(t.prototype.Os = function (t) {
				this.Ps.push(t);
			}),
			(t.prototype.Fs = function (t) {
				var e = this.As.indexOf(t);
				this.As.splice(e, 1);
			}),
			t
		);
	})();
function xh(t, e) {
	if ((ps('AsyncQueue', e + ': ' + t), bh(t))) return new cs(as.UNAVAILABLE, e + ': ' + t);
	throw t;
}
var Lh = function () {
		(this.Ls = void 0), (this.listeners = []);
	},
	Oh = function () {
		(this.Bs = new iu(function (t) {
			return Kc(t);
		}, Hc)),
			(this.onlineState = 'Unknown'),
			(this.qs = new Set());
	};
function kh(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r, i, o, s, u, a;
		return ce(this, function (c) {
			switch (c.label) {
				case 0:
					if (
						((n = ms(t)),
						(r = e.query),
						(i = !1),
						(o = n.Bs.get(r)) || ((i = !0), (o = new Lh())),
						!i)
					)
						return [3, 4];
					c.label = 1;
				case 1:
					return c.trys.push([1, 3, , 4]), (s = o), [4, n.Us(r)];
				case 2:
					return (s.Ls = c.sent()), [3, 4];
				case 3:
					return (
						(u = c.sent()),
						(a = xh(u, "Initialization of query '" + Wc(e.query) + "' failed")),
						[2, void e.onError(a)]
					);
				case 4:
					return (
						n.Bs.set(r, o),
						o.listeners.push(e),
						e.Qs(n.onlineState),
						o.Ls && e.Ws(o.Ls) && Uh(n),
						[2]
					);
			}
		});
	});
}
function Rh(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r, i, o, s;
		return ce(this, function (u) {
			return (
				(n = ms(t)),
				(r = e.query),
				(i = !1),
				(o = n.Bs.get(r)) &&
					(s = o.listeners.indexOf(e)) >= 0 &&
					(o.listeners.splice(s, 1), (i = 0 === o.listeners.length)),
				i ? [2, (n.Bs.delete(r), n.js(r))] : [2]
			);
		});
	});
}
function Ph(t, e) {
	for (var n = ms(t), r = !1, i = 0, o = e; i < o.length; i++) {
		var s = o[i],
			u = s.query,
			a = n.Bs.get(u);
		if (a) {
			for (var c = 0, h = a.listeners; c < h.length; c++) h[c].Ws(s) && (r = !0);
			a.Ls = s;
		}
	}
	r && Uh(n);
}
function Ch(t, e, n) {
	var r = ms(t),
		i = r.Bs.get(e);
	if (i) for (var o = 0, s = i.listeners; o < s.length; o++) s[o].onError(n);
	r.Bs.delete(e);
}
function Uh(t) {
	t.qs.forEach(function (t) {
		t.next();
	});
}
var Vh = (function () {
		function t(t, e, n) {
			(this.query = t),
				(this.Ks = e),
				(this.Gs = !1),
				(this.zs = null),
				(this.onlineState = 'Unknown'),
				(this.options = n || {});
		}
		return (
			(t.prototype.Ws = function (t) {
				if (!this.options.includeMetadataChanges) {
					for (var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
						var i = r[n];
						3 !== i.type && e.push(i);
					}
					t = new Fu(t.query, t.docs, t.Qt, e, t.Wt, t.fromCache, t.jt, !0);
				}
				var o = !1;
				return (
					this.Gs
						? this.Hs(t) && (this.Ks.next(t), (o = !0))
						: this.Ys(t, this.onlineState) && (this.Js(t), (o = !0)),
					(this.zs = t),
					o
				);
			}),
			(t.prototype.onError = function (t) {
				this.Ks.error(t);
			}),
			(t.prototype.Qs = function (t) {
				this.onlineState = t;
				var e = !1;
				return this.zs && !this.Gs && this.Ys(this.zs, t) && (this.Js(this.zs), (e = !0)), e;
			}),
			(t.prototype.Ys = function (t, e) {
				if (!t.fromCache) return !0;
				var n = 'Offline' !== e;
				return !((this.options.Xs && n) || (t.docs.m() && 'Offline' !== e));
			}),
			(t.prototype.Hs = function (t) {
				if (t.docChanges.length > 0) return !0;
				var e = this.zs && this.zs.hasPendingWrites !== t.hasPendingWrites;
				return !(!t.jt && !e) && !0 === this.options.includeMetadataChanges;
			}),
			(t.prototype.Js = function (t) {
				(t = Fu.Gt(t.query, t.docs, t.Wt, t.fromCache)), (this.Gs = !0), this.Ks.next(t);
			}),
			t
		);
	})(),
	Fh = (function () {
		function t(t) {
			this.uid = t;
		}
		return (
			(t.prototype.Zs = function () {
				return null != this.uid;
			}),
			(t.prototype.ti = function () {
				return this.Zs() ? 'uid:' + this.uid : 'anonymous-user';
			}),
			(t.prototype.isEqual = function (t) {
				return t.uid === this.uid;
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (Fh.UNAUTHENTICATED = new Fh(null)),
	(Fh.ei = new Fh('google-credentials-uid')),
	(Fh.ni = new Fh('first-party-uid'));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var jh = (function () {
	function t(t, e) {
		var n = this;
		(this.previousValue = t),
			e &&
				((e.si = function (t) {
					return n.ii(t);
				}),
				(this.ri = function (t) {
					return e.oi(t);
				}));
	}
	return (
		(t.prototype.ii = function (t) {
			return (this.previousValue = Math.max(t, this.previousValue)), this.previousValue;
		}),
		(t.prototype.next = function () {
			var t = ++this.previousValue;
			return this.ri && this.ri(t), t;
		}),
		t
	);
})();
function Mh(t, e) {
	return 'firestore_clients_' + t + '_' + e;
}
function qh(t, e, n) {
	var r = 'firestore_mutations_' + t + '_' + n;
	return e.Zs() && (r += '_' + e.uid), r;
}
function Bh(t, e) {
	return 'firestore_targets_' + t + '_' + e;
}
jh.ai = -1;
var Gh = (function () {
		function t(t, e, n, r) {
			(this.user = t), (this.batchId = e), (this.state = n), (this.error = r);
		}
		return (
			(t.ci = function (e, n, r) {
				var i = JSON.parse(r),
					o =
						'object' == typeof i &&
						-1 !== ['pending', 'acknowledged', 'rejected'].indexOf(i.state) &&
						(void 0 === i.error || 'object' == typeof i.error),
					s = void 0;
				return (
					o &&
						i.error &&
						(o = 'string' == typeof i.error.message && 'string' == typeof i.error.code) &&
						(s = new cs(i.error.code, i.error.message)),
					o
						? new t(e, n, i.state, s)
						: (ps('SharedClientState', "Failed to parse mutation state for ID '" + n + "': " + r),
						  null)
				);
			}),
			(t.prototype.ui = function () {
				var t = { state: this.state, updateTimeMs: Date.now() };
				return (
					this.error && (t.error = { code: this.error.code, message: this.error.message }),
					JSON.stringify(t)
				);
			}),
			t
		);
	})(),
	zh = (function () {
		function t(t, e, n) {
			(this.targetId = t), (this.state = e), (this.error = n);
		}
		return (
			(t.ci = function (e, n) {
				var r = JSON.parse(n),
					i =
						'object' == typeof r &&
						-1 !== ['not-current', 'current', 'rejected'].indexOf(r.state) &&
						(void 0 === r.error || 'object' == typeof r.error),
					o = void 0;
				return (
					i &&
						r.error &&
						(i = 'string' == typeof r.error.message && 'string' == typeof r.error.code) &&
						(o = new cs(r.error.code, r.error.message)),
					i
						? new t(e, r.state, o)
						: (ps('SharedClientState', "Failed to parse target state for ID '" + e + "': " + n),
						  null)
				);
			}),
			(t.prototype.ui = function () {
				var t = { state: this.state, updateTimeMs: Date.now() };
				return (
					this.error && (t.error = { code: this.error.code, message: this.error.message }),
					JSON.stringify(t)
				);
			}),
			t
		);
	})(),
	$h = (function () {
		function t(t, e) {
			(this.clientId = t), (this.activeTargetIds = e);
		}
		return (
			(t.ci = function (e, n) {
				for (
					var r = JSON.parse(n),
						i = 'object' == typeof r && r.activeTargetIds instanceof Array,
						o = Cu(),
						s = 0;
					i && s < r.activeTargetIds.length;
					++s
				)
					(i = cu(r.activeTargetIds[s])), (o = o.add(r.activeTargetIds[s]));
				return i
					? new t(e, o)
					: (ps('SharedClientState', "Failed to parse client data for instance '" + e + "': " + n),
					  null);
			}),
			t
		);
	})(),
	Hh = (function () {
		function t(t, e) {
			(this.clientId = t), (this.onlineState = e);
		}
		return (
			(t.ci = function (e) {
				var n = JSON.parse(e);
				return 'object' == typeof n &&
					-1 !== ['Unknown', 'Online', 'Offline'].indexOf(n.onlineState) &&
					'string' == typeof n.clientId
					? new t(n.clientId, n.onlineState)
					: (ps('SharedClientState', 'Failed to parse online state: ' + e), null);
			}),
			t
		);
	})(),
	Kh = (function () {
		function t() {
			this.activeTargetIds = Cu();
		}
		return (
			(t.prototype.hi = function (t) {
				this.activeTargetIds = this.activeTargetIds.add(t);
			}),
			(t.prototype.li = function (t) {
				this.activeTargetIds = this.activeTargetIds.delete(t);
			}),
			(t.prototype.ui = function () {
				var t = { activeTargetIds: this.activeTargetIds.A(), updateTimeMs: Date.now() };
				return JSON.stringify(t);
			}),
			t
		);
	})(),
	Wh = (function () {
		function t(t, e, n, r, i) {
			(this.window = t),
				(this.fn = e),
				(this.persistenceKey = n),
				(this._i = r),
				(this.fi = null),
				(this.di = null),
				(this.si = null),
				(this.wi = this.mi.bind(this)),
				(this.Ti = new Eu(Ws)),
				(this.Ei = !1),
				(this.Ii = []);
			var o = n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			(this.storage = this.window.localStorage),
				(this.currentUser = i),
				(this.Ai = Mh(this.persistenceKey, this._i)),
				(this.Ri = 'firestore_sequence_number_' + this.persistenceKey),
				(this.Ti = this.Ti.ot(this._i, new Kh())),
				(this.gi = new RegExp('^firestore_clients_' + o + '_([^_]*)$')),
				(this.Pi = new RegExp('^firestore_mutations_' + o + '_(\\d+)(?:_(.*))?$')),
				(this.yi = new RegExp('^firestore_targets_' + o + '_(\\d+)$')),
				(this.Vi = (function (t) {
					return 'firestore_online_state_' + t;
				})(this.persistenceKey)),
				this.window.addEventListener('storage', this.wi);
		}
		return (
			(t.Ln = function (t) {
				return !(!t || !t.localStorage);
			}),
			(t.prototype.start = function () {
				return ae(this, void 0, void 0, function () {
					var t,
						e,
						n,
						r,
						i,
						o,
						s,
						u,
						a,
						c,
						h,
						f = this;
					return ce(this, function (l) {
						switch (l.label) {
							case 0:
								return [4, this.fi.pi()];
							case 1:
								for (t = l.sent(), e = 0, n = t; e < n.length; e++)
									(r = n[e]) !== this._i &&
										(i = this.getItem(Mh(this.persistenceKey, r))) &&
										(o = $h.ci(r, i)) &&
										(this.Ti = this.Ti.ot(o.clientId, o));
								for (
									this.bi(),
										(s = this.storage.getItem(this.Vi)) && (u = this.vi(s)) && this.Si(u),
										a = 0,
										c = this.Ii;
									a < c.length;
									a++
								)
									(h = c[a]), this.mi(h);
								return (
									(this.Ii = []),
									this.window.addEventListener('unload', function () {
										return f.Di();
									}),
									(this.Ei = !0),
									[2]
								);
						}
					});
				});
			}),
			(t.prototype.oi = function (t) {
				this.setItem(this.Ri, JSON.stringify(t));
			}),
			(t.prototype.Ci = function () {
				return this.Ni(this.Ti);
			}),
			(t.prototype.Fi = function (t) {
				var e = !1;
				return (
					this.Ti.forEach(function (n, r) {
						r.activeTargetIds.has(t) && (e = !0);
					}),
					e
				);
			}),
			(t.prototype.xi = function (t) {
				this.$i(t, 'pending');
			}),
			(t.prototype.ki = function (t, e, n) {
				this.$i(t, e, n), this.Mi(t);
			}),
			(t.prototype.Oi = function (t) {
				var e = 'not-current';
				if (this.Fi(t)) {
					var n = this.storage.getItem(Bh(this.persistenceKey, t));
					if (n) {
						var r = zh.ci(t, n);
						r && (e = r.state);
					}
				}
				return this.Li.hi(t), this.bi(), e;
			}),
			(t.prototype.Bi = function (t) {
				this.Li.li(t), this.bi();
			}),
			(t.prototype.qi = function (t) {
				return this.Li.activeTargetIds.has(t);
			}),
			(t.prototype.Ui = function (t) {
				this.removeItem(Bh(this.persistenceKey, t));
			}),
			(t.prototype.Qi = function (t, e, n) {
				this.Wi(t, e, n);
			}),
			(t.prototype.ji = function (t, e, n) {
				var r = this;
				e.forEach(function (t) {
					r.Mi(t);
				}),
					(this.currentUser = t),
					n.forEach(function (t) {
						r.xi(t);
					});
			}),
			(t.prototype.Ki = function (t) {
				this.Gi(t);
			}),
			(t.prototype.Di = function () {
				this.Ei &&
					(this.window.removeEventListener('storage', this.wi),
					this.removeItem(this.Ai),
					(this.Ei = !1));
			}),
			(t.prototype.getItem = function (t) {
				var e = this.storage.getItem(t);
				return ls('SharedClientState', 'READ', t, e), e;
			}),
			(t.prototype.setItem = function (t, e) {
				ls('SharedClientState', 'SET', t, e), this.storage.setItem(t, e);
			}),
			(t.prototype.removeItem = function (t) {
				ls('SharedClientState', 'REMOVE', t), this.storage.removeItem(t);
			}),
			(t.prototype.mi = function (t) {
				var e = this,
					n = t;
				if (n.storageArea === this.storage) {
					if ((ls('SharedClientState', 'EVENT', n.key, n.newValue), n.key === this.Ai))
						return void ps(
							'Received WebStorage notification for local change. Another client might have garbage-collected our state'
						);
					this.fn.Cs(function () {
						return ae(e, void 0, void 0, function () {
							var t, e, r, i, o, s;
							return ce(this, function (u) {
								if (this.Ei) {
									if (null !== n.key)
										if (this.gi.test(n.key)) {
											if (null == n.newValue) return (t = this.zi(n.key)), [2, this.Hi(t, null)];
											if ((e = this.Yi(n.key, n.newValue))) return [2, this.Hi(e.clientId, e)];
										} else if (this.Pi.test(n.key)) {
											if (null !== n.newValue && (r = this.Ji(n.key, n.newValue)))
												return [2, this.Xi(r)];
										} else if (this.yi.test(n.key)) {
											if (null !== n.newValue && (i = this.Zi(n.key, n.newValue)))
												return [2, this.tr(i)];
										} else if (n.key === this.Vi) {
											if (null !== n.newValue && (o = this.vi(n.newValue))) return [2, this.Si(o)];
										} else
											n.key === this.Ri &&
												(s = (function (t) {
													var e = jh.ai;
													if (null != t)
														try {
															var n = JSON.parse(t);
															gs('number' == typeof n), (e = n);
														} catch (r) {
															ps(
																'SharedClientState',
																'Failed to read sequence number from WebStorage',
																r
															);
														}
													return e;
												})(n.newValue)) !== jh.ai &&
												this.si(s);
								} else this.Ii.push(n);
								return [2];
							});
						});
					});
				}
			}),
			Object.defineProperty(t.prototype, 'Li', {
				get: function () {
					return this.Ti.get(this._i);
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.bi = function () {
				this.setItem(this.Ai, this.Li.ui());
			}),
			(t.prototype.$i = function (t, e, n) {
				var r = new Gh(this.currentUser, t, e, n),
					i = qh(this.persistenceKey, this.currentUser, t);
				this.setItem(i, r.ui());
			}),
			(t.prototype.Mi = function (t) {
				var e = qh(this.persistenceKey, this.currentUser, t);
				this.removeItem(e);
			}),
			(t.prototype.Gi = function (t) {
				var e = { clientId: this._i, onlineState: t };
				this.storage.setItem(this.Vi, JSON.stringify(e));
			}),
			(t.prototype.Wi = function (t, e, n) {
				var r = Bh(this.persistenceKey, t),
					i = new zh(t, e, n);
				this.setItem(r, i.ui());
			}),
			(t.prototype.zi = function (t) {
				var e = this.gi.exec(t);
				return e ? e[1] : null;
			}),
			(t.prototype.Yi = function (t, e) {
				var n = this.zi(t);
				return $h.ci(n, e);
			}),
			(t.prototype.Ji = function (t, e) {
				var n = this.Pi.exec(t),
					r = Number(n[1]),
					i = void 0 !== n[2] ? n[2] : null;
				return Gh.ci(new Fh(i), r, e);
			}),
			(t.prototype.Zi = function (t, e) {
				var n = this.yi.exec(t),
					r = Number(n[1]);
				return zh.ci(r, e);
			}),
			(t.prototype.vi = function (t) {
				return Hh.ci(t);
			}),
			(t.prototype.Xi = function (t) {
				return ae(this, void 0, void 0, function () {
					return ce(this, function (e) {
						return t.user.uid === this.currentUser.uid
							? [2, this.fi.er(t.batchId, t.state, t.error)]
							: (ls('SharedClientState', 'Ignoring mutation for non-active user ' + t.user.uid),
							  [2]);
					});
				});
			}),
			(t.prototype.tr = function (t) {
				return this.fi.nr(t.targetId, t.state, t.error);
			}),
			(t.prototype.Hi = function (t, e) {
				var n = this,
					r = e ? this.Ti.ot(t, e) : this.Ti.remove(t),
					i = this.Ni(this.Ti),
					o = this.Ni(r),
					s = [],
					u = [];
				return (
					o.forEach(function (t) {
						i.has(t) || s.push(t);
					}),
					i.forEach(function (t) {
						o.has(t) || u.push(t);
					}),
					this.fi.sr(s, u).then(function () {
						n.Ti = r;
					})
				);
			}),
			(t.prototype.Si = function (t) {
				this.Ti.get(t.clientId) && this.di(t.onlineState);
			}),
			(t.prototype.Ni = function (t) {
				var e = Cu();
				return (
					t.forEach(function (t, n) {
						e = e.kt(n.activeTargetIds);
					}),
					e
				);
			}),
			t
		);
	})(),
	Qh = (function () {
		function t() {
			(this.ir = new Kh()), (this.rr = {}), (this.di = null), (this.si = null);
		}
		return (
			(t.prototype.xi = function (t) {}),
			(t.prototype.ki = function (t, e, n) {}),
			(t.prototype.Oi = function (t) {
				return this.ir.hi(t), this.rr[t] || 'not-current';
			}),
			(t.prototype.Qi = function (t, e, n) {
				this.rr[t] = e;
			}),
			(t.prototype.Bi = function (t) {
				this.ir.li(t);
			}),
			(t.prototype.qi = function (t) {
				return this.ir.activeTargetIds.has(t);
			}),
			(t.prototype.Ui = function (t) {
				delete this.rr[t];
			}),
			(t.prototype.Ci = function () {
				return this.ir.activeTargetIds;
			}),
			(t.prototype.Fi = function (t) {
				return this.ir.activeTargetIds.has(t);
			}),
			(t.prototype.start = function () {
				return (this.ir = new Kh()), Promise.resolve();
			}),
			(t.prototype.ji = function (t, e, n) {}),
			(t.prototype.Ki = function (t) {}),
			(t.prototype.Di = function () {}),
			(t.prototype.oi = function (t) {}),
			t
		);
	})(),
	Xh = (function () {
		function t(t, e, n, r) {
			(this.batchId = t), (this.ar = e), (this.baseMutations = n), (this.mutations = r);
		}
		return (
			(t.prototype.cr = function (t, e, n) {
				for (var r = n.ur, i = 0; i < this.mutations.length; i++) {
					var o = this.mutations[i];
					o.key.isEqual(t) && (e = pc(o, e, r[i]));
				}
				return e;
			}),
			(t.prototype.hr = function (t, e) {
				for (var n = 0, r = this.baseMutations; n < r.length; n++) {
					var i = r[n];
					i.key.isEqual(t) && (e = dc(i, e, e, this.ar));
				}
				for (var o = e, s = 0, u = this.mutations; s < u.length; s++) {
					var a = u[s];
					a.key.isEqual(t) && (e = dc(a, e, o, this.ar));
				}
				return e;
			}),
			(t.prototype.lr = function (t) {
				var e = this,
					n = t;
				return (
					this.mutations.forEach(function (r) {
						var i = e.hr(r.key, t.get(r.key));
						i && (n = n.ot(r.key, i));
					}),
					n
				);
			}),
			(t.prototype.keys = function () {
				return this.mutations.reduce(function (t, e) {
					return t.add(e.key);
				}, Ru());
			}),
			(t.prototype.isEqual = function (t) {
				return (
					this.batchId === t.batchId &&
					Qs(this.mutations, t.mutations, function (t, e) {
						return yc(t, e);
					}) &&
					Qs(this.baseMutations, t.baseMutations, function (t, e) {
						return yc(t, e);
					})
				);
			}),
			t
		);
	})(),
	Yh = (function () {
		function t(t, e, n, r) {
			(this.batch = t), (this._r = e), (this.ur = n), (this.dr = r);
		}
		return (
			(t.from = function (e, n, r) {
				gs(e.mutations.length === r.length);
				for (var i = Ou, o = e.mutations, s = 0; s < o.length; s++)
					i = i.ot(o[s].key, r[s].version);
				return new t(e, n, r, i);
			}),
			t
		);
	})(),
	Jh = (function () {
		function t() {
			(this.wr = new iu(
				function (t) {
					return t.toString();
				},
				function (t, e) {
					return t.isEqual(e);
				}
			)),
				(this.mr = !1);
		}
		return (
			Object.defineProperty(t.prototype, 'readTime', {
				get: function () {
					return this.Tr;
				},
				set: function (t) {
					this.Tr = t;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.Er = function (t, e) {
				this.Ir(), (this.readTime = e), this.wr.set(t.key, t);
			}),
			(t.prototype.Ar = function (t, e) {
				this.Ir(), e && (this.readTime = e), this.wr.set(t, null);
			}),
			(t.prototype.Rr = function (t, e) {
				this.Ir();
				var n = this.wr.get(e);
				return void 0 !== n ? vh.resolve(n) : this.gr(t, e);
			}),
			(t.prototype.getEntries = function (t, e) {
				return this.Pr(t, e);
			}),
			(t.prototype.apply = function (t) {
				return this.Ir(), (this.mr = !0), this.yr(t);
			}),
			(t.prototype.Ir = function () {}),
			t
		);
	})(),
	Zh =
		'The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.',
	tf = (function () {
		function t() {
			this.Vr = [];
		}
		return (
			(t.prototype.pr = function (t) {
				this.Vr.push(t);
			}),
			(t.prototype.br = function () {
				this.Vr.forEach(function (t) {
					return t();
				});
			}),
			t
		);
	})(),
	ef = (function () {
		function t(t, e, n) {
			(this.vr = t), (this.Sr = e), (this.Dr = n);
		}
		return (
			(t.prototype.Cr = function (t, e) {
				var n = this;
				return this.Sr.Nr(t, e).next(function (r) {
					return n.Fr(t, e, r);
				});
			}),
			(t.prototype.Fr = function (t, e, n) {
				return this.vr.Rr(t, e).next(function (t) {
					for (var r = 0, i = n; r < i.length; r++) t = i[r].hr(e, t);
					return t;
				});
			}),
			(t.prototype.$r = function (t, e, n) {
				var r = Du();
				return (
					e.forEach(function (t, e) {
						for (var i = 0, o = n; i < o.length; i++) e = o[i].hr(t, e);
						r = r.ot(t, e);
					}),
					r
				);
			}),
			(t.prototype.kr = function (t, e) {
				var n = this;
				return this.vr.getEntries(t, e).next(function (e) {
					return n.Mr(t, e);
				});
			}),
			(t.prototype.Mr = function (t, e) {
				var n = this;
				return this.Sr.Or(t, e).next(function (r) {
					var i = n.$r(t, e, r),
						o = Su();
					return (
						i.forEach(function (t, e) {
							e || (e = new Oc(t, su.min())), (o = o.ot(t, e));
						}),
						o
					);
				});
			}),
			(t.prototype.Lr = function (t, e, n) {
				return (
					(r = e),
					Ns.F(r.path) && null === r.collectionGroup && 0 === r.filters.length
						? this.Br(t, e.path)
						: Mc(e)
						? this.qr(t, e, n)
						: this.Ur(t, e, n)
				);
				var r;
			}),
			(t.prototype.Br = function (t, e) {
				return this.Cr(t, new Ns(e)).next(function (t) {
					var e = Lu();
					return t instanceof Lc && (e = e.ot(t.key, t)), e;
				});
			}),
			(t.prototype.qr = function (t, e, n) {
				var r = this,
					i = e.collectionGroup,
					o = Lu();
				return this.Dr.Qr(t, i).next(function (s) {
					return vh
						.forEach(s, function (s) {
							var u,
								a,
								c =
									((u = e),
									(a = s.child(i)),
									new Rc(
										a,
										null,
										u.on.slice(),
										u.filters.slice(),
										u.limit,
										u.an,
										u.startAt,
										u.endAt
									));
							return r.Ur(t, c, n).next(function (t) {
								t.forEach(function (t, e) {
									o = o.ot(t, e);
								});
							});
						})
						.next(function () {
							return o;
						});
				});
			}),
			(t.prototype.Ur = function (t, e, n) {
				var r,
					i,
					o = this;
				return this.vr
					.Lr(t, e, n)
					.next(function (n) {
						return (r = n), o.Sr.Wr(t, e);
					})
					.next(function (e) {
						return (
							(i = e),
							o.jr(t, i, r).next(function (t) {
								r = t;
								for (var e = 0, n = i; e < n.length; e++)
									for (var o = n[e], s = 0, u = o.mutations; s < u.length; s++) {
										var a = u[s],
											c = a.key,
											h = r.get(c),
											f = dc(a, h, h, o.ar);
										r = f instanceof Lc ? r.ot(c, f) : r.remove(c);
									}
							})
						);
					})
					.next(function () {
						return (
							r.forEach(function (t, n) {
								Qc(e, n) || (r = r.remove(t));
							}),
							r
						);
					});
			}),
			(t.prototype.jr = function (t, e, n) {
				for (var r = Ru(), i = 0, o = e; i < o.length; i++)
					for (var s = 0, u = o[i].mutations; s < u.length; s++) {
						var a = u[s];
						a instanceof bc && null === n.get(a.key) && (r = r.add(a.key));
					}
				var c = n;
				return this.vr.getEntries(t, r).next(function (t) {
					return (
						t.forEach(function (t, e) {
							null !== e && e instanceof Lc && (c = c.ot(t, e));
						}),
						c
					);
				});
			}),
			t
		);
	})(),
	nf = (function () {
		function t(t, e, n, r) {
			(this.targetId = t), (this.fromCache = e), (this.Kr = n), (this.Gr = r);
		}
		return (
			(t.zr = function (e, n) {
				for (var r = Ru(), i = Ru(), o = 0, s = n.docChanges; o < s.length; o++) {
					var u = s[o];
					switch (u.type) {
						case 0:
							r = r.add(u.doc.key);
							break;
						case 1:
							i = i.add(u.doc.key);
					}
				}
				return new t(e, n.fromCache, r, i);
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rf(t, e) {
	var n = t[0],
		r = t[1],
		i = e[0],
		o = e[1],
		s = Ws(n, i);
	return 0 === s ? Ws(r, o) : s;
}
var of = (function () {
		function t(t) {
			(this.Hr = t), (this.buffer = new Tu(rf)), (this.Yr = 0);
		}
		return (
			(t.prototype.Jr = function () {
				return ++this.Yr;
			}),
			(t.prototype.Xr = function (t) {
				var e = [t, this.Jr()];
				if (this.buffer.size < this.Hr) this.buffer = this.buffer.add(e);
				else {
					var n = this.buffer.last();
					rf(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e));
				}
			}),
			Object.defineProperty(t.prototype, 'maxValue', {
				get: function () {
					return this.buffer.last()[0];
				},
				enumerable: !1,
				configurable: !0
			}),
			t
		);
	})(),
	sf = { Zr: !1, eo: 0, no: 0, so: 0 },
	uf = (function () {
		function t(t, e, n) {
			(this.io = t), (this.ro = e), (this.oo = n);
		}
		return (
			(t.ao = function (e) {
				return new t(e, t.co, t.uo);
			}),
			t
		);
	})();
(uf.ho = -1),
	(uf.lo = 1048576),
	(uf._o = 41943040),
	(uf.co = 10),
	(uf.uo = 1e3),
	(uf.fo = new uf(uf._o, uf.co, uf.uo)),
	(uf.do = new uf(uf.ho, 0, 0));
var af = (function () {
		function t(t, e) {
			(this.wo = t), (this.cs = e), (this.mo = !1), (this.To = null);
		}
		return (
			(t.prototype.start = function (t) {
				this.wo.params.io !== uf.ho && this.Eo(t);
			}),
			(t.prototype.stop = function () {
				this.To && (this.To.cancel(), (this.To = null));
			}),
			Object.defineProperty(t.prototype, 'Ei', {
				get: function () {
					return null !== this.To;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.Eo = function (t) {
				var e = this,
					n = this.mo ? 3e5 : 6e4;
				ls('LruGarbageCollector', 'Garbage collection scheduled in ' + n + 'ms'),
					(this.To = this.cs.yn('lru_garbage_collection', n, function () {
						return ae(e, void 0, void 0, function () {
							var e;
							return ce(this, function (n) {
								switch (n.label) {
									case 0:
										(this.To = null), (this.mo = !0), (n.label = 1);
									case 1:
										return n.trys.push([1, 3, , 7]), [4, t.Io(this.wo)];
									case 2:
										return n.sent(), [3, 7];
									case 3:
										return bh((e = n.sent()))
											? (ls(
													'LruGarbageCollector',
													'Ignoring IndexedDB error during garbage collection: ',
													e
											  ),
											  [3, 6])
											: [3, 4];
									case 4:
										return [4, Sl(e)];
									case 5:
										n.sent(), (n.label = 6);
									case 6:
										return [3, 7];
									case 7:
										return [4, this.Eo(t)];
									case 8:
										return n.sent(), [2];
								}
							});
						});
					}));
			}),
			t
		);
	})(),
	cf = (function () {
		function t(t, e) {
			(this.Ao = t), (this.params = e);
		}
		return (
			(t.prototype.Ro = function (t, e) {
				return this.Ao.Po(t).next(function (t) {
					return Math.floor((e / 100) * t);
				});
			}),
			(t.prototype.yo = function (t, e) {
				var n = this;
				if (0 === e) return vh.resolve(jh.ai);
				var r = new of(e);
				return this.Ao.Ce(t, function (t) {
					return r.Xr(t.sequenceNumber);
				})
					.next(function () {
						return n.Ao.Vo(t, function (t) {
							return r.Xr(t);
						});
					})
					.next(function () {
						return r.maxValue;
					});
			}),
			(t.prototype.po = function (t, e, n) {
				return this.Ao.po(t, e, n);
			}),
			(t.prototype.bo = function (t, e) {
				return this.Ao.bo(t, e);
			}),
			(t.prototype.vo = function (t, e) {
				var n = this;
				return this.params.io === uf.ho
					? (ls('LruGarbageCollector', 'Garbage collection skipped; disabled'), vh.resolve(sf))
					: this.So(t).next(function (r) {
							return r < n.params.io
								? (ls(
										'LruGarbageCollector',
										'Garbage collection skipped; Cache size ' +
											r +
											' is lower than threshold ' +
											n.params.io
								  ),
								  sf)
								: n.Do(t, e);
					  });
			}),
			(t.prototype.So = function (t) {
				return this.Ao.So(t);
			}),
			(t.prototype.Do = function (t, e) {
				var n,
					r,
					i,
					o,
					s,
					u,
					a,
					c = this,
					h = Date.now();
				return this.Ro(t, this.params.ro)
					.next(function (e) {
						return (
							e > c.params.oo
								? (ls(
										'LruGarbageCollector',
										'Capping sequence numbers to collect down to the maximum of ' +
											c.params.oo +
											' from ' +
											e
								  ),
								  (r = c.params.oo))
								: (r = e),
							(o = Date.now()),
							c.yo(t, r)
						);
					})
					.next(function (r) {
						return (n = r), (s = Date.now()), c.po(t, n, e);
					})
					.next(function (e) {
						return (i = e), (u = Date.now()), c.bo(t, n);
					})
					.next(function (t) {
						return (
							(a = Date.now()),
							fs() <= Oe.DEBUG &&
								ls(
									'LruGarbageCollector',
									'LRU Garbage Collection\n\tCounted targets in ' +
										(o - h) +
										'ms\n\tDetermined least recently used ' +
										r +
										' in ' +
										(s - o) +
										'ms\n\tRemoved ' +
										i +
										' targets in ' +
										(u - s) +
										'ms\n\tRemoved ' +
										t +
										' documents in ' +
										(a - u) +
										'ms\nTotal Duration: ' +
										(a - h) +
										'ms'
								),
							vh.resolve({ Zr: !0, eo: r, no: i, so: t })
						);
					});
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function hf(t) {
	for (var e = '', n = 0; n < t.length; n++) e.length > 0 && (e = lf(e)), (e = ff(t.get(n), e));
	return lf(e);
}
function ff(t, e) {
	for (var n = e, r = t.length, i = 0; i < r; i++) {
		var o = t.charAt(i);
		switch (o) {
			case '\0':
				n += '';
				break;
			case '':
				n += '';
				break;
			default:
				n += o;
		}
	}
	return n;
}
function lf(t) {
	return t + '';
}
function pf(t) {
	var e = t.length;
	if ((gs(e >= 2), 2 === e)) return gs('' === t.charAt(0) && '' === t.charAt(1)), _s.P();
	for (var n = e - 2, r = [], i = '', o = 0; o < e; ) {
		var s = t.indexOf('', o);
		switch (((s < 0 || s > n) && ys(), t.charAt(s + 1))) {
			case '':
				var u = t.substring(o, s),
					a = void 0;
				0 === i.length ? (a = u) : ((a = i += u), (i = '')), r.push(a);
				break;
			case '':
				(i += t.substring(o, s)), (i += '\0');
				break;
			case '':
				i += t.substring(o, s + 1);
				break;
			default:
				ys();
		}
		o = s + 2;
	}
	return new _s(r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var df = function (t) {
	this.Co = t;
};
function vf(t, e) {
	if (e.document)
		return (
			(n = t.Co),
			(r = e.document),
			(i = !!e.hasCommittedMutations),
			(o = Sa(n, r.name)),
			(s = _a(r.updateTime)),
			(u = new Nc({ mapValue: { fields: r.fields } })),
			new Lc(o, s, u, { hasCommittedMutations: !!i })
		);
	var n, r, i, o, s, u;
	if (e.noDocument) {
		var a = Ns.$(e.noDocument.path),
			c = wf(e.noDocument.readTime);
		return new Oc(a, c, { hasCommittedMutations: !!e.hasCommittedMutations });
	}
	if (e.unknownDocument) {
		var h = Ns.$(e.unknownDocument.path),
			f = wf(e.unknownDocument.version);
		return new kc(h, f);
	}
	return ys();
}
function yf(t, e, n) {
	var r,
		i,
		o = gf(n),
		s = e.key.path.h().A();
	if (e instanceof Lc) {
		var u = {
				name: Na((r = t.Co), (i = e).key),
				fields: i.rn().mapValue.fields,
				updateTime: wa(r, i.version.Z())
			},
			a = e.hasCommittedMutations;
		return new Hf(null, null, u, a, o, s);
	}
	if (e instanceof Oc) {
		var c = e.key.path.A(),
			h = bf(e.version),
			f = e.hasCommittedMutations;
		return new Hf(null, new zf(c, h), null, f, o, s);
	}
	if (e instanceof kc) {
		var l = e.key.path.A(),
			p = bf(e.version);
		return new Hf(new $f(l, p), null, null, !0, o, s);
	}
	return ys();
}
function gf(t) {
	var e = t.Z();
	return [e.seconds, e.nanoseconds];
}
function mf(t) {
	var e = new ou(t[0], t[1]);
	return su.J(e);
}
function bf(t) {
	var e = t.Z();
	return new jf(e.seconds, e.nanoseconds);
}
function wf(t) {
	var e = new ou(t.seconds, t.nanoseconds);
	return su.J(e);
}
function Ef(t, e) {
	var n = (e.baseMutations || []).map(function (e) {
			return Pa(t.Co, e);
		}),
		r = e.mutations.map(function (e) {
			return Pa(t.Co, e);
		}),
		i = ou.fromMillis(e.localWriteTimeMs);
	return new Xh(e.batchId, i, n, r);
}
function If(t) {
	var e,
		n,
		r = wf(t.readTime),
		i = void 0 !== t.lastLimboFreeSnapshotVersion ? wf(t.lastLimboFreeSnapshotVersion) : su.min();
	return (
		void 0 !== t.query.documents
			? (gs(1 === (n = t.query).documents.length), (e = Bc(Cc(xa(n.documents[0])))))
			: (e = Va(t.query)),
		new gu(e, t.targetId, 0, t.lastListenSequenceNumber, r, i, Ys.fromBase64String(t.resumeToken))
	);
}
function _f(t, e) {
	var n,
		r = bf(e.nt),
		i = bf(e.lastLimboFreeSnapshotVersion);
	n = du(e.target) ? Ca(t.Co, e.target) : Ua(t.Co, e.target);
	var o = e.resumeToken.toBase64();
	return new Wf(e.targetId, lu(e.target), r, o, e.sequenceNumber, i, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Tf = (function () {
	function t(t, e, n, r) {
		(this.userId = t), (this.serializer = e), (this.Dr = n), (this.No = r), (this.Fo = {});
	}
	return (
		(t.xo = function (e, n, r, i) {
			return gs('' !== e.uid), new t(e.Zs() ? e.uid : '', n, r, i);
		}),
		(t.prototype.$o = function (t) {
			var e = !0,
				n = IDBKeyRange.bound(
					[this.userId, Number.NEGATIVE_INFINITY],
					[this.userId, Number.POSITIVE_INFINITY]
				);
			return Sf(t)
				.rs({ index: Bf.userMutationsIndex, range: n }, function (t, n, r) {
					(e = !1), r.done();
				})
				.next(function () {
					return e;
				});
		}),
		(t.prototype.ko = function (t, e, n, r) {
			var i = this,
				o = Df(t),
				s = Sf(t);
			return s.add({}).next(function (u) {
				gs('number' == typeof u);
				for (
					var a = new Xh(u, e, n, r),
						c = (function (t, e, n) {
							var r = n.baseMutations.map(function (e) {
									return Ra(t.Co, e);
								}),
								i = n.mutations.map(function (e) {
									return Ra(t.Co, e);
								});
							return new Bf(e, n.batchId, n.ar.toMillis(), r, i);
						})(i.serializer, i.userId, a),
						h = [],
						f = new Tu(function (t, e) {
							return Ws(t.R(), e.R());
						}),
						l = 0,
						p = r;
					l < p.length;
					l++
				) {
					var d = p[l],
						v = Gf.key(i.userId, d.key.path, u);
					(f = f.add(d.key.path.h())), h.push(s.put(c)), h.push(o.put(v, Gf.PLACEHOLDER));
				}
				return (
					f.forEach(function (e) {
						h.push(i.Dr.Mo(t, e));
					}),
					t.pr(function () {
						i.Fo[u] = a.keys();
					}),
					vh.$n(h).next(function () {
						return a;
					})
				);
			});
		}),
		(t.prototype.Oo = function (t, e) {
			var n = this;
			return Sf(t)
				.get(e)
				.next(function (t) {
					return t ? (gs(t.userId === n.userId), Ef(n.serializer, t)) : null;
				});
		}),
		(t.prototype.Lo = function (t, e) {
			var n = this;
			return this.Fo[e]
				? vh.resolve(this.Fo[e])
				: this.Oo(t, e).next(function (t) {
						if (t) {
							var r = t.keys();
							return (n.Fo[e] = r), r;
						}
						return null;
				  });
		}),
		(t.prototype.Bo = function (t, e) {
			var n = this,
				r = e + 1,
				i = IDBKeyRange.lowerBound([this.userId, r]),
				o = null;
			return Sf(t)
				.rs({ index: Bf.userMutationsIndex, range: i }, function (t, e, i) {
					e.userId === n.userId && (gs(e.batchId >= r), (o = Ef(n.serializer, e))), i.done();
				})
				.next(function () {
					return o;
				});
		}),
		(t.prototype.qo = function (t) {
			var e = IDBKeyRange.upperBound([this.userId, Number.POSITIVE_INFINITY]),
				n = -1;
			return Sf(t)
				.rs({ index: Bf.userMutationsIndex, range: e, reverse: !0 }, function (t, e, r) {
					(n = e.batchId), r.done();
				})
				.next(function () {
					return n;
				});
		}),
		(t.prototype.Uo = function (t) {
			var e = this,
				n = IDBKeyRange.bound([this.userId, -1], [this.userId, Number.POSITIVE_INFINITY]);
			return Sf(t)
				.ts(Bf.userMutationsIndex, n)
				.next(function (t) {
					return t.map(function (t) {
						return Ef(e.serializer, t);
					});
				});
		}),
		(t.prototype.Nr = function (t, e) {
			var n = this,
				r = Gf.prefixForPath(this.userId, e.path),
				i = IDBKeyRange.lowerBound(r),
				o = [];
			return Df(t)
				.rs({ range: i }, function (r, i, s) {
					var u = r[0],
						a = r[1],
						c = r[2],
						h = pf(a);
					if (u === n.userId && e.path.isEqual(h))
						return Sf(t)
							.get(c)
							.next(function (t) {
								if (!t) throw ys();
								gs(t.userId === n.userId), o.push(Ef(n.serializer, t));
							});
					s.done();
				})
				.next(function () {
					return o;
				});
		}),
		(t.prototype.Or = function (t, e) {
			var n = this,
				r = new Tu(Ws),
				i = [];
			return (
				e.forEach(function (e) {
					var o = Gf.prefixForPath(n.userId, e.path),
						s = IDBKeyRange.lowerBound(o),
						u = Df(t).rs({ range: s }, function (t, i, o) {
							var s = t[0],
								u = t[1],
								a = t[2],
								c = pf(u);
							s === n.userId && e.path.isEqual(c) ? (r = r.add(a)) : o.done();
						});
					i.push(u);
				}),
				vh.$n(i).next(function () {
					return n.Qo(t, r);
				})
			);
		}),
		(t.prototype.Wr = function (t, e) {
			var n = this,
				r = e.path,
				i = r.length + 1,
				o = Gf.prefixForPath(this.userId, r),
				s = IDBKeyRange.lowerBound(o),
				u = new Tu(Ws);
			return Df(t)
				.rs({ range: s }, function (t, e, o) {
					var s = t[0],
						a = t[1],
						c = t[2],
						h = pf(a);
					s === n.userId && r.T(h) ? h.length === i && (u = u.add(c)) : o.done();
				})
				.next(function () {
					return n.Qo(t, u);
				});
		}),
		(t.prototype.Qo = function (t, e) {
			var n = this,
				r = [],
				i = [];
			return (
				e.forEach(function (e) {
					i.push(
						Sf(t)
							.get(e)
							.next(function (t) {
								if (null === t) throw ys();
								gs(t.userId === n.userId), r.push(Ef(n.serializer, t));
							})
					);
				}),
				vh.$n(i).next(function () {
					return r;
				})
			);
		}),
		(t.prototype.Wo = function (t, e) {
			var n = this;
			return Nf(t.jo, this.userId, e).next(function (r) {
				return (
					t.pr(function () {
						n.Ko(e.batchId);
					}),
					vh.forEach(r, function (e) {
						return n.No.Go(t, e);
					})
				);
			});
		}),
		(t.prototype.Ko = function (t) {
			delete this.Fo[t];
		}),
		(t.prototype.zo = function (t) {
			var e = this;
			return this.$o(t).next(function (n) {
				if (!n) return vh.resolve();
				var r = IDBKeyRange.lowerBound(Gf.prefixForUser(e.userId)),
					i = [];
				return Df(t)
					.rs({ range: r }, function (t, n, r) {
						if (t[0] === e.userId) {
							var o = pf(t[1]);
							i.push(o);
						} else r.done();
					})
					.next(function () {
						gs(0 === i.length);
					});
			});
		}),
		(t.prototype.Ho = function (t, e) {
			return Af(t, this.userId, e);
		}),
		(t.prototype.Yo = function (t) {
			var e = this;
			return xf(t)
				.get(this.userId)
				.next(function (t) {
					return t || new qf(e.userId, -1, '');
				});
		}),
		t
	);
})();
function Af(t, e, n) {
	var r = Gf.prefixForPath(e, n.path),
		i = r[1],
		o = IDBKeyRange.lowerBound(r),
		s = !1;
	return Df(t)
		.rs({ range: o, ss: !0 }, function (t, n, r) {
			var o = t[0],
				u = t[1];
			t[2], o === e && u === i && (s = !0), r.done();
		})
		.next(function () {
			return s;
		});
}
function Nf(t, e, n) {
	var r = t.store(Bf.store),
		i = t.store(Gf.store),
		o = [],
		s = IDBKeyRange.only(n.batchId),
		u = 0,
		a = r.rs({ range: s }, function (t, e, n) {
			return u++, n.delete();
		});
	o.push(
		a.next(function () {
			gs(1 === u);
		})
	);
	for (var c = [], h = 0, f = n.mutations; h < f.length; h++) {
		var l = f[h],
			p = Gf.key(e, l.key.path, n.batchId);
		o.push(i.delete(p)), c.push(l.key);
	}
	return vh.$n(o).next(function () {
		return c;
	});
}
function Sf(t) {
	return hl.Qn(t, Bf.store);
}
function Df(t) {
	return hl.Qn(t, Gf.store);
}
function xf(t) {
	return hl.Qn(t, qf.store);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Lf = (function () {
		function t(t, e) {
			(this.serializer = t), (this.Dr = e);
		}
		return (
			(t.prototype.Er = function (t, e, n) {
				return Rf(t).put(Pf(e), n);
			}),
			(t.prototype.Ar = function (t, e) {
				var n = Rf(t),
					r = Pf(e);
				return n.delete(r);
			}),
			(t.prototype.updateMetadata = function (t, e) {
				var n = this;
				return this.getMetadata(t).next(function (r) {
					return (r.byteSize += e), n.Jo(t, r);
				});
			}),
			(t.prototype.Rr = function (t, e) {
				var n = this;
				return Rf(t)
					.get(Pf(e))
					.next(function (t) {
						return n.Xo(t);
					});
			}),
			(t.prototype.Zo = function (t, e) {
				var n = this;
				return Rf(t)
					.get(Pf(e))
					.next(function (t) {
						var e = n.Xo(t);
						return e ? { ta: e, size: Cf(t) } : null;
					});
			}),
			(t.prototype.getEntries = function (t, e) {
				var n = this,
					r = Du();
				return this.ea(t, e, function (t, e) {
					var i = n.Xo(e);
					r = r.ot(t, i);
				}).next(function () {
					return r;
				});
			}),
			(t.prototype.na = function (t, e) {
				var n = this,
					r = Du(),
					i = new Eu(Ns.i);
				return this.ea(t, e, function (t, e) {
					var o = n.Xo(e);
					o ? ((r = r.ot(t, o)), (i = i.ot(t, Cf(e)))) : ((r = r.ot(t, null)), (i = i.ot(t, 0)));
				}).next(function () {
					return { sa: r, ia: i };
				});
			}),
			(t.prototype.ea = function (t, e, n) {
				if (e.m()) return vh.resolve();
				var r = IDBKeyRange.bound(e.first().path.A(), e.last().path.A()),
					i = e._t(),
					o = i.It();
				return Rf(t)
					.rs({ range: r }, function (t, e, r) {
						for (var s = Ns.$(t); o && Ns.i(o, s) < 0; ) n(o, null), (o = i.It());
						o && o.isEqual(s) && (n(o, e), (o = i.At() ? i.It() : null)),
							o ? r.Xn(o.path.A()) : r.done();
					})
					.next(function () {
						for (; o; ) n(o, null), (o = i.At() ? i.It() : null);
					});
			}),
			(t.prototype.Lr = function (t, e, n) {
				var r = this,
					i = Lu(),
					o = e.path.length + 1,
					s = {};
				if (n.isEqual(su.min())) {
					var u = e.path.A();
					s.range = IDBKeyRange.lowerBound(u);
				} else {
					var a = e.path.A(),
						c = gf(n);
					(s.range = IDBKeyRange.lowerBound([a, c], !0)), (s.index = Hf.collectionReadTimeIndex);
				}
				return Rf(t)
					.rs(s, function (t, n, s) {
						if (t.length === o) {
							var u = vf(r.serializer, n);
							e.path.T(u.key.path) ? u instanceof Lc && Qc(e, u) && (i = i.ot(u.key, u)) : s.done();
						}
					})
					.next(function () {
						return i;
					});
			}),
			(t.prototype.ra = function (t) {
				return new Of(this, !!t && t.oa);
			}),
			(t.prototype.aa = function (t) {
				return this.getMetadata(t).next(function (t) {
					return t.byteSize;
				});
			}),
			(t.prototype.getMetadata = function (t) {
				return kf(t)
					.get(Kf.key)
					.next(function (t) {
						return gs(!!t), t;
					});
			}),
			(t.prototype.Jo = function (t, e) {
				return kf(t).put(Kf.key, e);
			}),
			(t.prototype.Xo = function (t) {
				if (t) {
					var e = vf(this.serializer, t);
					return e instanceof Oc && e.version.isEqual(su.min()) ? null : e;
				}
				return null;
			}),
			t
		);
	})(),
	Of = (function (t) {
		function e(e, n) {
			var r = this;
			return (
				((r = t.call(this) || this).ca = e),
				(r.oa = n),
				(r.ua = new iu(
					function (t) {
						return t.toString();
					},
					function (t, e) {
						return t.isEqual(e);
					}
				)),
				r
			);
		}
		return (
			se(e, t),
			(e.prototype.yr = function (t) {
				var e = this,
					n = [],
					r = 0,
					i = new Tu(function (t, e) {
						return Ws(t.R(), e.R());
					});
				return (
					this.wr.forEach(function (o, s) {
						var u = e.ua.get(o);
						if (s) {
							var a = yf(e.ca.serializer, s, e.readTime);
							i = i.add(o.path.h());
							var c = Cf(a);
							(r += c - u), n.push(e.ca.Er(t, o, a));
						} else if (((r -= u), e.oa)) {
							var h = yf(e.ca.serializer, new Oc(o, su.min()), e.readTime);
							n.push(e.ca.Er(t, o, h));
						} else n.push(e.ca.Ar(t, o));
					}),
					i.forEach(function (r) {
						n.push(e.ca.Dr.Mo(t, r));
					}),
					n.push(this.ca.updateMetadata(t, r)),
					vh.$n(n)
				);
			}),
			(e.prototype.gr = function (t, e) {
				var n = this;
				return this.ca.Zo(t, e).next(function (t) {
					return null === t ? (n.ua.set(e, 0), null) : (n.ua.set(e, t.size), t.ta);
				});
			}),
			(e.prototype.Pr = function (t, e) {
				var n = this;
				return this.ca.na(t, e).next(function (t) {
					var e = t.sa;
					return (
						t.ia.forEach(function (t, e) {
							n.ua.set(t, e);
						}),
						e
					);
				});
			}),
			e
		);
	})(Jh);
function kf(t) {
	return hl.Qn(t, Kf.store);
}
function Rf(t) {
	return hl.Qn(t, Hf.store);
}
function Pf(t) {
	return t.path.A();
}
function Cf(t) {
	var e;
	if (t.document) e = t.document;
	else if (t.unknownDocument) e = t.unknownDocument;
	else {
		if (!t.noDocument) throw ys();
		e = t.noDocument;
	}
	return JSON.stringify(e).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Uf = (function () {
		function t() {
			this.ha = new Vf();
		}
		return (
			(t.prototype.Mo = function (t, e) {
				return this.ha.add(e), vh.resolve();
			}),
			(t.prototype.Qr = function (t, e) {
				return vh.resolve(this.ha.getEntries(e));
			}),
			t
		);
	})(),
	Vf = (function () {
		function t() {
			this.index = {};
		}
		return (
			(t.prototype.add = function (t) {
				var e = t._(),
					n = t.h(),
					r = this.index[e] || new Tu(_s.i),
					i = !r.has(n);
				return (this.index[e] = r.add(n)), i;
			}),
			(t.prototype.has = function (t) {
				var e = t._(),
					n = t.h(),
					r = this.index[e];
				return r && r.has(n);
			}),
			(t.prototype.getEntries = function (t) {
				return (this.index[t] || new Tu(_s.i)).A();
			}),
			t
		);
	})(),
	Ff = (function () {
		function t(t) {
			this.serializer = t;
		}
		return (
			(t.prototype.createOrUpgrade = function (t, e, n, r) {
				var i = this;
				gs(n < r && n >= 0 && r <= 10);
				var o = new wh('createOrUpgrade', e);
				n < 1 &&
					r >= 1 &&
					(t.createObjectStore(Mf.store),
					(function (t) {
						t.createObjectStore(qf.store, { keyPath: qf.keyPath }),
							t
								.createObjectStore(Bf.store, { keyPath: Bf.keyPath, autoIncrement: !0 })
								.createIndex(Bf.userMutationsIndex, Bf.userMutationsKeyPath, { unique: !0 }),
							t.createObjectStore(Gf.store);
					})(t),
					Jf(t),
					(function (t) {
						t.createObjectStore(Hf.store);
					})(t));
				var s = vh.resolve();
				return (
					n < 3 &&
						r >= 3 &&
						(0 !== n &&
							((function (t) {
								t.deleteObjectStore(Qf.store),
									t.deleteObjectStore(Wf.store),
									t.deleteObjectStore(Xf.store);
							})(t),
							Jf(t)),
						(s = s.next(function () {
							return (function (t) {
								var e = t.store(Xf.store),
									n = new Xf(0, 0, su.min().Z(), 0);
								return e.put(Xf.key, n);
							})(o);
						}))),
					n < 4 &&
						r >= 4 &&
						(0 !== n &&
							(s = s.next(function () {
								return (function (t, e) {
									return e
										.store(Bf.store)
										.ts()
										.next(function (n) {
											t.deleteObjectStore(Bf.store),
												t
													.createObjectStore(Bf.store, { keyPath: Bf.keyPath, autoIncrement: !0 })
													.createIndex(Bf.userMutationsIndex, Bf.userMutationsKeyPath, {
														unique: !0
													});
											var r = e.store(Bf.store),
												i = n.map(function (t) {
													return r.put(t);
												});
											return vh.$n(i);
										});
								})(t, o);
							})),
						(s = s.next(function () {
							!(function (t) {
								t.createObjectStore(Zf.store, { keyPath: Zf.keyPath });
							})(t);
						}))),
					n < 5 &&
						r >= 5 &&
						(s = s.next(function () {
							return i.removeAcknowledgedMutations(o);
						})),
					n < 6 &&
						r >= 6 &&
						(s = s.next(function () {
							return (
								(function (t) {
									t.createObjectStore(Kf.store);
								})(t),
								i.addDocumentGlobal(o)
							);
						})),
					n < 7 &&
						r >= 7 &&
						(s = s.next(function () {
							return i.ensureSequenceNumbers(o);
						})),
					n < 8 &&
						r >= 8 &&
						(s = s.next(function () {
							return i.createCollectionParentIndex(t, o);
						})),
					n < 9 &&
						r >= 9 &&
						(s = s.next(function () {
							!(function (t) {
								t.objectStoreNames.contains('remoteDocumentChanges') &&
									t.deleteObjectStore('remoteDocumentChanges');
							})(t),
								(function (t) {
									var e = t.objectStore(Hf.store);
									e.createIndex(Hf.readTimeIndex, Hf.readTimeIndexPath, { unique: !1 }),
										e.createIndex(Hf.collectionReadTimeIndex, Hf.collectionReadTimeIndexPath, {
											unique: !1
										});
								})(e);
						})),
					n < 10 &&
						r >= 10 &&
						(s = s.next(function () {
							return i.rewriteCanonicalIds(o);
						})),
					s
				);
			}),
			(t.prototype.addDocumentGlobal = function (t) {
				var e = 0;
				return t
					.store(Hf.store)
					.rs(function (t, n) {
						e += Cf(n);
					})
					.next(function () {
						var n = new Kf(e);
						return t.store(Kf.store).put(Kf.key, n);
					});
			}),
			(t.prototype.removeAcknowledgedMutations = function (t) {
				var e = this,
					n = t.store(qf.store),
					r = t.store(Bf.store);
				return n.ts().next(function (n) {
					return vh.forEach(n, function (n) {
						var i = IDBKeyRange.bound([n.userId, -1], [n.userId, n.lastAcknowledgedBatchId]);
						return r.ts(Bf.userMutationsIndex, i).next(function (r) {
							return vh.forEach(r, function (r) {
								gs(r.userId === n.userId);
								var i = Ef(e.serializer, r);
								return Nf(t, n.userId, i).next(function () {});
							});
						});
					});
				});
			}),
			(t.prototype.ensureSequenceNumbers = function (t) {
				var e = t.store(Qf.store),
					n = t.store(Hf.store);
				return t
					.store(Xf.store)
					.get(Xf.key)
					.next(function (t) {
						var r = [];
						return n
							.rs(function (n, i) {
								var o = new _s(n),
									s = [0, hf(o)];
								r.push(
									e.get(s).next(function (n) {
										return n
											? vh.resolve()
											: ((r = o), e.put(new Qf(0, hf(r), t.highestListenSequenceNumber)));
										var r;
									})
								);
							})
							.next(function () {
								return vh.$n(r);
							});
					});
			}),
			(t.prototype.createCollectionParentIndex = function (t, e) {
				t.createObjectStore(Yf.store, { keyPath: Yf.keyPath });
				var n = e.store(Yf.store),
					r = new Vf(),
					i = function (t) {
						if (r.add(t)) {
							var e = t._(),
								i = t.h();
							return n.put({ collectionId: e, parent: hf(i) });
						}
					};
				return e
					.store(Hf.store)
					.rs({ ss: !0 }, function (t, e) {
						var n = new _s(t);
						return i(n.h());
					})
					.next(function () {
						return e.store(Gf.store).rs({ ss: !0 }, function (t, e) {
							t[0];
							var n = t[1],
								r = (t[2], pf(n));
							return i(r.h());
						});
					});
			}),
			(t.prototype.rewriteCanonicalIds = function (t) {
				var e = this,
					n = t.store(Wf.store);
				return n.rs(function (t, r) {
					var i = If(r),
						o = _f(e.serializer, i);
					return n.put(o);
				});
			}),
			t
		);
	})(),
	jf = function (t, e) {
		(this.seconds = t), (this.nanoseconds = e);
	},
	Mf = function (t, e, n) {
		(this.ownerId = t), (this.allowTabSynchronization = e), (this.leaseTimestampMs = n);
	};
(Mf.store = 'owner'), (Mf.key = 'owner');
var qf = function (t, e, n) {
	(this.userId = t), (this.lastAcknowledgedBatchId = e), (this.lastStreamToken = n);
};
(qf.store = 'mutationQueues'), (qf.keyPath = 'userId');
var Bf = function (t, e, n, r, i) {
	(this.userId = t),
		(this.batchId = e),
		(this.localWriteTimeMs = n),
		(this.baseMutations = r),
		(this.mutations = i);
};
(Bf.store = 'mutations'),
	(Bf.keyPath = 'batchId'),
	(Bf.userMutationsIndex = 'userMutationsIndex'),
	(Bf.userMutationsKeyPath = ['userId', 'batchId']);
var Gf = (function () {
	function t() {}
	return (
		(t.prefixForUser = function (t) {
			return [t];
		}),
		(t.prefixForPath = function (t, e) {
			return [t, hf(e)];
		}),
		(t.key = function (t, e, n) {
			return [t, hf(e), n];
		}),
		t
	);
})();
(Gf.store = 'documentMutations'), (Gf.PLACEHOLDER = new Gf());
var zf = function (t, e) {
		(this.path = t), (this.readTime = e);
	},
	$f = function (t, e) {
		(this.path = t), (this.version = e);
	},
	Hf = function (t, e, n, r, i, o) {
		(this.unknownDocument = t),
			(this.noDocument = e),
			(this.document = n),
			(this.hasCommittedMutations = r),
			(this.readTime = i),
			(this.parentPath = o);
	};
(Hf.store = 'remoteDocuments'),
	(Hf.readTimeIndex = 'readTimeIndex'),
	(Hf.readTimeIndexPath = 'readTime'),
	(Hf.collectionReadTimeIndex = 'collectionReadTimeIndex'),
	(Hf.collectionReadTimeIndexPath = ['parentPath', 'readTime']);
var Kf = function (t) {
	this.byteSize = t;
};
(Kf.store = 'remoteDocumentGlobal'), (Kf.key = 'remoteDocumentGlobalKey');
var Wf = function (t, e, n, r, i, o, s) {
	(this.targetId = t),
		(this.canonicalId = e),
		(this.readTime = n),
		(this.resumeToken = r),
		(this.lastListenSequenceNumber = i),
		(this.lastLimboFreeSnapshotVersion = o),
		(this.query = s);
};
(Wf.store = 'targets'),
	(Wf.keyPath = 'targetId'),
	(Wf.queryTargetsIndexName = 'queryTargetsIndex'),
	(Wf.queryTargetsKeyPath = ['canonicalId', 'targetId']);
var Qf = function (t, e, n) {
	(this.targetId = t), (this.path = e), (this.sequenceNumber = n);
};
(Qf.store = 'targetDocuments'),
	(Qf.keyPath = ['targetId', 'path']),
	(Qf.documentTargetsIndex = 'documentTargetsIndex'),
	(Qf.documentTargetsKeyPath = ['path', 'targetId']);
var Xf = function (t, e, n, r) {
	(this.highestTargetId = t),
		(this.highestListenSequenceNumber = e),
		(this.lastRemoteSnapshotVersion = n),
		(this.targetCount = r);
};
(Xf.key = 'targetGlobalKey'), (Xf.store = 'targetGlobal');
var Yf = function (t, e) {
	(this.collectionId = t), (this.parent = e);
};
function Jf(t) {
	t
		.createObjectStore(Qf.store, { keyPath: Qf.keyPath })
		.createIndex(Qf.documentTargetsIndex, Qf.documentTargetsKeyPath, { unique: !0 }),
		t
			.createObjectStore(Wf.store, { keyPath: Wf.keyPath })
			.createIndex(Wf.queryTargetsIndexName, Wf.queryTargetsKeyPath, { unique: !0 }),
		t.createObjectStore(Xf.store);
}
(Yf.store = 'collectionParents'), (Yf.keyPath = ['collectionId', 'parent']);
var Zf = function (t, e, n, r) {
	(this.clientId = t), (this.updateTimeMs = e), (this.networkEnabled = n), (this.inForeground = r);
};
(Zf.store = 'clientMetadata'), (Zf.keyPath = 'clientId');
var tl = pe(
		pe(
			pe(
				[qf.store, Bf.store, Gf.store, Hf.store, Wf.store, Mf.store, Xf.store, Qf.store],
				[Zf.store]
			),
			[Kf.store]
		),
		[Yf.store]
	),
	el = (function () {
		function t() {
			this.la = new Vf();
		}
		return (
			(t.prototype.Mo = function (t, e) {
				var n = this;
				if (!this.la.has(e)) {
					var r = e._(),
						i = e.h();
					t.pr(function () {
						n.la.add(e);
					});
					var o = { collectionId: r, parent: hf(i) };
					return nl(t).put(o);
				}
				return vh.resolve();
			}),
			(t.prototype.Qr = function (t, e) {
				var n = [],
					r = IDBKeyRange.bound([e, ''], [Xs(e), ''], !1, !0);
				return nl(t)
					.ts(r)
					.next(function (t) {
						for (var r = 0, i = t; r < i.length; r++) {
							var o = i[r];
							if (o.collectionId !== e) break;
							n.push(pf(o.parent));
						}
						return n;
					});
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function nl(t) {
	return hl.Qn(t, Yf.store);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var rl = (function () {
		function t(t) {
			this._a = t;
		}
		return (
			(t.prototype.next = function () {
				return (this._a += 2), this._a;
			}),
			(t.fa = function () {
				return new t(0);
			}),
			(t.da = function () {
				return new t(-1);
			}),
			t
		);
	})(),
	il = (function () {
		function t(t, e) {
			(this.No = t), (this.serializer = e);
		}
		return (
			(t.prototype.wa = function (t) {
				var e = this;
				return this.ma(t).next(function (n) {
					var r = new rl(n.highestTargetId);
					return (
						(n.highestTargetId = r.next()),
						e.Ta(t, n).next(function () {
							return n.highestTargetId;
						})
					);
				});
			}),
			(t.prototype.Ea = function (t) {
				return this.ma(t).next(function (t) {
					return su.J(
						new ou(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds)
					);
				});
			}),
			(t.prototype.Ia = function (t) {
				return this.ma(t).next(function (t) {
					return t.highestListenSequenceNumber;
				});
			}),
			(t.prototype.Aa = function (t, e, n) {
				var r = this;
				return this.ma(t).next(function (i) {
					return (
						(i.highestListenSequenceNumber = e),
						n && (i.lastRemoteSnapshotVersion = n.Z()),
						e > i.highestListenSequenceNumber && (i.highestListenSequenceNumber = e),
						r.Ta(t, i)
					);
				});
			}),
			(t.prototype.Ra = function (t, e) {
				var n = this;
				return this.ga(t, e).next(function () {
					return n.ma(t).next(function (r) {
						return (r.targetCount += 1), n.Pa(e, r), n.Ta(t, r);
					});
				});
			}),
			(t.prototype.ya = function (t, e) {
				return this.ga(t, e);
			}),
			(t.prototype.Va = function (t, e) {
				var n = this;
				return this.pa(t, e.targetId)
					.next(function () {
						return ol(t).delete(e.targetId);
					})
					.next(function () {
						return n.ma(t);
					})
					.next(function (e) {
						return gs(e.targetCount > 0), (e.targetCount -= 1), n.Ta(t, e);
					});
			}),
			(t.prototype.po = function (t, e, n) {
				var r = this,
					i = 0,
					o = [];
				return ol(t)
					.rs(function (s, u) {
						var a = If(u);
						a.sequenceNumber <= e && null === n.get(a.targetId) && (i++, o.push(r.Va(t, a)));
					})
					.next(function () {
						return vh.$n(o);
					})
					.next(function () {
						return i;
					});
			}),
			(t.prototype.Ce = function (t, e) {
				return ol(t).rs(function (t, n) {
					var r = If(n);
					e(r);
				});
			}),
			(t.prototype.ma = function (t) {
				return sl(t)
					.get(Xf.key)
					.next(function (t) {
						return gs(null !== t), t;
					});
			}),
			(t.prototype.Ta = function (t, e) {
				return sl(t).put(Xf.key, e);
			}),
			(t.prototype.ga = function (t, e) {
				return ol(t).put(_f(this.serializer, e));
			}),
			(t.prototype.Pa = function (t, e) {
				var n = !1;
				return (
					t.targetId > e.highestTargetId && ((e.highestTargetId = t.targetId), (n = !0)),
					t.sequenceNumber > e.highestListenSequenceNumber &&
						((e.highestListenSequenceNumber = t.sequenceNumber), (n = !0)),
					n
				);
			}),
			(t.prototype.ba = function (t) {
				return this.ma(t).next(function (t) {
					return t.targetCount;
				});
			}),
			(t.prototype.va = function (t, e) {
				var n = lu(e),
					r = IDBKeyRange.bound([n, Number.NEGATIVE_INFINITY], [n, Number.POSITIVE_INFINITY]),
					i = null;
				return ol(t)
					.rs({ range: r, index: Wf.queryTargetsIndexName }, function (t, n, r) {
						var o = If(n);
						pu(e, o.target) && ((i = o), r.done());
					})
					.next(function () {
						return i;
					});
			}),
			(t.prototype.Sa = function (t, e, n) {
				var r = this,
					i = [],
					o = ul(t);
				return (
					e.forEach(function (e) {
						var s = hf(e.path);
						i.push(o.put(new Qf(n, s))), i.push(r.No.Da(t, n, e));
					}),
					vh.$n(i)
				);
			}),
			(t.prototype.Ca = function (t, e, n) {
				var r = this,
					i = ul(t);
				return vh.forEach(e, function (e) {
					var o = hf(e.path);
					return vh.$n([i.delete([n, o]), r.No.Na(t, n, e)]);
				});
			}),
			(t.prototype.pa = function (t, e) {
				var n = ul(t),
					r = IDBKeyRange.bound([e], [e + 1], !1, !0);
				return n.delete(r);
			}),
			(t.prototype.Fa = function (t, e) {
				var n = IDBKeyRange.bound([e], [e + 1], !1, !0),
					r = ul(t),
					i = Ru();
				return r
					.rs({ range: n, ss: !0 }, function (t, e, n) {
						var r = pf(t[1]),
							o = new Ns(r);
						i = i.add(o);
					})
					.next(function () {
						return i;
					});
			}),
			(t.prototype.Ho = function (t, e) {
				var n = hf(e.path),
					r = IDBKeyRange.bound([n], [Xs(n)], !1, !0),
					i = 0;
				return ul(t)
					.rs({ index: Qf.documentTargetsIndex, ss: !0, range: r }, function (t, e, n) {
						var r = t[0];
						t[1], 0 !== r && (i++, n.done());
					})
					.next(function () {
						return i > 0;
					});
			}),
			(t.prototype.Ue = function (t, e) {
				return ol(t)
					.get(e)
					.next(function (t) {
						return t ? If(t) : null;
					});
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ol(t) {
	return hl.Qn(t, Wf.store);
}
function sl(t) {
	return hl.Qn(t, Xf.store);
}
function ul(t) {
	return hl.Qn(t, Qf.store);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var al =
		'Failed to obtain exclusive access to the persistence layer. To allow shared access, make sure to invoke `enablePersistence()` with `synchronizeTabs:true` in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.',
	cl = (function (t) {
		function e(e, n) {
			var r = this;
			return ((r = t.call(this) || this).jo = e), (r.xa = n), r;
		}
		return se(e, t), e;
	})(tf),
	hl = (function () {
		function t(e, n, r, i, o, s, u, a, c, h) {
			if (
				((this.allowTabSynchronization = e),
				(this.persistenceKey = n),
				(this.clientId = r),
				(this.fn = o),
				(this.window = s),
				(this.document = u),
				(this.$a = c),
				(this.ka = h),
				(this.Ma = null),
				(this.Oa = !1),
				(this.isPrimary = !1),
				(this.networkEnabled = !0),
				(this.La = null),
				(this.inForeground = !1),
				(this.Ba = null),
				(this.qa = null),
				(this.Ua = Number.NEGATIVE_INFINITY),
				(this.Qa = function (t) {
					return Promise.resolve();
				}),
				!t.Ln())
			)
				throw new cs(
					as.UNIMPLEMENTED,
					'This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.'
				);
			var f, l;
			(this.No = new pl(this, i)),
				(this.Wa = n + 'main'),
				(this.serializer = new df(a)),
				(this.ja = new yh(this.Wa, 10, new Ff(this.serializer))),
				(this.Ka = new il(this.No, this.serializer)),
				(this.Dr = new el()),
				(this.vr = ((f = this.serializer), (l = this.Dr), new Lf(f, l))),
				this.window && this.window.localStorage
					? (this.Ga = this.window.localStorage)
					: ((this.Ga = null),
					  !1 === h &&
							ps(
								'IndexedDbPersistence',
								'LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page.'
							));
		}
		return (
			(t.Qn = function (t, e) {
				if (t instanceof cl) return yh.Qn(t.jo, e);
				throw ys();
			}),
			(t.prototype.start = function () {
				var t = this;
				return this.za()
					.then(function () {
						if (!t.isPrimary && !t.allowTabSynchronization)
							throw new cs(as.FAILED_PRECONDITION, al);
						return (
							t.Ha(),
							t.Ya(),
							t.Ja(),
							t.runTransaction('getHighestListenSequenceNumber', 'readonly', function (e) {
								return t.Ka.Ia(e);
							})
						);
					})
					.then(function (e) {
						t.Ma = new jh(e, t.$a);
					})
					.then(function () {
						t.Oa = !0;
					})
					.catch(function (e) {
						return t.ja && t.ja.close(), Promise.reject(e);
					});
			}),
			(t.prototype.Xa = function (t) {
				var e = this;
				return (
					(this.Qa = function (n) {
						return ae(e, void 0, void 0, function () {
							return ce(this, function (e) {
								return this.Ei ? [2, t(n)] : [2];
							});
						});
					}),
					t(this.isPrimary)
				);
			}),
			(t.prototype.Za = function (t) {
				var e = this;
				this.ja.Kn(function (n) {
					return ae(e, void 0, void 0, function () {
						return ce(this, function (e) {
							switch (e.label) {
								case 0:
									return null === n.newVersion ? [4, t()] : [3, 2];
								case 1:
									e.sent(), (e.label = 2);
								case 2:
									return [2];
							}
						});
					});
				});
			}),
			(t.prototype.tc = function (t) {
				var e = this;
				this.networkEnabled !== t &&
					((this.networkEnabled = t),
					this.fn.ws(function () {
						return ae(e, void 0, void 0, function () {
							return ce(this, function (t) {
								switch (t.label) {
									case 0:
										return this.Ei ? [4, this.za()] : [3, 2];
									case 1:
										t.sent(), (t.label = 2);
									case 2:
										return [2];
								}
							});
						});
					}));
			}),
			(t.prototype.za = function () {
				var t = this;
				return this.runTransaction(
					'updateClientMetadataAndTryBecomePrimary',
					'readwrite',
					function (e) {
						return ll(e)
							.put(new Zf(t.clientId, Date.now(), t.networkEnabled, t.inForeground))
							.next(function () {
								if (t.isPrimary)
									return t.ec(e).next(function (e) {
										e ||
											((t.isPrimary = !1),
											t.fn.Cs(function () {
												return t.Qa(!1);
											}));
									});
							})
							.next(function () {
								return t.nc(e);
							})
							.next(function (n) {
								return t.isPrimary && !n
									? t.sc(e).next(function () {
											return !1;
									  })
									: !!n &&
											t.ic(e).next(function () {
												return !0;
											});
							});
					}
				)
					.catch(function (e) {
						if (bh(e))
							return ls('IndexedDbPersistence', 'Failed to extend owner lease: ', e), t.isPrimary;
						if (!t.allowTabSynchronization) throw e;
						return (
							ls(
								'IndexedDbPersistence',
								'Releasing owner lease after error during lease refresh',
								e
							),
							!1
						);
					})
					.then(function (e) {
						t.isPrimary !== e &&
							t.fn.Cs(function () {
								return t.Qa(e);
							}),
							(t.isPrimary = e);
					});
			}),
			(t.prototype.ec = function (t) {
				var e = this;
				return fl(t)
					.get(Mf.key)
					.next(function (t) {
						return vh.resolve(e.rc(t));
					});
			}),
			(t.prototype.oc = function (t) {
				return ll(t).delete(this.clientId);
			}),
			(t.prototype.ac = function () {
				return ae(this, void 0, void 0, function () {
					var e,
						n,
						r,
						i,
						o = this;
					return ce(this, function (s) {
						switch (s.label) {
							case 0:
								return !this.isPrimary || this.cc(this.Ua, 18e5)
									? [3, 2]
									: ((this.Ua = Date.now()),
									  [
											4,
											this.runTransaction(
												'maybeGarbageCollectMultiClientState',
												'readwrite-primary',
												function (e) {
													var n = t.Qn(e, Zf.store);
													return n.ts().next(function (t) {
														var e = o.uc(t, 18e5),
															r = t.filter(function (t) {
																return -1 === e.indexOf(t);
															});
														return vh
															.forEach(r, function (t) {
																return n.delete(t.clientId);
															})
															.next(function () {
																return r;
															});
													});
												}
											).catch(function () {
												return [];
											})
									  ]);
							case 1:
								if (((e = s.sent()), this.Ga))
									for (n = 0, r = e; n < r.length; n++)
										(i = r[n]), this.Ga.removeItem(this.hc(i.clientId));
								s.label = 2;
							case 2:
								return [2];
						}
					});
				});
			}),
			(t.prototype.Ja = function () {
				var t = this;
				this.qa = this.fn.yn('client_metadata_refresh', 4e3, function () {
					return t
						.za()
						.then(function () {
							return t.ac();
						})
						.then(function () {
							return t.Ja();
						});
				});
			}),
			(t.prototype.rc = function (t) {
				return !!t && t.ownerId === this.clientId;
			}),
			(t.prototype.nc = function (t) {
				var e = this;
				return this.ka
					? vh.resolve(!0)
					: fl(t)
							.get(Mf.key)
							.next(function (n) {
								if (null !== n && e.cc(n.leaseTimestampMs, 5e3) && !e.lc(n.ownerId)) {
									if (e.rc(n) && e.networkEnabled) return !0;
									if (!e.rc(n)) {
										if (!n.allowTabSynchronization) throw new cs(as.FAILED_PRECONDITION, al);
										return !1;
									}
								}
								return (
									!(!e.networkEnabled || !e.inForeground) ||
									ll(t)
										.ts()
										.next(function (t) {
											return (
												void 0 ===
												e.uc(t, 5e3).find(function (t) {
													if (e.clientId !== t.clientId) {
														var n = !e.networkEnabled && t.networkEnabled,
															r = !e.inForeground && t.inForeground,
															i = e.networkEnabled === t.networkEnabled;
														if (n || (r && i)) return !0;
													}
													return !1;
												})
											);
										})
								);
							})
							.next(function (t) {
								return (
									e.isPrimary !== t &&
										ls(
											'IndexedDbPersistence',
											'Client ' + (t ? 'is' : 'is not') + ' eligible for a primary lease.'
										),
									t
								);
							});
			}),
			(t.prototype.Di = function () {
				return ae(this, void 0, void 0, function () {
					var t = this;
					return ce(this, function (e) {
						switch (e.label) {
							case 0:
								return (
									(this.Oa = !1),
									this._c(),
									this.qa && (this.qa.cancel(), (this.qa = null)),
									this.fc(),
									this.dc(),
									[
										4,
										this.ja.runTransaction(
											'shutdown',
											'readwrite',
											[Mf.store, Zf.store],
											function (e) {
												var n = new cl(e, jh.ai);
												return t.sc(n).next(function () {
													return t.oc(n);
												});
											}
										)
									]
								);
							case 1:
								return e.sent(), this.ja.close(), this.wc(), [2];
						}
					});
				});
			}),
			(t.prototype.uc = function (t, e) {
				var n = this;
				return t.filter(function (t) {
					return n.cc(t.updateTimeMs, e) && !n.lc(t.clientId);
				});
			}),
			(t.prototype.pi = function () {
				var t = this;
				return this.runTransaction('getActiveClients', 'readonly', function (e) {
					return ll(e)
						.ts()
						.next(function (e) {
							return t.uc(e, 18e5).map(function (t) {
								return t.clientId;
							});
						});
				});
			}),
			Object.defineProperty(t.prototype, 'Ei', {
				get: function () {
					return this.Oa;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.mc = function (t) {
				return Tf.xo(t, this.serializer, this.Dr, this.No);
			}),
			(t.prototype.Tc = function () {
				return this.Ka;
			}),
			(t.prototype.Ec = function () {
				return this.vr;
			}),
			(t.prototype.Ic = function () {
				return this.Dr;
			}),
			(t.prototype.runTransaction = function (t, e, n) {
				var r = this;
				ls('IndexedDbPersistence', 'Starting transaction:', t);
				var i,
					o = 'readonly' === e ? 'readonly' : 'readwrite';
				return this.ja
					.runTransaction(t, o, tl, function (o) {
						return (
							(i = new cl(o, r.Ma ? r.Ma.next() : jh.ai)),
							'readwrite-primary' === e
								? r
										.ec(i)
										.next(function (t) {
											return !!t || r.nc(i);
										})
										.next(function (e) {
											if (!e)
												throw (
													(ps("Failed to obtain primary lease for action '" + t + "'."),
													(r.isPrimary = !1),
													r.fn.Cs(function () {
														return r.Qa(!1);
													}),
													new cs(as.FAILED_PRECONDITION, Zh))
												);
											return n(i);
										})
										.next(function (t) {
											return r.ic(i).next(function () {
												return t;
											});
										})
								: r.Ac(i).next(function () {
										return n(i);
								  })
						);
					})
					.then(function (t) {
						return i.br(), t;
					});
			}),
			(t.prototype.Ac = function (t) {
				var e = this;
				return fl(t)
					.get(Mf.key)
					.next(function (t) {
						if (
							null !== t &&
							e.cc(t.leaseTimestampMs, 5e3) &&
							!e.lc(t.ownerId) &&
							!e.rc(t) &&
							!(e.ka || (e.allowTabSynchronization && t.allowTabSynchronization))
						)
							throw new cs(as.FAILED_PRECONDITION, al);
					});
			}),
			(t.prototype.ic = function (t) {
				var e = new Mf(this.clientId, this.allowTabSynchronization, Date.now());
				return fl(t).put(Mf.key, e);
			}),
			(t.Ln = function () {
				return yh.Ln();
			}),
			(t.prototype.sc = function (t) {
				var e = this,
					n = fl(t);
				return n.get(Mf.key).next(function (t) {
					return e.rc(t)
						? (ls('IndexedDbPersistence', 'Releasing primary lease.'), n.delete(Mf.key))
						: vh.resolve();
				});
			}),
			(t.prototype.cc = function (t, e) {
				var n = Date.now();
				return !(
					t < n - e ||
					(t > n && (ps('Detected an update time that is in the future: ' + t + ' > ' + n), 1))
				);
			}),
			(t.prototype.Ha = function () {
				var t = this;
				null !== this.document &&
					'function' == typeof this.document.addEventListener &&
					((this.Ba = function () {
						t.fn.ws(function () {
							return (t.inForeground = 'visible' === t.document.visibilityState), t.za();
						});
					}),
					this.document.addEventListener('visibilitychange', this.Ba),
					(this.inForeground = 'visible' === this.document.visibilityState));
			}),
			(t.prototype.fc = function () {
				this.Ba &&
					(this.document.removeEventListener('visibilitychange', this.Ba), (this.Ba = null));
			}),
			(t.prototype.Ya = function () {
				var t,
					e = this;
				'function' ==
					typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) &&
					((this.La = function () {
						e._c(),
							e.fn.ws(function () {
								return e.Di();
							});
					}),
					this.window.addEventListener('unload', this.La));
			}),
			(t.prototype.dc = function () {
				this.La && (this.window.removeEventListener('unload', this.La), (this.La = null));
			}),
			(t.prototype.lc = function (t) {
				var e;
				try {
					var n =
						null !== (null === (e = this.Ga) || void 0 === e ? void 0 : e.getItem(this.hc(t)));
					return (
						ls(
							'IndexedDbPersistence',
							"Client '" + t + "' " + (n ? 'is' : 'is not') + ' zombied in LocalStorage'
						),
						n
					);
				} catch (r) {
					return ps('IndexedDbPersistence', 'Failed to get zombied client id.', r), !1;
				}
			}),
			(t.prototype._c = function () {
				if (this.Ga)
					try {
						this.Ga.setItem(this.hc(this.clientId), String(Date.now()));
					} catch (t) {
						ps('Failed to set zombie client id.', t);
					}
			}),
			(t.prototype.wc = function () {
				if (this.Ga)
					try {
						this.Ga.removeItem(this.hc(this.clientId));
					} catch (t) {}
			}),
			(t.prototype.hc = function (t) {
				return 'firestore_zombie_' + this.persistenceKey + '_' + t;
			}),
			t
		);
	})();
function fl(t) {
	return hl.Qn(t, Mf.store);
}
function ll(t) {
	return hl.Qn(t, Zf.store);
}
var pl = (function () {
	function t(t, e) {
		(this.db = t), (this.wo = new cf(this, e));
	}
	return (
		(t.prototype.Po = function (t) {
			var e = this.Rc(t);
			return this.db
				.Tc()
				.ba(t)
				.next(function (t) {
					return e.next(function (e) {
						return t + e;
					});
				});
		}),
		(t.prototype.Rc = function (t) {
			var e = 0;
			return this.Vo(t, function (t) {
				e++;
			}).next(function () {
				return e;
			});
		}),
		(t.prototype.Ce = function (t, e) {
			return this.db.Tc().Ce(t, e);
		}),
		(t.prototype.Vo = function (t, e) {
			return this.gc(t, function (t, n) {
				return e(n);
			});
		}),
		(t.prototype.Da = function (t, e, n) {
			return dl(t, n);
		}),
		(t.prototype.Na = function (t, e, n) {
			return dl(t, n);
		}),
		(t.prototype.po = function (t, e, n) {
			return this.db.Tc().po(t, e, n);
		}),
		(t.prototype.Go = function (t, e) {
			return dl(t, e);
		}),
		(t.prototype.Pc = function (t, e) {
			return (
				(r = e),
				(i = !1),
				xf((n = t))
					.os(function (t) {
						return Af(n, t, r).next(function (t) {
							return t && (i = !0), vh.resolve(!t);
						});
					})
					.next(function () {
						return i;
					})
			);
			var n, r, i;
		}),
		(t.prototype.bo = function (t, e) {
			var n = this,
				r = this.db.Ec().ra(),
				i = [],
				o = 0;
			return this.gc(t, function (s, u) {
				if (u <= e) {
					var a = n.Pc(t, s).next(function (e) {
						if (!e)
							return (
								o++,
								r.Rr(t, s).next(function () {
									return r.Ar(s), ul(t).delete([0, hf(s.path)]);
								})
							);
					});
					i.push(a);
				}
			})
				.next(function () {
					return vh.$n(i);
				})
				.next(function () {
					return r.apply(t);
				})
				.next(function () {
					return o;
				});
		}),
		(t.prototype.removeTarget = function (t, e) {
			var n = e.st(t.xa);
			return this.db.Tc().ya(t, n);
		}),
		(t.prototype.yc = function (t, e) {
			return dl(t, e);
		}),
		(t.prototype.gc = function (t, e) {
			var n,
				r = ul(t),
				i = jh.ai;
			return r
				.rs({ index: Qf.documentTargetsIndex }, function (t, r) {
					var o = t[0],
						s = (t[1], r.path),
						u = r.sequenceNumber;
					0 === o ? (i !== jh.ai && e(new Ns(pf(n)), i), (i = u), (n = s)) : (i = jh.ai);
				})
				.next(function () {
					i !== jh.ai && e(new Ns(pf(n)), i);
				});
		}),
		(t.prototype.So = function (t) {
			return this.db.Ec().aa(t);
		}),
		t
	);
})();
function dl(t, e) {
	return ul(t).put(((n = e), (r = t.xa), new Qf(0, hf(n.path), r)));
	var n, r;
}
function vl(t, e) {
	var n = t.projectId;
	return t.j || (n += '.' + t.database), 'firestore/' + e + '/' + n + '/';
}
var yl = (function () {
	function t(t, e, n) {
		(this.persistence = t),
			(this.Vc = e),
			(this.bc = new Eu(Ws)),
			(this.vc = new iu(function (t) {
				return lu(t);
			}, pu)),
			(this.Sc = su.min()),
			(this.Sr = t.mc(n)),
			(this.Dc = t.Ec()),
			(this.Ka = t.Tc()),
			(this.Cc = new ef(this.Dc, this.Sr, this.persistence.Ic())),
			this.Vc.Nc(this.Cc);
	}
	return (
		(t.prototype.Io = function (t) {
			var e = this;
			return this.persistence.runTransaction('Collect garbage', 'readwrite-primary', function (n) {
				return t.vo(n, e.bc);
			});
		}),
		t
	);
})();
function gl(t, e) {
	var n = ms(t);
	return n.persistence.runTransaction('Acknowledge batch', 'readwrite-primary', function (t) {
		var r,
			i,
			o,
			s,
			u,
			a,
			c,
			h = e.batch.keys(),
			f = n.Dc.ra({ oa: !0 });
		return ((r = n),
		(i = t),
		(o = e),
		(s = f),
		(u = o.batch),
		(a = u.keys()),
		(c = vh.resolve()),
		a.forEach(function (t) {
			c = c
				.next(function () {
					return s.Rr(i, t);
				})
				.next(function (e) {
					var n = e,
						r = o.dr.get(t);
					gs(null !== r), (!n || n.version.L(r) < 0) && (n = u.cr(t, n, o)) && s.Er(n, o._r);
				});
		}),
		c.next(function () {
			return r.Sr.Wo(i, u);
		}))
			.next(function () {
				return f.apply(t);
			})
			.next(function () {
				return n.Sr.zo(t);
			})
			.next(function () {
				return n.Cc.kr(t, h);
			});
	});
}
function ml(t) {
	var e = ms(t);
	return e.persistence.runTransaction('Get last remote snapshot version', 'readonly', function (t) {
		return e.Ka.Ea(t);
	});
}
function bl(t, e) {
	var n = ms(t),
		r = e.nt,
		i = n.bc;
	return n.persistence
		.runTransaction('Apply remote event', 'readwrite-primary', function (t) {
			var o = n.Dc.ra({ oa: !0 });
			i = n.bc;
			var s = [];
			e.zt.forEach(function (e, o) {
				var u,
					a,
					c,
					h = i.get(o);
				if (h) {
					s.push(
						n.Ka.Ca(t, e.se, o).next(function () {
							return n.Ka.Sa(t, e.ee, o);
						})
					);
					var f = e.resumeToken;
					if (f.O() > 0) {
						var l = h.it(f, r).st(t.xa);
						(i = i.ot(o, l)),
							(u = h),
							(c = e),
							gs((a = l).resumeToken.O() > 0),
							(0 === u.resumeToken.O() ||
								a.nt.X() - u.nt.X() >= 3e8 ||
								c.ee.size + c.ne.size + c.se.size > 0) &&
								s.push(n.Ka.ya(t, l));
					}
				}
			});
			var u = Su(),
				a = Ru();
			if (
				(e.Yt.forEach(function (t, e) {
					a = a.add(t);
				}),
				s.push(
					o.getEntries(t, a).next(function (i) {
						e.Yt.forEach(function (a, c) {
							var h = i.get(a);
							c instanceof Oc && c.version.isEqual(su.min())
								? (o.Ar(a, r), (u = u.ot(a, c)))
								: null == h ||
								  c.version.L(h.version) > 0 ||
								  (0 === c.version.L(h.version) && h.hasPendingWrites)
								? (o.Er(c, r), (u = u.ot(a, c)))
								: ls(
										'LocalStore',
										'Ignoring outdated watch update for ',
										a,
										'. Current version:',
										h.version,
										' Watch version:',
										c.version
								  ),
								e.Jt.has(a) && s.push(n.persistence.No.yc(t, a));
						});
					})
				),
				!r.isEqual(su.min()))
			) {
				var c = n.Ka.Ea(t).next(function (e) {
					return n.Ka.Aa(t, t.xa, r);
				});
				s.push(c);
			}
			return vh
				.$n(s)
				.next(function () {
					return o.apply(t);
				})
				.next(function () {
					return n.Cc.Mr(t, u);
				});
		})
		.then(function (t) {
			return (n.bc = i), t;
		});
}
function wl(t, e) {
	var n = ms(t);
	return n.persistence.runTransaction('Get next mutation batch', 'readonly', function (t) {
		return void 0 === e && (e = -1), n.Sr.Bo(t, e);
	});
}
function El(t, e) {
	var n = ms(t);
	return n.persistence
		.runTransaction('Allocate target', 'readwrite', function (t) {
			var r;
			return n.Ka.va(t, e).next(function (i) {
				return i
					? ((r = i), vh.resolve(r))
					: n.Ka.wa(t).next(function (i) {
							return (
								(r = new gu(e, i, 0, t.xa)),
								n.Ka.Ra(t, r).next(function () {
									return r;
								})
							);
					  });
			});
		})
		.then(function (t) {
			var r = n.bc.get(t.targetId);
			return (
				(null === r || t.nt.L(r.nt) > 0) &&
					((n.bc = n.bc.ot(t.targetId, t)), n.vc.set(e, t.targetId)),
				t
			);
		});
}
function Il(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var r, i, o, s;
		return ce(this, function (u) {
			switch (u.label) {
				case 0:
					(r = ms(t)),
						(i = r.bc.get(e)),
						(o = n ? 'readwrite' : 'readwrite-primary'),
						(u.label = 1);
				case 1:
					return (
						u.trys.push([1, 4, , 5]),
						n
							? [3, 3]
							: [
									4,
									r.persistence.runTransaction('Release target', o, function (t) {
										return r.persistence.No.removeTarget(t, i);
									})
							  ]
					);
				case 2:
					u.sent(), (u.label = 3);
				case 3:
					return [3, 5];
				case 4:
					if (!bh((s = u.sent()))) throw s;
					return (
						ls('LocalStore', 'Failed to update sequence numbers for target ' + e + ': ' + s), [3, 5]
					);
				case 5:
					return (r.bc = r.bc.remove(e)), r.vc.delete(i.target), [2];
			}
		});
	});
}
function _l(t, e, n) {
	var r = ms(t),
		i = su.min(),
		o = Ru();
	return r.persistence.runTransaction('Execute query', 'readonly', function (t) {
		return ((s = r),
		(u = t),
		(a = Bc(e)),
		(c = ms(s)),
		(h = c.vc.get(a)),
		void 0 !== h ? vh.resolve(c.bc.get(h)) : c.Ka.va(u, a))
			.next(function (e) {
				if (e)
					return (
						(i = e.lastLimboFreeSnapshotVersion),
						r.Ka.Fa(t, e.targetId).next(function (t) {
							o = t;
						})
					);
			})
			.next(function () {
				return r.Vc.Lr(t, e, n ? i : su.min(), n ? o : Ru());
			})
			.next(function (t) {
				return { documents: t, Fc: o };
			});
		var s, u, a, c, h;
	});
}
function Tl(t, e) {
	var n = ms(t),
		r = ms(n.Ka),
		i = n.bc.get(e);
	return i
		? Promise.resolve(i.target)
		: n.persistence.runTransaction('Get target data', 'readonly', function (t) {
				return r.Ue(t, e).next(function (t) {
					return t ? t.target : null;
				});
		  });
}
function Al(t) {
	var e = ms(t);
	return e.persistence
		.runTransaction('Get new document changes', 'readonly', function (t) {
			return (
				(n = e.Dc),
				(r = t),
				(i = e.Sc),
				(o = ms(n)),
				(s = Su()),
				(u = gf(i)),
				(a = Rf(r)),
				(c = IDBKeyRange.lowerBound(u, !0)),
				a
					.rs({ index: Hf.readTimeIndex, range: c }, function (t, e) {
						var n = vf(o.serializer, e);
						(s = s.ot(n.key, n)), (u = e.readTime);
					})
					.next(function () {
						return { xc: s, readTime: mf(u) };
					})
			);
			var n, r, i, o, s, u, a, c;
		})
		.then(function (t) {
			var n = t.xc,
				r = t.readTime;
			return (e.Sc = r), n;
		});
}
function Nl(t) {
	return ae(this, void 0, void 0, function () {
		var e;
		return ce(this, function (n) {
			return [
				2,
				(e = ms(t)).persistence
					.runTransaction('Synchronize last document change read time', 'readonly', function (t) {
						return (
							(e = Rf(t)),
							(n = su.min()),
							e
								.rs({ index: Hf.readTimeIndex, reverse: !0 }, function (t, e, r) {
									e.readTime && (n = mf(e.readTime)), r.done();
								})
								.next(function () {
									return n;
								})
						);
						var e, n;
					})
					.then(function (t) {
						e.Sc = t;
					})
			];
		});
	});
}
function Sl(t) {
	return ae(this, void 0, void 0, function () {
		return ce(this, function (e) {
			if (t.code !== as.FAILED_PRECONDITION || t.message !== Zh) throw t;
			return ls('LocalStore', 'Unexpectedly lost primary lease'), [2];
		});
	});
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Dl = (function () {
		function t() {
			(this.$c = new Tu(xl.kc)), (this.Mc = new Tu(xl.Oc));
		}
		return (
			(t.prototype.m = function () {
				return this.$c.m();
			}),
			(t.prototype.Da = function (t, e) {
				var n = new xl(t, e);
				(this.$c = this.$c.add(n)), (this.Mc = this.Mc.add(n));
			}),
			(t.prototype.Lc = function (t, e) {
				var n = this;
				t.forEach(function (t) {
					return n.Da(t, e);
				});
			}),
			(t.prototype.Na = function (t, e) {
				this.Bc(new xl(t, e));
			}),
			(t.prototype.qc = function (t, e) {
				var n = this;
				t.forEach(function (t) {
					return n.Na(t, e);
				});
			}),
			(t.prototype.Uc = function (t) {
				var e = this,
					n = new Ns(new _s([])),
					r = new xl(n, t),
					i = new xl(n, t + 1),
					o = [];
				return (
					this.Mc.Ft([r, i], function (t) {
						e.Bc(t), o.push(t.key);
					}),
					o
				);
			}),
			(t.prototype.Qc = function () {
				var t = this;
				this.$c.forEach(function (e) {
					return t.Bc(e);
				});
			}),
			(t.prototype.Bc = function (t) {
				(this.$c = this.$c.delete(t)), (this.Mc = this.Mc.delete(t));
			}),
			(t.prototype.Wc = function (t) {
				var e = new Ns(new _s([])),
					n = new xl(e, t),
					r = new xl(e, t + 1),
					i = Ru();
				return (
					this.Mc.Ft([n, r], function (t) {
						i = i.add(t.key);
					}),
					i
				);
			}),
			(t.prototype.Ho = function (t) {
				var e = new xl(t, 0),
					n = this.$c.$t(e);
				return null !== n && t.isEqual(n.key);
			}),
			t
		);
	})(),
	xl = (function () {
		function t(t, e) {
			(this.key = t), (this.jc = e);
		}
		return (
			(t.kc = function (t, e) {
				return Ns.i(t.key, e.key) || Ws(t.jc, e.jc);
			}),
			(t.Oc = function (t, e) {
				return Ws(t.jc, e.jc) || Ns.i(t.key, e.key);
			}),
			t
		);
	})(),
	Ll = function (t, e) {
		(this.user = e), (this.type = 'OAuth'), (this.Kc = {}), (this.Kc.Authorization = 'Bearer ' + t);
	},
	Ol = (function () {
		function t() {
			this.Gc = null;
		}
		return (
			(t.prototype.getToken = function () {
				return Promise.resolve(null);
			}),
			(t.prototype.zc = function () {}),
			(t.prototype.Hc = function (t) {
				(this.Gc = t), t(Fh.UNAUTHENTICATED);
			}),
			(t.prototype.Yc = function () {
				this.Gc = null;
			}),
			t
		);
	})(),
	kl = (function () {
		function t(t) {
			var e = this;
			(this.Jc = null),
				(this.currentUser = Fh.UNAUTHENTICATED),
				(this.Xc = !1),
				(this.Zc = 0),
				(this.Gc = null),
				(this.forceRefresh = !1),
				(this.Jc = function () {
					e.Zc++, (e.currentUser = e.tu()), (e.Xc = !0), e.Gc && e.Gc(e.currentUser);
				}),
				(this.Zc = 0),
				(this.auth = t.getImmediate({ optional: !0 })),
				this.auth
					? this.auth.addAuthTokenListener(this.Jc)
					: (this.Jc(null),
					  t.get().then(
							function (t) {
								(e.auth = t), e.Jc && e.auth.addAuthTokenListener(e.Jc);
							},
							function () {}
					  ));
		}
		return (
			(t.prototype.getToken = function () {
				var t = this,
					e = this.Zc,
					n = this.forceRefresh;
				return (
					(this.forceRefresh = !1),
					this.auth
						? this.auth.getToken(n).then(function (n) {
								return t.Zc !== e
									? (ls('FirebaseCredentialsProvider', 'getToken aborted due to token change.'),
									  t.getToken())
									: n
									? (gs('string' == typeof n.accessToken), new Ll(n.accessToken, t.currentUser))
									: null;
						  })
						: Promise.resolve(null)
				);
			}),
			(t.prototype.zc = function () {
				this.forceRefresh = !0;
			}),
			(t.prototype.Hc = function (t) {
				(this.Gc = t), this.Xc && t(this.currentUser);
			}),
			(t.prototype.Yc = function () {
				this.auth && this.auth.removeAuthTokenListener(this.Jc), (this.Jc = null), (this.Gc = null);
			}),
			(t.prototype.tu = function () {
				var t = this.auth && this.auth.getUid();
				return gs(null === t || 'string' == typeof t), new Fh(t);
			}),
			t
		);
	})(),
	Rl = (function () {
		function t(t, e) {
			(this.eu = t), (this.nu = e), (this.type = 'FirstParty'), (this.user = Fh.ni);
		}
		return (
			Object.defineProperty(t.prototype, 'Kc', {
				get: function () {
					var t = { 'X-Goog-AuthUser': this.nu },
						e = this.eu.auth.getAuthHeaderValueForFirstParty([]);
					return e && (t.Authorization = e), t;
				},
				enumerable: !1,
				configurable: !0
			}),
			t
		);
	})(),
	Pl = (function () {
		function t(t, e) {
			(this.eu = t), (this.nu = e);
		}
		return (
			(t.prototype.getToken = function () {
				return Promise.resolve(new Rl(this.eu, this.nu));
			}),
			(t.prototype.Hc = function (t) {
				t(Fh.ni);
			}),
			(t.prototype.Yc = function () {}),
			(t.prototype.zc = function () {}),
			t
		);
	})(),
	Cl = (function () {
		function t(t, e, n, r, i, o) {
			(this.fn = t),
				(this.su = n),
				(this.iu = r),
				(this.ru = i),
				(this.listener = o),
				(this.state = 0),
				(this.ou = 0),
				(this.au = null),
				(this.stream = null),
				(this.ys = new dh(t, e));
		}
		return (
			(t.prototype.cu = function () {
				return 1 === this.state || 2 === this.state || 4 === this.state;
			}),
			(t.prototype.uu = function () {
				return 2 === this.state;
			}),
			(t.prototype.start = function () {
				3 !== this.state ? this.auth() : this.hu();
			}),
			(t.prototype.stop = function () {
				return ae(this, void 0, void 0, function () {
					return ce(this, function (t) {
						switch (t.label) {
							case 0:
								return this.cu() ? [4, this.close(0)] : [3, 2];
							case 1:
								t.sent(), (t.label = 2);
							case 2:
								return [2];
						}
					});
				});
			}),
			(t.prototype.lu = function () {
				(this.state = 0), this.ys.reset();
			}),
			(t.prototype._u = function () {
				var t = this;
				this.uu() &&
					null === this.au &&
					(this.au = this.fn.yn(this.su, 6e4, function () {
						return t.fu();
					}));
			}),
			(t.prototype.du = function (t) {
				this.wu(), this.stream.send(t);
			}),
			(t.prototype.fu = function () {
				return ae(this, void 0, void 0, function () {
					return ce(this, function (t) {
						return this.uu() ? [2, this.close(0)] : [2];
					});
				});
			}),
			(t.prototype.wu = function () {
				this.au && (this.au.cancel(), (this.au = null));
			}),
			(t.prototype.close = function (t, e) {
				return ae(this, void 0, void 0, function () {
					return ce(this, function (n) {
						switch (n.label) {
							case 0:
								return (
									this.wu(),
									this.ys.cancel(),
									this.ou++,
									3 !== t
										? this.ys.reset()
										: e && e.code === as.RESOURCE_EXHAUSTED
										? (ps(e.toString()),
										  ps('Using maximum backoff delay to prevent overloading the backend.'),
										  this.ys.Rn())
										: e && e.code === as.UNAUTHENTICATED && this.ru.zc(),
									null !== this.stream && (this.mu(), this.stream.close(), (this.stream = null)),
									(this.state = t),
									[4, this.listener.Tu(e)]
								);
							case 1:
								return n.sent(), [2];
						}
					});
				});
			}),
			(t.prototype.mu = function () {}),
			(t.prototype.auth = function () {
				var t = this;
				this.state = 1;
				var e = this.Eu(this.ou),
					n = this.ou;
				this.ru.getToken().then(
					function (e) {
						t.ou === n && t.Iu(e);
					},
					function (n) {
						e(function () {
							var e = new cs(as.UNKNOWN, 'Fetching auth token failed: ' + n.message);
							return t.Au(e);
						});
					}
				);
			}),
			(t.prototype.Iu = function (t) {
				var e = this,
					n = this.Eu(this.ou);
				(this.stream = this.Ru(t)),
					this.stream.gu(function () {
						n(function () {
							return (e.state = 2), e.listener.gu();
						});
					}),
					this.stream.Tu(function (t) {
						n(function () {
							return e.Au(t);
						});
					}),
					this.stream.onMessage(function (t) {
						n(function () {
							return e.onMessage(t);
						});
					});
			}),
			(t.prototype.hu = function () {
				var t = this;
				(this.state = 4),
					this.ys.gn(function () {
						return ae(t, void 0, void 0, function () {
							return ce(this, function (t) {
								return (this.state = 0), this.start(), [2];
							});
						});
					});
			}),
			(t.prototype.Au = function (t) {
				return (
					ls('PersistentStream', 'close with error: ' + t), (this.stream = null), this.close(3, t)
				);
			}),
			(t.prototype.Eu = function (t) {
				var e = this;
				return function (n) {
					e.fn.ws(function () {
						return e.ou === t
							? n()
							: (ls('PersistentStream', 'stream callback skipped by getCloseGuardedDispatcher.'),
							  Promise.resolve());
					});
				};
			}),
			t
		);
	})(),
	Ul = (function (t) {
		function e(e, n, r, i, o) {
			var s = this;
			return (
				((s =
					t.call(this, e, 'listen_stream_connection_backoff', 'listen_stream_idle', n, r, o) ||
					this).serializer = i),
				s
			);
		}
		return (
			se(e, t),
			(e.prototype.Ru = function (t) {
				return this.iu.Pu('Listen', t);
			}),
			(e.prototype.onMessage = function (t) {
				this.ys.reset();
				var e = (function (t, e) {
						var n, r;
						if ('targetChange' in e) {
							e.targetChange;
							var i =
									'NO_CHANGE' === (r = e.targetChange.targetChangeType || 'NO_CHANGE')
										? 0
										: 'ADD' === r
										? 1
										: 'REMOVE' === r
										? 2
										: 'CURRENT' === r
										? 3
										: 'RESET' === r
										? 4
										: ys(),
								o = e.targetChange.targetIds || [],
								s = (function (t, e) {
									return t.Qe
										? (gs(void 0 === e || 'string' == typeof e), Ys.fromBase64String(e || ''))
										: (gs(void 0 === e || e instanceof Uint8Array),
										  Ys.fromUint8Array(e || new Uint8Array()));
								})(t, e.targetChange.resumeToken),
								u = e.targetChange.cause,
								a =
									u &&
									(function (t) {
										var e = void 0 === t.code ? as.UNKNOWN : wu(t.code);
										return new cs(e, t.message || '');
									})(u);
							n = new Gu(i, o, s, a || null);
						} else if ('documentChange' in e) {
							e.documentChange;
							var c = e.documentChange;
							c.document, c.document.name, c.document.updateTime;
							var h = Sa(t, c.document.name),
								f = _a(c.document.updateTime),
								l = new Nc({ mapValue: { fields: c.document.fields } }),
								p = new Lc(h, f, l, {}),
								d = c.targetIds || [],
								v = c.removedTargetIds || [];
							n = new qu(d, v, p.key, p);
						} else if ('documentDelete' in e) {
							e.documentDelete;
							var y = e.documentDelete;
							y.document;
							var g = Sa(t, y.document),
								m = y.readTime ? _a(y.readTime) : su.min(),
								b = new Oc(g, m),
								w = y.removedTargetIds || [];
							n = new qu([], w, b.key, b);
						} else if ('documentRemove' in e) {
							e.documentRemove;
							var E = e.documentRemove;
							E.document;
							var I = Sa(t, E.document),
								_ = E.removedTargetIds || [];
							n = new qu([], _, I, null);
						} else {
							if (!('filter' in e)) return ys();
							e.filter;
							var T = e.filter;
							T.targetId;
							var A = T.count || 0,
								N = new mu(A),
								S = T.targetId;
							n = new Bu(S, N);
						}
						return n;
					})(this.serializer, t),
					n = (function (t) {
						if (!('targetChange' in t)) return su.min();
						var e = t.targetChange;
						return e.targetIds && e.targetIds.length
							? su.min()
							: e.readTime
							? _a(e.readTime)
							: su.min();
					})(t);
				return this.listener.yu(e, n);
			}),
			(e.prototype.Vu = function (t) {
				var e,
					n,
					r,
					i,
					o = {};
				(o.database = La(this.serializer)),
					(o.addTarget =
						((e = this.serializer),
						(i = (n = t).target),
						((r = du(i) ? { documents: Ca(e, i) } : { query: Ua(e, i) }).targetId = n.targetId),
						n.resumeToken.O() > 0 && (r.resumeToken = Ea(e, n.resumeToken)),
						r));
				var s = (function (t, e) {
					var n = (function (t, e) {
						switch (e) {
							case 0:
								return null;
							case 1:
								return 'existence-filter-mismatch';
							case 2:
								return 'limbo-document';
							default:
								return ys();
						}
					})(0, e.et);
					return null == n ? null : { 'goog-listen-tags': n };
				})(this.serializer, t);
				s && (o.labels = s), this.du(o);
			}),
			(e.prototype.pu = function (t) {
				var e = {};
				(e.database = La(this.serializer)), (e.removeTarget = t), this.du(e);
			}),
			e
		);
	})(Cl),
	Vl = (function (t) {
		function e(e, n, r, i, o) {
			var s = this;
			return (
				((s =
					t.call(this, e, 'write_stream_connection_backoff', 'write_stream_idle', n, r, o) ||
					this).serializer = i),
				(s.bu = !1),
				s
			);
		}
		return (
			se(e, t),
			Object.defineProperty(e.prototype, 'vu', {
				get: function () {
					return this.bu;
				},
				enumerable: !1,
				configurable: !0
			}),
			(e.prototype.start = function () {
				(this.bu = !1), (this.lastStreamToken = void 0), t.prototype.start.call(this);
			}),
			(e.prototype.mu = function () {
				this.bu && this.Su([]);
			}),
			(e.prototype.Ru = function (t) {
				return this.iu.Pu('Write', t);
			}),
			(e.prototype.onMessage = function (t) {
				if ((gs(!!t.streamToken), (this.lastStreamToken = t.streamToken), this.bu)) {
					this.ys.reset();
					var e =
							((r = t.writeResults),
							(i = t.commitTime),
							r && r.length > 0
								? (gs(void 0 !== i),
								  r.map(function (t) {
										return (function (t, e) {
											var n = t.updateTime ? _a(t.updateTime) : _a(e);
											n.isEqual(su.min()) && (n = _a(e));
											var r = null;
											return (
												t.transformResults &&
													t.transformResults.length > 0 &&
													(r = t.transformResults),
												new cc(n, r)
											);
										})(t, i);
								  }))
								: []),
						n = _a(t.commitTime);
					return this.listener.Du(n, e);
				}
				var r, i;
				return (
					gs(!t.writeResults || 0 === t.writeResults.length), (this.bu = !0), this.listener.Cu()
				);
			}),
			(e.prototype.Nu = function () {
				var t = {};
				(t.database = La(this.serializer)), this.du(t);
			}),
			(e.prototype.Su = function (t) {
				var e = this,
					n = {
						streamToken: this.lastStreamToken,
						writes: t.map(function (t) {
							return Ra(e.serializer, t);
						})
					};
				this.du(n);
			}),
			e
		);
	})(Cl),
	Fl = (function (t) {
		function e(e, n, r) {
			var i = this;
			return (
				((i = t.call(this) || this).credentials = e), (i.iu = n), (i.serializer = r), (i.Fu = !1), i
			);
		}
		return (
			se(e, t),
			(e.prototype.xu = function () {
				if (this.Fu)
					throw new cs(as.FAILED_PRECONDITION, 'The client has already been terminated.');
			}),
			(e.prototype.$u = function (t, e, n) {
				var r = this;
				return (
					this.xu(),
					this.credentials
						.getToken()
						.then(function (i) {
							return r.iu.$u(t, e, n, i);
						})
						.catch(function (t) {
							throw (t.code === as.UNAUTHENTICATED && r.credentials.zc(), t);
						})
				);
			}),
			(e.prototype.ku = function (t, e, n) {
				var r = this;
				return (
					this.xu(),
					this.credentials
						.getToken()
						.then(function (i) {
							return r.iu.ku(t, e, n, i);
						})
						.catch(function (t) {
							throw (t.code === as.UNAUTHENTICATED && r.credentials.zc(), t);
						})
				);
			}),
			(e.prototype.terminate = function () {
				this.Fu = !1;
			}),
			e
		);
	})(function () {}),
	jl = (function () {
		function t(t, e) {
			(this.cs = t),
				(this.di = e),
				(this.state = 'Unknown'),
				(this.Mu = 0),
				(this.Ou = null),
				(this.Lu = !0);
		}
		return (
			(t.prototype.Bu = function () {
				var t = this;
				0 === this.Mu &&
					(this.qu('Unknown'),
					(this.Ou = this.cs.yn('online_state_timeout', 1e4, function () {
						return (
							(t.Ou = null),
							t.Uu("Backend didn't respond within 10 seconds."),
							t.qu('Offline'),
							Promise.resolve()
						);
					})));
			}),
			(t.prototype.Qu = function (t) {
				'Online' === this.state
					? this.qu('Unknown')
					: (this.Mu++,
					  this.Mu >= 1 &&
							(this.Wu(),
							this.Uu('Connection failed 1 times. Most recent error: ' + t.toString()),
							this.qu('Offline')));
			}),
			(t.prototype.set = function (t) {
				this.Wu(), (this.Mu = 0), 'Online' === t && (this.Lu = !1), this.qu(t);
			}),
			(t.prototype.qu = function (t) {
				t !== this.state && ((this.state = t), this.di(t));
			}),
			(t.prototype.Uu = function (t) {
				var e =
					'Could not reach Cloud Firestore backend. ' +
					t +
					'\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.';
				this.Lu ? (ps(e), (this.Lu = !1)) : ls('OnlineStateTracker', e);
			}),
			(t.prototype.Wu = function () {
				null !== this.Ou && (this.Ou.cancel(), (this.Ou = null));
			}),
			t
		);
	})(),
	Ml = function (t, e, n, r, i) {
		var o = this;
		(this.ju = t),
			(this.Ku = e),
			(this.cs = n),
			(this.Gu = {}),
			(this.zu = []),
			(this.Hu = new Map()),
			(this.Yu = new Set()),
			(this.Ju = []),
			(this.Xu = i),
			this.Xu.Zu(function (t) {
				n.ws(function () {
					return ae(o, void 0, void 0, function () {
						return ce(this, function (t) {
							switch (t.label) {
								case 0:
									return Xl(this)
										? (ls('RemoteStore', 'Restarting streams for network reachability change.'),
										  [
												4,
												(function (t) {
													return ae(this, void 0, void 0, function () {
														var e;
														return ce(this, function (n) {
															switch (n.label) {
																case 0:
																	return (e = ms(t)).Yu.add(4), [4, Bl(e)];
																case 1:
																	return n.sent(), e.th.set('Unknown'), e.Yu.delete(4), [4, ql(e)];
																case 2:
																	return n.sent(), [2];
															}
														});
													});
												})(this)
										  ])
										: [3, 2];
								case 1:
									t.sent(), (t.label = 2);
								case 2:
									return [2];
							}
						});
					});
				});
			}),
			(this.th = new jl(n, r));
	};
function ql(t) {
	return ae(this, void 0, void 0, function () {
		var e, n;
		return ce(this, function (r) {
			switch (r.label) {
				case 0:
					if (!Xl(t)) return [3, 4];
					(e = 0), (n = t.Ju), (r.label = 1);
				case 1:
					return e < n.length ? [4, (0, n[e])(!0)] : [3, 4];
				case 2:
					r.sent(), (r.label = 3);
				case 3:
					return e++, [3, 1];
				case 4:
					return [2];
			}
		});
	});
}
function Bl(t) {
	return ae(this, void 0, void 0, function () {
		var e, n;
		return ce(this, function (r) {
			switch (r.label) {
				case 0:
					(e = 0), (n = t.Ju), (r.label = 1);
				case 1:
					return e < n.length ? [4, (0, n[e])(!1)] : [3, 4];
				case 2:
					r.sent(), (r.label = 3);
				case 3:
					return e++, [3, 1];
				case 4:
					return [2];
			}
		});
	});
}
function Gl(t) {
	return ae(this, void 0, void 0, function () {
		var e;
		return ce(this, function (n) {
			switch (n.label) {
				case 0:
					return (
						(e = ms(t)), ls('RemoteStore', 'RemoteStore shutting down.'), e.Yu.add(5), [4, Bl(e)]
					);
				case 1:
					return n.sent(), e.Xu.Di(), e.th.set('Unknown'), [2];
			}
		});
	});
}
function zl(t, e) {
	var n = ms(t);
	n.Hu.has(e.targetId) || (n.Hu.set(e.targetId, e), Ql(n) ? Wl(n) : fp(n).uu() && Hl(n, e));
}
function $l(t, e) {
	var n = ms(t),
		r = fp(n);
	n.Hu.delete(e),
		r.uu() && Kl(n, e),
		0 === n.Hu.size && (r.uu() ? r._u() : Xl(n) && n.th.set('Unknown'));
}
function Hl(t, e) {
	t.eh.Ie(e.targetId), fp(t).Vu(e);
}
function Kl(t, e) {
	t.eh.Ie(e), fp(t).pu(e);
}
function Wl(t) {
	(t.eh = new $u({
		qe: function (e) {
			return t.Gu.qe(e);
		},
		Ue: function (e) {
			return t.Hu.get(e) || null;
		}
	})),
		fp(t).start(),
		t.th.Bu();
}
function Ql(t) {
	return Xl(t) && !fp(t).cu() && t.Hu.size > 0;
}
function Xl(t) {
	return 0 === ms(t).Yu.size;
}
function Yl(t) {
	t.eh = void 0;
}
function Jl(t) {
	return ae(this, void 0, void 0, function () {
		return ce(this, function (e) {
			return (
				t.Hu.forEach(function (e, n) {
					Hl(t, e);
				}),
				[2]
			);
		});
	});
}
function Zl(t, e) {
	return ae(this, void 0, void 0, function () {
		return ce(this, function (n) {
			return Yl(t), Ql(t) ? (t.th.Qu(e), Wl(t)) : t.th.set('Unknown'), [2];
		});
	});
}
function tp(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var r, i, o;
		return ce(this, function (s) {
			switch (s.label) {
				case 0:
					if ((t.th.set('Online'), !(e instanceof Gu && 2 === e.state && e.cause))) return [3, 6];
					s.label = 1;
				case 1:
					return (
						s.trys.push([1, 3, , 5]),
						[
							4,
							(function (t, e) {
								return ae(this, void 0, void 0, function () {
									var n, r, i, o;
									return ce(this, function (s) {
										switch (s.label) {
											case 0:
												(n = e.cause), (r = 0), (i = e.targetIds), (s.label = 1);
											case 1:
												return r < i.length
													? ((o = i[r]), t.Hu.has(o) ? [4, t.Gu.nh(o, n)] : [3, 3])
													: [3, 5];
											case 2:
												s.sent(), t.Hu.delete(o), t.eh.removeTarget(o), (s.label = 3);
											case 3:
												s.label = 4;
											case 4:
												return r++, [3, 1];
											case 5:
												return [2];
										}
									});
								});
							})(t, e)
						]
					);
				case 2:
					return s.sent(), [3, 5];
				case 3:
					return (
						(r = s.sent()),
						ls('RemoteStore', 'Failed to remove targets %s: %s ', e.targetIds.join(','), r),
						[4, ep(t, r)]
					);
				case 4:
					return s.sent(), [3, 5];
				case 5:
					return [3, 13];
				case 6:
					if (
						(e instanceof qu ? t.eh.be(e) : e instanceof Bu ? t.eh.$e(e) : t.eh.De(e),
						n.isEqual(su.min()))
					)
						return [3, 13];
					s.label = 7;
				case 7:
					return s.trys.push([7, 11, , 13]), [4, ml(t.ju)];
				case 8:
					return (
						(i = s.sent()),
						n.L(i) >= 0
							? [
									4,
									((u = t),
									(a = n),
									(c = u.eh.Oe(a)),
									c.zt.forEach(function (t, e) {
										if (t.resumeToken.O() > 0) {
											var n = u.Hu.get(e);
											n && u.Hu.set(e, n.it(t.resumeToken, a));
										}
									}),
									c.Ht.forEach(function (t) {
										var e = u.Hu.get(t);
										if (e) {
											u.Hu.set(t, e.it(Ys.B, e.nt)), Kl(u, t);
											var n = new gu(e.target, t, 1, e.sequenceNumber);
											Hl(u, n);
										}
									}),
									u.Gu.sh(c))
							  ]
							: [3, 10]
					);
				case 9:
					s.sent(), (s.label = 10);
				case 10:
					return [3, 13];
				case 11:
					return ls('RemoteStore', 'Failed to raise snapshot:', (o = s.sent())), [4, ep(t, o)];
				case 12:
					return s.sent(), [3, 13];
				case 13:
					return [2];
			}
			var u, a, c;
		});
	});
}
function ep(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var r = this;
		return ce(this, function (i) {
			switch (i.label) {
				case 0:
					if (!bh(e)) throw e;
					return t.Yu.add(1), [4, Bl(t)];
				case 1:
					return (
						i.sent(),
						t.th.set('Offline'),
						n ||
							(n = function () {
								return ml(t.ju);
							}),
						t.cs.Cs(function () {
							return ae(r, void 0, void 0, function () {
								return ce(this, function (e) {
									switch (e.label) {
										case 0:
											return ls('RemoteStore', 'Retrying IndexedDB access'), [4, n()];
										case 1:
											return e.sent(), t.Yu.delete(1), [4, ql(t)];
										case 2:
											return e.sent(), [2];
									}
								});
							});
						}),
						[2]
					);
			}
		});
	});
}
function np(t, e) {
	return e().catch(function (n) {
		return ep(t, n, e);
	});
}
function rp(t) {
	return ae(this, void 0, void 0, function () {
		var e, n, r, i, o;
		return ce(this, function (s) {
			switch (s.label) {
				case 0:
					(e = ms(t)),
						(n = lp(e)),
						(r = e.zu.length > 0 ? e.zu[e.zu.length - 1].batchId : -1),
						(s.label = 1);
				case 1:
					if (!(Xl((u = e)) && u.zu.length < 10)) return [3, 7];
					s.label = 2;
				case 2:
					return s.trys.push([2, 4, , 6]), [4, wl(e.ju, r)];
				case 3:
					return null === (i = s.sent())
						? (0 === e.zu.length && n._u(), [3, 7])
						: ((r = i.batchId),
						  (function (t, e) {
								t.zu.push(e);
								var n = lp(t);
								n.uu() && n.vu && n.Su(e.mutations);
						  })(e, i),
						  [3, 6]);
				case 4:
					return (o = s.sent()), [4, ep(e, o)];
				case 5:
					return s.sent(), [3, 6];
				case 6:
					return [3, 1];
				case 7:
					return ip(e) && op(e), [2];
			}
			var u;
		});
	});
}
function ip(t) {
	return Xl(t) && !lp(t).cu() && t.zu.length > 0;
}
function op(t) {
	lp(t).start();
}
function sp(t) {
	return ae(this, void 0, void 0, function () {
		return ce(this, function (e) {
			return lp(t).Nu(), [2];
		});
	});
}
function up(t) {
	return ae(this, void 0, void 0, function () {
		var e, n, r, i;
		return ce(this, function (o) {
			for (e = lp(t), n = 0, r = t.zu; n < r.length; n++) (i = r[n]), e.Su(i.mutations);
			return [2];
		});
	});
}
function ap(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var r, i;
		return ce(this, function (o) {
			switch (o.label) {
				case 0:
					return (
						(r = t.zu.shift()),
						(i = Yh.from(r, e, n)),
						[
							4,
							np(t, function () {
								return t.Gu.ih(i);
							})
						]
					);
				case 1:
					return o.sent(), [4, rp(t)];
				case 2:
					return o.sent(), [2];
			}
		});
	});
}
function cp(t, e) {
	return ae(this, void 0, void 0, function () {
		return ce(this, function (n) {
			switch (n.label) {
				case 0:
					return e && lp(t).vu
						? [
								4,
								(function (t, e) {
									return ae(this, void 0, void 0, function () {
										var n, r;
										return ce(this, function (i) {
											switch (i.label) {
												case 0:
													return bu((r = e.code)) && r !== as.ABORTED
														? ((n = t.zu.shift()),
														  lp(t).lu(),
														  [
																4,
																np(t, function () {
																	return t.Gu.rh(n.batchId, e);
																})
														  ])
														: [3, 3];
												case 1:
													return i.sent(), [4, rp(t)];
												case 2:
													i.sent(), (i.label = 3);
												case 3:
													return [2];
											}
										});
									});
								})(t, e)
						  ]
						: [3, 2];
				case 1:
					n.sent(), (n.label = 2);
				case 2:
					return ip(t) && op(t), [2];
			}
		});
	});
}
function hp(t, e) {
	return ae(this, void 0, void 0, function () {
		var n;
		return ce(this, function (r) {
			switch (r.label) {
				case 0:
					return (n = ms(t)), e ? (n.Yu.delete(2), [4, ql(n)]) : [3, 2];
				case 1:
					return r.sent(), [3, 5];
				case 2:
					return e ? [3, 4] : (n.Yu.add(2), [4, Bl(n)]);
				case 3:
					r.sent(), n.th.set('Unknown'), (r.label = 4);
				case 4:
					r.label = 5;
				case 5:
					return [2];
			}
		});
	});
}
function fp(t) {
	var e,
		n,
		r,
		i,
		o = this;
	return (
		t.oh ||
			((t.oh =
				((e = t.Ku),
				(n = t.cs),
				(r = { gu: Jl.bind(null, t), Tu: Zl.bind(null, t), yu: tp.bind(null, t) }),
				(i = ms(e)).xu(),
				new Ul(n, i.iu, i.credentials, i.serializer, r))),
			t.Ju.push(function (e) {
				return ae(o, void 0, void 0, function () {
					return ce(this, function (n) {
						switch (n.label) {
							case 0:
								return e ? (t.oh.lu(), Ql(t) ? Wl(t) : t.th.set('Unknown'), [3, 3]) : [3, 1];
							case 1:
								return [4, t.oh.stop()];
							case 2:
								n.sent(), Yl(t), (n.label = 3);
							case 3:
								return [2];
						}
					});
				});
			})),
		t.oh
	);
}
function lp(t) {
	var e,
		n,
		r,
		i,
		o = this;
	return (
		t.ah ||
			((t.ah =
				((e = t.Ku),
				(n = t.cs),
				(r = {
					gu: sp.bind(null, t),
					Tu: cp.bind(null, t),
					Cu: up.bind(null, t),
					Du: ap.bind(null, t)
				}),
				(i = ms(e)).xu(),
				new Vl(n, i.iu, i.credentials, i.serializer, r))),
			t.Ju.push(function (e) {
				return ae(o, void 0, void 0, function () {
					return ce(this, function (n) {
						switch (n.label) {
							case 0:
								return e ? (t.ah.lu(), [4, rp(t)]) : [3, 2];
							case 1:
								return n.sent(), [3, 4];
							case 2:
								return [4, t.ah.stop()];
							case 3:
								n.sent(),
									t.zu.length > 0 &&
										(ls(
											'RemoteStore',
											'Stopping write stream with ' + t.zu.length + ' pending writes'
										),
										(t.zu = [])),
									(n.label = 4);
							case 4:
								return [2];
						}
					});
				});
			})),
		t.ah
	);
}
var pp = function (t) {
		this.key = t;
	},
	dp = function (t) {
		this.key = t;
	},
	vp = (function () {
		function t(t, e) {
			(this.query = t),
				(this.uh = e),
				(this.hh = null),
				(this.te = !1),
				(this.lh = Ru()),
				(this.Wt = Ru()),
				(this._h = Xc(t)),
				(this.fh = new Uu(this._h));
		}
		return (
			Object.defineProperty(t.prototype, 'dh', {
				get: function () {
					return this.uh;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.wh = function (t, e) {
				var n = this,
					r = e ? e.mh : new Vu(),
					i = e ? e.fh : this.fh,
					o = e ? e.Wt : this.Wt,
					s = i,
					u = !1,
					a = Uc(this.query) && i.size === this.query.limit ? i.last() : null,
					c = Vc(this.query) && i.size === this.query.limit ? i.first() : null;
				if (
					(t.ht(function (t, e) {
						var h = i.get(t),
							f = e instanceof Lc ? e : null;
						f && (f = Qc(n.query, f) ? f : null);
						var l = !!h && n.Wt.has(h.key),
							p = !!f && (f.Je || (n.Wt.has(f.key) && f.hasCommittedMutations)),
							d = !1;
						h && f
							? h.data().isEqual(f.data())
								? l !== p && (r.track({ type: 3, doc: f }), (d = !0))
								: n.Th(h, f) ||
								  (r.track({ type: 2, doc: f }),
								  (d = !0),
								  ((a && n._h(f, a) > 0) || (c && n._h(f, c) < 0)) && (u = !0))
							: !h && f
							? (r.track({ type: 0, doc: f }), (d = !0))
							: h && !f && (r.track({ type: 1, doc: h }), (d = !0), (a || c) && (u = !0)),
							d &&
								(f
									? ((s = s.add(f)), (o = p ? o.add(t) : o.delete(t)))
									: ((s = s.delete(t)), (o = o.delete(t))));
					}),
					Uc(this.query) || Vc(this.query))
				)
					for (; s.size > this.query.limit; ) {
						var h = Uc(this.query) ? s.last() : s.first();
						(s = s.delete(h.key)), (o = o.delete(h.key)), r.track({ type: 1, doc: h });
					}
				return { fh: s, mh: r, Eh: u, Wt: o };
			}),
			(t.prototype.Th = function (t, e) {
				return t.Je && e.hasCommittedMutations && !e.Je;
			}),
			(t.prototype.yr = function (t, e, n) {
				var r = this,
					i = this.fh;
				(this.fh = t.fh), (this.Wt = t.Wt);
				var o = t.mh.Ut();
				o.sort(function (t, e) {
					return (
						(n = t.type),
						(i = e.type),
						(o = function (t) {
							switch (t) {
								case 0:
									return 1;
								case 2:
								case 3:
									return 2;
								case 1:
									return 0;
								default:
									return ys();
							}
						})(n) - o(i) || r._h(t.doc, e.doc)
					);
					var n, i, o;
				}),
					this.Ih(n);
				var s = e ? this.Ah() : [],
					u = 0 === this.lh.size && this.te ? 1 : 0,
					a = u !== this.hh;
				return (
					(this.hh = u),
					0 !== o.length || a
						? { snapshot: new Fu(this.query, t.fh, i, o, t.Wt, 0 === u, a, !1), Rh: s }
						: { Rh: s }
				);
			}),
			(t.prototype.Qs = function (t) {
				return this.te && 'Offline' === t
					? ((this.te = !1), this.yr({ fh: this.fh, mh: new Vu(), Wt: this.Wt, Eh: !1 }, !1))
					: { Rh: [] };
			}),
			(t.prototype.gh = function (t) {
				return !this.uh.has(t) && !!this.fh.has(t) && !this.fh.get(t).Je;
			}),
			(t.prototype.Ih = function (t) {
				var e = this;
				t &&
					(t.ee.forEach(function (t) {
						return (e.uh = e.uh.add(t));
					}),
					t.ne.forEach(function (t) {}),
					t.se.forEach(function (t) {
						return (e.uh = e.uh.delete(t));
					}),
					(this.te = t.te));
			}),
			(t.prototype.Ah = function () {
				var t = this;
				if (!this.te) return [];
				var e = this.lh;
				(this.lh = Ru()),
					this.fh.forEach(function (e) {
						t.gh(e.key) && (t.lh = t.lh.add(e.key));
					});
				var n = [];
				return (
					e.forEach(function (e) {
						t.lh.has(e) || n.push(new dp(e));
					}),
					this.lh.forEach(function (t) {
						e.has(t) || n.push(new pp(t));
					}),
					n
				);
			}),
			(t.prototype.Ph = function (t) {
				(this.uh = t.Fc), (this.lh = Ru());
				var e = this.wh(t.documents);
				return this.yr(e, !0);
			}),
			(t.prototype.yh = function () {
				return Fu.Gt(this.query, this.fh, this.Wt, 0 === this.hh);
			}),
			t
		);
	})(),
	yp = function (t, e, n) {
		(this.query = t), (this.targetId = e), (this.view = n);
	},
	gp = function (t) {
		(this.key = t), (this.Vh = !1);
	},
	mp = (function () {
		function t(t, e, n, r, i, o) {
			(this.ju = t),
				(this.ph = e),
				(this.bh = n),
				(this.Sh = r),
				(this.currentUser = i),
				(this.Dh = o),
				(this.Ch = {}),
				(this.Nh = new iu(function (t) {
					return Kc(t);
				}, Hc)),
				(this.Fh = new Map()),
				(this.xh = []),
				(this.$h = new Eu(Ns.i)),
				(this.kh = new Map()),
				(this.Mh = new Dl()),
				(this.Oh = {}),
				(this.Lh = new Map()),
				(this.Bh = rl.da()),
				(this.onlineState = 'Unknown'),
				(this.qh = void 0);
		}
		return (
			Object.defineProperty(t.prototype, 'Uh', {
				get: function () {
					return !0 === this.qh;
				},
				enumerable: !1,
				configurable: !0
			}),
			t
		);
	})();
function bp(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r, i, o, s, u;
		return ce(this, function (a) {
			switch (a.label) {
				case 0:
					return (
						(n = $p(t)),
						(o = n.Nh.get(e)) ? ((r = o.targetId), n.Sh.Oi(r), (i = o.view.yh()), [3, 4]) : [3, 1]
					);
				case 1:
					return [4, El(n.ju, Bc(e))];
				case 2:
					return (
						(s = a.sent()),
						(u = n.Sh.Oi(s.targetId)),
						(r = s.targetId),
						[4, wp(n, e, r, 'current' === u)]
					);
				case 3:
					(i = a.sent()), n.Uh && zl(n.ph, s), (a.label = 4);
				case 4:
					return [2, i];
			}
		});
	});
}
function wp(t, e, n, r) {
	return ae(this, void 0, void 0, function () {
		var i, o, s, u, a, c;
		return ce(this, function (h) {
			switch (h.label) {
				case 0:
					return (
						(t.Qh = function (e, n, r) {
							return (function (t, e, n, r) {
								return ae(this, void 0, void 0, function () {
									var i, o, s;
									return ce(this, function (u) {
										switch (u.label) {
											case 0:
												return (i = e.view.wh(n)).Eh
													? [
															4,
															_l(t.ju, e.query, !1).then(function (t) {
																var n = t.documents;
																return e.view.wh(n, i);
															})
													  ]
													: [3, 2];
											case 1:
												(i = u.sent()), (u.label = 2);
											case 2:
												return (
													(o = r && r.zt.get(e.targetId)),
													(s = e.view.yr(i, t.Uh, o)),
													[2, (Op(t, e.targetId, s.Rh), s.snapshot)]
												);
										}
									});
								});
							})(t, e, n, r);
						}),
						[4, _l(t.ju, e, !0)]
					);
				case 1:
					return (
						(i = h.sent()),
						(o = new vp(e, i.Fc)),
						(s = o.wh(i.documents)),
						(u = Mu.Zt(n, r && 'Offline' !== t.onlineState)),
						(a = o.yr(s, t.Uh, u)),
						Op(t, n, a.Rh),
						(c = new yp(e, n, o)),
						[2, (t.Nh.set(e, c), t.Fh.has(n) ? t.Fh.get(n).push(e) : t.Fh.set(n, [e]), a.snapshot)]
					);
			}
		});
	});
}
function Ep(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r, i;
		return ce(this, function (o) {
			switch (o.label) {
				case 0:
					return (
						(n = ms(t)),
						(r = n.Nh.get(e)),
						(i = n.Fh.get(r.targetId)).length > 1
							? [
									2,
									(n.Fh.set(
										r.targetId,
										i.filter(function (t) {
											return !Hc(t, e);
										})
									),
									void n.Nh.delete(e))
							  ]
							: n.Uh
							? (n.Sh.Bi(r.targetId),
							  n.Sh.Fi(r.targetId)
									? [3, 2]
									: [
											4,
											Il(n.ju, r.targetId, !1)
												.then(function () {
													n.Sh.Ui(r.targetId), $l(n.ph, r.targetId), xp(n, r.targetId);
												})
												.catch(Sl)
									  ])
							: [3, 3]
					);
				case 1:
					o.sent(), (o.label = 2);
				case 2:
					return [3, 5];
				case 3:
					return xp(n, r.targetId), [4, Il(n.ju, r.targetId, !0)];
				case 4:
					o.sent(), (o.label = 5);
				case 5:
					return [2];
			}
		});
	});
}
function Ip(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r;
		return ce(this, function (i) {
			switch (i.label) {
				case 0:
					(n = ms(t)), (i.label = 1);
				case 1:
					return i.trys.push([1, 4, , 6]), [4, bl(n.ju, e)];
				case 2:
					return (
						(r = i.sent()),
						e.zt.forEach(function (t, e) {
							var r = n.kh.get(e);
							r &&
								(gs(t.ee.size + t.ne.size + t.se.size <= 1),
								t.ee.size > 0
									? (r.Vh = !0)
									: t.ne.size > 0
									? gs(r.Vh)
									: t.se.size > 0 && (gs(r.Vh), (r.Vh = !1)));
						}),
						[4, Pp(n, r, e)]
					);
				case 3:
					return i.sent(), [3, 6];
				case 4:
					return [4, Sl(i.sent())];
				case 5:
					return i.sent(), [3, 6];
				case 6:
					return [2];
			}
		});
	});
}
function _p(t, e, n) {
	var r = ms(t);
	if ((r.Uh && 0 === n) || (!r.Uh && 1 === n)) {
		var i = [];
		r.Nh.forEach(function (t, n) {
			var r = n.view.Qs(e);
			r.snapshot && i.push(r.snapshot);
		}),
			(function (t, e) {
				var n = ms(t);
				n.onlineState = e;
				var r = !1;
				n.Bs.forEach(function (t, n) {
					for (var i = 0, o = n.listeners; i < o.length; i++) o[i].Qs(e) && (r = !0);
				}),
					r && Uh(n);
			})(r.bh, e),
			i.length && r.Ch.yu(i),
			(r.onlineState = e),
			r.Uh && r.Sh.Ki(e);
	}
}
function Tp(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var r, i, o, s, u, a;
		return ce(this, function (c) {
			switch (c.label) {
				case 0:
					return (
						(r = ms(t)).Sh.Qi(e, 'rejected', n),
						(i = r.kh.get(e)),
						(o = i && i.key)
							? ((s = (s = new Eu(Ns.i)).ot(o, new Oc(o, su.min()))),
							  (u = Ru().add(o)),
							  (a = new ju(su.min(), new Map(), new Tu(Ws), s, u)),
							  [4, Ip(r, a)])
							: [3, 2]
					);
				case 1:
					return c.sent(), (r.$h = r.$h.remove(o)), r.kh.delete(e), Rp(r), [3, 4];
				case 2:
					return [
						4,
						Il(r.ju, e, !1)
							.then(function () {
								return xp(r, e, n);
							})
							.catch(Sl)
					];
				case 3:
					c.sent(), (c.label = 4);
				case 4:
					return [2];
			}
		});
	});
}
function Ap(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r, i;
		return ce(this, function (o) {
			switch (o.label) {
				case 0:
					(n = ms(t)), (r = e.batch.batchId), (o.label = 1);
				case 1:
					return o.trys.push([1, 4, , 6]), [4, gl(n.ju, e)];
				case 2:
					return (
						(i = o.sent()), Dp(n, r, null), Sp(n, r), n.Sh.ki(r, 'acknowledged'), [4, Pp(n, i)]
					);
				case 3:
					return o.sent(), [3, 6];
				case 4:
					return [4, Sl(o.sent())];
				case 5:
					return o.sent(), [3, 6];
				case 6:
					return [2];
			}
		});
	});
}
function Np(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var r, i;
		return ce(this, function (o) {
			switch (o.label) {
				case 0:
					(r = ms(t)), (o.label = 1);
				case 1:
					return (
						o.trys.push([1, 4, , 6]),
						[
							4,
							((s = r.ju),
							(u = e),
							(a = ms(s)),
							a.persistence.runTransaction('Reject batch', 'readwrite-primary', function (t) {
								var e;
								return a.Sr.Oo(t, u)
									.next(function (n) {
										return gs(null !== n), (e = n.keys()), a.Sr.Wo(t, n);
									})
									.next(function () {
										return a.Sr.zo(t);
									})
									.next(function () {
										return a.Cc.kr(t, e);
									});
							}))
						]
					);
				case 2:
					return (i = o.sent()), Dp(r, e, n), Sp(r, e), r.Sh.ki(e, 'rejected', n), [4, Pp(r, i)];
				case 3:
					return o.sent(), [3, 6];
				case 4:
					return [4, Sl(o.sent())];
				case 5:
					return o.sent(), [3, 6];
				case 6:
					return [2];
			}
			var s, u, a;
		});
	});
}
function Sp(t, e) {
	(t.Lh.get(e) || []).forEach(function (t) {
		t.resolve();
	}),
		t.Lh.delete(e);
}
function Dp(t, e, n) {
	var r = ms(t),
		i = r.Oh[r.currentUser.ti()];
	if (i) {
		var o = i.get(e);
		o && (n ? o.reject(n) : o.resolve(), (i = i.remove(e))), (r.Oh[r.currentUser.ti()] = i);
	}
}
function xp(t, e, n) {
	void 0 === n && (n = null), t.Sh.Bi(e);
	for (var r = 0, i = t.Fh.get(e); r < i.length; r++) {
		var o = i[r];
		t.Nh.delete(o), n && t.Ch.Wh(o, n);
	}
	t.Fh.delete(e),
		t.Uh &&
			t.Mh.Uc(e).forEach(function (e) {
				t.Mh.Ho(e) || Lp(t, e);
			});
}
function Lp(t, e) {
	var n = t.$h.get(e);
	null !== n && ($l(t.ph, n), (t.$h = t.$h.remove(e)), t.kh.delete(n), Rp(t));
}
function Op(t, e, n) {
	for (var r = 0, i = n; r < i.length; r++) {
		var o = i[r];
		o instanceof pp
			? (t.Mh.Da(o.key, e), kp(t, o))
			: o instanceof dp
			? (ls('SyncEngine', 'Document no longer in limbo: ' + o.key),
			  t.Mh.Na(o.key, e),
			  t.Mh.Ho(o.key) || Lp(t, o.key))
			: ys();
	}
}
function kp(t, e) {
	var n = e.key;
	t.$h.get(n) || (ls('SyncEngine', 'New document in limbo: ' + n), t.xh.push(n), Rp(t));
}
function Rp(t) {
	for (; t.xh.length > 0 && t.$h.size < t.Dh; ) {
		var e = t.xh.shift(),
			n = t.Bh.next();
		t.kh.set(n, new gp(e)), (t.$h = t.$h.ot(e, n)), zl(t.ph, new gu(Bc(Cc(e.path)), n, 2, jh.ai));
	}
}
function Pp(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var r, i, o, s;
		return ce(this, function (u) {
			switch (u.label) {
				case 0:
					return (
						(r = ms(t)),
						(i = []),
						(o = []),
						(s = []),
						r.Nh.m()
							? [3, 3]
							: (r.Nh.forEach(function (t, u) {
									s.push(
										r.Qh(u, e, n).then(function (t) {
											if (t) {
												r.Uh && r.Sh.Qi(u.targetId, t.fromCache ? 'not-current' : 'current'),
													i.push(t);
												var e = nf.zr(u.targetId, t);
												o.push(e);
											}
										})
									);
							  }),
							  [4, Promise.all(s)])
					);
				case 1:
					return (
						u.sent(),
						r.Ch.yu(i),
						[
							4,
							(function (t, e) {
								return ae(this, void 0, void 0, function () {
									var n, r, i, o, s, u, a, c, h;
									return ce(this, function (f) {
										switch (f.label) {
											case 0:
												(n = ms(t)), (f.label = 1);
											case 1:
												return (
													f.trys.push([1, 3, , 4]),
													[
														4,
														n.persistence.runTransaction(
															'notifyLocalViewChanges',
															'readwrite',
															function (t) {
																return vh.forEach(e, function (e) {
																	return vh
																		.forEach(e.Kr, function (r) {
																			return n.persistence.No.Da(t, e.targetId, r);
																		})
																		.next(function () {
																			return vh.forEach(e.Gr, function (r) {
																				return n.persistence.No.Na(t, e.targetId, r);
																			});
																		});
																});
															}
														)
													]
												);
											case 2:
												return f.sent(), [3, 4];
											case 3:
												if (!bh((r = f.sent()))) throw r;
												return ls('LocalStore', 'Failed to update sequence numbers: ' + r), [3, 4];
											case 4:
												for (i = 0, o = e; i < o.length; i++)
													(s = o[i]),
														(u = s.targetId),
														s.fromCache ||
															((a = n.bc.get(u)),
															(c = a.nt),
															(h = a.rt(c)),
															(n.bc = n.bc.ot(u, h)));
												return [2];
										}
									});
								});
							})(r.ju, o)
						]
					);
				case 2:
					u.sent(), (u.label = 3);
				case 3:
					return [2];
			}
		});
	});
}
function Cp(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r;
		return ce(this, function (i) {
			switch (i.label) {
				case 0:
					return (n = ms(t)).currentUser.isEqual(e)
						? [3, 3]
						: (ls('SyncEngine', 'User change. New user:', e.ti()),
						  [
								4,
								(function (t, e) {
									return ae(this, void 0, void 0, function () {
										var n, r, i, o;
										return ce(this, function (s) {
											switch (s.label) {
												case 0:
													return (
														(n = ms(t)),
														(r = n.Sr),
														(i = n.Cc),
														[
															4,
															n.persistence.runTransaction(
																'Handle user change',
																'readonly',
																function (t) {
																	var o;
																	return n.Sr.Uo(t)
																		.next(function (s) {
																			return (
																				(o = s),
																				(r = n.persistence.mc(e)),
																				(i = new ef(n.Dc, r, n.persistence.Ic())),
																				r.Uo(t)
																			);
																		})
																		.next(function (e) {
																			for (
																				var n = [], r = [], s = Ru(), u = 0, a = o;
																				u < a.length;
																				u++
																			) {
																				var c = a[u];
																				n.push(c.batchId);
																				for (var h = 0, f = c.mutations; h < f.length; h++) {
																					var l = f[h];
																					s = s.add(l.key);
																				}
																			}
																			for (var p = 0, d = e; p < d.length; p++) {
																				var v = d[p];
																				r.push(v.batchId);
																				for (var y = 0, g = v.mutations; y < g.length; y++) {
																					var m = g[y];
																					s = s.add(m.key);
																				}
																			}
																			return i.kr(t, s).next(function (t) {
																				return { jh: t, Kh: n, Gh: r };
																			});
																		});
																}
															)
														]
													);
												case 1:
													return (o = s.sent()), [2, ((n.Sr = r), (n.Cc = i), n.Vc.Nc(n.Cc), o)];
											}
										});
									});
								})(n.ju, e)
						  ]);
				case 1:
					return (
						(r = i.sent()),
						(n.currentUser = e),
						(o = n).Lh.forEach(function (t) {
							t.forEach(function (t) {
								t.reject(
									new cs(
										as.CANCELLED,
										"'waitForPendingWrites' promise is rejected due to a user change."
									)
								);
							});
						}),
						o.Lh.clear(),
						n.Sh.ji(e, r.Kh, r.Gh),
						[4, Pp(n, r.jh)]
					);
				case 2:
					i.sent(), (i.label = 3);
				case 3:
					return [2];
			}
			var o;
		});
	});
}
function Up(t, e) {
	var n = ms(t),
		r = n.kh.get(e);
	if (r && r.Vh) return Ru().add(r.key);
	var i = Ru(),
		o = n.Fh.get(e);
	if (!o) return i;
	for (var s = 0, u = o; s < u.length; s++) {
		var a = u[s],
			c = n.Nh.get(a);
		i = i.kt(c.view.dh);
	}
	return i;
}
function Vp(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r, i;
		return ce(this, function (o) {
			switch (o.label) {
				case 0:
					return [4, _l((n = ms(t)).ju, e.query, !0)];
				case 1:
					return (r = o.sent()), (i = e.view.Ph(r)), [2, (n.Uh && Op(n, e.targetId, i.Rh), i)];
			}
		});
	});
}
function Fp(t, e, n, r) {
	return ae(this, void 0, void 0, function () {
		var i, o;
		return ce(this, function (s) {
			switch (s.label) {
				case 0:
					return [
						4,
						((u = (i = ms(t)).ju),
						(a = e),
						(c = ms(u)),
						(h = ms(c.Sr)),
						c.persistence.runTransaction('Lookup mutation documents', 'readonly', function (t) {
							return h.Lo(t, a).next(function (e) {
								return e ? c.Cc.kr(t, e) : vh.resolve(null);
							});
						}))
					];
				case 1:
					return null === (o = s.sent()) ? [3, 6] : 'pending' !== n ? [3, 3] : [4, rp(i.ph)];
				case 2:
					return s.sent(), [3, 4];
				case 3:
					'acknowledged' === n || 'rejected' === n
						? (Dp(i, e, r || null),
						  Sp(i, e),
						  (function (t, e) {
								ms(ms(t).Sr).Ko(e);
						  })(i.ju, e))
						: ys(),
						(s.label = 4);
				case 4:
					return [4, Pp(i, o)];
				case 5:
					return s.sent(), [3, 7];
				case 6:
					ls('SyncEngine', 'Cannot apply mutation batch with id: ' + e), (s.label = 7);
				case 7:
					return [2];
			}
			var u, a, c, h;
		});
	});
}
function jp(t, e) {
	return ae(this, void 0, void 0, function () {
		var n, r, i, o, s, u, a, c;
		return ce(this, function (h) {
			switch (h.label) {
				case 0:
					return (
						$p((n = ms(t))),
						Hp(n),
						!0 !== e || !0 === n.qh ? [3, 3] : ((r = n.Sh.Ci()), [4, Mp(n, r.A())])
					);
				case 1:
					return (i = h.sent()), (n.qh = !0), [4, hp(n.ph, !0)];
				case 2:
					for (h.sent(), o = 0, s = i; o < s.length; o++) (u = s[o]), zl(n.ph, u);
					return [3, 7];
				case 3:
					return !1 !== e || !1 === n.qh
						? [3, 7]
						: ((a = []),
						  (c = Promise.resolve()),
						  n.Fh.forEach(function (t, e) {
								n.Sh.qi(e)
									? a.push(e)
									: (c = c.then(function () {
											return xp(n, e), Il(n.ju, e, !0);
									  })),
									$l(n.ph, e);
						  }),
						  [4, c]);
				case 4:
					return h.sent(), [4, Mp(n, a)];
				case 5:
					return (
						h.sent(),
						(f = ms(n)).kh.forEach(function (t, e) {
							$l(f.ph, e);
						}),
						f.Mh.Qc(),
						(f.kh = new Map()),
						(f.$h = new Eu(Ns.i)),
						(n.qh = !1),
						[4, hp(n.ph, !1)]
					);
				case 6:
					h.sent(), (h.label = 7);
				case 7:
					return [2];
			}
			var f;
		});
	});
}
function Mp(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var n, r, i, o, s, u, a, c, h, f, l, p, d, v;
		return ce(this, function (y) {
			switch (y.label) {
				case 0:
					(n = ms(t)), (r = []), (i = []), (o = 0), (s = e), (y.label = 1);
				case 1:
					return o < s.length
						? ((u = s[o]),
						  (a = void 0),
						  (c = n.Fh.get(u)) && 0 !== c.length ? [4, El(n.ju, Bc(c[0]))] : [3, 7])
						: [3, 13];
				case 2:
					(a = y.sent()), (h = 0), (f = c), (y.label = 3);
				case 3:
					return h < f.length ? ((l = f[h]), (p = n.Nh.get(l)), [4, Vp(n, p)]) : [3, 6];
				case 4:
					(d = y.sent()).snapshot && i.push(d.snapshot), (y.label = 5);
				case 5:
					return h++, [3, 3];
				case 6:
					return [3, 11];
				case 7:
					return [4, Tl(n.ju, u)];
				case 8:
					return (v = y.sent()), [4, El(n.ju, v)];
				case 9:
					return (a = y.sent()), [4, wp(n, qp(v), u, !1)];
				case 10:
					y.sent(), (y.label = 11);
				case 11:
					r.push(a), (y.label = 12);
				case 12:
					return o++, [3, 1];
				case 13:
					return [2, (n.Ch.yu(i), r)];
			}
		});
	});
}
function qp(t) {
	return Pc(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, 'F', t.startAt, t.endAt);
}
function Bp(t) {
	var e = ms(t);
	return ms(ms(e.ju).persistence).pi();
}
function Gp(t, e, n, r) {
	return ae(this, void 0, void 0, function () {
		var i, o, s;
		return ce(this, function (u) {
			switch (u.label) {
				case 0:
					return (i = ms(t)).qh
						? (ls('SyncEngine', 'Ignoring unexpected query state notification.'), [3, 8])
						: [3, 1];
				case 1:
					if (!i.Fh.has(e)) return [3, 8];
					switch (n) {
						case 'current':
						case 'not-current':
							return [3, 2];
						case 'rejected':
							return [3, 5];
					}
					return [3, 7];
				case 2:
					return [4, Al(i.ju)];
				case 3:
					return (o = u.sent()), (s = ju.Xt(e, 'current' === n)), [4, Pp(i, o, s)];
				case 4:
					return u.sent(), [3, 8];
				case 5:
					return [4, Il(i.ju, e, !0)];
				case 6:
					return u.sent(), xp(i, e, r), [3, 8];
				case 7:
					ys(), (u.label = 8);
				case 8:
					return [2];
			}
		});
	});
}
function zp(t, e, n) {
	return ae(this, void 0, void 0, function () {
		var r, i, o, s, u, a, c, h, f, l;
		return ce(this, function (p) {
			switch (p.label) {
				case 0:
					if (!(r = $p(t)).qh) return [3, 10];
					(i = 0), (o = e), (p.label = 1);
				case 1:
					return i < o.length
						? ((s = o[i]),
						  r.Fh.has(s)
								? (ls('SyncEngine', 'Adding an already active target ' + s), [3, 5])
								: [4, Tl(r.ju, s)])
						: [3, 6];
				case 2:
					return (u = p.sent()), [4, El(r.ju, u)];
				case 3:
					return (a = p.sent()), [4, wp(r, qp(u), a.targetId, !1)];
				case 4:
					p.sent(), zl(r.ph, a), (p.label = 5);
				case 5:
					return i++, [3, 1];
				case 6:
					(c = function (t) {
						return ce(this, function (e) {
							switch (e.label) {
								case 0:
									return r.Fh.has(t)
										? [
												4,
												Il(r.ju, t, !1)
													.then(function () {
														$l(r.ph, t), xp(r, t);
													})
													.catch(Sl)
										  ]
										: [3, 2];
								case 1:
									e.sent(), (e.label = 2);
								case 2:
									return [2];
							}
						});
					}),
						(h = 0),
						(f = n),
						(p.label = 7);
				case 7:
					return h < f.length ? ((l = f[h]), [5, c(l)]) : [3, 10];
				case 8:
					p.sent(), (p.label = 9);
				case 9:
					return h++, [3, 7];
				case 10:
					return [2];
			}
		});
	});
}
function $p(t) {
	var e = ms(t);
	return (
		(e.ph.Gu.sh = Ip.bind(null, e)),
		(e.ph.Gu.qe = Up.bind(null, e)),
		(e.ph.Gu.nh = Tp.bind(null, e)),
		(e.Ch.yu = Ph.bind(null, e.bh)),
		(e.Ch.Wh = Ch.bind(null, e.bh)),
		e
	);
}
function Hp(t) {
	var e = ms(t);
	return (e.ph.Gu.ih = Ap.bind(null, e)), (e.ph.Gu.rh = Np.bind(null, e)), e;
	/**
	 * @license
	 * Copyright 2019 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
}
var Kp = (function () {
		function t() {}
		return (
			(t.prototype.Nc = function (t) {
				this.zh = t;
			}),
			(t.prototype.Lr = function (t, e, n, r) {
				var i,
					o = this;
				return (0 === (i = e).filters.length &&
					null === i.limit &&
					null == i.startAt &&
					null == i.endAt &&
					(0 === i.on.length || (1 === i.on.length && i.on[0].field.p()))) ||
					n.isEqual(su.min())
					? this.Hh(t, e)
					: this.zh.kr(t, r).next(function (i) {
							var s = o.Yh(e, i);
							return (Uc(e) || Vc(e)) && o.Eh(e.an, s, r, n)
								? o.Hh(t, e)
								: (fs() <= Oe.DEBUG &&
										ls(
											'IndexFreeQueryEngine',
											'Re-using previous result from %s to execute query: %s',
											n.toString(),
											Wc(e)
										),
								  o.zh.Lr(t, e, n).next(function (t) {
										return (
											s.forEach(function (e) {
												t = t.ot(e.key, e);
											}),
											t
										);
								  }));
					  });
			}),
			(t.prototype.Yh = function (t, e) {
				var n = new Tu(Xc(t));
				return (
					e.forEach(function (e, r) {
						r instanceof Lc && Qc(t, r) && (n = n.add(r));
					}),
					n
				);
			}),
			(t.prototype.Eh = function (t, e, n, r) {
				if (n.size !== e.size) return !0;
				var i = 'F' === t ? e.last() : e.first();
				return !!i && (i.hasPendingWrites || i.version.L(r) > 0);
			}),
			(t.prototype.Hh = function (t, e) {
				return (
					fs() <= Oe.DEBUG &&
						ls('IndexFreeQueryEngine', 'Using full collection scan to execute query:', Wc(e)),
					this.zh.Lr(t, e, su.min())
				);
			}),
			t
		);
	})(),
	Wp = (function () {
		function t(t, e) {
			(this.Dr = t), (this.No = e), (this.Sr = []), (this.Jh = 1), (this.Xh = new Tu(xl.kc));
		}
		return (
			(t.prototype.$o = function (t) {
				return vh.resolve(0 === this.Sr.length);
			}),
			(t.prototype.ko = function (t, e, n, r) {
				var i = this.Jh;
				this.Jh++, this.Sr.length > 0 && this.Sr[this.Sr.length - 1];
				var o = new Xh(i, e, n, r);
				this.Sr.push(o);
				for (var s = 0, u = r; s < u.length; s++) {
					var a = u[s];
					(this.Xh = this.Xh.add(new xl(a.key, i))), this.Dr.Mo(t, a.key.path.h());
				}
				return vh.resolve(o);
			}),
			(t.prototype.Oo = function (t, e) {
				return vh.resolve(this.Zh(e));
			}),
			(t.prototype.Bo = function (t, e) {
				var n = e + 1,
					r = this.tl(n),
					i = r < 0 ? 0 : r;
				return vh.resolve(this.Sr.length > i ? this.Sr[i] : null);
			}),
			(t.prototype.qo = function () {
				return vh.resolve(0 === this.Sr.length ? -1 : this.Jh - 1);
			}),
			(t.prototype.Uo = function (t) {
				return vh.resolve(this.Sr.slice());
			}),
			(t.prototype.Nr = function (t, e) {
				var n = this,
					r = new xl(e, 0),
					i = new xl(e, Number.POSITIVE_INFINITY),
					o = [];
				return (
					this.Xh.Ft([r, i], function (t) {
						var e = n.Zh(t.jc);
						o.push(e);
					}),
					vh.resolve(o)
				);
			}),
			(t.prototype.Or = function (t, e) {
				var n = this,
					r = new Tu(Ws);
				return (
					e.forEach(function (t) {
						var e = new xl(t, 0),
							i = new xl(t, Number.POSITIVE_INFINITY);
						n.Xh.Ft([e, i], function (t) {
							r = r.add(t.jc);
						});
					}),
					vh.resolve(this.el(r))
				);
			}),
			(t.prototype.Wr = function (t, e) {
				var n = e.path,
					r = n.length + 1,
					i = n;
				Ns.F(i) || (i = i.child(''));
				var o = new xl(new Ns(i), 0),
					s = new Tu(Ws);
				return (
					this.Xh.xt(function (t) {
						var e = t.key.path;
						return !!n.T(e) && (e.length === r && (s = s.add(t.jc)), !0);
					}, o),
					vh.resolve(this.el(s))
				);
			}),
			(t.prototype.el = function (t) {
				var e = this,
					n = [];
				return (
					t.forEach(function (t) {
						var r = e.Zh(t);
						null !== r && n.push(r);
					}),
					n
				);
			}),
			(t.prototype.Wo = function (t, e) {
				var n = this;
				gs(0 === this.nl(e.batchId, 'removed')), this.Sr.shift();
				var r = this.Xh;
				return vh
					.forEach(e.mutations, function (i) {
						var o = new xl(i.key, e.batchId);
						return (r = r.delete(o)), n.No.Go(t, i.key);
					})
					.next(function () {
						n.Xh = r;
					});
			}),
			(t.prototype.Ko = function (t) {}),
			(t.prototype.Ho = function (t, e) {
				var n = new xl(e, 0),
					r = this.Xh.$t(n);
				return vh.resolve(e.isEqual(r && r.key));
			}),
			(t.prototype.zo = function (t) {
				return this.Sr.length, vh.resolve();
			}),
			(t.prototype.nl = function (t, e) {
				return this.tl(t);
			}),
			(t.prototype.tl = function (t) {
				return 0 === this.Sr.length ? 0 : t - this.Sr[0].batchId;
			}),
			(t.prototype.Zh = function (t) {
				var e = this.tl(t);
				return e < 0 || e >= this.Sr.length ? null : this.Sr[e];
			}),
			t
		);
	})(),
	Qp = (function () {
		function t(t, e) {
			(this.Dr = t), (this.sl = e), (this.docs = new Eu(Ns.i)), (this.size = 0);
		}
		return (
			(t.prototype.Er = function (t, e, n) {
				var r = e.key,
					i = this.docs.get(r),
					o = i ? i.size : 0,
					s = this.sl(e);
				return (
					(this.docs = this.docs.ot(r, { ta: e, size: s, readTime: n })),
					(this.size += s - o),
					this.Dr.Mo(t, r.path.h())
				);
			}),
			(t.prototype.Ar = function (t) {
				var e = this.docs.get(t);
				e && ((this.docs = this.docs.remove(t)), (this.size -= e.size));
			}),
			(t.prototype.Rr = function (t, e) {
				var n = this.docs.get(e);
				return vh.resolve(n ? n.ta : null);
			}),
			(t.prototype.getEntries = function (t, e) {
				var n = this,
					r = Du();
				return (
					e.forEach(function (t) {
						var e = n.docs.get(t);
						r = r.ot(t, e ? e.ta : null);
					}),
					vh.resolve(r)
				);
			}),
			(t.prototype.Lr = function (t, e, n) {
				for (var r = Lu(), i = new Ns(e.path.child('')), o = this.docs.ft(i); o.At(); ) {
					var s = o.It(),
						u = s.key,
						a = s.value,
						c = a.ta,
						h = a.readTime;
					if (!e.path.T(u.path)) break;
					h.L(n) <= 0 || (c instanceof Lc && Qc(e, c) && (r = r.ot(c.key, c)));
				}
				return vh.resolve(r);
			}),
			(t.prototype.il = function (t, e) {
				return vh.forEach(this.docs, function (t) {
					return e(t);
				});
			}),
			(t.prototype.ra = function (t) {
				return new Xp(this);
			}),
			(t.prototype.aa = function (t) {
				return vh.resolve(this.size);
			}),
			t
		);
	})(),
	Xp = (function (t) {
		function e(e) {
			var n = this;
			return ((n = t.call(this) || this).ca = e), n;
		}
		return (
			se(e, t),
			(e.prototype.yr = function (t) {
				var e = this,
					n = [];
				return (
					this.wr.forEach(function (r, i) {
						i ? n.push(e.ca.Er(t, i, e.readTime)) : e.ca.Ar(r);
					}),
					vh.$n(n)
				);
			}),
			(e.prototype.gr = function (t, e) {
				return this.ca.Rr(t, e);
			}),
			(e.prototype.Pr = function (t, e) {
				return this.ca.getEntries(t, e);
			}),
			e
		);
	})(Jh),
	Yp = (function () {
		function t(t) {
			(this.persistence = t),
				(this.rl = new iu(function (t) {
					return lu(t);
				}, pu)),
				(this.lastRemoteSnapshotVersion = su.min()),
				(this.highestTargetId = 0),
				(this.ol = 0),
				(this.al = new Dl()),
				(this.targetCount = 0),
				(this.cl = rl.fa());
		}
		return (
			(t.prototype.Ce = function (t, e) {
				return (
					this.rl.forEach(function (t, n) {
						return e(n);
					}),
					vh.resolve()
				);
			}),
			(t.prototype.Ea = function (t) {
				return vh.resolve(this.lastRemoteSnapshotVersion);
			}),
			(t.prototype.Ia = function (t) {
				return vh.resolve(this.ol);
			}),
			(t.prototype.wa = function (t) {
				return (this.highestTargetId = this.cl.next()), vh.resolve(this.highestTargetId);
			}),
			(t.prototype.Aa = function (t, e, n) {
				return (
					n && (this.lastRemoteSnapshotVersion = n), e > this.ol && (this.ol = e), vh.resolve()
				);
			}),
			(t.prototype.ga = function (t) {
				this.rl.set(t.target, t);
				var e = t.targetId;
				e > this.highestTargetId && ((this.cl = new rl(e)), (this.highestTargetId = e)),
					t.sequenceNumber > this.ol && (this.ol = t.sequenceNumber);
			}),
			(t.prototype.Ra = function (t, e) {
				return this.ga(e), (this.targetCount += 1), vh.resolve();
			}),
			(t.prototype.ya = function (t, e) {
				return this.ga(e), vh.resolve();
			}),
			(t.prototype.Va = function (t, e) {
				return (
					this.rl.delete(e.target), this.al.Uc(e.targetId), (this.targetCount -= 1), vh.resolve()
				);
			}),
			(t.prototype.po = function (t, e, n) {
				var r = this,
					i = 0,
					o = [];
				return (
					this.rl.forEach(function (s, u) {
						u.sequenceNumber <= e &&
							null === n.get(u.targetId) &&
							(r.rl.delete(s), o.push(r.pa(t, u.targetId)), i++);
					}),
					vh.$n(o).next(function () {
						return i;
					})
				);
			}),
			(t.prototype.ba = function (t) {
				return vh.resolve(this.targetCount);
			}),
			(t.prototype.va = function (t, e) {
				var n = this.rl.get(e) || null;
				return vh.resolve(n);
			}),
			(t.prototype.Sa = function (t, e, n) {
				return this.al.Lc(e, n), vh.resolve();
			}),
			(t.prototype.Ca = function (t, e, n) {
				this.al.qc(e, n);
				var r = this.persistence.No,
					i = [];
				return (
					r &&
						e.forEach(function (e) {
							i.push(r.Go(t, e));
						}),
					vh.$n(i)
				);
			}),
			(t.prototype.pa = function (t, e) {
				return this.al.Uc(e), vh.resolve();
			}),
			(t.prototype.Fa = function (t, e) {
				var n = this.al.Wc(e);
				return vh.resolve(n);
			}),
			(t.prototype.Ho = function (t, e) {
				return vh.resolve(this.al.Ho(e));
			}),
			t
		);
	})(),
	Jp = (function () {
		function t(t) {
			var e,
				n = this;
			(this.ul = {}),
				(this.Ma = new jh(0)),
				(this.Oa = !1),
				(this.Oa = !0),
				(this.No = t(this)),
				(this.Ka = new Yp(this)),
				(this.Dr = new Uf()),
				(this.vr =
					((e = this.Dr),
					new Qp(e, function (t) {
						return n.No.hl(t);
					})));
		}
		return (
			(t.prototype.start = function () {
				return Promise.resolve();
			}),
			(t.prototype.Di = function () {
				return (this.Oa = !1), Promise.resolve();
			}),
			Object.defineProperty(t.prototype, 'Ei', {
				get: function () {
					return this.Oa;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.Za = function () {}),
			(t.prototype.tc = function () {}),
			(t.prototype.Ic = function () {
				return this.Dr;
			}),
			(t.prototype.mc = function (t) {
				var e = this.ul[t.ti()];
				return e || ((e = new Wp(this.Dr, this.No)), (this.ul[t.ti()] = e)), e;
			}),
			(t.prototype.Tc = function () {
				return this.Ka;
			}),
			(t.prototype.Ec = function () {
				return this.vr;
			}),
			(t.prototype.runTransaction = function (t, e, n) {
				var r = this;
				ls('MemoryPersistence', 'Starting transaction:', t);
				var i = new Zp(this.Ma.next());
				return (
					this.No.ll(),
					n(i)
						.next(function (t) {
							return r.No._l(i).next(function () {
								return t;
							});
						})
						.Fn()
						.then(function (t) {
							return i.br(), t;
						})
				);
			}),
			(t.prototype.fl = function (t, e) {
				return vh.kn(
					Object.values(this.ul).map(function (n) {
						return function () {
							return n.Ho(t, e);
						};
					})
				);
			}),
			t
		);
	})(),
	Zp = (function (t) {
		function e(e) {
			var n = this;
			return ((n = t.call(this) || this).xa = e), n;
		}
		return se(e, t), e;
	})(tf),
	td = (function () {
		function t(t) {
			(this.persistence = t), (this.dl = new Dl()), (this.wl = null);
		}
		return (
			(t.ml = function (e) {
				return new t(e);
			}),
			Object.defineProperty(t.prototype, 'Tl', {
				get: function () {
					if (this.wl) return this.wl;
					throw ys();
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.Da = function (t, e, n) {
				return this.dl.Da(n, e), this.Tl.delete(n.toString()), vh.resolve();
			}),
			(t.prototype.Na = function (t, e, n) {
				return this.dl.Na(n, e), this.Tl.add(n.toString()), vh.resolve();
			}),
			(t.prototype.Go = function (t, e) {
				return this.Tl.add(e.toString()), vh.resolve();
			}),
			(t.prototype.removeTarget = function (t, e) {
				var n = this;
				this.dl.Uc(e.targetId).forEach(function (t) {
					return n.Tl.add(t.toString());
				});
				var r = this.persistence.Tc();
				return r
					.Fa(t, e.targetId)
					.next(function (t) {
						t.forEach(function (t) {
							return n.Tl.add(t.toString());
						});
					})
					.next(function () {
						return r.Va(t, e);
					});
			}),
			(t.prototype.ll = function () {
				this.wl = new Set();
			}),
			(t.prototype._l = function (t) {
				var e = this,
					n = this.persistence.Ec().ra();
				return vh
					.forEach(this.Tl, function (r) {
						var i = Ns.D(r);
						return e.El(t, i).next(function (t) {
							t || n.Ar(i);
						});
					})
					.next(function () {
						return (e.wl = null), n.apply(t);
					});
			}),
			(t.prototype.yc = function (t, e) {
				var n = this;
				return this.El(t, e).next(function (t) {
					t ? n.Tl.delete(e.toString()) : n.Tl.add(e.toString());
				});
			}),
			(t.prototype.hl = function (t) {
				return 0;
			}),
			(t.prototype.El = function (t, e) {
				var n = this;
				return vh.kn([
					function () {
						return vh.resolve(n.dl.Ho(e));
					},
					function () {
						return n.persistence.Tc().Ho(t, e);
					},
					function () {
						return n.persistence.fl(t, e);
					}
				]);
			}),
			t
		);
	})(),
	ed = (function () {
		function t(t) {
			(this.Il = t.Il), (this.Al = t.Al);
		}
		return (
			(t.prototype.gu = function (t) {
				this.Rl = t;
			}),
			(t.prototype.Tu = function (t) {
				this.gl = t;
			}),
			(t.prototype.onMessage = function (t) {
				this.Pl = t;
			}),
			(t.prototype.close = function () {
				this.Al();
			}),
			(t.prototype.send = function (t) {
				this.Il(t);
			}),
			(t.prototype.yl = function () {
				this.Rl();
			}),
			(t.prototype.Vl = function (t) {
				this.gl(t);
			}),
			(t.prototype.pl = function (t) {
				this.Pl(t);
			}),
			t
		);
	})(),
	nd = { BatchGetDocuments: 'batchGet', Commit: 'commit', RunQuery: 'runQuery' },
	rd = (function (t) {
		function e(e) {
			var n = this;
			return ((n = t.call(this, e) || this).forceLongPolling = e.forceLongPolling), (n.W = e.W), n;
		}
		return (
			se(e, t),
			(e.prototype.Nl = function (t, e, n, r) {
				return new Promise(function (i, o) {
					var s = new us();
					s.listenOnce(os.COMPLETE, function () {
						try {
							switch (s.getLastErrorCode()) {
								case is.NO_ERROR:
									var e = s.getResponseJson();
									ls('Connection', 'XHR received:', JSON.stringify(e)), i(e);
									break;
								case is.TIMEOUT:
									ls('Connection', 'RPC "' + t + '" timed out'),
										o(new cs(as.DEADLINE_EXCEEDED, 'Request time out'));
									break;
								case is.HTTP_ERROR:
									var n = s.getStatus();
									if (
										(ls(
											'Connection',
											'RPC "' + t + '" failed with status:',
											n,
											'response text:',
											s.getResponseText()
										),
										n > 0)
									) {
										var r = s.getResponseJson().error;
										if (r && r.status && r.message) {
											var u =
												((a = r.status),
												(c = a.toLowerCase().replace('_', '-')),
												Object.values(as).indexOf(c) >= 0 ? c : as.UNKNOWN);
											o(new cs(u, r.message));
										} else o(new cs(as.UNKNOWN, 'Server responded with status ' + s.getStatus()));
									} else o(new cs(as.UNAVAILABLE, 'Connection failed.'));
									break;
								default:
									ys();
							}
						} finally {
							ls('Connection', 'RPC "' + t + '" completed.');
						}
						var a, c;
					});
					var u = JSON.stringify(r);
					s.send(e, 'POST', u, n, 15);
				});
			}),
			(e.prototype.Pu = function (t, e) {
				var n,
					r,
					i = [this.vl, '/', 'google.firestore.v1.Firestore', '/', t, '/channel'],
					o = new Zo(),
					s = {
						httpSessionIdParam: 'gsessionid',
						initMessageHeaders: {},
						messageUrlParams: {
							database: 'projects/' + this.U.projectId + '/databases/' + this.U.database
						},
						sendRawJson: !0,
						supportsCrossDomainXhr: !0,
						internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
						forceLongPolling: this.forceLongPolling,
						detectBufferingProxy: this.W
					};
				this.Cl(s.initMessageHeaders, e),
					('undefined' != typeof window &&
						(window.cordova || window.phonegap || window.PhoneGap) &&
						/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ye())) ||
						('object' == typeof navigator && 'ReactNative' === navigator.product) ||
						ye().indexOf('Electron/') >= 0 ||
						(r = ye()).indexOf('MSIE ') >= 0 ||
						r.indexOf('Trident/') >= 0 ||
						ye().indexOf('MSAppHost/') >= 0 ||
						('object' ==
							typeof (n =
								'object' == typeof chrome
									? chrome.runtime
									: 'object' == typeof browser
									? browser.runtime
									: void 0) &&
							void 0 !== n.id) ||
						(s.httpHeadersOverwriteParam = '$httpHeaders');
				var u = i.join('');
				ls('Connection', 'Creating WebChannel: ' + u, s);
				var a = o.createWebChannel(u, s),
					c = !1,
					h = !1,
					f = new ed({
						Il: function (t) {
							h
								? ls('Connection', 'Not sending because WebChannel is closed:', t)
								: (c || (ls('Connection', 'Opening WebChannel transport.'), a.open(), (c = !0)),
								  ls('Connection', 'WebChannel sending:', t),
								  a.send(t));
						},
						Al: function () {
							return a.close();
						}
					}),
					l = function (t, e) {
						a.listen(t, function (t) {
							try {
								e(t);
							} catch (n) {
								setTimeout(function () {
									throw n;
								}, 0);
							}
						});
					};
				return (
					l(ss.EventType.OPEN, function () {
						h || ls('Connection', 'WebChannel transport opened.');
					}),
					l(ss.EventType.CLOSE, function () {
						h || ((h = !0), ls('Connection', 'WebChannel transport closed'), f.Vl());
					}),
					l(ss.EventType.ERROR, function (t) {
						h ||
							((h = !0),
							ds('Connection', 'WebChannel transport errored:', t),
							f.Vl(new cs(as.UNAVAILABLE, 'The operation could not be completed')));
					}),
					l(ss.EventType.MESSAGE, function (t) {
						var e;
						if (!h) {
							var n = t.data[0];
							gs(!!n);
							var r = n,
								i = r.error || (null === (e = r[0]) || void 0 === e ? void 0 : e.error);
							if (i) {
								ls('Connection', 'WebChannel received error:', i);
								var o = i.status,
									s = (function (t) {
										var e = vu[t];
										if (void 0 !== e) return wu(e);
									})(o),
									u = i.message;
								void 0 === s &&
									((s = as.INTERNAL),
									(u = 'Unknown error status: ' + o + ' with message ' + i.message)),
									(h = !0),
									f.Vl(new cs(s, u)),
									a.close();
							} else ls('Connection', 'WebChannel received:', n), f.pl(n);
						}
					}),
					setTimeout(function () {
						f.yl();
					}, 0),
					f
				);
			}),
			e
		);
	})(
		(function () {
			function t(t) {
				(this.bl = t), (this.U = t.U);
				var e = t.ssl ? 'https' : 'http';
				(this.vl = e + '://' + t.host),
					(this.Sl =
						'projects/' + this.U.projectId + '/databases/' + this.U.database + '/documents');
			}
			return (
				(t.prototype.$u = function (t, e, n, r) {
					var i = this.Dl(t, e);
					ls('RestConnection', 'Sending: ', i, n);
					var o = {};
					return (
						this.Cl(o, r),
						this.Nl(t, i, o, n).then(
							function (t) {
								return ls('RestConnection', 'Received: ', t), t;
							},
							function (e) {
								throw (
									(ds('RestConnection', t + ' failed with error: ', e, 'url: ', i, 'request:', n),
									e)
								);
							}
						)
					);
				}),
				(t.prototype.ku = function (t, e, n, r) {
					return this.$u(t, e, n, r);
				}),
				(t.prototype.Cl = function (t, e) {
					if (
						((t['X-Goog-Api-Client'] = 'gl-js/ fire/7.24.0'), (t['Content-Type'] = 'text/plain'), e)
					)
						for (var n in e.Kc) e.Kc.hasOwnProperty(n) && (t[n] = e.Kc[n]);
				}),
				(t.prototype.Dl = function (t, e) {
					var n = nd[t];
					return this.vl + '/v1/' + e + ':' + n;
				}),
				t
			);
		})()
	),
	id = (function () {
		function t() {
			var t = this;
			(this.Fl = function () {
				return t.xl();
			}),
				(this.$l = function () {
					return t.kl();
				}),
				(this.Ml = []),
				this.Ol();
		}
		return (
			(t.prototype.Zu = function (t) {
				this.Ml.push(t);
			}),
			(t.prototype.Di = function () {
				window.removeEventListener('online', this.Fl),
					window.removeEventListener('offline', this.$l);
			}),
			(t.prototype.Ol = function () {
				window.addEventListener('online', this.Fl), window.addEventListener('offline', this.$l);
			}),
			(t.prototype.xl = function () {
				ls('ConnectivityMonitor', 'Network connectivity changed: AVAILABLE');
				for (var t = 0, e = this.Ml; t < e.length; t++) (0, e[t])(0);
			}),
			(t.prototype.kl = function () {
				ls('ConnectivityMonitor', 'Network connectivity changed: UNAVAILABLE');
				for (var t = 0, e = this.Ml; t < e.length; t++) (0, e[t])(1);
			}),
			(t.Ln = function () {
				return (
					'undefined' != typeof window &&
					void 0 !== window.addEventListener &&
					void 0 !== window.removeEventListener
				);
			}),
			t
		);
	})(),
	od = (function () {
		function t() {}
		return (t.prototype.Zu = function (t) {}), (t.prototype.Di = function () {}), t;
	})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function sd(t) {
	return new ya(t, !0);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ud =
		'You are using the memory-only build of Firestore. Persistence support is only available via the @firebase/firestore bundle or the firebase-firestore.js build.',
	ad = (function () {
		function t() {}
		return (
			(t.prototype.initialize = function (t) {
				return ae(this, void 0, void 0, function () {
					return ce(this, function (e) {
						switch (e.label) {
							case 0:
								return (
									(this.Sh = this.Ll(t)),
									(this.persistence = this.Bl(t)),
									[4, this.persistence.start()]
								);
							case 1:
								return e.sent(), (this.ql = this.Ul(t)), (this.ju = this.Ql(t)), [2];
						}
					});
				});
			}),
			(t.prototype.Ul = function (t) {
				return null;
			}),
			(t.prototype.Ql = function (t) {
				return (e = this.persistence), (n = new Kp()), (r = t.Wl), new yl(e, n, r);
				var e, n, r;
			}),
			(t.prototype.Bl = function (t) {
				if (t.persistenceSettings.jl) throw new cs(as.FAILED_PRECONDITION, ud);
				return new Jp(td.ml);
			}),
			(t.prototype.Ll = function (t) {
				return new Qh();
			}),
			(t.prototype.terminate = function () {
				return ae(this, void 0, void 0, function () {
					return ce(this, function (t) {
						switch (t.label) {
							case 0:
								return this.ql && this.ql.stop(), [4, this.Sh.Di()];
							case 1:
								return t.sent(), [4, this.persistence.Di()];
							case 2:
								return t.sent(), [2];
						}
					});
				});
			}),
			(t.prototype.clearPersistence = function (t, e) {
				throw new cs(as.FAILED_PRECONDITION, ud);
			}),
			t
		);
	})(),
	cd = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.prototype.initialize = function (e) {
				return ae(this, void 0, void 0, function () {
					var n,
						r = this;
					return ce(this, function (i) {
						switch (i.label) {
							case 0:
								return [4, t.prototype.initialize.call(this, e)];
							case 1:
								return (
									i.sent(),
									(n = this.Kl.fi),
									this.Sh instanceof Wh
										? ((this.Sh.fi = {
												er: Fp.bind(null, n),
												nr: Gp.bind(null, n),
												sr: zp.bind(null, n),
												pi: Bp.bind(null, n)
										  }),
										  [4, this.Sh.start()])
										: [3, 3]
								);
							case 2:
								i.sent(), (i.label = 3);
							case 3:
								return [
									4,
									this.persistence.Xa(function (t) {
										return ae(r, void 0, void 0, function () {
											return ce(this, function (e) {
												switch (e.label) {
													case 0:
														return [4, jp(this.Kl.fi, t)];
													case 1:
														return (
															e.sent(),
															this.ql &&
																(t && !this.ql.Ei ? this.ql.start(this.ju) : t || this.ql.stop()),
															[2]
														);
												}
											});
										});
									})
								];
							case 4:
								return i.sent(), [2];
						}
					});
				});
			}),
			(e.prototype.Ll = function (t) {
				if (t.persistenceSettings.jl && t.persistenceSettings.synchronizeTabs) {
					var e = Ah();
					if (!Wh.Ln(e))
						throw new cs(
							as.UNIMPLEMENTED,
							'IndexedDB persistence is only available on platforms that support LocalStorage.'
						);
					var n = vl(t.bl.U, t.bl.persistenceKey);
					return new Wh(e, t.cs, n, t.clientId, t.Wl);
				}
				return new Qh();
			}),
			e
		);
	})(
		(function (t) {
			function e(e) {
				var n = this;
				return ((n = t.call(this) || this).Kl = e), n;
			}
			return (
				se(e, t),
				(e.prototype.initialize = function (e) {
					return ae(this, void 0, void 0, function () {
						return ce(this, function (n) {
							switch (n.label) {
								case 0:
									return [4, t.prototype.initialize.call(this, e)];
								case 1:
									return n.sent(), [4, Nl(this.ju)];
								case 2:
									return n.sent(), [4, this.Kl.initialize(this, e)];
								case 3:
									return n.sent(), [4, Hp(this.Kl.fi)];
								case 4:
									return n.sent(), [4, rp(this.Kl.ph)];
								case 5:
									return n.sent(), [2];
							}
						});
					});
				}),
				(e.prototype.Ul = function (t) {
					var e = this.persistence.No.wo;
					return new af(e, t.cs);
				}),
				(e.prototype.Bl = function (t) {
					var e = vl(t.bl.U, t.bl.persistenceKey),
						n = sd(t.bl.U);
					return new hl(
						t.persistenceSettings.synchronizeTabs,
						e,
						t.clientId,
						uf.ao(t.persistenceSettings.cacheSizeBytes),
						t.cs,
						Ah(),
						Nh(),
						n,
						this.Sh,
						t.persistenceSettings.ka
					);
				}),
				(e.prototype.Ll = function (t) {
					return new Qh();
				}),
				(e.prototype.clearPersistence = function (t, e) {
					return (function (t) {
						return ae(this, void 0, void 0, function () {
							var e;
							return ce(this, function (n) {
								switch (n.label) {
									case 0:
										return yh.Ln() ? ((e = t + 'main'), [4, yh.delete(e)]) : [2, Promise.resolve()];
									case 1:
										return n.sent(), [2];
								}
							});
						});
					})(vl(t, e));
				}),
				e
			);
		})(ad)
	),
	hd = (function () {
		function t() {}
		return (
			(t.prototype.initialize = function (t, e) {
				return ae(this, void 0, void 0, function () {
					var n = this;
					return ce(this, function (r) {
						switch (r.label) {
							case 0:
								return this.ju
									? [3, 2]
									: ((this.ju = t.ju),
									  (this.Sh = t.Sh),
									  (this.Ku = this.Gl(e)),
									  (this.ph = this.zl(e)),
									  (this.bh = this.Hl(e)),
									  (this.fi = this.Yl(e)),
									  (this.Sh.di = function (t) {
											return _p(n.fi, t, 1);
									  }),
									  (this.ph.Gu.Jl = Cp.bind(null, this.fi)),
									  [4, hp(this.ph, this.fi.Uh)]);
							case 1:
								r.sent(), (r.label = 2);
							case 2:
								return [2];
						}
					});
				});
			}),
			(t.prototype.Hl = function (t) {
				return new Oh();
			}),
			(t.prototype.Gl = function (t) {
				var e,
					n,
					r = sd(t.bl.U),
					i = ((e = t.bl), new rd(e));
				return (n = t.credentials), new Fl(n, i, r);
			}),
			(t.prototype.zl = function (t) {
				var e,
					n,
					r,
					i,
					o,
					s = this;
				return (
					(e = this.ju),
					(n = this.Ku),
					(r = t.cs),
					(i = function (t) {
						return _p(s.fi, t, 0);
					}),
					(o = id.Ln() ? new id() : new od()),
					new Ml(e, n, r, i, o)
				);
			}),
			(t.prototype.Yl = function (t) {
				return (
					(e = this.ju),
					(n = this.ph),
					(r = this.bh),
					(i = this.Sh),
					(o = t.Wl),
					(s = t.Dh),
					(u = !t.persistenceSettings.jl || !t.persistenceSettings.synchronizeTabs),
					(a = new mp(e, n, r, i, o, s)),
					u && (a.qh = !0),
					a
				);
				var e, n, r, i, o, s, u, a;
			}),
			(t.prototype.terminate = function () {
				return Gl(this.ph);
			}),
			t
		);
	})(),
	fd = (function () {
		function t(t) {
			(this.observer = t), (this.muted = !1);
		}
		return (
			(t.prototype.next = function (t) {
				this.observer.next && this.Xl(this.observer.next, t);
			}),
			(t.prototype.error = function (t) {
				this.observer.error
					? this.Xl(this.observer.error, t)
					: console.error('Uncaught Error in snapshot listener:', t);
			}),
			(t.prototype.Zl = function () {
				this.muted = !0;
			}),
			(t.prototype.Xl = function (t, e) {
				var n = this;
				this.muted ||
					setTimeout(function () {
						n.muted || t(e);
					}, 0);
			}),
			t
		);
	})(),
	ld = function (t) {
		!(function (t, e, n, r) {
			if (!(e instanceof Array) || e.length < 1)
				throw new cs(
					as.INVALID_ARGUMENT,
					'Function FieldPath() requires its fieldNames argument to be an array with at least ' +
						$s(1, 'element') +
						'.'
				);
		})(0, t);
		for (var e = 0; e < t.length; ++e)
			if ((Os('FieldPath', 'string', e, t[e]), 0 === t[e].length))
				throw new cs(
					as.INVALID_ARGUMENT,
					'Invalid field name at argument $(i + 1). Field names must not be empty.'
				);
		this.t_ = new As(t);
	},
	pd = (function (t) {
		function e() {
			for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
			return t.call(this, e) || this;
		}
		return (
			se(e, t),
			(e.documentId = function () {
				return new e(As.v().R());
			}),
			(e.prototype.isEqual = function (t) {
				if (!(t instanceof e)) throw Bs('isEqual', 'FieldPath', 1, t);
				return this.t_.isEqual(t.t_);
			}),
			e
		);
	})(ld),
	dd = new RegExp('[~\\*/\\[\\]]'),
	vd = function (t) {
		this.e_ = t;
	},
	yd = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.prototype.n_ = function (t) {
				if (2 !== t.s_)
					throw 1 === t.s_
						? t.i_(this.e_ + '() can only appear at the top level of your update data')
						: t.i_(this.e_ + '() cannot be used with set() unless you pass {merge:true}');
				return t.We.push(t.path), null;
			}),
			(e.prototype.isEqual = function (t) {
				return t instanceof e;
			}),
			e
		);
	})(vd);
function gd(t, e, n) {
	return new xd(
		{ s_: 3, r_: e.settings.r_, methodName: t.e_, o_: n },
		e.U,
		e.serializer,
		e.ignoreUndefinedProperties
	);
}
var md = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.prototype.n_ = function (t) {
				return new ac(t.path, new Za());
			}),
			(e.prototype.isEqual = function (t) {
				return t instanceof e;
			}),
			e
		);
	})(vd),
	bd = (function (t) {
		function e(e, n) {
			var r = this;
			return ((r = t.call(this, e) || this).a_ = n), r;
		}
		return (
			se(e, t),
			(e.prototype.n_ = function (t) {
				var e = gd(this, t, !0),
					n = this.a_.map(function (t) {
						return Cd(t, e);
					}),
					r = new tc(n);
				return new ac(t.path, r);
			}),
			(e.prototype.isEqual = function (t) {
				return this === t;
			}),
			e
		);
	})(vd),
	wd = (function (t) {
		function e(e, n) {
			var r = this;
			return ((r = t.call(this, e) || this).a_ = n), r;
		}
		return (
			se(e, t),
			(e.prototype.n_ = function (t) {
				var e = gd(this, t, !0),
					n = this.a_.map(function (t) {
						return Cd(t, e);
					}),
					r = new nc(n);
				return new ac(t.path, r);
			}),
			(e.prototype.isEqual = function (t) {
				return this === t;
			}),
			e
		);
	})(vd),
	Ed = (function (t) {
		function e(e, n) {
			var r = this;
			return ((r = t.call(this, e) || this).c_ = n), r;
		}
		return (
			se(e, t),
			(e.prototype.n_ = function (t) {
				var e = new ic(t.serializer, ba(t.serializer, this.c_));
				return new ac(t.path, e);
			}),
			(e.prototype.isEqual = function (t) {
				return this === t;
			}),
			e
		);
	})(vd),
	Id = (function () {
		function t(t, e) {
			if (
				(Ds('GeoPoint', arguments, 2),
				Os('GeoPoint', 'number', 1, t),
				Os('GeoPoint', 'number', 2, e),
				!isFinite(t) || t < -90 || t > 90)
			)
				throw new cs(
					as.INVALID_ARGUMENT,
					'Latitude must be a number between -90 and 90, but was: ' + t
				);
			if (!isFinite(e) || e < -180 || e > 180)
				throw new cs(
					as.INVALID_ARGUMENT,
					'Longitude must be a number between -180 and 180, but was: ' + e
				);
			(this.u_ = t), (this.h_ = e);
		}
		return (
			Object.defineProperty(t.prototype, 'latitude', {
				get: function () {
					return this.u_;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'longitude', {
				get: function () {
					return this.h_;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.isEqual = function (t) {
				return this.u_ === t.u_ && this.h_ === t.h_;
			}),
			(t.prototype.toJSON = function () {
				return { latitude: this.u_, longitude: this.h_ };
			}),
			(t.prototype.Y = function (t) {
				return Ws(this.u_, t.u_) || Ws(this.h_, t.h_);
			}),
			t
		);
	})(),
	_d = function (t) {
		this.l_ = t;
	},
	Td = /^__.*__$/,
	Ad = function (t, e, n) {
		(this.__ = t), (this.f_ = e), (this.d_ = n);
	},
	Nd = (function () {
		function t(t, e, n) {
			(this.data = t), (this.We = e), (this.fieldTransforms = n);
		}
		return (
			(t.prototype.w_ = function (t, e) {
				var n = [];
				return (
					null !== this.We
						? n.push(new bc(t, this.data, this.We, e))
						: n.push(new mc(t, this.data, e)),
					this.fieldTransforms.length > 0 && n.push(new Ec(t, this.fieldTransforms)),
					n
				);
			}),
			t
		);
	})(),
	Sd = (function () {
		function t(t, e, n) {
			(this.data = t), (this.We = e), (this.fieldTransforms = n);
		}
		return (
			(t.prototype.w_ = function (t, e) {
				var n = [new bc(t, this.data, this.We, e)];
				return this.fieldTransforms.length > 0 && n.push(new Ec(t, this.fieldTransforms)), n;
			}),
			t
		);
	})();
function Dd(t) {
	switch (t) {
		case 0:
		case 2:
		case 1:
			return !0;
		case 3:
		case 4:
			return !1;
		default:
			throw ys();
	}
}
var xd = (function () {
		function t(t, e, n, r, i, o) {
			(this.settings = t),
				(this.U = e),
				(this.serializer = n),
				(this.ignoreUndefinedProperties = r),
				void 0 === i && this.m_(),
				(this.fieldTransforms = i || []),
				(this.We = o || []);
		}
		return (
			Object.defineProperty(t.prototype, 'path', {
				get: function () {
					return this.settings.path;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 's_', {
				get: function () {
					return this.settings.s_;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.T_ = function (e) {
				return new t(
					Object.assign(Object.assign({}, this.settings), e),
					this.U,
					this.serializer,
					this.ignoreUndefinedProperties,
					this.fieldTransforms,
					this.We
				);
			}),
			(t.prototype.E_ = function (t) {
				var e,
					n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t),
					r = this.T_({ path: n, o_: !1 });
				return r.I_(t), r;
			}),
			(t.prototype.A_ = function (t) {
				var e,
					n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t),
					r = this.T_({ path: n, o_: !1 });
				return r.m_(), r;
			}),
			(t.prototype.R_ = function (t) {
				return this.T_({ path: void 0, o_: !0 });
			}),
			(t.prototype.i_ = function (t) {
				return qd(t, this.settings.methodName, this.settings.g_ || !1, this.path, this.settings.r_);
			}),
			(t.prototype.contains = function (t) {
				return (
					void 0 !==
						this.We.find(function (e) {
							return t.T(e);
						}) ||
					void 0 !==
						this.fieldTransforms.find(function (e) {
							return t.T(e.field);
						})
				);
			}),
			(t.prototype.m_ = function () {
				if (this.path) for (var t = 0; t < this.path.length; t++) this.I_(this.path.get(t));
			}),
			(t.prototype.I_ = function (t) {
				if (0 === t.length) throw this.i_('Document fields must not be empty');
				if (Dd(this.s_) && Td.test(t))
					throw this.i_('Document fields cannot begin and end with "__"');
			}),
			t
		);
	})(),
	Ld = (function () {
		function t(t, e, n) {
			(this.U = t), (this.ignoreUndefinedProperties = e), (this.serializer = n || sd(t));
		}
		return (
			(t.prototype.P_ = function (t, e, n, r) {
				return (
					void 0 === r && (r = !1),
					new xd(
						{ s_: t, methodName: e, r_: n, path: As.P(), o_: !1, g_: r },
						this.U,
						this.serializer,
						this.ignoreUndefinedProperties
					)
				);
			}),
			t
		);
	})();
function Od(t, e, n, r, i, o) {
	void 0 === o && (o = {});
	var s = t.P_(o.merge || o.mergeFields ? 2 : 0, e, n, i);
	Fd('Data must be an object, but it was:', s, r);
	var u,
		a,
		c = Ud(r, s);
	if (o.merge) (u = new uc(s.We)), (a = s.fieldTransforms);
	else if (o.mergeFields) {
		for (var h = [], f = 0, l = o.mergeFields; f < l.length; f++) {
			var p = l[f],
				d = void 0;
			if (p instanceof ld) d = p.t_;
			else {
				if ('string' != typeof p) throw ys();
				d = Md(e, p, n);
			}
			if (!s.contains(d))
				throw new cs(
					as.INVALID_ARGUMENT,
					"Field '" + d + "' is specified in your field mask but missing from your input data."
				);
			Bd(h, d) || h.push(d);
		}
		(u = new uc(h)),
			(a = s.fieldTransforms.filter(function (t) {
				return u.Ye(t.field);
			}));
	} else (u = null), (a = s.fieldTransforms);
	return new Nd(new Nc(c), u, a);
}
function kd(t, e, n, r) {
	var i = t.P_(1, e, n);
	Fd('Data must be an object, but it was:', i, r);
	var o = [],
		s = new Sc();
	ws(r, function (t, r) {
		var u = Md(e, t, n),
			a = i.A_(u);
		if (r instanceof yd || (r instanceof _d && r.l_ instanceof yd)) o.push(u);
		else {
			var c = Cd(r, a);
			null != c && (o.push(u), s.set(u, c));
		}
	});
	var u = new uc(o);
	return new Sd(s.Xe(), u, i.fieldTransforms);
}
function Rd(t, e, n, r, i, o) {
	var s = t.P_(1, e, n),
		u = [jd(e, r, n)],
		a = [i];
	if (o.length % 2 != 0)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Function ' +
				e +
				'() needs to be called with an even number of arguments that alternate between field names and values.'
		);
	for (var c = 0; c < o.length; c += 2) u.push(jd(e, o[c])), a.push(o[c + 1]);
	for (var h = [], f = new Sc(), l = u.length - 1; l >= 0; --l)
		if (!Bd(h, u[l])) {
			var p = u[l],
				d = a[l],
				v = s.A_(p);
			if (d instanceof yd || (d instanceof _d && d.l_ instanceof yd)) h.push(p);
			else {
				var y = Cd(d, v);
				null != y && (h.push(p), f.set(p, y));
			}
		}
	var g = new uc(h);
	return new Sd(f.Xe(), g, s.fieldTransforms);
}
function Pd(t, e, n, r) {
	return void 0 === r && (r = !1), Cd(n, t.P_(r ? 4 : 3, e));
}
function Cd(t, e) {
	if ((t instanceof _d && (t = t.l_), Vd(t))) return Fd('Unsupported field value:', e, t), Ud(t, e);
	if (t instanceof vd)
		return (
			(function (t, e) {
				if (!Dd(e.s_)) throw e.i_(t.e_ + '() can only be used with update() and set()');
				if (!e.path) throw e.i_(t.e_ + '() is not currently supported inside arrays');
				var n = t.n_(e);
				n && e.fieldTransforms.push(n);
			})(t, e),
			null
		);
	if ((e.path && e.We.push(e.path), t instanceof Array)) {
		if (e.settings.o_ && 4 !== e.s_) throw e.i_('Nested arrays are not supported');
		return (function (t, e) {
			for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
				var s = Cd(o[i], e.R_(r));
				null == s && (s = { nullValue: 'NULL_VALUE' }), n.push(s), r++;
			}
			return { arrayValue: { values: n } };
		})(t, e);
	}
	return (function (t, e) {
		if (null === t) return { nullValue: 'NULL_VALUE' };
		if ('number' == typeof t) return ba(e.serializer, t);
		if ('boolean' == typeof t) return { booleanValue: t };
		if ('string' == typeof t) return { stringValue: t };
		if (t instanceof Date) {
			var n = ou.fromDate(t);
			return { timestampValue: wa(e.serializer, n) };
		}
		if (t instanceof ou) {
			var r = new ou(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
			return { timestampValue: wa(e.serializer, r) };
		}
		if (t instanceof Id) return { geoPointValue: { latitude: t.latitude, longitude: t.longitude } };
		if (t instanceof Js) return { bytesValue: Ea(e.serializer, t.q) };
		if (t instanceof Ad) {
			var i = e.U,
				o = t.__;
			if (!o.isEqual(i))
				throw e.i_(
					'Document reference is for database ' +
						o.projectId +
						'/' +
						o.database +
						' but should be for database ' +
						i.projectId +
						'/' +
						i.database
				);
			return { referenceValue: Ta(t.__ || e.U, t.f_.path) };
		}
		if (void 0 === t && e.ignoreUndefinedProperties) return null;
		throw e.i_('Unsupported field value: ' + js(t));
	})(t, e);
}
function Ud(t, e) {
	var n = {};
	return (
		Es(t)
			? e.path && e.path.length > 0 && e.We.push(e.path)
			: ws(t, function (t, r) {
					var i = Cd(r, e.E_(t));
					null != i && (n[t] = i);
			  }),
		{ mapValue: { fields: n } }
	);
}
function Vd(t) {
	return !(
		'object' != typeof t ||
		null === t ||
		t instanceof Array ||
		t instanceof Date ||
		t instanceof ou ||
		t instanceof Id ||
		t instanceof Js ||
		t instanceof Ad ||
		t instanceof vd
	);
}
function Fd(t, e, n) {
	if (!Vd(n) || !Fs(n)) {
		var r = js(n);
		throw 'an object' === r ? e.i_(t + ' a custom object') : e.i_(t + ' ' + r);
	}
}
function jd(t, e, n) {
	if (e instanceof ld) return e.t_;
	if ('string' == typeof e) return Md(t, e);
	throw qd('Field path arguments must be of type string or FieldPath.', t, !1, void 0, n);
}
function Md(t, e, n) {
	try {
		return (function (t) {
			if (t.search(dd) >= 0)
				throw new cs(
					as.INVALID_ARGUMENT,
					'Invalid field path (' + t + "). Paths must not contain '~', '*', '/', '[', or ']'"
				);
			try {
				return new (pd.bind.apply(pd, pe([void 0], t.split('.'))))();
			} catch (e) {
				throw new cs(
					as.INVALID_ARGUMENT,
					'Invalid field path (' +
						t +
						"). Paths must not be empty, begin with '.', end with '.', or contain '..'"
				);
			}
		})(e).t_;
	} catch (i) {
		throw qd((r = i) instanceof Error ? r.message : r.toString(), t, !1, void 0, n);
	}
	var r;
}
function qd(t, e, n, r, i) {
	var o = r && !r.m(),
		s = void 0 !== i,
		u = 'Function ' + e + '() called with invalid data';
	n && (u += ' (via `toFirestore()`)');
	var a = '';
	return (
		(o || s) &&
			((a += ' (found'), o && (a += ' in field ' + r), s && (a += ' in document ' + i), (a += ')')),
		new cs(as.INVALID_ARGUMENT, (u += '. ') + t + a)
	);
}
function Bd(t, e) {
	return t.some(function (t) {
		return t.isEqual(e);
	});
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Gd = (function () {
		function t(t) {
			(this.Ku = t),
				(this.y_ = new Map()),
				(this.mutations = []),
				(this.V_ = !1),
				(this.p_ = null),
				(this.b_ = new Set());
		}
		return (
			(t.prototype.v_ = function (t) {
				return ae(this, void 0, void 0, function () {
					var e,
						n = this;
					return ce(this, function (r) {
						switch (r.label) {
							case 0:
								if ((this.S_(), this.mutations.length > 0))
									throw new cs(
										as.INVALID_ARGUMENT,
										'Firestore transactions require all reads to be executed before all writes.'
									);
								return [
									4,
									(function (t, e) {
										return ae(this, void 0, void 0, function () {
											var n, r, i, o, s, u;
											return ce(this, function (a) {
												switch (a.label) {
													case 0:
														return (
															(n = ms(t)),
															(r = La(n.serializer) + '/documents'),
															(i = {
																documents: e.map(function (t) {
																	return Na(n.serializer, t);
																})
															}),
															[4, n.ku('BatchGetDocuments', r, i)]
														);
													case 1:
														return (
															(o = a.sent()),
															(s = new Map()),
															o.forEach(function (t) {
																var e,
																	r,
																	i =
																		((e = n.serializer),
																		'found' in (r = t)
																			? (function (t, e) {
																					gs(!!e.found), e.found.name, e.found.updateTime;
																					var n = Sa(t, e.found.name),
																						r = _a(e.found.updateTime),
																						i = new Nc({ mapValue: { fields: e.found.fields } });
																					return new Lc(n, r, i, {});
																			  })(e, r)
																			: 'missing' in r
																			? (function (t, e) {
																					gs(!!e.missing), gs(!!e.readTime);
																					var n = Sa(t, e.missing),
																						r = _a(e.readTime);
																					return new Oc(n, r);
																			  })(e, r)
																			: ys());
																s.set(i.key.toString(), i);
															}),
															(u = []),
															[
																2,
																(e.forEach(function (t) {
																	var e = s.get(t.toString());
																	gs(!!e), u.push(e);
																}),
																u)
															]
														);
												}
											});
										});
									})(this.Ku, t)
								];
							case 1:
								return [
									2,
									((e = r.sent()).forEach(function (t) {
										t instanceof Oc || t instanceof Lc ? n.D_(t) : ys();
									}),
									e)
								];
						}
					});
				});
			}),
			(t.prototype.set = function (t, e) {
				this.write(e.w_(t, this.Ge(t))), this.b_.add(t.toString());
			}),
			(t.prototype.update = function (t, e) {
				try {
					this.write(e.w_(t, this.C_(t)));
				} catch (n) {
					this.p_ = n;
				}
				this.b_.add(t.toString());
			}),
			(t.prototype.delete = function (t) {
				this.write([new Tc(t, this.Ge(t))]), this.b_.add(t.toString());
			}),
			(t.prototype.commit = function () {
				return ae(this, void 0, void 0, function () {
					var t,
						e = this;
					return ce(this, function (n) {
						switch (n.label) {
							case 0:
								if ((this.S_(), this.p_)) throw this.p_;
								return (
									(t = this.y_),
									this.mutations.forEach(function (e) {
										t.delete(e.key.toString());
									}),
									t.forEach(function (t, n) {
										var r = Ns.D(n);
										e.mutations.push(new Ac(r, e.Ge(r)));
									}),
									[
										4,
										(function (t, e) {
											return ae(this, void 0, void 0, function () {
												var n, r, i;
												return ce(this, function (o) {
													switch (o.label) {
														case 0:
															return (
																(n = ms(t)),
																(r = La(n.serializer) + '/documents'),
																(i = {
																	writes: e.map(function (t) {
																		return Ra(n.serializer, t);
																	})
																}),
																[4, n.$u('Commit', r, i)]
															);
														case 1:
															return o.sent(), [2];
													}
												});
											});
										})(this.Ku, this.mutations)
									]
								);
							case 1:
								return n.sent(), (this.V_ = !0), [2];
						}
					});
				});
			}),
			(t.prototype.D_ = function (t) {
				var e;
				if (t instanceof Lc) e = t.version;
				else {
					if (!(t instanceof Oc)) throw ys();
					e = su.min();
				}
				var n = this.y_.get(t.key.toString());
				if (n) {
					if (!e.isEqual(n))
						throw new cs(as.ABORTED, 'Document version changed between two reads.');
				} else this.y_.set(t.key.toString(), e);
			}),
			(t.prototype.Ge = function (t) {
				var e = this.y_.get(t.toString());
				return !this.b_.has(t.toString()) && e ? hc.updateTime(e) : hc.ze();
			}),
			(t.prototype.C_ = function (t) {
				var e = this.y_.get(t.toString());
				if (!this.b_.has(t.toString()) && e) {
					if (e.isEqual(su.min()))
						throw new cs(as.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
					return hc.updateTime(e);
				}
				return hc.exists(!0);
			}),
			(t.prototype.write = function (t) {
				this.S_(), (this.mutations = this.mutations.concat(t));
			}),
			(t.prototype.S_ = function () {}),
			t
		);
	})(),
	zd = (function () {
		function t(t, e, n, r) {
			(this.cs = t),
				(this.Ku = e),
				(this.updateFunction = n),
				(this.ls = r),
				(this.N_ = 5),
				(this.ys = new dh(this.cs, 'transaction_retry'));
		}
		return (
			(t.prototype.run = function () {
				this.F_();
			}),
			(t.prototype.F_ = function () {
				var t = this;
				this.ys.gn(function () {
					return ae(t, void 0, void 0, function () {
						var t,
							e,
							n = this;
						return ce(this, function (r) {
							return (
								(t = new Gd(this.Ku)),
								(e = this.x_(t)) &&
									e
										.then(function (e) {
											n.cs.ws(function () {
												return t
													.commit()
													.then(function () {
														n.ls.resolve(e);
													})
													.catch(function (t) {
														n.k_(t);
													});
											});
										})
										.catch(function (t) {
											n.k_(t);
										}),
								[2]
							);
						});
					});
				});
			}),
			(t.prototype.x_ = function (t) {
				try {
					var e = this.updateFunction(t);
					return !uu(e) && e.catch && e.then
						? e
						: (this.ls.reject(Error('Transaction callback must return a Promise')), null);
				} catch (n) {
					return this.ls.reject(n), null;
				}
			}),
			(t.prototype.k_ = function (t) {
				var e = this;
				this.N_ > 0 && this.M_(t)
					? ((this.N_ -= 1),
					  this.cs.ws(function () {
							return e.F_(), Promise.resolve();
					  }))
					: this.ls.reject(t);
			}),
			(t.prototype.M_ = function (t) {
				if ('FirebaseError' === t.name) {
					var e = t.code;
					return 'aborted' === e || 'failed-precondition' === e || !bu(e);
				}
				return !1;
			}),
			t
		);
	})(),
	$d = (function () {
		function t(t, e) {
			(this.credentials = t), (this.cs = e), (this.clientId = Ks.k()), (this.O_ = new ph());
		}
		return (
			(t.prototype.start = function (t, e, n, r) {
				var i = this;
				this.L_(), (this.bl = t);
				var o = new ph(),
					s = !1;
				return (
					this.credentials.Hc(function (t) {
						if (!s)
							return (
								(s = !0),
								ls('FirestoreClient', 'Initializing. user=', t.uid),
								i.B_(e, n, r, t, o).then(i.O_.resolve, i.O_.reject)
							);
						i.cs.Cs(function () {
							return (function (t, e) {
								return ae(this, void 0, void 0, function () {
									var n, r;
									return ce(this, function (i) {
										switch (i.label) {
											case 0:
												return (
													(n = ms(t)).cs.xs(),
													ls('RemoteStore', 'RemoteStore received new credentials'),
													(r = Xl(n)),
													n.Yu.add(3),
													[4, Bl(n)]
												);
											case 1:
												return i.sent(), r && n.th.set('Unknown'), [4, n.Gu.Jl(e)];
											case 2:
												return i.sent(), n.Yu.delete(3), [4, ql(n)];
											case 3:
												return i.sent(), [2];
										}
									});
								});
							})(i.ph, t);
						});
					}),
					this.cs.ws(function () {
						return i.O_.promise;
					}),
					o.promise
				);
			}),
			(t.prototype.enableNetwork = function () {
				var t = this;
				return (
					this.L_(),
					this.cs.enqueue(function () {
						return t.persistence.tc(!0), (e = t.ph), (n = ms(e)).Yu.delete(0), ql(n);
						var e, n;
					})
				);
			}),
			(t.prototype.B_ = function (t, e, n, r, i) {
				return ae(this, void 0, void 0, function () {
					var o,
						s,
						u = this;
					return ce(this, function (a) {
						switch (a.label) {
							case 0:
								return (
									a.trys.push([0, 3, , 4]),
									(o = {
										cs: this.cs,
										bl: this.bl,
										clientId: this.clientId,
										credentials: this.credentials,
										Wl: r,
										Dh: 100,
										persistenceSettings: n
									}),
									[4, t.initialize(o)]
								);
							case 1:
								return a.sent(), [4, e.initialize(t, o)];
							case 2:
								return (
									a.sent(),
									(this.persistence = t.persistence),
									(this.Sh = t.Sh),
									(this.ju = t.ju),
									(this.ql = t.ql),
									(this.Ku = e.Ku),
									(this.ph = e.ph),
									(this.fi = e.fi),
									(this.q_ = e.bh),
									(this.q_.Us = bp.bind(null, this.fi)),
									(this.q_.js = Ep.bind(null, this.fi)),
									this.persistence.Za(function () {
										return ae(u, void 0, void 0, function () {
											return ce(this, function (t) {
												switch (t.label) {
													case 0:
														return [4, this.terminate()];
													case 1:
														return t.sent(), [2];
												}
											});
										});
									}),
									i.resolve(),
									[3, 4]
								);
							case 3:
								if (((s = a.sent()), i.reject(s), !this.U_(s))) throw s;
								return [
									2,
									(console.warn(
										'Error enabling offline persistence. Falling back to persistence disabled: ' + s
									),
									this.B_(new ad(), new hd(), { jl: !1 }, r, i))
								];
							case 4:
								return [2];
						}
					});
				});
			}),
			(t.prototype.U_ = function (t) {
				return 'FirebaseError' === t.name
					? t.code === as.FAILED_PRECONDITION || t.code === as.UNIMPLEMENTED
					: !('undefined' != typeof DOMException && t instanceof DOMException) ||
							22 === t.code ||
							20 === t.code ||
							11 === t.code;
			}),
			(t.prototype.L_ = function () {
				if (this.cs.ps)
					throw new cs(as.FAILED_PRECONDITION, 'The client has already been terminated.');
			}),
			(t.prototype.disableNetwork = function () {
				var t = this;
				return (
					this.L_(),
					this.cs.enqueue(function () {
						return (
							t.persistence.tc(!1),
							(function (t) {
								return ae(this, void 0, void 0, function () {
									var e;
									return ce(this, function (n) {
										switch (n.label) {
											case 0:
												return (e = ms(t)).Yu.add(0), [4, Bl(e)];
											case 1:
												return n.sent(), e.th.set('Offline'), [2];
										}
									});
								});
							})(t.ph)
						);
					})
				);
			}),
			(t.prototype.terminate = function () {
				var t = this;
				this.cs.Ds();
				var e = new ph();
				return (
					this.cs.bs(function () {
						return ae(t, void 0, void 0, function () {
							var t, n;
							return ce(this, function (r) {
								switch (r.label) {
									case 0:
										return r.trys.push([0, 4, , 5]), this.ql && this.ql.stop(), [4, Gl(this.ph)];
									case 1:
										return r.sent(), [4, this.Sh.Di()];
									case 2:
										return r.sent(), [4, this.persistence.Di()];
									case 3:
										return r.sent(), this.credentials.Yc(), e.resolve(), [3, 5];
									case 4:
										return (
											(t = r.sent()),
											(n = xh(t, 'Failed to shutdown persistence')),
											e.reject(n),
											[3, 5]
										);
									case 5:
										return [2];
								}
							});
						});
					}),
					e.promise
				);
			}),
			(t.prototype.waitForPendingWrites = function () {
				var t = this;
				this.L_();
				var e = new ph();
				return (
					this.cs.ws(function () {
						return (function (t, e) {
							return ae(this, void 0, void 0, function () {
								var n, r, i, o, s;
								return ce(this, function (u) {
									switch (u.label) {
										case 0:
											Xl((n = ms(t)).ph) ||
												ls(
													'SyncEngine',
													"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."
												),
												(u.label = 1);
										case 1:
											return (
												u.trys.push([1, 3, , 4]),
												[
													4,
													((a = n.ju),
													(c = ms(a)),
													c.persistence.runTransaction(
														'Get highest unacknowledged batch id',
														'readonly',
														function (t) {
															return c.Sr.qo(t);
														}
													))
												]
											);
										case 2:
											return -1 === (r = u.sent())
												? [2, void e.resolve()]
												: ((i = n.Lh.get(r) || []).push(e), n.Lh.set(r, i), [3, 4]);
										case 3:
											return (
												(o = u.sent()),
												(s = xh(o, 'Initialization of waitForPendingWrites() operation failed')),
												e.reject(s),
												[3, 4]
											);
										case 4:
											return [2];
									}
									var a, c;
								});
							});
						})(t.fi, e);
					}),
					e.promise
				);
			}),
			(t.prototype.listen = function (t, e, n) {
				var r = this;
				this.L_();
				var i = new fd(n),
					o = new Vh(t, i, e);
				return (
					this.cs.ws(function () {
						return kh(r.q_, o);
					}),
					function () {
						i.Zl(),
							r.cs.ws(function () {
								return Rh(r.q_, o);
							});
					}
				);
			}),
			(t.prototype.Q_ = function (t) {
				return ae(this, void 0, void 0, function () {
					var e,
						n = this;
					return ce(this, function (r) {
						switch (r.label) {
							case 0:
								return this.L_(), [4, this.O_.promise];
							case 1:
								return (
									r.sent(),
									(e = new ph()),
									[
										2,
										(this.cs.ws(function () {
											return (function (t, e, n) {
												return ae(this, void 0, void 0, function () {
													var r, i, o;
													return ce(this, function (s) {
														switch (s.label) {
															case 0:
																return (
																	s.trys.push([0, 2, , 3]),
																	[
																		4,
																		((u = t),
																		(a = e),
																		(c = ms(u)),
																		c.persistence.runTransaction(
																			'read document',
																			'readonly',
																			function (t) {
																				return c.Cc.Cr(t, a);
																			}
																		))
																	]
																);
															case 1:
																return (
																	(r = s.sent()) instanceof Lc
																		? n.resolve(r)
																		: r instanceof Oc
																		? n.resolve(null)
																		: n.reject(
																				new cs(
																					as.UNAVAILABLE,
																					"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"
																				)
																		  ),
																	[3, 3]
																);
															case 2:
																return (
																	(i = s.sent()),
																	(o = xh(i, "Failed to get document '" + e + ' from cache')),
																	n.reject(o),
																	[3, 3]
																);
															case 3:
																return [2];
														}
														var u, a, c;
													});
												});
											})(n.ju, t, e);
										}),
										e.promise)
									]
								);
						}
					});
				});
			}),
			(t.prototype.W_ = function (t, e) {
				return (
					void 0 === e && (e = {}),
					ae(this, void 0, void 0, function () {
						var n,
							r = this;
						return ce(this, function (i) {
							switch (i.label) {
								case 0:
									return this.L_(), [4, this.O_.promise];
								case 1:
									return (
										i.sent(),
										(n = new ph()),
										[
											2,
											(this.cs.ws(function () {
												return (
													(i = r.q_),
													(o = r.cs),
													(s = t),
													(u = e),
													(a = n),
													(c = new fd({
														next: function (t) {
															o.ws(function () {
																return Rh(i, h);
															});
															var e = t.docs.has(s);
															!e && t.fromCache
																? a.reject(
																		new cs(
																			as.UNAVAILABLE,
																			'Failed to get document because the client is offline.'
																		)
																  )
																: e && t.fromCache && u && 'server' === u.source
																? a.reject(
																		new cs(
																			as.UNAVAILABLE,
																			'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
																		)
																  )
																: a.resolve(t);
														},
														error: function (t) {
															return a.reject(t);
														}
													})),
													(h = new Vh(Cc(s.path), c, { includeMetadataChanges: !0, Xs: !0 })),
													kh(i, h)
												);
												var i, o, s, u, a, c, h;
											}),
											n.promise)
										]
									);
							}
						});
					})
				);
			}),
			(t.prototype.j_ = function (t) {
				return ae(this, void 0, void 0, function () {
					var e,
						n = this;
					return ce(this, function (r) {
						switch (r.label) {
							case 0:
								return this.L_(), [4, this.O_.promise];
							case 1:
								return (
									r.sent(),
									(e = new ph()),
									[
										2,
										(this.cs.ws(function () {
											return (function (t, e, n) {
												return ae(this, void 0, void 0, function () {
													var r, i, o, s, u, a;
													return ce(this, function (c) {
														switch (c.label) {
															case 0:
																return c.trys.push([0, 2, , 3]), [4, _l(t, e, !0)];
															case 1:
																return (
																	(r = c.sent()),
																	(i = new vp(e, r.Fc)),
																	(o = i.wh(r.documents)),
																	(s = i.yr(o, !1)),
																	n.resolve(s.snapshot),
																	[3, 3]
																);
															case 2:
																return (
																	(u = c.sent()),
																	(a = xh(u, "Failed to execute query '" + e + ' against cache')),
																	n.reject(a),
																	[3, 3]
																);
															case 3:
																return [2];
														}
													});
												});
											})(n.ju, t, e);
										}),
										e.promise)
									]
								);
						}
					});
				});
			}),
			(t.prototype.K_ = function (t, e) {
				return (
					void 0 === e && (e = {}),
					ae(this, void 0, void 0, function () {
						var n,
							r = this;
						return ce(this, function (i) {
							switch (i.label) {
								case 0:
									return this.L_(), [4, this.O_.promise];
								case 1:
									return (
										i.sent(),
										(n = new ph()),
										[
											2,
											(this.cs.ws(function () {
												return (
													(i = r.q_),
													(o = r.cs),
													(s = t),
													(u = e),
													(a = n),
													(c = new fd({
														next: function (t) {
															o.ws(function () {
																return Rh(i, h);
															}),
																t.fromCache && 'server' === u.source
																	? a.reject(
																			new cs(
																				as.UNAVAILABLE,
																				'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
																			)
																	  )
																	: a.resolve(t);
														},
														error: function (t) {
															return a.reject(t);
														}
													})),
													(h = new Vh(s, c, { includeMetadataChanges: !0, Xs: !0 })),
													kh(i, h)
												);
												var i, o, s, u, a, c, h;
											}),
											n.promise)
										]
									);
							}
						});
					})
				);
			}),
			(t.prototype.write = function (t) {
				var e = this;
				this.L_();
				var n = new ph();
				return (
					this.cs.ws(function () {
						return (function (t, e, n) {
							return ae(this, void 0, void 0, function () {
								var r, i, o, s;
								return ce(this, function (u) {
									switch (u.label) {
										case 0:
											(r = Hp(t)), (u.label = 1);
										case 1:
											return (
												u.trys.push([1, 5, , 6]),
												[
													4,
													((a = r.ju),
													(c = e),
													(f = ms(a)),
													(l = ou.now()),
													(p = c.reduce(function (t, e) {
														return t.add(e.key);
													}, Ru())),
													f.persistence
														.runTransaction('Locally write mutations', 'readwrite', function (t) {
															return f.Cc.kr(t, p).next(function (e) {
																h = e;
																for (var n = [], r = 0, i = c; r < i.length; r++) {
																	var o = i[r],
																		s = vc(o, h.get(o.key));
																	null != s &&
																		n.push(new bc(o.key, s, Dc(s.proto.mapValue), hc.exists(!0)));
																}
																return f.Sr.ko(t, l, n, c);
															});
														})
														.then(function (t) {
															var e = t.lr(h);
															return { batchId: t.batchId, wr: e };
														}))
												]
											);
										case 2:
											return (
												(i = u.sent()),
												r.Sh.xi(i.batchId),
												(function (t, e, n) {
													var r = t.Oh[t.currentUser.ti()];
													r || (r = new Eu(Ws)), (r = r.ot(e, n)), (t.Oh[t.currentUser.ti()] = r);
												})(r, i.batchId, n),
												[4, Pp(r, i.wr)]
											);
										case 3:
											return u.sent(), [4, rp(r.ph)];
										case 4:
											return u.sent(), [3, 6];
										case 5:
											return (
												(o = u.sent()), (s = xh(o, 'Failed to persist write')), n.reject(s), [3, 6]
											);
										case 6:
											return [2];
									}
									var a, c, h, f, l, p;
								});
							});
						})(e.fi, t, n);
					}),
					n.promise
				);
			}),
			(t.prototype.U = function () {
				return this.bl.U;
			}),
			(t.prototype.G_ = function (t) {
				var e = this;
				this.L_();
				var n = new fd(t);
				return (
					this.cs.ws(function () {
						return ae(e, void 0, void 0, function () {
							return ce(this, function (t) {
								return [2, ((e = this.q_), (r = n), ms(e).qs.add(r), void r.next())];
								var e, r;
							});
						});
					}),
					function () {
						n.Zl(),
							e.cs.ws(function () {
								return ae(e, void 0, void 0, function () {
									return ce(this, function (t) {
										return [2, ((e = this.q_), (r = n), void ms(e).qs.delete(r))];
										var e, r;
									});
								});
							});
					}
				);
			}),
			Object.defineProperty(t.prototype, 'z_', {
				get: function () {
					return this.cs.ps;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.transaction = function (t) {
				var e = this;
				this.L_();
				var n = new ph();
				return (
					this.cs.ws(function () {
						return new zd(e.cs, e.Ku, t, n).run(), Promise.resolve();
					}),
					n.promise
				);
			}),
			t
		);
	})();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hd(t) {
	return (function (t, e) {
		if ('object' != typeof t || null === t) return !1;
		for (var n = t, r = 0, i = ['next', 'error', 'complete']; r < i.length; r++) {
			var o = i[r];
			if (o in n && 'function' == typeof n[o]) return !0;
		}
		return !1;
	})(t);
}
var Kd = (function () {
		function t(t, e, n, r, i) {
			(this.U = t), (this.timestampsInSnapshots = e), (this.H_ = n), (this.Y_ = r), (this.J_ = i);
		}
		return (
			(t.prototype.X_ = function (t) {
				switch (Ju(t)) {
					case 0:
						return null;
					case 1:
						return t.booleanValue;
					case 2:
						return sa(t.integerValue || t.doubleValue);
					case 3:
						return this.Z_(t.timestampValue);
					case 4:
						return this.tf(t);
					case 5:
						return t.stringValue;
					case 6:
						return this.J_(ua(t.bytesValue));
					case 7:
						return this.ef(t.referenceValue);
					case 8:
						return this.nf(t.geoPointValue);
					case 9:
						return this.sf(t.arrayValue);
					case 10:
						return this.if(t.mapValue);
					default:
						throw ys();
				}
			}),
			(t.prototype.if = function (t) {
				var e = this,
					n = {};
				return (
					ws(t.fields || {}, function (t, r) {
						n[t] = e.X_(r);
					}),
					n
				);
			}),
			(t.prototype.nf = function (t) {
				return new Id(sa(t.latitude), sa(t.longitude));
			}),
			(t.prototype.sf = function (t) {
				var e = this;
				return (t.values || []).map(function (t) {
					return e.X_(t);
				});
			}),
			(t.prototype.tf = function (t) {
				switch (this.H_) {
					case 'previous':
						var e = Qu(t);
						return null == e ? null : this.X_(e);
					case 'estimate':
						return this.Z_(Xu(t));
					default:
						return null;
				}
			}),
			(t.prototype.Z_ = function (t) {
				var e = oa(t),
					n = new ou(e.seconds, e.nanos);
				return this.timestampsInSnapshots ? n : n.toDate();
			}),
			(t.prototype.ef = function (t) {
				var e = _s.g(t);
				gs(Wa(e));
				var n = new ru(e.get(1), e.get(3)),
					r = new Ns(e.u(5));
				return (
					n.isEqual(this.U) ||
						ps(
							'Document ' +
								r +
								' contains a document reference within a different database (' +
								n.projectId +
								'/' +
								n.database +
								') which is not supported. It will be treated as a reference in the current database (' +
								this.U.projectId +
								'/' +
								this.U.database +
								') instead.'
						),
					this.Y_(r)
				);
			}),
			t
		);
	})(),
	Wd = uf.ho,
	Qd = (function () {
		function t(t) {
			var e, n, r, i, o;
			if (void 0 === t.host) {
				if (void 0 !== t.ssl)
					throw new cs(as.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
				(this.host = 'firestore.googleapis.com'), (this.ssl = !0);
			} else
				Rs('settings', 'non-empty string', 'host', t.host),
					(this.host = t.host),
					Ps('settings', 'boolean', 'ssl', t.ssl),
					(this.ssl = null === (e = t.ssl) || void 0 === e || e);
			if (
				(qs('settings', t, [
					'host',
					'ssl',
					'credentials',
					'timestampsInSnapshots',
					'cacheSizeBytes',
					'experimentalForceLongPolling',
					'experimentalAutoDetectLongPolling',
					'ignoreUndefinedProperties'
				]),
				Ps('settings', 'object', 'credentials', t.credentials),
				(this.credentials = t.credentials),
				Ps('settings', 'boolean', 'timestampsInSnapshots', t.timestampsInSnapshots),
				Ps('settings', 'boolean', 'ignoreUndefinedProperties', t.ignoreUndefinedProperties),
				!0 === t.timestampsInSnapshots
					? ps(
							"The setting 'timestampsInSnapshots: true' is no longer required and should be removed."
					  )
					: !1 === t.timestampsInSnapshots &&
					  ps(
							"Support for 'timestampsInSnapshots: false' will be removed soon. You must update your code to handle Timestamp objects."
					  ),
				(this.timestampsInSnapshots = null === (n = t.timestampsInSnapshots) || void 0 === n || n),
				(this.ignoreUndefinedProperties =
					null !== (r = t.ignoreUndefinedProperties) && void 0 !== r && r),
				Ps('settings', 'number', 'cacheSizeBytes', t.cacheSizeBytes),
				void 0 === t.cacheSizeBytes)
			)
				this.cacheSizeBytes = uf._o;
			else {
				if (t.cacheSizeBytes !== Wd && t.cacheSizeBytes < uf.lo)
					throw new cs(as.INVALID_ARGUMENT, 'cacheSizeBytes must be at least ' + uf.lo);
				this.cacheSizeBytes = t.cacheSizeBytes;
			}
			Ps('settings', 'boolean', 'experimentalForceLongPolling', t.experimentalForceLongPolling),
				(this.experimentalForceLongPolling =
					null !== (i = t.experimentalForceLongPolling) && void 0 !== i && i),
				Ps(
					'settings',
					'boolean',
					'experimentalAutoDetectLongPolling',
					t.experimentalAutoDetectLongPolling
				),
				(this.experimentalAutoDetectLongPolling =
					null !== (o = t.experimentalAutoDetectLongPolling) && void 0 !== o && o),
				(function (t, e, n, r) {
					if (!0 === e && !0 === r)
						throw new cs(
							as.INVALID_ARGUMENT,
							'experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.'
						);
				})(0, t.experimentalForceLongPolling, 0, t.experimentalAutoDetectLongPolling);
		}
		return (
			(t.prototype.isEqual = function (t) {
				return (
					this.host === t.host &&
					this.ssl === t.ssl &&
					this.timestampsInSnapshots === t.timestampsInSnapshots &&
					this.credentials === t.credentials &&
					this.cacheSizeBytes === t.cacheSizeBytes &&
					this.experimentalForceLongPolling === t.experimentalForceLongPolling &&
					this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling &&
					this.ignoreUndefinedProperties === t.ignoreUndefinedProperties
				);
			}),
			t
		);
	})(),
	Xd = (function () {
		function t(e, n, r, i) {
			var o = this;
			if (
				(void 0 === r && (r = new ad()),
				void 0 === i && (i = new hd()),
				(this.rf = r),
				(this.af = i),
				(this.cf = null),
				(this.uf = new Dh()),
				(this.INTERNAL = {
					delete: function () {
						return ae(o, void 0, void 0, function () {
							return ce(this, function (t) {
								switch (t.label) {
									case 0:
										return this.hf(), [4, this.lf.terminate()];
									case 1:
										return t.sent(), [2];
								}
							});
						});
					}
				}),
				'object' == typeof e.options)
			) {
				var s = e;
				(this.cf = s), (this.__ = t._f(s)), (this.ff = s.name), (this.df = new kl(n));
			} else {
				var u = e;
				if (!u.projectId) throw new cs(as.INVALID_ARGUMENT, 'Must provide projectId');
				(this.__ = new ru(u.projectId, u.database)), (this.ff = '[DEFAULT]'), (this.df = new Ol());
			}
			this.wf = new Qd({});
		}
		return (
			Object.defineProperty(t.prototype, 'mf', {
				get: function () {
					return this.Tf || (this.Tf = new Ld(this.__, this.wf.ignoreUndefinedProperties)), this.Tf;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.settings = function (t) {
				Ds('Firestore.settings', arguments, 1),
					Os('Firestore.settings', 'object', 1, t),
					t.merge && delete (t = Object.assign(Object.assign({}, this.wf), t)).merge;
				var e = new Qd(t);
				if (this.lf && !this.wf.isEqual(e))
					throw new cs(
						as.FAILED_PRECONDITION,
						'Firestore has already been started and its settings can no longer be changed. You can only call settings() before calling any other methods on a Firestore object.'
					);
				(this.wf = e),
					void 0 !== e.credentials &&
						(this.df = (function (t) {
							if (!t) return new Ol();
							switch (t.type) {
								case 'gapi':
									var e = t.client;
									return (
										gs(
											!(
												'object' != typeof e ||
												null === e ||
												!e.auth ||
												!e.auth.getAuthHeaderValueForFirstParty
											)
										),
										new Pl(e, t.sessionIndex || '0')
									);
								case 'provider':
									return t.client;
								default:
									throw new cs(
										as.INVALID_ARGUMENT,
										'makeCredentialsProvider failed due to invalid credential type'
									);
							}
						})(e.credentials));
			}),
			(t.prototype.enableNetwork = function () {
				return this.hf(), this.lf.enableNetwork();
			}),
			(t.prototype.disableNetwork = function () {
				return this.hf(), this.lf.disableNetwork();
			}),
			(t.prototype.enablePersistence = function (t) {
				var e, n;
				if (this.lf)
					throw new cs(
						as.FAILED_PRECONDITION,
						'Firestore has already been started and persistence can no longer be enabled. You can only call enablePersistence() before calling any other methods on a Firestore object.'
					);
				var r = !1,
					i = !1;
				if (
					t &&
					(void 0 !== t.experimentalTabSynchronization &&
						ps(
							"The 'experimentalTabSynchronization' setting will be removed. Use 'synchronizeTabs' instead."
						),
					(r =
						null !==
							(n =
								null !== (e = t.synchronizeTabs) && void 0 !== e
									? e
									: t.experimentalTabSynchronization) &&
						void 0 !== n &&
						n),
					(i = !!t.experimentalForceOwningTab && t.experimentalForceOwningTab),
					r && i)
				)
					throw new cs(
						as.INVALID_ARGUMENT,
						"The 'experimentalForceOwningTab' setting cannot be used with 'synchronizeTabs'."
					);
				return this.Ef(this.rf, this.af, {
					jl: !0,
					cacheSizeBytes: this.wf.cacheSizeBytes,
					synchronizeTabs: r,
					ka: i
				});
			}),
			(t.prototype.clearPersistence = function () {
				return ae(this, void 0, void 0, function () {
					var t,
						e = this;
					return ce(this, function (n) {
						if (void 0 !== this.lf && !this.lf.z_)
							throw new cs(
								as.FAILED_PRECONDITION,
								'Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.'
							);
						return (
							(t = new ph()),
							[
								2,
								(this.uf.bs(function () {
									return ae(e, void 0, void 0, function () {
										var e;
										return ce(this, function (n) {
											switch (n.label) {
												case 0:
													return (
														n.trys.push([0, 2, , 3]),
														[4, this.rf.clearPersistence(this.__, this.ff)]
													);
												case 1:
													return n.sent(), t.resolve(), [3, 3];
												case 2:
													return (e = n.sent()), t.reject(e), [3, 3];
												case 3:
													return [2];
											}
										});
									});
								}),
								t.promise)
							]
						);
					});
				});
			}),
			(t.prototype.terminate = function () {
				return this.app._removeServiceInstance('firestore'), this.INTERNAL.delete();
			}),
			Object.defineProperty(t.prototype, 'If', {
				get: function () {
					return this.hf(), this.lf.z_;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.waitForPendingWrites = function () {
				return this.hf(), this.lf.waitForPendingWrites();
			}),
			(t.prototype.onSnapshotsInSync = function (t) {
				if ((this.hf(), Hd(t))) return this.lf.G_(t);
				Os('Firestore.onSnapshotsInSync', 'function', 1, t);
				var e = { next: t };
				return this.lf.G_(e);
			}),
			(t.prototype.hf = function () {
				return this.lf || this.Ef(new ad(), new hd(), { jl: !1 }), this.lf;
			}),
			(t.prototype.Af = function () {
				return new nu(
					this.__,
					this.ff,
					this.wf.host,
					this.wf.ssl,
					this.wf.experimentalForceLongPolling,
					this.wf.experimentalAutoDetectLongPolling
				);
			}),
			(t.prototype.Ef = function (t, e, n) {
				var r = this.Af();
				return (this.lf = new $d(this.df, this.uf)), this.lf.start(r, t, e, n);
			}),
			(t._f = function (t) {
				if (((e = t.options), !Object.prototype.hasOwnProperty.call(e, 'projectId')))
					throw new cs(as.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
				var e,
					n = t.options.projectId;
				if (!n || 'string' != typeof n)
					throw new cs(as.INVALID_ARGUMENT, 'projectId must be a string in FirebaseApp.options');
				return new ru(n);
			}),
			Object.defineProperty(t.prototype, 'app', {
				get: function () {
					if (!this.cf)
						throw new cs(
							as.FAILED_PRECONDITION,
							"Firestore was not initialized using the Firebase SDK. 'app' is not available"
						);
					return this.cf;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.collection = function (t) {
				return (
					Ds('Firestore.collection', arguments, 1),
					Os('Firestore.collection', 'non-empty string', 1, t),
					this.hf(),
					new fv(_s.g(t), this, null)
				);
			}),
			(t.prototype.doc = function (t) {
				return (
					Ds('Firestore.doc', arguments, 1),
					Os('Firestore.doc', 'non-empty string', 1, t),
					this.hf(),
					Zd.Rf(_s.g(t), this, null)
				);
			}),
			(t.prototype.collectionGroup = function (t) {
				if (
					(Ds('Firestore.collectionGroup', arguments, 1),
					Os('Firestore.collectionGroup', 'non-empty string', 1, t),
					t.indexOf('/') >= 0)
				)
					throw new cs(
						as.INVALID_ARGUMENT,
						"Invalid collection ID '" +
							t +
							"' passed to function Firestore.collectionGroup(). Collection IDs must not contain '/'."
					);
				return this.hf(), new cv(((e = t), new Rc(_s.P(), e)), this, null);
				var e;
			}),
			(t.prototype.runTransaction = function (t) {
				var e = this;
				return (
					Ds('Firestore.runTransaction', arguments, 1),
					Os('Firestore.runTransaction', 'function', 1, t),
					this.hf().transaction(function (n) {
						return t(new Yd(e, n));
					})
				);
			}),
			(t.prototype.batch = function () {
				return this.hf(), new Jd(this);
			}),
			Object.defineProperty(t, 'logLevel', {
				get: function () {
					switch (fs()) {
						case Oe.DEBUG:
							return 'debug';
						case Oe.ERROR:
							return 'error';
						case Oe.SILENT:
							return 'silent';
						case Oe.WARN:
							return 'warn';
						case Oe.INFO:
							return 'info';
						case Oe.VERBOSE:
							return 'verbose';
						default:
							return 'error';
					}
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.setLogLevel = function (t) {
				var e;
				Ds('Firestore.setLogLevel', arguments, 1),
					Us('setLogLevel', ['debug', 'error', 'silent', 'warn', 'info', 'verbose'], 1, t),
					(e = t),
					hs.setLogLevel(e);
			}),
			(t.prototype.gf = function () {
				return this.wf.timestampsInSnapshots;
			}),
			(t.prototype.Pf = function () {
				return this.wf;
			}),
			t
		);
	})(),
	Yd = (function () {
		function t(t, e) {
			(this.yf = t), (this.Vf = e);
		}
		return (
			(t.prototype.get = function (t) {
				var e = this;
				Ds('Transaction.get', arguments, 1);
				var n = vv('Transaction.get', t, this.yf);
				return this.Vf.v_([n.f_]).then(function (t) {
					if (!t || 1 !== t.length) return ys();
					var r = t[0];
					if (r instanceof Oc) return new ev(e.yf, n.f_, null, !1, !1, n.d_);
					if (r instanceof Lc) return new ev(e.yf, n.f_, r, !1, !1, n.d_);
					throw ys();
				});
			}),
			(t.prototype.set = function (t, e, n) {
				Ls('Transaction.set', arguments, 2, 3);
				var r = vv('Transaction.set', t, this.yf);
				n = lv('Transaction.set', n);
				var i = gv(r.d_, e, n),
					o = Od(this.yf.mf, 'Transaction.set', r.f_, i, null !== r.d_, n);
				return this.Vf.set(r.f_, o), this;
			}),
			(t.prototype.update = function (t, e, n) {
				for (var r, i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
				return (
					'string' == typeof e || e instanceof pd
						? (xs('Transaction.update', arguments, 3),
						  (r = vv('Transaction.update', t, this.yf)),
						  (i = Rd(this.yf.mf, 'Transaction.update', r.f_, e, n, o)))
						: (Ds('Transaction.update', arguments, 2),
						  (r = vv('Transaction.update', t, this.yf)),
						  (i = kd(this.yf.mf, 'Transaction.update', r.f_, e))),
					this.Vf.update(r.f_, i),
					this
				);
			}),
			(t.prototype.delete = function (t) {
				Ds('Transaction.delete', arguments, 1);
				var e = vv('Transaction.delete', t, this.yf);
				return this.Vf.delete(e.f_), this;
			}),
			t
		);
	})(),
	Jd = (function () {
		function t(t) {
			(this.yf = t), (this.pf = []), (this.bf = !1);
		}
		return (
			(t.prototype.set = function (t, e, n) {
				Ls('WriteBatch.set', arguments, 2, 3), this.vf();
				var r = vv('WriteBatch.set', t, this.yf);
				n = lv('WriteBatch.set', n);
				var i = gv(r.d_, e, n),
					o = Od(this.yf.mf, 'WriteBatch.set', r.f_, i, null !== r.d_, n);
				return (this.pf = this.pf.concat(o.w_(r.f_, hc.ze()))), this;
			}),
			(t.prototype.update = function (t, e, n) {
				for (var r, i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
				return (
					this.vf(),
					'string' == typeof e || e instanceof pd
						? (xs('WriteBatch.update', arguments, 3),
						  (r = vv('WriteBatch.update', t, this.yf)),
						  (i = Rd(this.yf.mf, 'WriteBatch.update', r.f_, e, n, o)))
						: (Ds('WriteBatch.update', arguments, 2),
						  (r = vv('WriteBatch.update', t, this.yf)),
						  (i = kd(this.yf.mf, 'WriteBatch.update', r.f_, e))),
					(this.pf = this.pf.concat(i.w_(r.f_, hc.exists(!0)))),
					this
				);
			}),
			(t.prototype.delete = function (t) {
				Ds('WriteBatch.delete', arguments, 1), this.vf();
				var e = vv('WriteBatch.delete', t, this.yf);
				return (this.pf = this.pf.concat(new Tc(e.f_, hc.ze()))), this;
			}),
			(t.prototype.commit = function () {
				return (
					this.vf(),
					(this.bf = !0),
					this.pf.length > 0 ? this.yf.hf().write(this.pf) : Promise.resolve()
				);
			}),
			(t.prototype.vf = function () {
				if (this.bf)
					throw new cs(
						as.FAILED_PRECONDITION,
						'A write batch can no longer be used after commit() has been called.'
					);
			}),
			t
		);
	})(),
	Zd = (function (t) {
		function e(e, n, r) {
			var i = this;
			return (
				((i = t.call(this, n.__, e, r) || this).f_ = e),
				(i.firestore = n),
				(i.d_ = r),
				(i.lf = i.firestore.hf()),
				i
			);
		}
		return (
			se(e, t),
			(e.Rf = function (t, n, r) {
				if (t.length % 2 != 0)
					throw new cs(
						as.INVALID_ARGUMENT,
						'Invalid document reference. Document references must have an even number of segments, but ' +
							t.R() +
							' has ' +
							t.length
					);
				return new e(new Ns(t), n, r);
			}),
			Object.defineProperty(e.prototype, 'id', {
				get: function () {
					return this.f_.path._();
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(e.prototype, 'parent', {
				get: function () {
					return new fv(this.f_.path.h(), this.firestore, this.d_);
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(e.prototype, 'path', {
				get: function () {
					return this.f_.path.R();
				},
				enumerable: !1,
				configurable: !0
			}),
			(e.prototype.collection = function (t) {
				if (
					(Ds('DocumentReference.collection', arguments, 1),
					Os('DocumentReference.collection', 'non-empty string', 1, t),
					!t)
				)
					throw new cs(
						as.INVALID_ARGUMENT,
						'Must provide a non-empty collection name to collection()'
					);
				var e = _s.g(t);
				return new fv(this.f_.path.child(e), this.firestore, null);
			}),
			(e.prototype.isEqual = function (t) {
				if (!(t instanceof e)) throw Bs('isEqual', 'DocumentReference', 1, t);
				return this.firestore === t.firestore && this.f_.isEqual(t.f_) && this.d_ === t.d_;
			}),
			(e.prototype.set = function (t, e) {
				Ls('DocumentReference.set', arguments, 1, 2), (e = lv('DocumentReference.set', e));
				var n = gv(this.d_, t, e),
					r = Od(this.firestore.mf, 'DocumentReference.set', this.f_, n, null !== this.d_, e);
				return this.lf.write(r.w_(this.f_, hc.ze()));
			}),
			(e.prototype.update = function (t, e) {
				for (var n, r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
				return (
					'string' == typeof t || t instanceof pd
						? (xs('DocumentReference.update', arguments, 2),
						  (n = Rd(this.firestore.mf, 'DocumentReference.update', this.f_, t, e, r)))
						: (Ds('DocumentReference.update', arguments, 1),
						  (n = kd(this.firestore.mf, 'DocumentReference.update', this.f_, t))),
					this.lf.write(n.w_(this.f_, hc.exists(!0)))
				);
			}),
			(e.prototype.delete = function () {
				return (
					Ds('DocumentReference.delete', arguments, 0), this.lf.write([new Tc(this.f_, hc.ze())])
				);
			}),
			(e.prototype.onSnapshot = function () {
				for (var t, e, n, r = this, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
				Ls('DocumentReference.onSnapshot', arguments, 1, 4);
				var s = { includeMetadataChanges: !1 },
					u = 0;
				'object' != typeof i[u] ||
					Hd(i[u]) ||
					(qs('DocumentReference.onSnapshot', (s = i[u]), ['includeMetadataChanges']),
					Ps(
						'DocumentReference.onSnapshot',
						'boolean',
						'includeMetadataChanges',
						s.includeMetadataChanges
					),
					u++);
				var a = { includeMetadataChanges: s.includeMetadataChanges };
				if (Hd(i[u])) {
					var c = i[u];
					(i[u] = null === (t = c.next) || void 0 === t ? void 0 : t.bind(c)),
						(i[u + 1] = null === (e = c.error) || void 0 === e ? void 0 : e.bind(c)),
						(i[u + 2] = null === (n = c.complete) || void 0 === n ? void 0 : n.bind(c));
				} else
					Os('DocumentReference.onSnapshot', 'function', u, i[u]),
						ks('DocumentReference.onSnapshot', 'function', u + 1, i[u + 1]),
						ks('DocumentReference.onSnapshot', 'function', u + 2, i[u + 2]);
				var h = {
					next: function (t) {
						i[u] && i[u](r.Sf(t));
					},
					error: i[u + 1],
					complete: i[u + 2]
				};
				return this.lf.listen(Cc(this.f_.path), a, h);
			}),
			(e.prototype.get = function (t) {
				var e = this;
				Ls('DocumentReference.get', arguments, 0, 1), dv('DocumentReference.get', t);
				var n = this.firestore.hf();
				return t && 'cache' === t.source
					? n.Q_(this.f_).then(function (t) {
							return new ev(e.firestore, e.f_, t, !0, t instanceof Lc && t.Je, e.d_);
					  })
					: n.W_(this.f_, t).then(function (t) {
							return e.Sf(t);
					  });
			}),
			(e.prototype.withConverter = function (t) {
				return new e(this.f_, this.firestore, t);
			}),
			(e.prototype.Sf = function (t) {
				var e = t.docs.get(this.f_);
				return new ev(this.firestore, this.f_, e, t.fromCache, t.hasPendingWrites, this.d_);
			}),
			e
		);
	})(Ad),
	tv = (function () {
		function t(t, e) {
			(this.hasPendingWrites = t), (this.fromCache = e);
		}
		return (
			(t.prototype.isEqual = function (t) {
				return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
			}),
			t
		);
	})(),
	ev = (function () {
		function t(t, e, n, r, i, o) {
			(this.yf = t), (this.f_ = e), (this.Df = n), (this.Cf = r), (this.Nf = i), (this.d_ = o);
		}
		return (
			(t.prototype.data = function (t) {
				var e = this;
				if (
					(Ls('DocumentSnapshot.data', arguments, 0, 1),
					(t = pv('DocumentSnapshot.data', t)),
					this.Df)
				) {
					if (this.d_) {
						var n = new nv(this.yf, this.f_, this.Df, this.Cf, this.Nf, null);
						return this.d_.fromFirestore(n, t);
					}
					return new Kd(
						this.yf.__,
						this.yf.gf(),
						t.serverTimestamps || 'none',
						function (t) {
							return new Zd(t, e.yf, null);
						},
						function (t) {
							return new eu(t);
						}
					).X_(this.Df.rn());
				}
			}),
			(t.prototype.get = function (t, e) {
				var n = this;
				if (
					(Ls('DocumentSnapshot.get', arguments, 1, 2),
					(e = pv('DocumentSnapshot.get', e)),
					this.Df)
				) {
					var r = this.Df.data().field(jd('DocumentSnapshot.get', t, this.f_));
					if (null !== r)
						return new Kd(
							this.yf.__,
							this.yf.gf(),
							e.serverTimestamps || 'none',
							function (t) {
								return new Zd(t, n.yf, n.d_);
							},
							function (t) {
								return new eu(t);
							}
						).X_(r);
				}
			}),
			Object.defineProperty(t.prototype, 'id', {
				get: function () {
					return this.f_.path._();
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'ref', {
				get: function () {
					return new Zd(this.f_, this.yf, this.d_);
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'exists', {
				get: function () {
					return null !== this.Df;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'metadata', {
				get: function () {
					return new tv(this.Nf, this.Cf);
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.isEqual = function (e) {
				if (!(e instanceof t)) throw Bs('isEqual', 'DocumentSnapshot', 1, e);
				return (
					this.yf === e.yf &&
					this.Cf === e.Cf &&
					this.f_.isEqual(e.f_) &&
					(null === this.Df ? null === e.Df : this.Df.isEqual(e.Df)) &&
					this.d_ === e.d_
				);
			}),
			t
		);
	})(),
	nv = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.prototype.data = function (e) {
				return t.prototype.data.call(this, e);
			}),
			e
		);
	})(ev);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rv(t, e, n, r, i, o, s) {
	var u;
	if (i.p()) {
		if ('array-contains' === o || 'array-contains-any' === o)
			throw new cs(
				as.INVALID_ARGUMENT,
				"Invalid Query. You can't perform '" + o + "' queries on FieldPath.documentId()."
			);
		if ('in' === o || 'not-in' === o) {
			sv(s, o);
			for (var a = [], c = 0, h = s; c < h.length; c++) {
				var f = h[c];
				a.push(ov(r, t, f));
			}
			u = { arrayValue: { values: a } };
		} else u = ov(r, t, s);
	} else
		('in' !== o && 'not-in' !== o && 'array-contains-any' !== o) || sv(s, o),
			(u = Pd(n, e, s, 'in' === o || 'not-in' === o));
	var l = Yc.create(i, o, u);
	return (
		(function (t, e) {
			if (e.hn()) {
				var n = jc(t);
				if (null !== n && !n.isEqual(e.field))
					throw new cs(
						as.INVALID_ARGUMENT,
						"Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '" +
							n.toString() +
							"' and '" +
							e.field.toString() +
							"'"
					);
				var r = Fc(t);
				null !== r && uv(t, e.field, r);
			}
			var i = (function (t, e) {
				for (var n = 0, r = t.filters; n < r.length; n++) {
					var i = r[n];
					if (e.indexOf(i.op) >= 0) return i.op;
				}
				return null;
			})(
				t,
				(function (t) {
					switch (t) {
						case '!=':
							return ['!=', 'not-in'];
						case 'array-contains':
							return ['array-contains', 'array-contains-any', 'not-in'];
						case 'in':
							return ['array-contains-any', 'in', 'not-in'];
						case 'array-contains-any':
							return ['array-contains', 'array-contains-any', 'in', 'not-in'];
						case 'not-in':
							return ['array-contains', 'array-contains-any', 'in', 'not-in', '!='];
						default:
							return [];
					}
				})(e.op)
			);
			if (null !== i)
				throw i === e.op
					? new cs(
							as.INVALID_ARGUMENT,
							"Invalid query. You cannot use more than one '" + e.op.toString() + "' filter."
					  )
					: new cs(
							as.INVALID_ARGUMENT,
							"Invalid query. You cannot use '" +
								e.op.toString() +
								"' filters with '" +
								i.toString() +
								"' filters."
					  );
		})(t, l),
		l
	);
}
function iv(t, e, n) {
	if (null !== t.startAt)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Invalid query. You must not call startAt() or startAfter() before calling orderBy().'
		);
	if (null !== t.endAt)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Invalid query. You must not call endAt() or endBefore() before calling orderBy().'
		);
	var r = new hh(e, n);
	return (
		(function (t, e) {
			if (null === Fc(t)) {
				var n = jc(t);
				null !== n && uv(t, n, e.field);
			}
		})(t, r),
		r
	);
}
function ov(t, e, n) {
	if ('string' == typeof n) {
		if ('' === n)
			throw new cs(
				as.INVALID_ARGUMENT,
				'Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.'
			);
		if (!Mc(e) && -1 !== n.indexOf('/'))
			throw new cs(
				as.INVALID_ARGUMENT,
				"Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" +
					n +
					"' contains a '/' character."
			);
		var r = e.path.child(_s.g(n));
		if (!Ns.F(r))
			throw new cs(
				as.INVALID_ARGUMENT,
				"Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" +
					r +
					"' is not because it has an odd number of segments (" +
					r.length +
					').'
			);
		return aa(t, new Ns(r));
	}
	if (n instanceof Ad) return aa(t, n.f_);
	throw new cs(
		as.INVALID_ARGUMENT,
		'Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ' +
			js(n) +
			'.'
	);
}
function sv(t, e) {
	if (!Array.isArray(t) || 0 === t.length)
		throw new cs(
			as.INVALID_ARGUMENT,
			"Invalid Query. A non-empty array is required for '" + e.toString() + "' filters."
		);
	if (t.length > 10)
		throw new cs(
			as.INVALID_ARGUMENT,
			"Invalid Query. '" +
				e.toString() +
				"' filters support a maximum of 10 elements in the value array."
		);
	if ('in' === e || 'array-contains-any' === e) {
		if (t.indexOf(null) >= 0)
			throw new cs(
				as.INVALID_ARGUMENT,
				"Invalid Query. '" + e.toString() + "' filters cannot contain 'null' in the value array."
			);
		if (
			t.filter(function (t) {
				return Number.isNaN(t);
			}).length > 0
		)
			throw new cs(
				as.INVALID_ARGUMENT,
				"Invalid Query. '" + e.toString() + "' filters cannot contain 'NaN' in the value array."
			);
	}
}
function uv(t, e, n) {
	if (!n.isEqual(e))
		throw new cs(
			as.INVALID_ARGUMENT,
			"Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '" +
				e.toString() +
				"' and so you must also use '" +
				e.toString() +
				"' as your first orderBy(), but your first orderBy() is on field '" +
				n.toString() +
				"' instead."
		);
}
function av(t) {
	if (Vc(t) && 0 === t.on.length)
		throw new cs(
			as.UNIMPLEMENTED,
			'limitToLast() queries require specifying at least one orderBy() clause'
		);
}
var cv = (function () {
		function t(t, e, n) {
			(this.Ff = t), (this.firestore = e), (this.d_ = n);
		}
		return (
			(t.prototype.where = function (e, n, r) {
				Ds('Query.where', arguments, 3), Ms('Query.where', 3, r);
				var i,
					o,
					s,
					u = Us(
						'Query.where',
						[
							'<',
							'<=',
							'==',
							'!=',
							'>=',
							'>',
							'array-contains',
							'in',
							'array-contains-any',
							'not-in'
						],
						2,
						n
					),
					a = jd('Query.where', e),
					c = rv(this.Ff, 'Query.where', this.firestore.mf, this.firestore.__, a, u, r);
				return new t(
					((i = this.Ff),
					(o = c),
					(s = i.filters.concat([o])),
					new Rc(i.path, i.collectionGroup, i.on.slice(), s, i.limit, i.an, i.startAt, i.endAt)),
					this.firestore,
					this.d_
				);
			}),
			(t.prototype.orderBy = function (e, n) {
				var r;
				if (
					(Ls('Query.orderBy', arguments, 1, 2),
					ks('Query.orderBy', 'non-empty string', 2, n),
					void 0 === n || 'asc' === n)
				)
					r = 'asc';
				else {
					if ('desc' !== n)
						throw new cs(
							as.INVALID_ARGUMENT,
							"Function Query.orderBy() has unknown direction '" +
								n +
								"', expected 'asc' or 'desc'."
						);
					r = 'desc';
				}
				var i,
					o,
					s,
					u = jd('Query.orderBy', e),
					a = iv(this.Ff, u, r);
				return new t(
					((i = this.Ff),
					(o = a),
					(s = i.on.concat([o])),
					new Rc(
						i.path,
						i.collectionGroup,
						s,
						i.filters.slice(),
						i.limit,
						i.an,
						i.startAt,
						i.endAt
					)),
					this.firestore,
					this.d_
				);
			}),
			(t.prototype.limit = function (e) {
				return (
					Ds('Query.limit', arguments, 1),
					Os('Query.limit', 'number', 1, e),
					Gs('Query.limit', 1, e),
					new t(Gc(this.Ff, e, 'F'), this.firestore, this.d_)
				);
			}),
			(t.prototype.limitToLast = function (e) {
				return (
					Ds('Query.limitToLast', arguments, 1),
					Os('Query.limitToLast', 'number', 1, e),
					Gs('Query.limitToLast', 1, e),
					new t(Gc(this.Ff, e, 'L'), this.firestore, this.d_)
				);
			}),
			(t.prototype.startAt = function (e) {
				for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
				xs('Query.startAt', arguments, 1);
				var i = this.xf('Query.startAt', e, n, !0);
				return new t(zc(this.Ff, i), this.firestore, this.d_);
			}),
			(t.prototype.startAfter = function (e) {
				for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
				xs('Query.startAfter', arguments, 1);
				var i = this.xf('Query.startAfter', e, n, !1);
				return new t(zc(this.Ff, i), this.firestore, this.d_);
			}),
			(t.prototype.endBefore = function (e) {
				for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
				xs('Query.endBefore', arguments, 1);
				var i = this.xf('Query.endBefore', e, n, !0);
				return new t($c(this.Ff, i), this.firestore, this.d_);
			}),
			(t.prototype.endAt = function (e) {
				for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
				xs('Query.endAt', arguments, 1);
				var i = this.xf('Query.endAt', e, n, !1);
				return new t($c(this.Ff, i), this.firestore, this.d_);
			}),
			(t.prototype.isEqual = function (e) {
				if (!(e instanceof t)) throw Bs('isEqual', 'Query', 1, e);
				return this.firestore === e.firestore && Hc(this.Ff, e.Ff) && this.d_ === e.d_;
			}),
			(t.prototype.withConverter = function (e) {
				return new t(this.Ff, this.firestore, e);
			}),
			(t.prototype.xf = function (t, e, n, r) {
				if ((Ms(t, 1, e), e instanceof ev))
					return (
						Ds(t, pe([e], n), 1),
						(function (t, e, n, r, i) {
							if (!r)
								throw new cs(
									as.NOT_FOUND,
									"Can't use a DocumentSnapshot that doesn't exist for " + n + '().'
								);
							for (var o = [], s = 0, u = qc(t); s < u.length; s++) {
								var a = u[s];
								if (a.field.p()) o.push(aa(e, r.key));
								else {
									var c = r.field(a.field);
									if (Wu(c))
										throw new cs(
											as.INVALID_ARGUMENT,
											'Invalid query. You are trying to start or end a query using a document for which the field "' +
												a.field +
												'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)'
										);
									if (null === c) {
										var h = a.field.R();
										throw new cs(
											as.INVALID_ARGUMENT,
											"Invalid query. You are trying to start or end a query using a document for which the field '" +
												h +
												"' (used as the orderBy) does not exist."
										);
									}
									o.push(c);
								}
							}
							return new sh(o, i);
						})(this.Ff, this.firestore.__, t, e.Df, r)
					);
				var i = [e].concat(n);
				return (function (t, e, n, r, i, o) {
					var s = t.on;
					if (i.length > s.length)
						throw new cs(
							as.INVALID_ARGUMENT,
							'Too many arguments provided to ' +
								r +
								'(). The number of arguments must be less than or equal to the number of orderBy() clauses'
						);
					for (var u = [], a = 0; a < i.length; a++) {
						var c = i[a];
						if (s[a].field.p()) {
							if ('string' != typeof c)
								throw new cs(
									as.INVALID_ARGUMENT,
									'Invalid query. Expected a string for document ID in ' +
										r +
										'(), but got a ' +
										typeof c
								);
							if (!Mc(t) && -1 !== c.indexOf('/'))
								throw new cs(
									as.INVALID_ARGUMENT,
									'Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ' +
										r +
										"() must be a plain document ID, but '" +
										c +
										"' contains a slash."
								);
							var h = t.path.child(_s.g(c));
							if (!Ns.F(h))
								throw new cs(
									as.INVALID_ARGUMENT,
									'Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ' +
										r +
										"() must result in a valid document path, but '" +
										h +
										"' is not because it contains an odd number of segments."
								);
							var f = new Ns(h);
							u.push(aa(e, f));
						} else {
							var l = Pd(n, r, c);
							u.push(l);
						}
					}
					return new sh(u, o);
				})(this.Ff, this.firestore.__, this.firestore.mf, t, i, r);
			}),
			(t.prototype.onSnapshot = function () {
				for (var t, e, n, r = this, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
				Ls('Query.onSnapshot', arguments, 1, 4);
				var s = {},
					u = 0;
				if (
					('object' != typeof i[u] ||
						Hd(i[u]) ||
						(qs('Query.onSnapshot', (s = i[u]), ['includeMetadataChanges']),
						Ps('Query.onSnapshot', 'boolean', 'includeMetadataChanges', s.includeMetadataChanges),
						u++),
					Hd(i[u]))
				) {
					var a = i[u];
					(i[u] = null === (t = a.next) || void 0 === t ? void 0 : t.bind(a)),
						(i[u + 1] = null === (e = a.error) || void 0 === e ? void 0 : e.bind(a)),
						(i[u + 2] = null === (n = a.complete) || void 0 === n ? void 0 : n.bind(a));
				} else
					Os('Query.onSnapshot', 'function', u, i[u]),
						ks('Query.onSnapshot', 'function', u + 1, i[u + 1]),
						ks('Query.onSnapshot', 'function', u + 2, i[u + 2]);
				var c = {
					next: function (t) {
						i[u] && i[u](new hv(r.firestore, r.Ff, t, r.d_));
					},
					error: i[u + 1],
					complete: i[u + 2]
				};
				return av(this.Ff), this.firestore.hf().listen(this.Ff, s, c);
			}),
			(t.prototype.get = function (t) {
				var e = this;
				Ls('Query.get', arguments, 0, 1), dv('Query.get', t), av(this.Ff);
				var n = this.firestore.hf();
				return (t && 'cache' === t.source ? n.j_(this.Ff) : n.K_(this.Ff, t)).then(function (t) {
					return new hv(e.firestore, e.Ff, t, e.d_);
				});
			}),
			t
		);
	})(),
	hv = (function () {
		function t(t, e, n, r) {
			(this.yf = t),
				(this.$f = e),
				(this.kf = n),
				(this.d_ = r),
				(this.Mf = null),
				(this.Of = null),
				(this.metadata = new tv(n.hasPendingWrites, n.fromCache));
		}
		return (
			Object.defineProperty(t.prototype, 'docs', {
				get: function () {
					var t = [];
					return (
						this.forEach(function (e) {
							return t.push(e);
						}),
						t
					);
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'empty', {
				get: function () {
					return this.kf.docs.m();
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(t.prototype, 'size', {
				get: function () {
					return this.kf.docs.size;
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.forEach = function (t, e) {
				var n = this;
				Ls('QuerySnapshot.forEach', arguments, 1, 2),
					Os('QuerySnapshot.forEach', 'function', 1, t),
					this.kf.docs.forEach(function (r) {
						t.call(e, n.Lf(r, n.metadata.fromCache, n.kf.Wt.has(r.key)));
					});
			}),
			Object.defineProperty(t.prototype, 'query', {
				get: function () {
					return new cv(this.$f, this.yf, this.d_);
				},
				enumerable: !1,
				configurable: !0
			}),
			(t.prototype.docChanges = function (t) {
				t &&
					(qs('QuerySnapshot.docChanges', t, ['includeMetadataChanges']),
					Ps(
						'QuerySnapshot.docChanges',
						'boolean',
						'includeMetadataChanges',
						t.includeMetadataChanges
					));
				var e = !(!t || !t.includeMetadataChanges);
				if (e && this.kf.Kt)
					throw new cs(
						as.INVALID_ARGUMENT,
						'To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().'
					);
				return (
					(this.Mf && this.Of === e) ||
						((this.Mf = (function (t, e, n) {
							if (t.Qt.m()) {
								var r = 0;
								return t.docChanges.map(function (e) {
									var i = n(e.doc, t.fromCache, t.Wt.has(e.doc.key));
									return e.doc, { type: 'added', doc: i, oldIndex: -1, newIndex: r++ };
								});
							}
							var i = t.Qt;
							return t.docChanges
								.filter(function (t) {
									return e || 3 !== t.type;
								})
								.map(function (e) {
									var r = n(e.doc, t.fromCache, t.Wt.has(e.doc.key)),
										o = -1,
										s = -1;
									return (
										0 !== e.type && ((o = i.indexOf(e.doc.key)), (i = i.delete(e.doc.key))),
										1 !== e.type && (s = (i = i.add(e.doc)).indexOf(e.doc.key)),
										{ type: yv(e.type), doc: r, oldIndex: o, newIndex: s }
									);
								});
						})(this.kf, e, this.Lf.bind(this))),
						(this.Of = e)),
					this.Mf
				);
			}),
			(t.prototype.isEqual = function (e) {
				if (!(e instanceof t)) throw Bs('isEqual', 'QuerySnapshot', 1, e);
				return this.yf === e.yf && Hc(this.$f, e.$f) && this.kf.isEqual(e.kf) && this.d_ === e.d_;
			}),
			(t.prototype.Lf = function (t, e, n) {
				return new nv(this.yf, t.key, t, e, n, this.d_);
			}),
			t
		);
	})(),
	fv = (function (t) {
		function e(e, n, r) {
			var i = this;
			if ((((i = t.call(this, Cc(e), n, r) || this).Bf = e), e.length % 2 != 1))
				throw new cs(
					as.INVALID_ARGUMENT,
					'Invalid collection reference. Collection references must have an odd number of segments, but ' +
						e.R() +
						' has ' +
						e.length
				);
			return i;
		}
		return (
			se(e, t),
			Object.defineProperty(e.prototype, 'id', {
				get: function () {
					return this.Ff.path._();
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(e.prototype, 'parent', {
				get: function () {
					var t = this.Ff.path.h();
					return t.m() ? null : new Zd(new Ns(t), this.firestore, null);
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(e.prototype, 'path', {
				get: function () {
					return this.Ff.path.R();
				},
				enumerable: !1,
				configurable: !0
			}),
			(e.prototype.doc = function (t) {
				Ls('CollectionReference.doc', arguments, 0, 1),
					0 === arguments.length && (t = Ks.k()),
					Os('CollectionReference.doc', 'non-empty string', 1, t);
				var e = _s.g(t);
				return Zd.Rf(this.Ff.path.child(e), this.firestore, this.d_);
			}),
			(e.prototype.add = function (t) {
				Ds('CollectionReference.add', arguments, 1);
				var e = this.d_ ? this.d_.toFirestore(t) : t;
				Os('CollectionReference.add', 'object', 1, e);
				var n = this.doc();
				return new Zd(n.f_, this.firestore, null).set(e).then(function () {
					return n;
				});
			}),
			(e.prototype.withConverter = function (t) {
				return new e(this.Bf, this.firestore, t);
			}),
			e
		);
	})(cv);
function lv(t, e) {
	if (void 0 === e) return { merge: !1 };
	if (
		(qs(t, e, ['merge', 'mergeFields']),
		Ps(t, 'boolean', 'merge', e.merge),
		(n = t),
		void 0 !== (r = e.mergeFields) &&
			(function (t, e, n, r, i) {
				if (!(r instanceof Array))
					throw new cs(
						as.INVALID_ARGUMENT,
						'Function ' +
							t +
							'() requires its ' +
							e +
							' option to be an array, but it was: ' +
							js(r)
					);
				for (var o = 0; o < r.length; ++o)
					if (!i(r[o]))
						throw new cs(
							as.INVALID_ARGUMENT,
							'Function ' +
								t +
								'() requires all ' +
								e +
								' elements to be a string or a FieldPath, but the value at index ' +
								o +
								' was: ' +
								js(r[o])
						);
			})(n, 'mergeFields', 0, r, function (t) {
				return 'string' == typeof t || t instanceof pd;
			}),
		void 0 !== e.mergeFields && void 0 !== e.merge)
	)
		throw new cs(
			as.INVALID_ARGUMENT,
			'Invalid options passed to function ' +
				t +
				'(): You cannot specify both "merge" and "mergeFields".'
		);
	var n, r;
	return e;
}
function pv(t, e) {
	return void 0 === e
		? {}
		: (qs(t, e, ['serverTimestamps']),
		  Cs(t, 0, 'serverTimestamps', e.serverTimestamps, ['estimate', 'previous', 'none']),
		  e);
}
function dv(t, e) {
	ks(t, 'object', 1, e),
		e && (qs(t, e, ['source']), Cs(t, 0, 'source', e.source, ['default', 'server', 'cache']));
}
function vv(t, e, n) {
	if (e instanceof Ad) {
		if (e.firestore !== n)
			throw new cs(
				as.INVALID_ARGUMENT,
				'Provided document reference is from a different Firestore instance.'
			);
		return e;
	}
	throw Bs(t, 'DocumentReference', 1, e);
}
function yv(t) {
	switch (t) {
		case 0:
			return 'added';
		case 2:
		case 3:
			return 'modified';
		case 1:
			return 'removed';
		default:
			return ys();
	}
}
function gv(t, e, n) {
	return t ? (n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e)) : e;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var mv,
	bv = (function (t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this;
		}
		return (
			se(e, t),
			(e.serverTimestamp = function () {
				Ss('FieldValue.serverTimestamp', arguments);
				var t = new md('serverTimestamp');
				return (t.e_ = 'FieldValue.serverTimestamp'), new e(t);
			}),
			(e.delete = function () {
				Ss('FieldValue.delete', arguments);
				var t = new yd('deleteField');
				return (t.e_ = 'FieldValue.delete'), new e(t);
			}),
			(e.arrayUnion = function () {
				for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
				xs('FieldValue.arrayUnion', arguments, 1);
				var r = function () {
					for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
					return xs('arrayUnion()', arguments, 1), new bd('arrayUnion', t);
				}.apply(void 0, t);
				return (r.e_ = 'FieldValue.arrayUnion'), new e(r);
			}),
			(e.arrayRemove = function () {
				for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
				xs('FieldValue.arrayRemove', arguments, 1);
				var r = function () {
					for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
					return xs('arrayRemove()', arguments, 1), new wd('arrayRemove', t);
				}.apply(void 0, t);
				return (r.e_ = 'FieldValue.arrayRemove'), new e(r);
			}),
			(e.increment = function (t) {
				Os('FieldValue.increment', 'number', 1, t), Ds('FieldValue.increment', arguments, 1);
				var n = new Ed('increment', t);
				return (n.e_ = 'FieldValue.increment'), new e(n);
			}),
			(e.prototype.isEqual = function (t) {
				return this.l_.isEqual(t.l_);
			}),
			e
		);
	})(_d),
	wv = {
		Firestore: Xd,
		GeoPoint: Id,
		Timestamp: ou,
		Blob: eu,
		Transaction: Yd,
		WriteBatch: Jd,
		DocumentReference: Zd,
		DocumentSnapshot: ev,
		Query: cv,
		QueryDocumentSnapshot: nv,
		QuerySnapshot: hv,
		CollectionReference: fv,
		FieldPath: pd,
		FieldValue: bv,
		setLogLevel: Xd.setLogLevel,
		CACHE_SIZE_UNLIMITED: Wd
	};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (mv = tn).INTERNAL.registerComponent(
	new Ne(
		'firestore',
		function (t) {
			return (
				(e = t.getProvider('app').getImmediate()),
				(n = t.getProvider('auth-internal')),
				(r = new hd()),
				(i = new cd(r)),
				new Xd(e, n, i, r)
			);
			var e, n, r, i;
		},
		'PUBLIC'
	).setServiceProps(Object.assign({}, wv))
),
	mv.registerVersion('@firebase/firestore', '1.18.0');
export {
	Qt as $,
	ot as A,
	n as B,
	qt as C,
	L as D,
	M as E,
	N as F,
	t as G,
	dt as H,
	h as I,
	W as J,
	v as K,
	P as L,
	p as M,
	d as N,
	l as O,
	o as P,
	Kt as Q,
	Bt as R,
	jt as S,
	$ as T,
	et as U,
	nt as V,
	tt as W,
	Dt as X,
	Lt as Y,
	c as Z,
	Wt as _,
	U as a,
	xt as a0,
	rn as a1,
	re as a2,
	z as a3,
	Xt as a4,
	Jt as a5,
	Yt as a6,
	C as b,
	j as c,
	D as d,
	x as e,
	S as f,
	q as g,
	G as h,
	Ft as i,
	Rt as j,
	k,
	R as l,
	Pt as m,
	B as n,
	Ct as o,
	Ot as p,
	kt as q,
	_t as r,
	u as s,
	O as t,
	Nt as u,
	Ut as v,
	Tt as w,
	At as x,
	ut as y,
	st as z
};
