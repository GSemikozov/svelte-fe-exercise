<script lang="ts">
	export let reactions: { type: string; count: number }[] = [];
	export let commentCount: number | null = null;

	// Unique reactions
	// Using Map to filter out duplicates based on type
	$: uniqueReactions = Array.from(new Map(reactions.map((r) => [r.type, r])).values());

	// Total reactions
	$: total = uniqueReactions.reduce((sum, r) => sum + r.count, 0);
</script>

<div class="flex items-center gap-2">
	<div class="flex -space-x-3">
		{#each uniqueReactions.slice(0, 5) as reaction (reaction.type)}
			<img
				src={`/assets/reactions/${reaction.type}.png`}
				alt={reaction.type}
				class="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 object-cover"
				title={reaction.type}
			/>
		{/each}
	</div>
	{#if total > 0}
		<span class="text-xs text-text-secondary">{total} reaction{total > 1 ? 's' : ''}</span>
		{#if commentCount !== null && commentCount > 0}
			<span class="text-xs text-text-secondary">• {commentCount} replies</span>
		{/if}
	{/if}
</div>
