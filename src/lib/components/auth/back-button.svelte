<script lang="ts">
	import { Button } from "../ui/button";

    export let label: string;
    export let href: string;
</script>

<Button class="font-normal w-full" size="sm" variant="link">
    <a href={href}>{label}</a>
</Button>