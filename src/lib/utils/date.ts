export function formatRelativeShort(date: Date): string {
	const now = new Date();
	const diff = now.getTime() - date.getTime();

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const years = Math.floor(days / 365);

	if (seconds < 60) return `${seconds}s`;
	if (minutes < 60) return `${minutes}m`;
	if (hours < 24) return `${hours}h`;
	if (days < 7) return `${days}d`;
	if (weeks < 52) return `${weeks}w`;
	return `${years}y`;
}
