import {
	X as t,
	S as e,
	i as s,
	s as a,
	e as n,
	k as r,
	Y as o,
	c as l,
	d as c,
	n as i,
	a as u,
	b as d,
	Z as h,
	D as f,
	E as m,
	f as $,
	N as p,
	l as g,
	r as v,
	u as I,
	w as x,
	x as y,
	_ as b,
	M as k,
	A as w,
	j as H,
	m as V,
	o as j,
	v as E,
	R as D,
	T as N,
	U as A,
	V as M,
	J,
	$ as B,
	a0 as R,
	P as Z,
	t as U,
	g as z,
	h as C,
} from "../chunks/vendor-4ee6881a.js";
import { n as L } from "../chunks/notifications-112ca568.js";
function X(t) {
	let e, s, a, g, v, I, x, y;
	return {
		c() {
			(e = n("link")),
				(s = r()),
				(a = n("div")),
				(g = n("img")),
				(I = r()),
				(x = n("div")),
				(y = n("div")),
				this.h();
		},
		l(t) {
			const n = o('[data-svelte="svelte-xkm4t5"]', document.head);
			(e = l(n, "LINK", { rel: !0, href: !0 })),
				n.forEach(c),
				(s = i(t)),
				(a = l(t, "DIV", { class: !0 }));
			var r = u(a);
			(g = l(r, "IMG", { src: !0, alt: !0, width: !0, class: !0 })),
				(I = i(r)),
				(x = l(r, "DIV", { class: !0 }));
			var d = u(x);
			(y = l(d, "DIV", { style: !0, class: !0 })),
				u(y).forEach(c),
				d.forEach(c),
				r.forEach(c),
				this.h();
		},
		h() {
			(document.title = "Hydralite | Loading"),
				d(e, "rel", "shortcut icon"),
				d(e, "href", "/logo/logo.svg"),
				h(g.src, (v = "/logo/logo.svg")) ||
					d(g, "src", "/logo/logo.svg"),
				d(g, "alt", "Hydralite logo"),
				d(g, "width", "8%"),
				d(g, "class", "motion-safe:animate-pulse"),
				f(y, "width", "100%"),
				d(
					y,
					"class",
					"absolute top-0 h-2 rounded shim-red svelte-y3k1y4"
				),
				d(x, "class", "relative w-72 bg-transparent rounded mt-9"),
				d(
					a,
					"class",
					"bg-white h-screen w-screen dark:bg-acrylic-70 flex items-center justify-center absolute flex-col dark:text-white text-black select-none"
				);
		},
		m(t, n) {
			m(document.head, e),
				$(t, s, n),
				$(t, a, n),
				m(a, g),
				m(a, I),
				m(a, x),
				m(x, y);
		},
		p: p,
		i: p,
		o: p,
		d(t) {
			c(e), t && c(s), t && c(a);
		},
	};
}
class G extends e {
	constructor(t) {
		super(), s(this, t, null, X, a, {});
	}
}
function O(t) {
	let e, s;
	return (
		(e = new G({})),
		{
			c() {
				H(e.$$.fragment);
			},
			l(t) {
				V(e.$$.fragment, t);
			},
			m(t, a) {
				j(e, t, a), (s = !0);
			},
			p: p,
			i(t) {
				s || (y(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				I(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				E(e, t);
			},
		}
	);
}
function T(t) {
	let e, s, a, n;
	const r = [K, _],
		o = [];
	function l(t, e) {
		return null == t[1] ? 0 : 1;
	}
	return (
		(e = l(t)),
		(s = o[e] = r[e](t)),
		{
			c() {
				s.c(), (a = g());
			},
			l(t) {
				s.l(t), (a = g());
			},
			m(t, s) {
				o[e].m(t, s), $(t, a, s), (n = !0);
			},
			p(t, n) {
				let c = e;
				(e = l(t)),
					e === c
						? o[e].p(t, n)
						: (v(),
						  I(o[c], 1, 1, () => {
								o[c] = null;
						  }),
						  x(),
						  (s = o[e]),
						  s ? s.p(t, n) : ((s = o[e] = r[e](t)), s.c()),
						  y(s, 1),
						  s.m(a.parentNode, a));
			},
			i(t) {
				n || (y(s), (n = !0));
			},
			o(t) {
				I(s), (n = !1);
			},
			d(t) {
				o[e].d(t), t && c(a);
			},
		}
	);
}
function _(t) {
	let e, s, a, r;
	const o = t[5].default,
		i = D(o, t, t[4], null);
	return {
		c() {
			(e = n("div")), i && i.c();
		},
		l(t) {
			e = l(t, "DIV", {});
			var s = u(e);
			i && i.l(s), s.forEach(c);
		},
		m(t, s) {
			$(t, e, s), i && i.m(e, null), (r = !0);
		},
		p(t, e) {
			i &&
				i.p &&
				(!r || 16 & e) &&
				N(i, o, t, t[4], r ? M(o, t[4], e, null) : A(t[4]), null);
		},
		i(t) {
			r ||
				(y(i, t),
				J(() => {
					a && a.end(1),
						(s = B(e, Z, { y: 50, duration: 250, delay: 300 })),
						s.start();
				}),
				(r = !0));
		},
		o(t) {
			I(i, t),
				s && s.invalidate(),
				(a = R(e, Z, { y: -50, duration: 250 })),
				(r = !1);
		},
		d(t) {
			t && c(e), i && i.d(t), t && a && a.end();
		},
	};
}
function K(t) {
	let e, s;
	return (
		(e = new G({})),
		{
			c() {
				H(e.$$.fragment);
			},
			l(t) {
				V(e.$$.fragment, t);
			},
			m(t, a) {
				j(e, t, a), (s = !0);
			},
			p: p,
			i(t) {
				s || (y(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				I(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				E(e, t);
			},
		}
	);
}
function P(t) {
	let e, s, a, n;
	const r = [T, O],
		o = [];
	function l(t, e) {
		return 1 == t[0] ? 0 : 1;
	}
	return (
		(e = l(t)),
		(s = o[e] = r[e](t)),
		{
			c() {
				s.c(), (a = g());
			},
			l(t) {
				s.l(t), (a = g());
			},
			m(t, s) {
				o[e].m(t, s), $(t, a, s), (n = !0);
			},
			p(t, [n]) {
				let c = e;
				(e = l(t)),
					e === c
						? o[e].p(t, n)
						: (v(),
						  I(o[c], 1, 1, () => {
								o[c] = null;
						  }),
						  x(),
						  (s = o[e]),
						  s ? s.p(t, n) : ((s = o[e] = r[e](t)), s.c()),
						  y(s, 1),
						  s.m(a.parentNode, a));
			},
			i(t) {
				n || (y(s), (n = !0));
			},
			o(t) {
				I(s), (n = !1);
			},
			d(t) {
				o[e].d(t), t && c(a);
			},
		}
	);
}
function Q(e, s, a) {
	let n,
		r,
		{ $$slots: o = {}, $$scope: l } = s;
	const c = b("Auth");
	k(e, c, (t) => a(1, (r = t)));
	const i = b("LoggedIn");
	return (
		k(e, i, (t) => a(0, (n = t))),
		w(() => {
			let e = localStorage.getItem("accessToken");
			null != e
				? ((e =
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MzM4NjA5NjUsInVzZXJfaWQiOiI2MTNjYjUyZWU4NmVhZDA2ODVhMDQzM2MifQ.mDnsC_xFy_fZkKjeZmXZhoPKBLVR0dHcYtnBwSB-oog"),
				  (async function (e, s, a) {
						return t({ method: s, url: e, headers: a }).then(
							(t) => t.data
						);
				  })("http://localhost:8000/api/auth/getUser", "GET", {
						Authorization: `bearer ${e}`,
				  }).then((t) => {
						if (t.error)
							i.set(!1),
								L.danger("ABCDEFG idk why this error", 3e3);
						else {
							let {
									_id: { $oid: e },
									profile: {
										name: s,
										email: a,
										profilepic: n,
									},
								} = t,
								r = {
									email: a,
									id: e,
									name: s,
									profilePicture: n,
								};
							c.set(r), i.set(!0);
						}
				  }))
				: i.set(!1);
		}),
		(e.$$set = (t) => {
			"$$scope" in t && a(4, (l = t.$$scope));
		}),
		[n, r, c, i, l, o]
	);
}
class S extends e {
	constructor(t) {
		super(), s(this, t, Q, P, a, {});
	}
}
function Y(t) {
	let e,
		s,
		a,
		r,
		o,
		i,
		h,
		f,
		p,
		g,
		v = t[0].name + "";
	return {
		c() {
			(e = n("main")),
				(s = n("h1")),
				(a = U("H- ")),
				(r = n("br")),
				(o = U("\n      H- ")),
				(i = n("br")),
				(h = U("\n      H- ")),
				(f = n("br")),
				(p = U("\n      Hi ")),
				(g = U(v)),
				this.h();
		},
		l(t) {
			e = l(t, "MAIN", { class: !0 });
			var n = u(e);
			s = l(n, "H1", { class: !0 });
			var d = u(s);
			(a = z(d, "H- ")),
				(r = l(d, "BR", {})),
				(o = z(d, "\n      H- ")),
				(i = l(d, "BR", {})),
				(h = z(d, "\n      H- ")),
				(f = l(d, "BR", {})),
				(p = z(d, "\n      Hi ")),
				(g = z(d, v)),
				d.forEach(c),
				n.forEach(c),
				this.h();
		},
		h() {
			d(s, "class", "font-montserrat font-extrabold text-3xl text-black"),
				d(e, "class", "w-screen h-screen");
		},
		m(t, n) {
			$(t, e, n),
				m(e, s),
				m(s, a),
				m(s, r),
				m(s, o),
				m(s, i),
				m(s, h),
				m(s, f),
				m(s, p),
				m(s, g);
		},
		p(t, e) {
			1 & e && v !== (v = t[0].name + "") && C(g, v);
		},
		d(t) {
			t && c(e);
		},
	};
}
function F(t) {
	let e, s;
	return (
		(e = new S({
			props: { $$slots: { default: [Y] }, $$scope: { ctx: t } },
		})),
		{
			c() {
				H(e.$$.fragment);
			},
			l(t) {
				V(e.$$.fragment, t);
			},
			m(t, a) {
				j(e, t, a), (s = !0);
			},
			p(t, [s]) {
				const a = {};
				5 & s && (a.$$scope = { dirty: s, ctx: t }), e.$set(a);
			},
			i(t) {
				s || (y(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				I(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				E(e, t);
			},
		}
	);
}
const W = !0;
function q(t, e, s) {
	let a;
	const n = b("Auth");
	return k(t, n, (t) => s(0, (a = t))), [a, n];
}
class tt extends e {
	constructor(t) {
		super(), s(this, t, q, F, a, {});
	}
}
export { tt as default, W as prerender };
