const t = (t, e) => {
	new MutationObserver((t) => {
		t.forEach((t) => {
			const s = 'attributes' === t.type,
				r = !t.target.classList.contains('typing');
			s && r && e();
		});
	}).observe(t, { attributes: !0, childList: !0, subtree: !0 });
};
export { t };
