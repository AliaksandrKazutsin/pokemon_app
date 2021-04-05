
export const scrollToTop = () => {
	let t: NodeJS.Timeout;
	let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	if (top > 0) {
		window.scrollBy(0, -100);
		t = setTimeout(() => {
			return scrollToTop();
		}, 20);
	} else clearTimeout(t);
	return false;
};