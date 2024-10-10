<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { type Events, type Props, buttonVariants } from "./index.js";
	import { cn } from "$lib/utils.js";
	import { LoaderCircle } from 'lucide-svelte';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let builders: $$Props["builders"] = [];
	export let isLoading: $$Props["isLoading"] = false;
	export let disabled: $$Props["disabled"] = false;
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
	disabled={isLoading || disabled}
>
	{#if isLoading}
		<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
	{/if}
	<slot />
</ButtonPrimitive.Root>
