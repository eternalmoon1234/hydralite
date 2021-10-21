const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/projects/create.svelte"),
	() => import("../../../src/routes/projects/[owner]/[name].svelte"),
	() => import("../../../src/routes/redirect/index.svelte"),
	() => import("../../../src/routes/auth/import/[provider].svelte"),
	() => import("../../../src/routes/auth/[provider].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/projects/create.svelte
	[/^\/projects\/create\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/projects/[owner]/[name].svelte
	[/^\/projects\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ owner: d(m[1]), name: d(m[2])})],

	// src/routes/redirect/index.svelte
	[/^\/redirect\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/auth/import/[provider].svelte
	[/^\/auth\/import\/([^/]+?)\/?$/, [c[0], c[6]], [c[1]], (m) => ({ provider: d(m[1])})],

	// src/routes/auth/[provider].svelte
	[/^\/auth\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ provider: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];
