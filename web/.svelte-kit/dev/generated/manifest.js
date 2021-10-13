const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/createProject.svelte"),
	() => import("../../../src/routes/auth/import/[provider].svelte"),
	() => import("../../../src/routes/auth/[provider].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/createProject.svelte
	[/^\/createProject\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/auth/import/[provider].svelte
	[/^\/auth\/import\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ provider: d(m[1])})],

	// src/routes/auth/[provider].svelte
	[/^\/auth\/([^/]+?)\/?$/, [c[0], c[5]], [c[1]], (m) => ({ provider: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];