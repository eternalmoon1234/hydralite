import {
	S as r,
	i as s,
	s as a,
	e as t,
	t as e,
	c,
	a as n,
	g as o,
	d as u,
	f,
	F as l,
	h as m,
	k as p,
	l as d,
	n as i,
	G as h
} from './chunks/vendor-c51b7936.js';
function E(r) {
	let s,
		a,
		p = r[1].frame + '';
	return {
		c() {
			(s = t('pre')), (a = e(p));
		},
		l(r) {
			s = c(r, 'PRE', {});
			var t = n(s);
			(a = o(t, p)), t.forEach(u);
		},
		m(r, t) {
			f(r, s, t), l(s, a);
		},
		p(r, s) {
			2 & s && p !== (p = r[1].frame + '') && m(a, p);
		},
		d(r) {
			r && u(s);
		}
	};
}
function k(r) {
	let s,
		a,
		p = r[1].stack + '';
	return {
		c() {
			(s = t('pre')), (a = e(p));
		},
		l(r) {
			s = c(r, 'PRE', {});
			var t = n(s);
			(a = o(t, p)), t.forEach(u);
		},
		m(r, t) {
			f(r, s, t), l(s, a);
		},
		p(r, s) {
			2 & s && p !== (p = r[1].stack + '') && m(a, p);
		},
		d(r) {
			r && u(s);
		}
	};
}
function v(r) {
	let s,
		a,
		v,
		g,
		P,
		R,
		x,
		N,
		$ = r[1].message + '',
		b = r[1].frame && E(r),
		j = r[1].stack && k(r);
	return {
		c() {
			(s = t('h1')),
				(a = e(r[0])),
				(v = p()),
				(g = t('pre')),
				(P = e($)),
				(R = p()),
				b && b.c(),
				(x = p()),
				j && j.c(),
				(N = d());
		},
		l(t) {
			s = c(t, 'H1', {});
			var e = n(s);
			(a = o(e, r[0])), e.forEach(u), (v = i(t)), (g = c(t, 'PRE', {}));
			var f = n(g);
			(P = o(f, $)), f.forEach(u), (R = i(t)), b && b.l(t), (x = i(t)), j && j.l(t), (N = d());
		},
		m(r, t) {
			f(r, s, t),
				l(s, a),
				f(r, v, t),
				f(r, g, t),
				l(g, P),
				f(r, R, t),
				b && b.m(r, t),
				f(r, x, t),
				j && j.m(r, t),
				f(r, N, t);
		},
		p(r, [s]) {
			1 & s && m(a, r[0]),
				2 & s && $ !== ($ = r[1].message + '') && m(P, $),
				r[1].frame
					? b
						? b.p(r, s)
						: ((b = E(r)), b.c(), b.m(x.parentNode, x))
					: b && (b.d(1), (b = null)),
				r[1].stack
					? j
						? j.p(r, s)
						: ((j = k(r)), j.c(), j.m(N.parentNode, N))
					: j && (j.d(1), (j = null));
		},
		i: h,
		o: h,
		d(r) {
			r && u(s), r && u(v), r && u(g), r && u(R), b && b.d(r), r && u(x), j && j.d(r), r && u(N);
		}
	};
}
function g({ error: r, status: s }) {
	return { props: { error: r, status: s } };
}
function P(r, s, a) {
	let { status: t } = s,
		{ error: e } = s;
	return (
		(r.$$set = (r) => {
			'status' in r && a(0, (t = r.status)), 'error' in r && a(1, (e = r.error));
		}),
		[t, e]
	);
}
class R extends r {
	constructor(r) {
		super(), s(this, r, P, v, a, { status: 0, error: 1 });
	}
}
export { R as default, g as load };
