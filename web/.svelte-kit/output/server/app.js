var __require =
	typeof require !== "undefined"
		? require
		: (x) => {
				throw new Error(
					'Dynamic require of "' + x + '" is not supported'
				);
		  };
var __accessCheck = (obj, member, msg) => {
	if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
	__accessCheck(obj, member, "read from private field");
	return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
	if (member.has(obj))
		throw TypeError("Cannot add the same private member more than once");
	member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
	__accessCheck(obj, member, "write to private field");
	setter ? setter.call(obj, value) : member.set(obj, value);
	return value;
};
var _map;
import cookie from "cookie";
import { v4 } from "@lukeed/uuid";
import "axios";
function get_single_valued_header(headers, key) {
	const value = headers[key];
	if (Array.isArray(value)) {
		if (value.length === 0) {
			return void 0;
		}
		if (value.length > 1) {
			throw new Error(
				`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`
			);
		}
		return value[0];
	}
	return value;
}
function lowercase_keys(obj) {
	const clone = {};
	for (const key in obj) {
		clone[key.toLowerCase()] = obj[key];
	}
	return clone;
}
function error$1(body) {
	return {
		status: 500,
		body,
		headers: {},
	};
}
function is_string(s2) {
	return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
	if (!content_type) return true;
	const [type] = content_type.split(";");
	return (
		type === "text/plain" ||
		type === "application/json" ||
		type === "application/x-www-form-urlencoded" ||
		type === "multipart/form-data"
	);
}
async function render_endpoint(request, route, match) {
	const mod = await route.load();
	const handler = mod[request.method.toLowerCase().replace("delete", "del")];
	if (!handler) {
		return;
	}
	const params = route.params(match);
	const response = await handler({ ...request, params });
	const preface = `Invalid response from route ${request.path}`;
	if (!response) {
		return;
	}
	if (typeof response !== "object") {
		return error$1(
			`${preface}: expected an object, got ${typeof response}`
		);
	}
	let { status = 200, body, headers = {} } = response;
	headers = lowercase_keys(headers);
	const type = get_single_valued_header(headers, "content-type");
	const is_type_textual = is_content_type_textual(type);
	if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
		return error$1(
			`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`
		);
	}
	let normalized_body;
	if (
		(typeof body === "object" || typeof body === "undefined") &&
		!(body instanceof Uint8Array) &&
		(!type || type.startsWith("application/json"))
	) {
		headers = {
			...headers,
			"content-type": "application/json; charset=utf-8",
		};
		normalized_body = JSON.stringify(
			typeof body === "undefined" ? {} : body
		);
	} else {
		normalized_body = body;
	}
	return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved =
	/^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
	"<": "\\u003C",
	">": "\\u003E",
	"/": "\\u002F",
	"\\": "\\\\",
	"\b": "\\b",
	"\f": "\\f",
	"\n": "\\n",
	"\r": "\\r",
	"	": "\\t",
	"\0": "\\0",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029",
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype)
	.sort()
	.join("\0");
function devalue(value) {
	var counts = new Map();
	function walk(thing) {
		if (typeof thing === "function") {
			throw new Error("Cannot stringify a function");
		}
		if (counts.has(thing)) {
			counts.set(thing, counts.get(thing) + 1);
			return;
		}
		counts.set(thing, 1);
		if (!isPrimitive(thing)) {
			var type = getType(thing);
			switch (type) {
				case "Number":
				case "String":
				case "Boolean":
				case "Date":
				case "RegExp":
					return;
				case "Array":
					thing.forEach(walk);
					break;
				case "Set":
				case "Map":
					Array.from(thing).forEach(walk);
					break;
				default:
					var proto = Object.getPrototypeOf(thing);
					if (
						proto !== Object.prototype &&
						proto !== null &&
						Object.getOwnPropertyNames(proto).sort().join("\0") !==
							objectProtoOwnPropertyNames
					) {
						throw new Error("Cannot stringify arbitrary non-POJOs");
					}
					if (Object.getOwnPropertySymbols(thing).length > 0) {
						throw new Error(
							"Cannot stringify POJOs with symbolic keys"
						);
					}
					Object.keys(thing).forEach(function (key) {
						return walk(thing[key]);
					});
			}
		}
	}
	walk(value);
	var names = new Map();
	Array.from(counts)
		.filter(function (entry) {
			return entry[1] > 1;
		})
		.sort(function (a, b) {
			return b[1] - a[1];
		})
		.forEach(function (entry, i) {
			names.set(entry[0], getName(i));
		});
	function stringify(thing) {
		if (names.has(thing)) {
			return names.get(thing);
		}
		if (isPrimitive(thing)) {
			return stringifyPrimitive(thing);
		}
		var type = getType(thing);
		switch (type) {
			case "Number":
			case "String":
			case "Boolean":
				return "Object(" + stringify(thing.valueOf()) + ")";
			case "RegExp":
				return (
					"new RegExp(" +
					stringifyString(thing.source) +
					', "' +
					thing.flags +
					'")'
				);
			case "Date":
				return "new Date(" + thing.getTime() + ")";
			case "Array":
				var members = thing.map(function (v, i) {
					return i in thing ? stringify(v) : "";
				});
				var tail =
					thing.length === 0 || thing.length - 1 in thing ? "" : ",";
				return "[" + members.join(",") + tail + "]";
			case "Set":
			case "Map":
				return (
					"new " +
					type +
					"([" +
					Array.from(thing).map(stringify).join(",") +
					"])"
				);
			default:
				var obj =
					"{" +
					Object.keys(thing)
						.map(function (key) {
							return safeKey(key) + ":" + stringify(thing[key]);
						})
						.join(",") +
					"}";
				var proto = Object.getPrototypeOf(thing);
				if (proto === null) {
					return Object.keys(thing).length > 0
						? "Object.assign(Object.create(null)," + obj + ")"
						: "Object.create(null)";
				}
				return obj;
		}
	}
	var str = stringify(value);
	if (names.size) {
		var params_1 = [];
		var statements_1 = [];
		var values_1 = [];
		names.forEach(function (name, thing) {
			params_1.push(name);
			if (isPrimitive(thing)) {
				values_1.push(stringifyPrimitive(thing));
				return;
			}
			var type = getType(thing);
			switch (type) {
				case "Number":
				case "String":
				case "Boolean":
					values_1.push("Object(" + stringify(thing.valueOf()) + ")");
					break;
				case "RegExp":
					values_1.push(thing.toString());
					break;
				case "Date":
					values_1.push("new Date(" + thing.getTime() + ")");
					break;
				case "Array":
					values_1.push("Array(" + thing.length + ")");
					thing.forEach(function (v, i) {
						statements_1.push(name + "[" + i + "]=" + stringify(v));
					});
					break;
				case "Set":
					values_1.push("new Set");
					statements_1.push(
						name +
							"." +
							Array.from(thing)
								.map(function (v) {
									return "add(" + stringify(v) + ")";
								})
								.join(".")
					);
					break;
				case "Map":
					values_1.push("new Map");
					statements_1.push(
						name +
							"." +
							Array.from(thing)
								.map(function (_a) {
									var k = _a[0],
										v = _a[1];
									return (
										"set(" +
										stringify(k) +
										", " +
										stringify(v) +
										")"
									);
								})
								.join(".")
					);
					break;
				default:
					values_1.push(
						Object.getPrototypeOf(thing) === null
							? "Object.create(null)"
							: "{}"
					);
					Object.keys(thing).forEach(function (key) {
						statements_1.push(
							"" +
								name +
								safeProp(key) +
								"=" +
								stringify(thing[key])
						);
					});
			}
		});
		statements_1.push("return " + str);
		return (
			"(function(" +
			params_1.join(",") +
			"){" +
			statements_1.join(";") +
			"}(" +
			values_1.join(",") +
			"))"
		);
	} else {
		return str;
	}
}
function getName(num) {
	var name = "";
	do {
		name = chars[num % chars.length] + name;
		num = ~~(num / chars.length) - 1;
	} while (num >= 0);
	return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
	return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
	if (typeof thing === "string") return stringifyString(thing);
	if (thing === void 0) return "void 0";
	if (thing === 0 && 1 / thing < 0) return "-0";
	var str = String(thing);
	if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
	return str;
}
function getType(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
	return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
	return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
	return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
		? key
		: escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
	return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
		? "." + key
		: "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
	var result = '"';
	for (var i = 0; i < str.length; i += 1) {
		var char = str.charAt(i);
		var code = char.charCodeAt(0);
		if (char === '"') {
			result += '\\"';
		} else if (char in escaped$1) {
			result += escaped$1[char];
		} else if (code >= 55296 && code <= 57343) {
			var next = str.charCodeAt(i + 1);
			if (code <= 56319 && next >= 56320 && next <= 57343) {
				result += char + str[++i];
			} else {
				result += "\\u" + code.toString(16).toUpperCase();
			}
		} else {
			result += char;
		}
	}
	result += '"';
	return result;
}
function noop$1() {}
function safe_not_equal$1(a, b) {
	return a != a
		? b == b
		: a !== b || (a && typeof a === "object") || typeof a === "function";
}
Promise.resolve();
const subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
	let stop;
	const subscribers = new Set();
	function set(new_value) {
		if (safe_not_equal$1(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue$1.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue$1.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue$1.length; i += 2) {
						subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
					}
					subscriber_queue$1.length = 0;
				}
			}
		}
	}
	function update(fn) {
		set(fn(value));
	}
	function subscribe2(run2, invalidate = noop$1) {
		const subscriber = [run2, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set) || noop$1;
		}
		run2(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe: subscribe2 };
}
function hash(value) {
	let hash2 = 5381;
	let i = value.length;
	if (typeof value === "string") {
		while (i) hash2 = (hash2 * 33) ^ value.charCodeAt(--i);
	} else {
		while (i) hash2 = (hash2 * 33) ^ value[--i];
	}
	return (hash2 >>> 0).toString(36);
}
const s$1 = JSON.stringify;
async function render_response({
	branch,
	options: options2,
	$session,
	page_config,
	status,
	error: error2,
	page,
}) {
	const css2 = new Set(options2.entry.css);
	const js = new Set(options2.entry.js);
	const styles = new Set();
	const serialized_data = [];
	let rendered;
	let is_private = false;
	let maxage;
	if (error2) {
		error2.stack = options2.get_stack(error2);
	}
	if (page_config.ssr) {
		branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
			if (node.css) node.css.forEach((url) => css2.add(url));
			if (node.js) node.js.forEach((url) => js.add(url));
			if (node.styles)
				node.styles.forEach((content) => styles.add(content));
			if (fetched && page_config.hydrate)
				serialized_data.push(...fetched);
			if (uses_credentials) is_private = true;
			maxage = loaded.maxage;
		});
		const session = writable$1($session);
		const props = {
			stores: {
				page: writable$1(null),
				navigating: writable$1(null),
				session,
			},
			page,
			components: branch.map(({ node }) => node.module.default),
		};
		for (let i = 0; i < branch.length; i += 1) {
			props[`props_${i}`] = await branch[i].loaded.props;
		}
		let session_tracking_active = false;
		const unsubscribe = session.subscribe(() => {
			if (session_tracking_active) is_private = true;
		});
		session_tracking_active = true;
		try {
			rendered = options2.root.render(props);
		} finally {
			unsubscribe();
		}
	} else {
		rendered = { head: "", html: "", css: { code: "", map: null } };
	}
	const include_js = page_config.router || page_config.hydrate;
	if (!include_js) js.clear();
	const links = options2.amp
		? styles.size > 0 || rendered.css.code.length > 0
			? `<style amp-custom>${Array.from(styles)
					.concat(rendered.css.code)
					.join("\n")}</style>`
			: ""
		: [
				...Array.from(js).map(
					(dep) => `<link rel="modulepreload" href="${dep}">`
				),
				...Array.from(css2).map(
					(dep) => `<link rel="stylesheet" href="${dep}">`
				),
		  ].join("\n		");
	let init2 = "";
	if (options2.amp) {
		init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
	} else if (include_js) {
		init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${
					options2.target
						? `document.querySelector(${s$1(options2.target)})`
						: "document.body"
				},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
					throw new Error(
						`Failed to serialize session data: ${error3.message}`
					);
				})},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${
					page_config.ssr && page_config.hydrate
						? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${
							page && page.host ? s$1(page.host) : "location.host"
						}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}`
						: "null"
				}
			});
		<\/script>`;
	}
	if (options2.service_worker) {
		init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
	}
	const head = [
		rendered.head,
		styles.size && !options2.amp
			? `<style data-svelte>${Array.from(styles).join("\n")}</style>`
			: "",
		links,
		init2,
	].join("\n\n		");
	const body = options2.amp
		? rendered.html
		: `${rendered.html}

			${serialized_data
				.map(({ url, body: body2, json }) => {
					let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
					if (body2) attributes += ` data-body="${hash(body2)}"`;
					return `<script ${attributes}>${json}<\/script>`;
				})
				.join("\n\n	")}
		`;
	const headers = {
		"content-type": "text/html",
	};
	if (maxage) {
		headers["cache-control"] = `${
			is_private ? "private" : "public"
		}, max-age=${maxage}`;
	}
	if (!options2.floc) {
		headers["permissions-policy"] = "interest-cohort=()";
	}
	return {
		status,
		headers,
		body: options2.template({ head, body }),
	};
}
function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}
function serialize_error(error2) {
	if (!error2) return null;
	let serialized = try_serialize(error2);
	if (!serialized) {
		const { name, message, stack } = error2;
		serialized = try_serialize({ ...error2, name, message, stack });
	}
	if (!serialized) {
		serialized = "{}";
	}
	return serialized;
}
function normalize(loaded) {
	const has_error_status =
		loaded.status &&
		loaded.status >= 400 &&
		loaded.status <= 599 &&
		!loaded.redirect;
	if (loaded.error || has_error_status) {
		const status = loaded.status;
		if (!loaded.error && has_error_status) {
			return {
				status: status || 500,
				error: new Error(),
			};
		}
		const error2 =
			typeof loaded.error === "string"
				? new Error(loaded.error)
				: loaded.error;
		if (!(error2 instanceof Error)) {
			return {
				status: 500,
				error: new Error(
					`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`
				),
			};
		}
		if (!status || status < 400 || status > 599) {
			console.warn(
				'"error" returned from load() without a valid status code \u2014 defaulting to 500'
			);
			return { status: 500, error: error2 };
		}
		return { status, error: error2 };
	}
	if (loaded.redirect) {
		if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
			return {
				status: 500,
				error: new Error(
					'"redirect" property returned from load() must be accompanied by a 3xx status code'
				),
			};
		}
		if (typeof loaded.redirect !== "string") {
			return {
				status: 500,
				error: new Error(
					'"redirect" property returned from load() must be a string'
				),
			};
		}
	}
	return loaded;
}
const s = JSON.stringify;
async function load_node({
	request,
	options: options2,
	state,
	route,
	page,
	node,
	$session,
	context,
	prerender_enabled,
	is_leaf,
	is_error,
	status,
	error: error2,
}) {
	const { module } = node;
	let uses_credentials = false;
	const fetched = [];
	let loaded;
	const page_proxy = new Proxy(page, {
		get: (target, prop, receiver) => {
			if (prop === "query" && prerender_enabled) {
				throw new Error(
					"Cannot access query on a page with prerendering enabled"
				);
			}
			return Reflect.get(target, prop, receiver);
		},
	});
	if (module.load) {
		const load_input = {
			page: page_proxy,
			get session() {
				uses_credentials = true;
				return $session;
			},
			fetch: async (resource, opts = {}) => {
				let url;
				if (typeof resource === "string") {
					url = resource;
				} else {
					url = resource.url;
					opts = {
						method: resource.method,
						headers: resource.headers,
						body: resource.body,
						mode: resource.mode,
						credentials: resource.credentials,
						cache: resource.cache,
						redirect: resource.redirect,
						referrer: resource.referrer,
						integrity: resource.integrity,
						...opts,
					};
				}
				const resolved = resolve(request.path, url.split("?")[0]);
				let response;
				const filename = resolved
					.replace(options2.paths.assets, "")
					.slice(1);
				const filename_html = `${filename}/index.html`;
				const asset = options2.manifest.assets.find(
					(d) => d.file === filename || d.file === filename_html
				);
				if (asset) {
					response = options2.read
						? new Response(options2.read(asset.file), {
								headers: asset.type
									? { "content-type": asset.type }
									: {},
						  })
						: await fetch(
								`http://${page.host}/${asset.file}`,
								opts
						  );
				} else if (
					resolved.startsWith("/") &&
					!resolved.startsWith("//")
				) {
					const relative = resolved;
					const headers = {
						...opts.headers,
					};
					if (opts.credentials !== "omit") {
						uses_credentials = true;
						headers.cookie = request.headers.cookie;
						if (!headers.authorization) {
							headers.authorization =
								request.headers.authorization;
						}
					}
					if (opts.body && typeof opts.body !== "string") {
						throw new Error("Request body must be a string");
					}
					const search = url.includes("?")
						? url.slice(url.indexOf("?") + 1)
						: "";
					const rendered = await respond(
						{
							host: request.host,
							method: opts.method || "GET",
							headers,
							path: relative,
							rawBody:
								opts.body == null
									? null
									: new TextEncoder().encode(opts.body),
							query: new URLSearchParams(search),
						},
						options2,
						{
							fetched: url,
							initiator: route,
						}
					);
					if (rendered) {
						if (state.prerender) {
							state.prerender.dependencies.set(
								relative,
								rendered
							);
						}
						response = new Response(rendered.body, {
							status: rendered.status,
							headers: rendered.headers,
						});
					}
				} else {
					if (resolved.startsWith("//")) {
						throw new Error(
							`Cannot request protocol-relative URL (${url}) in server-side fetch`
						);
					}
					if (typeof request.host !== "undefined") {
						const { hostname: fetch_hostname } = new URL(url);
						const [server_hostname] = request.host.split(":");
						if (
							`.${fetch_hostname}`.endsWith(
								`.${server_hostname}`
							) &&
							opts.credentials !== "omit"
						) {
							uses_credentials = true;
							opts.headers = {
								...opts.headers,
								cookie: request.headers.cookie,
							};
						}
					}
					const external_request = new Request(url, opts);
					response = await options2.hooks.externalFetch.call(
						null,
						external_request
					);
				}
				if (response) {
					const proxy = new Proxy(response, {
						get(response2, key, receiver) {
							async function text() {
								const body = await response2.text();
								const headers = {};
								for (const [key2, value] of response2.headers) {
									if (
										key2 !== "etag" &&
										key2 !== "set-cookie"
									)
										headers[key2] = value;
								}
								if (
									!opts.body ||
									typeof opts.body === "string"
								) {
									fetched.push({
										url,
										body: opts.body,
										json: `{"status":${
											response2.status
										},"statusText":${s(
											response2.statusText
										)},"headers":${s(
											headers
										)},"body":${escape$1(body)}}`,
									});
								}
								return body;
							}
							if (key === "text") {
								return text;
							}
							if (key === "json") {
								return async () => {
									return JSON.parse(await text());
								};
							}
							return Reflect.get(response2, key, response2);
						},
					});
					return proxy;
				}
				return (
					response ||
					new Response("Not found", {
						status: 404,
					})
				);
			},
			context: { ...context },
		};
		if (is_error) {
			load_input.status = status;
			load_input.error = error2;
		}
		loaded = await module.load.call(null, load_input);
	} else {
		loaded = {};
	}
	if (!loaded && is_leaf && !is_error) return;
	if (!loaded) {
		throw new Error(
			`${node.entry} - load must return a value except for page fall through`
		);
	}
	return {
		node,
		loaded: normalize(loaded),
		context: loaded.context || context,
		fetched,
		uses_credentials,
	};
}
const escaped$2 = {
	"<": "\\u003C",
	">": "\\u003E",
	"/": "\\u002F",
	"\\": "\\\\",
	"\b": "\\b",
	"\f": "\\f",
	"\n": "\\n",
	"\r": "\\r",
	"	": "\\t",
	"\0": "\\0",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029",
};
function escape$1(str) {
	let result = '"';
	for (let i = 0; i < str.length; i += 1) {
		const char = str.charAt(i);
		const code = char.charCodeAt(0);
		if (char === '"') {
			result += '\\"';
		} else if (char in escaped$2) {
			result += escaped$2[char];
		} else if (code >= 55296 && code <= 57343) {
			const next = str.charCodeAt(i + 1);
			if (code <= 56319 && next >= 56320 && next <= 57343) {
				result += char + str[++i];
			} else {
				result += `\\u${code.toString(16).toUpperCase()}`;
			}
		} else {
			result += char;
		}
	}
	result += '"';
	return result;
}
const absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
	const base_match = absolute.exec(base2);
	const path_match = absolute.exec(path);
	if (!base_match) {
		throw new Error(`bad base path: "${base2}"`);
	}
	const baseparts = path_match
		? []
		: base2.slice(base_match[0].length).split("/");
	const pathparts = path_match
		? path.slice(path_match[0].length).split("/")
		: path.split("/");
	baseparts.pop();
	for (let i = 0; i < pathparts.length; i += 1) {
		const part = pathparts[i];
		if (part === ".") continue;
		else if (part === "..") baseparts.pop();
		else baseparts.push(part);
	}
	const prefix =
		(path_match && path_match[0]) || (base_match && base_match[0]) || "";
	return `${prefix}${baseparts.join("/")}`;
}
function coalesce_to_error(err) {
	return err instanceof Error ? err : new Error(JSON.stringify(err));
}
async function respond_with_error({
	request,
	options: options2,
	state,
	$session,
	status,
	error: error2,
}) {
	const default_layout = await options2.load_component(
		options2.manifest.layout
	);
	const default_error = await options2.load_component(
		options2.manifest.error
	);
	const page = {
		host: request.host,
		path: request.path,
		query: request.query,
		params: {},
	};
	const loaded = await load_node({
		request,
		options: options2,
		state,
		route: null,
		page,
		node: default_layout,
		$session,
		context: {},
		prerender_enabled: is_prerender_enabled(options2, default_error, state),
		is_leaf: false,
		is_error: false,
	});
	const branch = [
		loaded,
		await load_node({
			request,
			options: options2,
			state,
			route: null,
			page,
			node: default_error,
			$session,
			context: loaded ? loaded.context : {},
			prerender_enabled: is_prerender_enabled(
				options2,
				default_error,
				state
			),
			is_leaf: false,
			is_error: true,
			status,
			error: error2,
		}),
	];
	try {
		return await render_response({
			options: options2,
			$session,
			page_config: {
				hydrate: options2.hydrate,
				router: options2.router,
				ssr: options2.ssr,
			},
			status,
			error: error2,
			branch,
			page,
		});
	} catch (err) {
		const error3 = coalesce_to_error(err);
		options2.handle_error(error3, request);
		return {
			status: 500,
			headers: {},
			body: error3.stack,
		};
	}
}
function is_prerender_enabled(options2, node, state) {
	return (
		options2.prerender &&
		(!!node.module.prerender || (!!state.prerender && state.prerender.all))
	);
}
async function respond$1(opts) {
	const { request, options: options2, state, $session, route } = opts;
	let nodes;
	try {
		nodes = await Promise.all(
			route.a.map((id2) => (id2 ? options2.load_component(id2) : void 0))
		);
	} catch (err) {
		const error3 = coalesce_to_error(err);
		options2.handle_error(error3, request);
		return await respond_with_error({
			request,
			options: options2,
			state,
			$session,
			status: 500,
			error: error3,
		});
	}
	const leaf = nodes[nodes.length - 1].module;
	let page_config = get_page_config(leaf, options2);
	if (!leaf.prerender && state.prerender && !state.prerender.all) {
		return {
			status: 204,
			headers: {},
			body: "",
		};
	}
	let branch = [];
	let status = 200;
	let error2;
	ssr: if (page_config.ssr) {
		let context = {};
		for (let i = 0; i < nodes.length; i += 1) {
			const node = nodes[i];
			let loaded;
			if (node) {
				try {
					loaded = await load_node({
						...opts,
						node,
						context,
						prerender_enabled: is_prerender_enabled(
							options2,
							node,
							state
						),
						is_leaf: i === nodes.length - 1,
						is_error: false,
					});
					if (!loaded) return;
					if (loaded.loaded.redirect) {
						return {
							status: loaded.loaded.status,
							headers: {
								location: encodeURI(loaded.loaded.redirect),
							},
						};
					}
					if (loaded.loaded.error) {
						({ status, error: error2 } = loaded.loaded);
					}
				} catch (err) {
					const e = coalesce_to_error(err);
					options2.handle_error(e, request);
					status = 500;
					error2 = e;
				}
				if (loaded && !error2) {
					branch.push(loaded);
				}
				if (error2) {
					while (i--) {
						if (route.b[i]) {
							const error_node = await options2.load_component(
								route.b[i]
							);
							let node_loaded;
							let j = i;
							while (!(node_loaded = branch[j])) {
								j -= 1;
							}
							try {
								const error_loaded = await load_node({
									...opts,
									node: error_node,
									context: node_loaded.context,
									prerender_enabled: is_prerender_enabled(
										options2,
										error_node,
										state
									),
									is_leaf: false,
									is_error: true,
									status,
									error: error2,
								});
								if (error_loaded.loaded.error) {
									continue;
								}
								page_config = get_page_config(
									error_node.module,
									options2
								);
								branch = branch
									.slice(0, j + 1)
									.concat(error_loaded);
								break ssr;
							} catch (err) {
								const e = coalesce_to_error(err);
								options2.handle_error(e, request);
								continue;
							}
						}
					}
					return await respond_with_error({
						request,
						options: options2,
						state,
						$session,
						status,
						error: error2,
					});
				}
			}
			if (loaded && loaded.loaded.context) {
				context = {
					...context,
					...loaded.loaded.context,
				};
			}
		}
	}
	try {
		return await render_response({
			...opts,
			page_config,
			status,
			error: error2,
			branch: branch.filter(Boolean),
		});
	} catch (err) {
		const error3 = coalesce_to_error(err);
		options2.handle_error(error3, request);
		return await respond_with_error({
			...opts,
			status: 500,
			error: error3,
		});
	}
}
function get_page_config(leaf, options2) {
	return {
		ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
		router: "router" in leaf ? !!leaf.router : options2.router,
		hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate,
	};
}
async function render_page(request, route, match, options2, state) {
	if (state.initiator === route) {
		return {
			status: 404,
			headers: {},
			body: `Not found: ${request.path}`,
		};
	}
	const params = route.params(match);
	const page = {
		host: request.host,
		path: request.path,
		query: request.query,
		params,
	};
	const $session = await options2.hooks.getSession(request);
	const response = await respond$1({
		request,
		options: options2,
		state,
		$session,
		route,
		page,
	});
	if (response) {
		return response;
	}
	if (state.fetched) {
		return {
			status: 500,
			headers: {},
			body: `Bad request in load function: failed to fetch ${state.fetched}`,
		};
	}
}
function read_only_form_data() {
	const map = new Map();
	return {
		append(key, value) {
			if (map.has(key)) {
				(map.get(key) || []).push(value);
			} else {
				map.set(key, [value]);
			}
		},
		data: new ReadOnlyFormData(map),
	};
}
class ReadOnlyFormData {
	constructor(map) {
		__privateAdd(this, _map, void 0);
		__privateSet(this, _map, map);
	}
	get(key) {
		const value = __privateGet(this, _map).get(key);
		return value && value[0];
	}
	getAll(key) {
		return __privateGet(this, _map).get(key);
	}
	has(key) {
		return __privateGet(this, _map).has(key);
	}
	*[Symbol.iterator]() {
		for (const [key, value] of __privateGet(this, _map)) {
			for (let i = 0; i < value.length; i += 1) {
				yield [key, value[i]];
			}
		}
	}
	*entries() {
		for (const [key, value] of __privateGet(this, _map)) {
			for (let i = 0; i < value.length; i += 1) {
				yield [key, value[i]];
			}
		}
	}
	*keys() {
		for (const [key] of __privateGet(this, _map)) yield key;
	}
	*values() {
		for (const [, value] of __privateGet(this, _map)) {
			for (let i = 0; i < value.length; i += 1) {
				yield value[i];
			}
		}
	}
}
_map = new WeakMap();
function parse_body(raw, headers) {
	if (!raw) return raw;
	const content_type = headers["content-type"];
	const [type, ...directives] = content_type
		? content_type.split(/;\s*/)
		: [];
	const text = () =>
		new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
	switch (type) {
		case "text/plain":
			return text();
		case "application/json":
			return JSON.parse(text());
		case "application/x-www-form-urlencoded":
			return get_urlencoded(text());
		case "multipart/form-data": {
			const boundary = directives.find((directive) =>
				directive.startsWith("boundary=")
			);
			if (!boundary) throw new Error("Missing boundary");
			return get_multipart(text(), boundary.slice("boundary=".length));
		}
		default:
			return raw;
	}
}
function get_urlencoded(text) {
	const { data, append } = read_only_form_data();
	text.replace(/\+/g, " ")
		.split("&")
		.forEach((str) => {
			const [key, value] = str.split("=");
			append(decodeURIComponent(key), decodeURIComponent(value));
		});
	return data;
}
function get_multipart(text, boundary) {
	const parts = text.split(`--${boundary}`);
	if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
		throw new Error("Malformed form data");
	}
	const { data, append } = read_only_form_data();
	parts.slice(1, -1).forEach((part) => {
		const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
		if (!match) {
			throw new Error("Malformed form data");
		}
		const raw_headers = match[1];
		const body = match[2].trim();
		let key;
		const headers = {};
		raw_headers.split("\r\n").forEach((str) => {
			const [raw_header, ...raw_directives] = str.split("; ");
			let [name, value] = raw_header.split(": ");
			name = name.toLowerCase();
			headers[name] = value;
			const directives = {};
			raw_directives.forEach((raw_directive) => {
				const [name2, value2] = raw_directive.split("=");
				directives[name2] = JSON.parse(value2);
			});
			if (name === "content-disposition") {
				if (value !== "form-data")
					throw new Error("Malformed form data");
				if (directives.filename) {
					throw new Error("File upload is not yet implemented");
				}
				if (directives.name) {
					key = directives.name;
				}
			}
		});
		if (!key) throw new Error("Malformed form data");
		append(key, body);
	});
	return data;
}
async function respond(incoming, options2, state = {}) {
	if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
		const has_trailing_slash = incoming.path.endsWith("/");
		if (
			(has_trailing_slash && options2.trailing_slash === "never") ||
			(!has_trailing_slash &&
				options2.trailing_slash === "always" &&
				!(incoming.path.split("/").pop() || "").includes("."))
		) {
			const path = has_trailing_slash
				? incoming.path.slice(0, -1)
				: incoming.path + "/";
			const q = incoming.query.toString();
			return {
				status: 301,
				headers: {
					location: options2.paths.base + path + (q ? `?${q}` : ""),
				},
			};
		}
	}
	const headers = lowercase_keys(incoming.headers);
	const request = {
		...incoming,
		headers,
		body: parse_body(incoming.rawBody, headers),
		params: {},
		locals: {},
	};
	try {
		return await options2.hooks.handle({
			request,
			resolve: async (request2) => {
				if (state.prerender && state.prerender.fallback) {
					return await render_response({
						options: options2,
						$session: await options2.hooks.getSession(request2),
						page_config: {
							ssr: false,
							router: true,
							hydrate: true,
						},
						status: 200,
						branch: [],
					});
				}
				for (const route of options2.manifest.routes) {
					const match = route.pattern.exec(request2.path);
					if (!match) continue;
					const response =
						route.type === "endpoint"
							? await render_endpoint(request2, route, match)
							: await render_page(
									request2,
									route,
									match,
									options2,
									state
							  );
					if (response) {
						if (response.status === 200) {
							const cache_control = get_single_valued_header(
								response.headers,
								"cache-control"
							);
							if (
								!cache_control ||
								!/(no-store|immutable)/.test(cache_control)
							) {
								const etag = `"${hash(response.body || "")}"`;
								if (
									request2.headers["if-none-match"] === etag
								) {
									return {
										status: 304,
										headers: {},
										body: "",
									};
								}
								response.headers["etag"] = etag;
							}
						}
						return response;
					}
				}
				const $session = await options2.hooks.getSession(request2);
				return await respond_with_error({
					request: request2,
					options: options2,
					state,
					$session,
					status: 404,
					error: new Error(`Not found: ${request2.path}`),
				});
			},
		});
	} catch (err) {
		const e = coalesce_to_error(err);
		options2.handle_error(e, request);
		return {
			status: 500,
			headers: {},
			body: options2.dev ? e.stack : e.message,
		};
	}
}
function noop() {}
function run(fn) {
	return fn();
}
function blank_object() {
	return Object.create(null);
}
function run_all(fns) {
	fns.forEach(run);
}
function is_function(thing) {
	return typeof thing === "function";
}
function safe_not_equal(a, b) {
	return a != a
		? b == b
		: a !== b || (a && typeof a === "object") || typeof a === "function";
}
function subscribe(store, ...callbacks) {
	if (store == null) {
		return noop;
	}
	const unsub = store.subscribe(...callbacks);
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
	return value == null ? "" : value;
}
let current_component;
function set_current_component(component) {
	current_component = component;
}
function get_current_component() {
	if (!current_component)
		throw new Error("Function called outside component initialization");
	return current_component;
}
function setContext(key, context) {
	get_current_component().$$.context.set(key, context);
}
function getContext(key) {
	return get_current_component().$$.context.get(key);
}
Promise.resolve();
const escaped = {
	'"': "&quot;",
	"'": "&#39;",
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
};
function escape(html) {
	return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
	let str = "";
	for (let i = 0; i < items.length; i += 1) {
		str += fn(items[i], i);
	}
	return str;
}
const missing_component = {
	$$render: () => "",
};
function validate_component(component, name) {
	if (!component || !component.$$render) {
		if (name === "svelte:component") name += " this={...}";
		throw new Error(
			`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`
		);
	}
	return component;
}
let on_destroy;
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = current_component;
		const $$ = {
			on_destroy,
			context: new Map(
				parent_component ? parent_component.$$.context : context || []
			),
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: blank_object(),
		};
		set_current_component({ $$ });
		const html = fn(result, props, bindings, slots);
		set_current_component(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: "", head: "", css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			run_all(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css2) => css2.code)
						.join("\n"),
					map: null,
				},
				head: result.title + result.head,
			};
		},
		$$render,
	};
}
function afterUpdate() {}
var root_svelte_svelte_type_style_lang =
	"/* purgecss start ignore */\n\n#svelte-announcer.svelte-1j55zn5{\n  position:absolute;\n  left:0;\n  top:0;\n  clip:rect(0 0 0 0);\n  -webkit-clip-path:inset(50%);\n          clip-path:inset(50%);\n  overflow:hidden;\n  white-space:nowrap;\n  width:1px;\n  height:1px\n}\n\n/* purgecss end ignore */";
const css$3 = {
	code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
	map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`,
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { page } = $$props;
	let { components } = $$props;
	let { props_0 = null } = $$props;
	let { props_1 = null } = $$props;
	let { props_2 = null } = $$props;
	setContext("__svelte__", stores);
	afterUpdate(stores.page.notify);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
		$$bindings.stores(stores);
	if ($$props.page === void 0 && $$bindings.page && page !== void 0)
		$$bindings.page(page);
	if (
		$$props.components === void 0 &&
		$$bindings.components &&
		components !== void 0
	)
		$$bindings.components(components);
	if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
		$$bindings.props_0(props_0);
	if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
		$$bindings.props_1(props_1);
	if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
		$$bindings.props_2(props_2);
	$$result.css.add(css$3);
	{
		stores.page.set(page);
	}
	return `


${validate_component(
	components[0] || missing_component,
	"svelte:component"
).$$render(
	$$result,
	Object.assign(props_0 || {}),
	{},
	{
		default: () =>
			`${
				components[1]
					? `${validate_component(
							components[1] || missing_component,
							"svelte:component"
					  ).$$render(
							$$result,
							Object.assign(props_1 || {}),
							{},
							{
								default: () =>
									`${
										components[2]
											? `${validate_component(
													components[2] ||
														missing_component,
													"svelte:component"
											  ).$$render(
													$$result,
													Object.assign(
														props_2 || {}
													),
													{},
													{}
											  )}`
											: ``
									}`,
							}
					  )}`
					: ``
			}`,
	}
)}

${``}`;
});
let base = "";
let assets = "";
function set_paths(paths) {
	base = paths.base;
	assets = paths.assets || base;
}
function set_prerendering(value) {}
const handle = async ({ request, resolve: resolve2 }) => {
	const cookies = cookie.parse(request.headers.cookie || "");
	request.locals.userid = cookies.userid || v4();
	if (request.query.has("_method")) {
		request.method = request.query.get("_method").toUpperCase();
	}
	const response = await resolve2(request);
	if (!cookies.userid) {
		response.headers[
			"set-cookie"
		] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}
	return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: "Module",
	handle,
});
const template = ({ head, body }) =>
	'<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="/favicon.png" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n\n    ' +
	head +
	'\n  </head>\n  <body>\n    <div id="svelte">' +
	body +
	"</div>\n  </body>\n</html>\n";
let options = null;
const default_settings = { paths: { base: "", assets: "" } };
function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);
	const hooks = get_hooks(user_hooks);
	options = {
		amp: false,
		dev: false,
		entry: {
			file: assets + "/_app/start-6abf3a98.js",
			css: [assets + "/_app/assets/start-d5b4de3e.css"],
			js: [
				assets + "/_app/start-6abf3a98.js",
				assets + "/_app/chunks/vendor-4ee6881a.js",
			],
		},
		fetched: void 0,
		floc: false,
		get_component_path: (id2) => assets + "/_app/" + entry_lookup[id2],
		get_stack: (error2) => String(error2),
		handle_error: (error2, request) => {
			hooks.handleError({ error: error2, request });
			error2.stack = options.get_stack(error2);
		},
		hooks,
		hydrate: true,
		initiator: void 0,
		load_component,
		manifest,
		paths: settings.paths,
		prerender: true,
		read: settings.read,
		root: Root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never",
	};
}
const empty = () => ({});
const manifest = {
	assets: [
		{ file: "logo/logo.png", size: 24641, type: "image/png" },
		{ file: "logo/logo.svg", size: 5425, type: "image/svg+xml" },
		{ file: "robots.txt", size: 67, type: "text/plain" },
	],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
			type: "page",
			pattern: /^\/$/,
			params: empty,
			a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
			b: [".svelte-kit/build/components/error.svelte"],
		},
	],
};
const get_hooks = (hooks) => ({
	getSession: hooks.getSession || (() => ({})),
	handle:
		hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
	handleError:
		hooks.handleError ||
		(({ error: error2 }) => console.error(error2.stack)),
	externalFetch: hooks.externalFetch || fetch,
});
const module_lookup = {
	"src/routes/__layout.svelte": () =>
		Promise.resolve().then(function () {
			return __layout;
		}),
	".svelte-kit/build/components/error.svelte": () =>
		Promise.resolve().then(function () {
			return error;
		}),
	"src/routes/index.svelte": () =>
		Promise.resolve().then(function () {
			return index;
		}),
};
const metadata_lookup = {
	"src/routes/__layout.svelte": {
		entry: "pages/__layout.svelte-44e0ab67.js",
		css: ["assets/pages/__layout.svelte-d93fe2c8.css"],
		js: [
			"pages/__layout.svelte-44e0ab67.js",
			"chunks/vendor-4ee6881a.js",
			"chunks/notifications-112ca568.js",
		],
		styles: [],
	},
	".svelte-kit/build/components/error.svelte": {
		entry: "error.svelte-bc06253e.js",
		css: [],
		js: ["error.svelte-bc06253e.js", "chunks/vendor-4ee6881a.js"],
		styles: [],
	},
	"src/routes/index.svelte": {
		entry: "pages/index.svelte-53213092.js",
		css: ["assets/pages/index.svelte-a17562fa.css"],
		js: [
			"pages/index.svelte-53213092.js",
			"chunks/vendor-4ee6881a.js",
			"chunks/notifications-112ca568.js",
		],
		styles: [],
	},
};
async function load_component(file) {
	const { entry, css: css2, js, styles } = metadata_lookup[file];
	return {
		module: await module_lookup[file](),
		entry: assets + "/_app/" + entry,
		css: css2.map((dep) => assets + "/_app/" + dep),
		js: js.map((dep) => assets + "/_app/" + dep),
		styles,
	};
}
function render(request, { prerender: prerender2 } = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender: prerender2 });
}
const subscriber_queue = [];
function readable(value, start) {
	return {
		subscribe: writable(value, start).subscribe,
	};
}
function writable(value, start = noop) {
	let stop;
	const subscribers = new Set();
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}
	function update(fn) {
		set(fn(value));
	}
	function subscribe2(run2, invalidate = noop) {
		const subscriber = [run2, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set) || noop;
		}
		run2(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
	const single = !Array.isArray(stores);
	const stores_array = single ? [stores] : stores;
	const auto = fn.length < 2;
	return readable(initial_value, (set) => {
		let inited = false;
		const values = [];
		let pending = 0;
		let cleanup = noop;
		const sync = () => {
			if (pending) {
				return;
			}
			cleanup();
			const result = fn(single ? values[0] : values, set);
			if (auto) {
				set(result);
			} else {
				cleanup = is_function(result) ? result : noop;
			}
		};
		const unsubscribers = stores_array.map((store, i) =>
			subscribe(
				store,
				(value) => {
					values[i] = value;
					pending &= ~(1 << i);
					if (inited) {
						sync();
					}
				},
				() => {
					pending |= 1 << i;
				}
			)
		);
		inited = true;
		sync();
		return function stop() {
			run_all(unsubscribers);
			cleanup();
		};
	});
}
function createNotificationStore(timeout) {
	const _notifications = writable([]);
	function send(message, type = "default", timeout2) {
		_notifications.update((state) => {
			return [...state, { id: id(), type, message, timeout: timeout2 }];
		});
	}
	const notifications2 = derived(_notifications, ($_notifications, set) => {
		set($_notifications);
		if ($_notifications.length > 0) {
			const timer = setTimeout(() => {
				_notifications.update((state) => {
					state.shift();
					return state;
				});
			}, $_notifications[0].timeout);
			return () => {
				clearTimeout(timer);
			};
		}
	});
	const { subscribe: subscribe2 } = notifications2;
	return {
		subscribe: subscribe2,
		send,
		default: (msg, timeout2) => send(msg, "default", timeout2),
		danger: (msg, timeout2) => send(msg, "danger", timeout2),
		warning: (msg, timeout2) => send(msg, "warning", timeout2),
		info: (msg, timeout2) => send(msg, "info", timeout2),
		success: (msg, timeout2) => send(msg, "success", timeout2),
	};
}
function id() {
	return "_" + Math.random().toString(36).substr(2, 9);
}
const notifications = createNotificationStore();
var Toast_svelte_svelte_type_style_lang =
	"/* purgecss start ignore */\n\n.notifications.svelte-ve4vvv{\n  position:fixed;\n  top:10px;\n  left:0;\n  right:0;\n  margin:0 auto;\n  padding:0;\n  border-radius:10px;\n  z-index:9999;\n  display:flex;\n  flex-direction:column;\n  justify-content:flex-start;\n  align-items:center;\n  pointer-events:none\n}\n\n.toast.svelte-ve4vvv{\n  flex:0 0 auto;\n  margin-bottom:10px;\n  border-radius:10px\n}\n\n.content.svelte-ve4vvv{\n  padding:10px;\n  display:block;\n  color:white;\n  font-weight:500\n}\n\n/* purgecss end ignore */";
const css$2 = {
	code: ".notifications.svelte-ve4vvv{position:fixed;top:10px;left:0;right:0;margin:0 auto;padding:0;border-radius:10px;z-index:9999;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;pointer-events:none}.toast.svelte-ve4vvv{flex:0 0 auto;margin-bottom:10px;border-radius:10px}.content.svelte-ve4vvv{padding:10px;display:block;color:white;font-weight:500}",
	map: '{"version":3,"file":"Toast.svelte","sources":["Toast.svelte"],"sourcesContent":["<style>\\n.notifications {\\n  position: fixed;\\n  top: 10px;\\n  left: 0;\\n  right: 0;\\n  margin: 0 auto;\\n  padding: 0;\\n  border-radius: 10px;\\n  z-index: 9999;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: flex-start;\\n  align-items: center;\\n  pointer-events: none;\\n}\\n\\n.toast {\\n  flex: 0 0 auto;\\n  margin-bottom: 10px;\\n  border-radius: 10px;\\n}\\n\\n.content {\\n  padding: 10px;\\n  display: block;\\n  color: white;\\n  font-weight: 500;\\n}\\n</style>\\n\\n<!-- This code rightfully belongs to https://svelte.dev/repl/2254c3b9b9ba4eeda05d81d2816f6276?version=3.32.2 -->\\n<script>\\n// @ts-nocheck\\n\\nimport { flip } from \\"svelte/animate\\";\\nimport { fly } from \\"svelte/transition\\";\\nimport { notifications } from \\"./notifications\\";\\n\\nexport let themes = {\\n  danger: \\"#E26D69\\",\\n  success: \\"#84C991\\",\\n  warning: \\"#f0ad4e\\",\\n  info: \\"#5bc0de\\",\\n  default: \\"#aaaaaa\\",\\n};\\n</script>\\n\\n<div class=\\"notifications\\">\\n  {#each $notifications as notification (notification.id)}\\n    <div\\n      animate:flip\\n      class=\\"toast\\"\\n      style=\\"background: {themes[notification.type]};\\"\\n      transition:fly=\\"{{ y: 30 }}\\">\\n      <div class=\\"content\\">{notification.message}</div>\\n      {#if notification.icon}<i class=\\"{notification.icon}\\"></i>{/if}\\n    </div>\\n  {/each}\\n</div>\\n"],"names":[],"mappings":"AACA,cAAc,cAAC,CAAC,AACd,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,CAAC,CACV,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,UAAU,CAC3B,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,MAAM,cAAC,CAAC,AACN,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CACd,aAAa,CAAE,IAAI,CACnB,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,QAAQ,cAAC,CAAC,AACR,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,AAClB,CAAC"}',
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $notifications, $$unsubscribe_notifications;
	$$unsubscribe_notifications = subscribe(
		notifications,
		(value) => ($notifications = value)
	);
	let {
		themes = {
			danger: "#E26D69",
			success: "#84C991",
			warning: "#f0ad4e",
			info: "#5bc0de",
			default: "#aaaaaa",
		},
	} = $$props;
	if ($$props.themes === void 0 && $$bindings.themes && themes !== void 0)
		$$bindings.themes(themes);
	$$result.css.add(css$2);
	$$unsubscribe_notifications();
	return `


<div class="${"notifications svelte-ve4vvv"}">${each(
		$notifications,
		(notification) => `<div class="${"toast svelte-ve4vvv"}" style="${
			"background: " + escape(themes[notification.type]) + ";"
		}"><div class="${"content svelte-ve4vvv"}">${escape(
			notification.message
		)}</div>
      ${
			notification.icon
				? `<i class="${
						escape(null_to_empty(notification.icon)) +
						" svelte-ve4vvv"
				  }"></i>`
				: ``
		}
    </div>`
	)}</div>`;
});
var fonts =
	'/* purgecss start ignore */\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUOjIg1_i6t8kCHKm459WxZqh7p29NNpQ.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUOjIg1_i6t8kCHKm459WxZqh7g29NNpQ.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUOjIg1_i6t8kCHKm459WxZqh7r29NNpQ.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUOjIg1_i6t8kCHKm459WxZqh7q29NNpQ.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUOjIg1_i6t8kCHKm459WxZqh7k29M.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZBg_z8fZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZBg_z-PZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZBg_z8_ZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZBg_z8vZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZBg_z_PZw.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZYgzz8fZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZYgzz-PZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZYgzz8_ZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZYgzz8vZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZYgzz_PZw.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm459WxRxC7mw9c.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm459WxRzS7mw9c.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm459WxRxi7mw9c.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm459WxRxy7mw9c.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm459WxRyS7m.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZOg3z8fZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZOg3z-PZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZOg3z8_ZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZOg3z8vZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZOg3z_PZw.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZFgrz8fZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZFgrz-PZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZFgrz8_ZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZFgrz8vZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZFgrz_PZw.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZcgvz8fZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZcgvz-PZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZcgvz8_ZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZcgvz8vZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZcgvz_PZw.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZbgjz8fZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZbgjz-PZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZbgjz8_ZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZbgjz8vZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZbgjz_PZw.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZSgnz8fZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZSgnz-PZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZSgnz8_ZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZSgnz8vZwnCo.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: italic;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUPjIg1_i6t8kCHKm459WxZSgnz_PZw.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm45_QpRxC7mw9c.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm45_QpRzS7mw9c.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm45_QpRxi7mw9c.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm45_QpRxy7mw9c.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 100;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUQjIg1_i6t8kCHKm45_QpRyS7m.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_aZA3gTD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_aZA3g3D_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_aZA3gbD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_aZA3gfD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 200;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_aZA3gnD_g.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_cJD3gTD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_cJD3g3D_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_cJD3gbD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_cJD3gfD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 300;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_cJD3gnD_g.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 400;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_ZpC3gTD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_ZpC3g3D_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_ZpC3gbD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_ZpC3gfD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 500;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_ZpC3gnD_g.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_bZF3gTD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_bZF3g3D_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_bZF3gbD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_bZF3gfD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 600;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_bZF3gnD_g.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_dJE3gTD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_dJE3g3D_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_dJE3gbD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_dJE3gfD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 700;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_c5H3gTD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_c5H3g3D_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_c5H3gbD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_c5H3gfD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 800;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_c5H3gnD_g.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_epG3gTD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,\n    U+FE2E-FE2F;\n}\n\n/* cyrillic */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_epG3g3D_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n/* vietnamese */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_epG3gbD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,\n    U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_epG3gfD_u50.woff2)\n    format("woff2");\n\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,\n    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: "Montserrat";\n\n  font-style: normal;\n\n  font-weight: 900;\n\n  font-display: swap;\n\n  src: url(https://fonts.gstatic.com/s/montserrat/v18/JTURjIg1_i6t8kCHKm45_epG3gnD_g.woff2)\n    format("woff2");\n\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n/* purgecss end ignore */\n';
var __layout_svelte_svelte_type_style_lang =
	"/*! tailwindcss v2.2.15 | MIT License | https://tailwindcss.com */\n\n/*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */\n\n/*\nDocument\n========\n*/\n\n/**\nUse a better box model (opinionated).\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box;\n}\n\n/**\nUse a more readable tab size (opinionated).\n*/\n\nhtml {\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n     tab-size: 4;\n}\n\n/**\n1. Correct the line height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n*/\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/*\nSections\n========\n*/\n\n/**\nRemove the margin in all browsers.\n*/\n\nbody {\n  margin: 0;\n}\n\n/**\nImprove consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n*/\n\nbody {\n  font-family:\n		system-ui,\n		-apple-system, /* Firefox supports this but not yet `system-ui` */\n		'Segoe UI',\n		Roboto,\n		Helvetica,\n		Arial,\n		sans-serif,\n		'Apple Color Emoji',\n		'Segoe UI Emoji';\n}\n\n/*\nGrouping content\n================\n*/\n\n/**\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n}\n\n/*\nText-level semantics\n====================\n*/\n\n/**\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr[title] {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/**\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n2. Correct the odd 'em' font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family:\n		ui-monospace,\n		SFMono-Regular,\n		Consolas,\n		'Liberation Mono',\n		Menlo,\n		monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/**\nPrevent 'sub' and 'sup' elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\nTabular data\n============\n*/\n\n/**\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n}\n\n/*\nForms\n=====\n*/\n\n/**\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\nRemove the inheritance of text transform in Edge and Firefox.\n1. Remove the inheritance of text transform in Firefox.\n*/\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\nCorrect the inability to style clickable types in iOS and Safari.\n*/\n\nbutton,\n[type='button'] {\n  -webkit-appearance: button;\n}\n\n/**\nRemove the inner border and padding in Firefox.\n*/\n\n/**\nRestore the focus styles unset by the previous rule.\n*/\n\n/**\nRemove the additional ':invalid' styles in Firefox.\nSee: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737\n*/\n\n/**\nRemove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.\n*/\n\nlegend {\n  padding: 0;\n}\n\n/**\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n/**\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n/**\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n/**\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to 'inherit' in Safari.\n*/\n\n/*\nInteractive\n===========\n*/\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/**\n * Manually forked from SUIT CSS Base: https://github.com/suitcss/base\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications.\n */\n\n/**\n * Removes the default spacing and border for appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background-color: transparent;\n  background-image: none;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nol,\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * Tailwind custom reset styles\n */\n\n/**\n * 1. Use the user's configured `sans` font-family (with Tailwind's default\n *    sans-serif font stack as a fallback) as a sane default.\n * 2. Use Tailwind's default \"normal\" line-height so the user isn't forced\n *    to override it to ensure consistency even when using the default theme.\n */\n\nhtml {\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 1 */\n  line-height: 1.5; /* 2 */\n}\n\n/**\n * Inherit font-family and line-height from `html` so users can set them as\n * a class directly on the `html` element.\n */\n\nbody {\n  font-family: inherit;\n  line-height: inherit;\n}\n\n/**\n * 1. Prevent padding and border from affecting element width.\n *\n *    We used to set this in the html element and inherit from\n *    the parent element for everything else. This caused issues\n *    in shadow-dom-enhanced elements like <details> where the content\n *    is wrapped by a div with box-sizing set to `content-box`.\n *\n *    https://github.com/mozdevs/cssremedy/issues/4\n *\n *\n * 2. Allow adding a border to an element by just adding a border-width.\n *\n *    By default, the way the browser specifies that an element should have no\n *    border is by setting it's border-style to `none` in the user-agent\n *    stylesheet.\n *\n *    In order to easily add borders to elements by just setting the `border-width`\n *    property, we change the default border-style for all elements to `solid`, and\n *    use border-width to hide them instead. This way our `border` utilities only\n *    need to set the `border-width` property instead of the entire `border`\n *    shorthand, making our border utilities much more straightforward to compose.\n *\n *    https://github.com/tailwindcss/tailwindcss/pull/116\n */\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: currentColor; /* 2 */\n}\n\n/*\n * Ensure horizontal rules are visible by default\n */\n\nhr {\n  border-top-width: 1px;\n}\n\n/**\n * Undo the `border-style: none` reset that Normalize applies to images so that\n * our `border-{width}` utilities have the expected effect.\n *\n * The Normalize reset is unnecessary for us since we default the border-width\n * to 0 on all elements.\n *\n * https://github.com/tailwindcss/tailwindcss/issues/362\n */\n\nimg {\n  border-style: solid;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\n\nbutton {\n  cursor: pointer;\n}\n\n/**\n * Override legacy focus reset from Normalize with modern Firefox focus styles.\n *\n * This is actually an improvement over the new defaults in Firefox in our testing,\n * as it triggers the better focus styles even for links, which still use a dotted\n * outline in Firefox by default.\n */\n\ntable {\n  border-collapse: collapse;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/**\n * Reset links to optimize for opt-in styling instead of\n * opt-out.\n */\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/**\n * Reset form element properties that are easy to forget to\n * style explicitly so you don't inadvertently introduce\n * styles that deviate from your design system. These styles\n * supplement a partial reset that is already applied by\n * normalize.css.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n}\n\n/**\n * Use the configured 'mono' font family for elements that\n * are expected to be rendered with a monospace font, falling\n * back to the system monospace stack if there is no configured\n * 'mono' font family.\n */\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n/**\n * 1. Make replaced elements `display: block` by default as that's\n *    the behavior you want almost all of the time. Inspired by\n *    CSS Remedy, with `svg` added as well.\n *\n *    https://github.com/mozdevs/cssremedy/issues/14\n * \n * 2. Add `vertical-align: middle` to align replaced elements more\n *    sensibly by default when overriding `display` by adding a\n *    utility like `inline`.\n *\n *    This can trigger a poorly considered linting error in some\n *    tools but is included by design.\n * \n *    https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210\n */\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/**\n * Constrain images and videos to the parent width and preserve\n * their intrinsic aspect ratio.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/**\n * Ensure the default browser behavior of the `hidden` attribute.\n */\n\n*, ::before, ::after {\n  --tw-border-opacity: 1;\n  border-color: rgba(229, 231, 235, var(--tw-border-opacity));\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.top-0 {\n  top: 0px;\n}\n\n.mt-9 {\n  margin-top: 2.25rem;\n}\n\n.flex {\n  display: flex;\n}\n\n.table {\n  display: table;\n}\n\n.h-2 {\n  height: 0.5rem;\n}\n\n.h-screen {\n  height: 100vh;\n}\n\n.w-72 {\n  width: 18rem;\n}\n\n.w-screen {\n  width: 100vw;\n}\n\n.transform {\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n@-webkit-keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes ping {\n  75%, 100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n\n@keyframes ping {\n  75%, 100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes pulse {\n  50% {\n    opacity: .5;\n  }\n}\n\n@keyframes pulse {\n  50% {\n    opacity: .5;\n  }\n}\n\n@-webkit-keyframes bounce {\n  0%, 100% {\n    transform: translateY(-25%);\n    -webkit-animation-timing-function: cubic-bezier(0.8,0,1,1);\n            animation-timing-function: cubic-bezier(0.8,0,1,1);\n  }\n\n  50% {\n    transform: none;\n    -webkit-animation-timing-function: cubic-bezier(0,0,0.2,1);\n            animation-timing-function: cubic-bezier(0,0,0.2,1);\n  }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: translateY(-25%);\n    -webkit-animation-timing-function: cubic-bezier(0.8,0,1,1);\n            animation-timing-function: cubic-bezier(0.8,0,1,1);\n  }\n\n  50% {\n    transform: none;\n    -webkit-animation-timing-function: cubic-bezier(0,0,0.2,1);\n            animation-timing-function: cubic-bezier(0,0,0.2,1);\n  }\n}\n\n.select-none {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.bg-transparent {\n  background-color: transparent;\n}\n\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\n}\n\n@media (prefers-color-scheme: dark) {\n  .dark\\:bg-acrylic-70 {\n    --tw-bg-opacity: 1;\n    background-color: rgba(34, 35, 42, var(--tw-bg-opacity));\n  }\n}\n\n.font-montserrat {\n  font-family: Montserrat, sans-serif;\n}\n\n.text-3xl {\n  font-size: 1.875rem;\n  line-height: 2.25rem;\n}\n\n.font-extrabold {\n  font-weight: 800;\n}\n\n.text-black {\n  --tw-text-opacity: 1;\n  color: rgba(0, 0, 0, var(--tw-text-opacity));\n}\n\n@media (prefers-color-scheme: dark) {\n  .dark\\:text-white {\n    --tw-text-opacity: 1;\n    color: rgba(255, 255, 255, var(--tw-text-opacity));\n  }\n}\n\n*, ::before, ::after {\n  --tw-shadow: 0 0 #0000;\n}\n\n*, ::before, ::after {\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgba(59, 130, 246, 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n}\n\n.ease-out {\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n@media (min-width: 640px) {\n}\n\n@media (min-width: 768px) {\n}\n\n@media (min-width: 1024px) {\n}\n\n@media (min-width: 1280px) {\n}\n\n@media (min-width: 1536px) {\n}";
const css$1 = {
	code: "@tailwind base;@tailwind components;@tailwind utilities;",
	map: '{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<style>\\n@tailwind base;\\n@tailwind components;\\n@tailwind utilities;\\n</style>\\n\\n<script lang=\\"ts\\" context=\\"module\\">import \\"../fonts.css\\";\\nimport { setContext } from \\"svelte\\";\\nimport { writable } from \\"svelte/store\\";\\nimport Toast from \\"../components/Toast.svelte\\";\\n</script>\\n\\n<script lang=\\"ts\\">const user = null;\\nconst AuthStore = writable(user);\\nsetContext(\\"Auth\\", AuthStore);\\nconst loggedIn = writable(false);\\nsetContext(\\"LoggedIn\\", loggedIn);\\n</script>\\n\\n<Toast />\\n<slot />\\n"],"names":[],"mappings":"AACA,UAAU,IAAI,CAAC,AACf,UAAU,UAAU,CAAC,AACrB,UAAU,SAAS,CAAC"}',
};
const user = null;
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	const AuthStore = writable(user);
	setContext("Auth", AuthStore);
	const loggedIn = writable(false);
	setContext("LoggedIn", loggedIn);
	$$result.css.add(css$1);
	return `${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: "Module",
	default: _layout,
});
function load({ error: error2, status }) {
	return { props: { error: error2, status } };
}
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { status } = $$props;
	let { error: error2 } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0)
		$$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
		$$bindings.error(error2);
	return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: "Module",
	default: Error$1,
	load,
});
var Loading_svelte_svelte_type_style_lang =
	'/* purgecss start ignore */\n\n.shim-red.svelte-y3k1y4{\n  position:relative;\n  overflow:hidden;\n  background-color:rgba(17, 24, 39)\n}\n\n.shim-red.svelte-y3k1y4::after{\n  position:absolute;\n  top:0;\n  right:0;\n  bottom:0;\n  left:0;\n  transform:translateX(-100%);\n  background-image:linear-gradient(\n    90deg,\n    rgba(93, 107, 255, 1) 0,\n    rgba(93, 107, 255, 0.9) 50%,\n    rgba(93, 107, 255, 0.8) 100%\n  );\n  -webkit-animation:svelte-y3k1y4-shimmer 3s ease-out infinite;\n          animation:svelte-y3k1y4-shimmer 3s ease-out infinite;\n  content:""\n}\n\n@-webkit-keyframes svelte-y3k1y4-shimmer{\n  100%{\n    transform:translateX(0%);\n    opacity:0\n  }\n}\n\n@keyframes svelte-y3k1y4-shimmer{\n  100%{\n    transform:translateX(0%);\n    opacity:0\n  }\n}\n\n/* purgecss end ignore */';
const css = {
	code: '.shim-red.svelte-y3k1y4{position:relative;overflow:hidden;background-color:rgba(17, 24, 39)}.shim-red.svelte-y3k1y4::after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translateX(-100%);background-image:linear-gradient(\n    90deg,\n    rgba(93, 107, 255, 1) 0,\n    rgba(93, 107, 255, 0.9) 50%,\n    rgba(93, 107, 255, 0.8) 100%\n  );animation:svelte-y3k1y4-shimmer 3s ease-out infinite;content:""}@keyframes svelte-y3k1y4-shimmer{100%{transform:translateX(0%);opacity:0}}',
	map: '{"version":3,"file":"Loading.svelte","sources":["Loading.svelte"],"sourcesContent":["<style>\\n.footer {\\n  position: fixed;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  bottom: 0;\\n  width: 100%;\\n  color: white;\\n  text-align: center;\\n  margin: 20px;\\n}\\n.shim-red {\\n  position: relative;\\n  overflow: hidden;\\n  background-color: rgba(17, 24, 39);\\n}\\n.shim-red::after {\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n  transform: translateX(-100%);\\n  background-image: linear-gradient(\\n    90deg,\\n    rgba(93, 107, 255, 1) 0,\\n    rgba(93, 107, 255, 0.9) 50%,\\n    rgba(93, 107, 255, 0.8) 100%\\n  );\\n  animation: shimmer 3s ease-out infinite;\\n  content: \\"\\";\\n}\\n\\n@keyframes shimmer {\\n  100% {\\n    transform: translateX(0%);\\n    opacity: 0;\\n  }\\n}\\n</style>\\n\\n<svelte:head>\\n  <title>Hydralite | Loading</title>\\n  <link rel=\\"shortcut icon\\" href=\\"/logo/logo.svg\\" />\\n</svelte:head>\\n<div\\n  class=\\"bg-white h-screen w-screen dark:bg-acrylic-70 flex items-center justify-center absolute flex-col dark:text-white text-black select-none\\">\\n  <img\\n    src=\\"/logo/logo.svg\\"\\n    alt=\\"Hydralite logo\\"\\n    width=\\"8%\\"\\n    class=\\"motion-safe:animate-pulse\\" />\\n  <div class=\\"relative w-72 bg-transparent rounded mt-9\\">\\n    <div style=\\"width: 100%\\" class=\\"absolute top-0 h-2 rounded shim-red\\"></div>\\n  </div>\\n  <!-- <div class=\\"footer\\">\\n\\t\\t<h1 class=\\"text-3xl font-montserrat font-extrabold\\">HYDRALITE</h1>\\n\\t</div> -->\\n</div>\\n"],"names":[],"mappings":"AAYA,SAAS,cAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MAAM,CAChB,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,AACpC,CAAC,AACD,uBAAS,OAAO,AAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,gBAAgB,CAAE;IAChB,KAAK,CAAC;IACN,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IACxB,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC;IAC5B,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI;GAC7B,CACD,SAAS,CAAE,qBAAO,CAAC,EAAE,CAAC,QAAQ,CAAC,QAAQ,CACvC,OAAO,CAAE,EAAE,AACb,CAAC,AAED,WAAW,qBAAQ,CAAC,AAClB,IAAI,AAAC,CAAC,AACJ,SAAS,CAAE,WAAW,EAAE,CAAC,CACzB,OAAO,CAAE,CAAC,AACZ,CAAC,AACH,CAAC"}',
};
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css);
	return `${
		(($$result.head += `${
			(($$result.title = `<title>Hydralite | Loading</title>`), "")
		}<link rel="${"shortcut icon"}" href="${"/logo/logo.svg"}" data-svelte="svelte-xkm4t5">`),
		"")
	}
<div class="${"bg-white h-screen w-screen dark:bg-acrylic-70 flex items-center justify-center absolute flex-col dark:text-white text-black select-none"}"><img src="${"/logo/logo.svg"}" alt="${"Hydralite logo"}" width="${"8%"}" class="${"motion-safe:animate-pulse"}">
  <div class="${"relative w-72 bg-transparent rounded mt-9"}"><div style="${"width: 100%"}" class="${"absolute top-0 h-2 rounded shim-red svelte-y3k1y4"}"></div></div>
  </div>`;
});
const ProtectedRoute = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $loggedIn, $$unsubscribe_loggedIn;
		let $AuthStore, $$unsubscribe_AuthStore;
		const AuthStore = getContext("Auth");
		$$unsubscribe_AuthStore = subscribe(
			AuthStore,
			(value) => ($AuthStore = value)
		);
		const loggedIn = getContext("LoggedIn");
		$$unsubscribe_loggedIn = subscribe(
			loggedIn,
			(value) => ($loggedIn = value)
		);
		$$unsubscribe_loggedIn();
		$$unsubscribe_AuthStore();
		return `${
			$loggedIn == true
				? `${
						$AuthStore == null
							? `${validate_component(
									Loading,
									"Loading"
							  ).$$render($$result, {}, {}, {})}`
							: `<div>${
									slots.default ? slots.default({}) : ``
							  }</div>`
				  }`
				: `${validate_component(Loading, "Loading").$$render(
						$$result,
						{},
						{},
						{}
				  )}`
		}`;
	}
);
const prerender = true;
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $user, $$unsubscribe_user;
	const user2 = getContext("Auth");
	$$unsubscribe_user = subscribe(user2, (value) => ($user = value));
	$$unsubscribe_user();
	return `${validate_component(ProtectedRoute, "ProtectedRoute").$$render(
		$$result,
		{},
		{},
		{
			default:
				() => `<main class="${"w-screen h-screen"}"><h1 class="${"font-montserrat font-extrabold text-3xl text-black"}">H- <br>
      H- <br>
      H- <br>
      Hi ${escape($user.name)}</h1></main>`,
		}
	)}`;
});
var index = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: "Module",
	default: Routes,
	prerender,
});
export { init, render };
