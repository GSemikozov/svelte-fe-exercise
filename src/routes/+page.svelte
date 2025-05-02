<script lang="ts">
	import { tick } from 'svelte';
	import PostCard from '$components/PostCard.svelte';
	import CommentList from '$components/CommentList.svelte';
	import ReplyInput from '$components/ReplyInput.svelte';

	import { getPost, getComments } from '$lib/data/_comments.data';
	import { scrollToElementWithOffset } from '$lib/utils/scrollToElementWithOffset';

	const post = getPost();
	let comments = getComments();

	let highlightId: string | null = null;

	async function handleAddComment(event: CustomEvent) {
		const newComment = event.detail.comment;
		comments = [newComment, ...comments];
		highlightId = newComment.id;

		await tick();

		const el = document.getElementById(`comment-${newComment.id}`);
		if (el) scrollToElementWithOffset(el, 64);
	}

	function handleHighlightEnd(e: CustomEvent<string>) {
		if (e.detail === highlightId) {
			highlightId = null;
		}
	}
</script>

<div class="relative min-h-screen flex flex-col">
	<header class="sticky top-0 z-20 px-4 py-3 bg-black">
		<h1 class="text-lg font-semibold text-white">Post</h1>
	</header>
	<main class="flex-1 overflow-y-auto">
		<PostCard {post} commentCount={comments.length} />
		<div class="divider"></div>
		{#if comments.length > 0}
			<CommentList {comments} {highlightId} on:highlightend={handleHighlightEnd} />
		{:else}
			<p class="text-center text-text-secondary text-sm p-4">
				No comments yet. Be the first to reply!
			</p>
		{/if}
	</main>
	<footer class="sticky bottom-0 p-4 bg-black">
		<ReplyInput authorName={post.user.name} on:submit={handleAddComment} />
	</footer>
</div>

<style>
	.divider {
		height: 0.5rem;
		background-color: #0b0b17;
	}
</style>
