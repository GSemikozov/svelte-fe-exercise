<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Post } from '$lib/types/_types';
	import { formatRelativeShort } from '$lib/utils/date';
	import { MoreHorizontal } from 'lucide-svelte';
	import ReactionBar from './ReactionBar.svelte';
	import ReactionControls from './ReactionControls.svelte';
	import { handleUpdateReactions } from '$lib/utils/handleUpdateReactions';

	export let comment: Post;
	export let scrollTarget: boolean = false;

	const dispatch = createEventDispatcher();

	let commentRef: HTMLDivElement;
	let reactions = [...comment.reactions];

	$: if (scrollTarget && commentRef) {
		commentRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function handleReact(event: CustomEvent<{ type: string; remove?: boolean }>) {
		const { type, remove } = event.detail;
		reactions = handleUpdateReactions(reactions, type, remove);
	}

	function handleAnimationEnd() {
		if (scrollTarget) {
			dispatch('highlightdone');
		}
	}
</script>

<div
	bind:this={commentRef}
	class="py-6 px-[22px] space-y-3"
	id={`comment-${comment.id}`}
	on:animationend={handleAnimationEnd}
>
	<!-- Author -->
	<div class="flex items-center justify-between gap-3">
		<!-- Avatar and Name -->
		<div class="flex items-center gap-3">
			<img
				src={comment.user.image}
				alt={comment.user.name}
				class="w-10 h-10 rounded-full object-cover"
			/>
			<p class="font-semibold text-sm">{comment.user.name}</p>
		</div>

		<!-- Date and More Actions -->
		<div class="flex items-center gap-2 text-xs text-zinc-400">
			<span>{formatRelativeShort(comment.date)}</span>
			<button class="p-1 hover:bg-zinc-700 rounded-full" aria-label="More options">
				<MoreHorizontal class="w-4 h-4" />
			</button>
		</div>
	</div>

	<!-- Text Content -->
	<p class="text-sm text-text-secondary mb-5">{comment.content}</p>

	<div class="flex items-center justify-between gap-3">
		<!-- Reactions -->
		<ReactionBar {reactions} />

		<!-- Button Bar for reactions -->
		<ReactionControls currentReactions={reactions} on:react={handleReact} />
	</div>
</div>
