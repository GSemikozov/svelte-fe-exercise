<script lang="ts">
	import type { Post } from '$lib/types/_types';
	import { formatRelativeShort } from '$lib/utils/date';
	import { MoreHorizontal } from 'lucide-svelte';
	import ReactionBar from './ReactionBar.svelte';
	import ReactionControls from './ReactionControls.svelte';
	import { handleUpdateReactions } from '$lib/utils/handleUpdateReactions';

	export let post: Post;
	export let commentCount: number | null = null;

	// Copy of the reactions from the post
	let reactions = [...post.reactions];

	function handleReact(event: CustomEvent<{ type: string; remove?: boolean }>) {
		const { type, remove } = event.detail;
		reactions = handleUpdateReactions(reactions, type, remove);
	}
</script>

<article class="shadow py-6 px-[22px] space-y-3">
	<!-- Author -->
	<div class="flex items-center justify-between gap-3">
		<!-- Avatar and Name -->
		<div class="flex items-center gap-3">
			<img src={post.user.image} alt={post.user.name} class="w-10 h-10 rounded-full object-cover" />
			<p class="font-semibold text-sm">{post.user.name}</p>
		</div>

		<!-- Date and More -->
		<div class="flex items-center gap-2 text-xs text-text-secondary">
			<span>{formatRelativeShort(post.date)}</span>
			<button class="p-1 hover:bg-zinc-700 rounded-full" aria-label="More options">
				<MoreHorizontal class="w-4 h-4" />
			</button>
		</div>
	</div>

	<!-- Content -->
	<div class="bg-surface-100 rounded-xl p-4 space-y-4 mb-5">
		<!-- Text Content -->
		<p class="text-sm whitespace-pre-line">{post.content}</p>
	</div>

	<div class="flex items-center justify-between gap-3">
		<!-- Reactions -->
		<ReactionBar {reactions} {commentCount} />

		<!-- Add reactions -->
		<ReactionControls currentReactions={reactions} on:react={handleReact} />
	</div>
</article>
