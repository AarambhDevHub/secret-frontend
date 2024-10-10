<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { InputEvents } from "./index.js";
	import { cn } from "$lib/utils.js";
	import type { CustomInputAttributes } from './types.js';
	import { Eye, EyeOff } from 'lucide-svelte';

	type $$Props = CustomInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export let enablePasswordToggle: boolean = false;
	export let type: $$Props['type'] = 'text';
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props["readonly"] = undefined;

	let showPassword = false;

	// Function to determine the input type based on `enablePasswordToggle` and `showPassword`
	$: currentType = enablePasswordToggle ? (showPassword ? 'text' : 'password') : type;

	function toggleShowPassword() {
		showPassword = !showPassword;
	}
</script>

<div class="relative w-full">
	<!-- Input field with dynamic type based on enablePasswordToggle and showPassword state -->
	<input
		{...{type: currentType}}
		class={cn(
			"border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		bind:value
		{readonly}
		on:blur
		on:change
		on:click
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:mousemove
		on:paste
		on:input
		on:wheel|passive
		{...$$restProps}
	/>

	<!-- Show/Hide toggle button -->
	{#if enablePasswordToggle}
		<button
			type="button"
			class="absolute right-3 top-[0.35rem] text-sm text-gray-600"
			on:click={toggleShowPassword}
		>
			{#if showPassword}
				<EyeOff />
			{:else}
				<Eye />
			{/if}
		</button>
	{/if}
</div>

