<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "@/components/ui/button";
	import type { PageData } from "./$types";
	import DataTable from "./data-table.svelte";
	import { Separator } from "@/components/ui/separator";


    export let data: PageData;

    const handlePageChange = async (newPage: number) => {
        const adjustedPageIndex = Math.max(1, newPage);
        await goto(`/secret?page=${adjustedPageIndex.toString()}`,{ invalidateAll: true });
    }
</script>

<div class="p-4 flex flex-col gap-3">
    <div class="flex w-full items-end justify-end">
        <Button on:click={() => { goto("/secret/add")}}>Add Secret</Button>
    </div>
 <Separator />
 <DataTable currentPage={data.pageIndex} totalPage={data.totalPage} usersData={data.secret} onPageChange={(newPage) => handlePageChange(newPage)} form={data.form} />
</div>
