<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { SendHorizontal } from 'lucide-svelte';

	export let authorName: string;

	const dispatch = createEventDispatcher();

	let content = '';
	let error = '';
	let inputRef: HTMLTextAreaElement;

	const MIN_LENGTH = 3;
	const MAX_LENGTH = 280;
	const MAX_HEIGHT = 144;

	function validate(): boolean {
		const trimmed = content.trim();
		if (trimmed.length < MIN_LENGTH) {
			error = `Comment must be at least ${MIN_LENGTH} characters.`;
			return false;
		}
		if (trimmed.length > MAX_LENGTH) {
			error = `Comment must be less than ${MAX_LENGTH} characters.`;
			return false;
		}

		error = '';
		return true;
	}

	function handleSubmit() {
		if (!validate()) return;

		const newComment = {
			id: crypto.randomUUID(),
			content: content.trim(),
			date: new Date(),
			user: {
				id: 'you',
				name: 'You',
				image: 'https://i.pravatar.cc/256?u=you'
			},
			reactions: []
		};

		dispatch('submit', { comment: newComment });
		content = '';
		error = '';
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function autoResize() {
		if (inputRef) {
			inputRef.style.height = 'auto';
			inputRef.style.height = `${Math.min(inputRef.scrollHeight, MAX_HEIGHT)}px`;
		}
	}
</script>

<div class="relative">
	<img
		src="https://i.pravatar.cc/256?u=you"
		alt="Your avatar"
		class="absolute left-2 top-2 w-6 h-6 rounded-full object-cover"
	/>

	<!-- Send Button -->
	{#if content.trim().length > 0}
		<button
			on:click={handleSubmit}
			class="absolute right-2 top-2 text-zinc-400 hover:text-white p-1"
			aria-label="Send reply"
		>
			<SendHorizontal class="w-5 h-5 text-white" />
		</button>
	{/if}

	<textarea
		bind:this={inputRef}
		bind:value={content}
		on:keydown={handleKeyDown}
		on:input={autoResize}
		placeholder={`Reply to ${authorName}`}
		aria-describedby={error ? 'comment-error' : undefined}
		rows="1"
		class="w-full pl-10 pr-10 py-2 rounded-[40px] bg-surface-100 text-base text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none overflow-auto max-h-[144px]"
	></textarea>

	{#if error}
		<p class="mt-1 text-sm text-red-400">{error}</p>
	{/if}
</div>
