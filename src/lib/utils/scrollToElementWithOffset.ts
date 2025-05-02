export function scrollToElementWithOffset(
	element: HTMLElement,
	offset: number = 64,
	delay: number = 200
) {
	if (!element) return;

	document.activeElement instanceof HTMLElement && document.activeElement.blur();

	setTimeout(() => {
		const rect = element.getBoundingClientRect();
		const scrollTop = window.scrollY + rect.top - offset;

		window.scrollTo({
			top: scrollTop,
			behavior: 'smooth'
		});
	}, delay);
}
