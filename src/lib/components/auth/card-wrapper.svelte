
<script lang="ts">
	import { cn } from "@/utils";
	import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
	import BackButton from "./back-button.svelte";
	import Header from "./header.svelte";
	import { string } from "zod";


    export let headerLabel: string;
    export let backButtonLabel: string;
    export let backButtonHref: string;
    export let classname: string = "";

</script>

<Card class={cn("w-[400px] shadow-md", classname)}>
    <CardHeader>
        <Header label={headerLabel} />
    </CardHeader>
    <CardContent>
        <slot />
    </CardContent>
    <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
    </CardFooter>
</Card>

