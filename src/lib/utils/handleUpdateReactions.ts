import type { Reaction } from '$lib/types/_types';

export function handleUpdateReactions(
	reactions: Reaction[],
	type: string, // todo prodvide a type for this
	remove = false
): Reaction[] {
	const index = reactions.findIndex((r) => r.type === type);

	if (remove) {
		return index !== -1 ? [...reactions.slice(0, index), ...reactions.slice(index + 1)] : reactions;
	}

	if (index !== -1) {
		const updated = [...reactions];
		updated[index] = { ...updated[index], count: updated[index].count + 1 };
		return updated;
	}

	return [...reactions, { type, count: 1 }];
}
