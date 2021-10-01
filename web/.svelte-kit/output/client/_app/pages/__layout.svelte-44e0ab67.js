import {
	S as s,
	i as e,
	s as t,
	e as a,
	t as n,
	k as l,
	c,
	a as o,
	g as r,
	d as i,
	n as u,
	b as f,
	D as h,
	f as v,
	E as d,
	h as g,
	F as m,
	G as $,
	H as p,
	I as y,
	J as k,
	K as E,
	r as I,
	L as D,
	w as b,
	x as w,
	u as x,
	M as V,
	N as j,
	O as C,
	P as L,
	Q as M,
	R,
	j as A,
	m as B,
	o as F,
	T as G,
	U as H,
	V as J,
	v as K,
	y as N,
	C as O,
} from "../chunks/vendor-4ee6881a.js";
import { n as P } from "../chunks/notifications-112ca568.js";
function Q(s, e, t) {
	const a = s.slice();
	return (a[2] = e[t]), a;
}
function S(s) {
	let e, t;
	return {
		c() {
			(e = a("i")), this.h();
		},
		l(s) {
			(e = c(s, "I", { class: !0 })), o(e).forEach(i), this.h();
		},
		h() {
			f(e, "class", (t = m(s[2].icon) + " svelte-ve4vvv"));
		},
		m(s, t) {
			v(s, e, t);
		},
		p(s, a) {
			2 & a &&
				t !== (t = m(s[2].icon) + " svelte-ve4vvv") &&
				f(e, "class", t);
		},
		d(s) {
			s && i(e);
		},
	};
}
function T(s, e) {
	let t,
		m,
		I,
		D,
		b,
		w,
		x,
		V,
		M = e[2].message + "",
		R = j,
		A = e[2].icon && S(e);
	return {
		key: s,
		first: null,
		c() {
			(t = a("div")),
				(m = a("div")),
				(I = n(M)),
				(D = l()),
				A && A.c(),
				(b = l()),
				this.h();
		},
		l(s) {
			t = c(s, "DIV", { class: !0, style: !0 });
			var e = o(t);
			m = c(e, "DIV", { class: !0 });
			var a = o(m);
			(I = r(a, M)),
				a.forEach(i),
				(D = u(e)),
				A && A.l(e),
				(b = u(e)),
				e.forEach(i),
				this.h();
		},
		h() {
			f(m, "class", "content svelte-ve4vvv"),
				f(t, "class", "toast svelte-ve4vvv"),
				h(t, "background", e[0][e[2].type]),
				(this.first = t);
		},
		m(s, e) {
			v(s, t, e),
				d(t, m),
				d(m, I),
				d(t, D),
				A && A.m(t, null),
				d(t, b),
				(V = !0);
		},
		p(s, a) {
			(e = s),
				(!V || 2 & a) && M !== (M = e[2].message + "") && g(I, M),
				e[2].icon
					? A
						? A.p(e, a)
						: ((A = S(e)), A.c(), A.m(t, b))
					: A && (A.d(1), (A = null)),
				(!V || 3 & a) && h(t, "background", e[0][e[2].type]);
		},
		r() {
			x = t.getBoundingClientRect();
		},
		f() {
			$(t), R(), p(t, x);
		},
		a() {
			R(), (R = y(t, x, C, {}));
		},
		i(s) {
			V ||
				(k(() => {
					w || (w = E(t, L, { y: 30 }, !0)), w.run(1);
				}),
				(V = !0));
		},
		o(s) {
			w || (w = E(t, L, { y: 30 }, !1)), w.run(0), (V = !1);
		},
		d(s) {
			s && i(t), A && A.d(), s && w && w.end();
		},
	};
}
function U(s) {
	let e,
		t,
		n = [],
		l = new Map(),
		r = s[1];
	const u = (s) => s[2].id;
	for (let a = 0; a < r.length; a += 1) {
		let e = Q(s, r, a),
			t = u(e);
		l.set(t, (n[a] = T(t, e)));
	}
	return {
		c() {
			e = a("div");
			for (let s = 0; s < n.length; s += 1) n[s].c();
			this.h();
		},
		l(s) {
			e = c(s, "DIV", { class: !0 });
			var t = o(e);
			for (let e = 0; e < n.length; e += 1) n[e].l(t);
			t.forEach(i), this.h();
		},
		h() {
			f(e, "class", "notifications svelte-ve4vvv");
		},
		m(s, a) {
			v(s, e, a);
			for (let t = 0; t < n.length; t += 1) n[t].m(e, null);
			t = !0;
		},
		p(s, [t]) {
			if (3 & t) {
				(r = s[1]), I();
				for (let s = 0; s < n.length; s += 1) n[s].r();
				n = D(n, t, u, 1, s, r, l, e, M, T, null, Q);
				for (let s = 0; s < n.length; s += 1) n[s].a();
				b();
			}
		},
		i(s) {
			if (!t) {
				for (let s = 0; s < r.length; s += 1) w(n[s]);
				t = !0;
			}
		},
		o(s) {
			for (let e = 0; e < n.length; e += 1) x(n[e]);
			t = !1;
		},
		d(s) {
			s && i(e);
			for (let e = 0; e < n.length; e += 1) n[e].d();
		},
	};
}
function q(s, e, t) {
	let a;
	V(s, P, (s) => t(1, (a = s)));
	let {
		themes: n = {
			danger: "#E26D69",
			success: "#84C991",
			warning: "#f0ad4e",
			info: "#5bc0de",
			default: "#aaaaaa",
		},
	} = e;
	return (
		(s.$$set = (s) => {
			"themes" in s && t(0, (n = s.themes));
		}),
		[n, a]
	);
}
class z extends s {
	constructor(s) {
		super(), e(this, s, q, U, t, { themes: 0 });
	}
}
function W(s) {
	let e, t, a;
	e = new z({});
	const n = s[1].default,
		c = R(n, s, s[0], null);
	return {
		c() {
			A(e.$$.fragment), (t = l()), c && c.c();
		},
		l(s) {
			B(e.$$.fragment, s), (t = u(s)), c && c.l(s);
		},
		m(s, n) {
			F(e, s, n), v(s, t, n), c && c.m(s, n), (a = !0);
		},
		p(s, [e]) {
			c &&
				c.p &&
				(!a || 1 & e) &&
				G(c, n, s, s[0], a ? J(n, s[0], e, null) : H(s[0]), null);
		},
		i(s) {
			a || (w(e.$$.fragment, s), w(c, s), (a = !0));
		},
		o(s) {
			x(e.$$.fragment, s), x(c, s), (a = !1);
		},
		d(s) {
			K(e, s), s && i(t), c && c.d(s);
		},
	};
}
function X(s, e, t) {
	let { $$slots: a = {}, $$scope: n } = e;
	const l = O(null);
	N("Auth", l);
	const c = O(!1);
	return (
		N("LoggedIn", c),
		(s.$$set = (s) => {
			"$$scope" in s && t(0, (n = s.$$scope));
		}),
		[n, a]
	);
}
class Y extends s {
	constructor(s) {
		super(), e(this, s, X, W, t, {});
	}
}
export { Y as default };
