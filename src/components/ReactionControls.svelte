<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { Heart, HeartIcon, Smile, SmileIcon } from 'lucide-svelte';

	export let currentReactions: { type: string; count: number }[] = [];

	const dispatch = createEventDispatcher();
	const allReactions = [
		'angry',
		'bullseye',
		'like',
		'heart',
		'laugh',
		'sad',
		'winking-face',
		'disappointed-face',
		'face-exhaling',
		'party-popper'
	]; // add all?

	let liked = currentReactions.some((r) => r.type === 'heart');

	// Popover logic
	let showPopover = false;
	let wrapperRef: HTMLDivElement;
	let popoverRef: HTMLDivElement;
	let position: 'left' | 'right' = 'right';

	function toggleLike() {
		liked = !liked;
		dispatch('react', { type: 'heart', remove: !liked });
	}

	function react(type: string) {
		dispatch('react', { type });
		showPopover = false;
	}

	function updatePosition() {
		const rect = wrapperRef?.getBoundingClientRect();
		if (!rect) return;
		const spaceRight = window.innerWidth - rect.right;
		const spaceLeft = rect.left;

		position = spaceRight < 200 && spaceLeft > 200 ? 'left' : 'right';
	}

	function openPopover() {
		updatePosition();
		showPopover = !showPopover;
	}

	onMount(() => {
		window.addEventListener('resize', updatePosition);
		return () => {
			window.removeEventListener('resize', updatePosition);
		};
	});
</script>

<div class="relative inline-flex items-center gap-4">
	<!-- Add Like -->
	<button
		on:click={toggleLike}
		class="transition-colors hover:text-white text-zinc-400"
		aria-label="Like"
	>
		{#if liked}
			<Heart class="w-6 h-6 fill-current text-red-500" />
		{:else}
			<HeartIcon class="w-6 h-6 text-white" />
		{/if}
	</button>

	<div class="inline-flex relative" bind:this={wrapperRef}>
		<!-- Reaction Picker -->
		<button
			on:click={openPopover}
			class="transition-colors hover:text-white text-zinc-400"
			aria-label="React"
		>
			{#if showPopover}
				<Smile class="w-6 h-6" />
			{:else}
				<SmileIcon class="w-6 h-6 text-white" />
			{/if}
		</button>

		{#if showPopover}
			<div
				bind:this={popoverRef}
				class="absolute bottom-8 z-20 bg-surface-100 rounded-lg shadow-lg p-2 flex flex-wrap gap-2 min-w-[160px] max-w-[220px]"
				class:left-0={position === 'right'}
				class:right-0={position === 'left'}
			>
				{#each allReactions as type}
					<button on:click={() => react(type)} class="hover:scale-110 transition">
						<img src={`/assets/reactions/${type}.png`} alt={type} class="w-6 h-6" />
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
