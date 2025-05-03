<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Post } from '$lib/types/_types';
	import CommentCard from './CommentCard.svelte';

	export let comments: Post[];
	export let highlightId: string | null = null;

	const dispatch = createEventDispatcher();
</script>

<div class="divide-y-2 divide-surface-200 border-b-2 border-surface-200">
	{#each comments as comment (comment.id)}
		<CommentCard
			{comment}
			scrollTarget={highlightId === comment.id}
			on:highlightdone={() => dispatch('highlightend', comment.id)}
		/>
	{/each}
</div>
