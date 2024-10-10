<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Table from '@/components/ui/table';
    import { createTable, Render, Subscribe, createRender, type BodyRow } from 'svelte-headless-table';
    import { addPagination } from "svelte-headless-table/plugins";
    import { writable } from 'svelte/store';
	  import Action from "./action.svelte";
	  import type { SuperValidated, Infer } from "sveltekit-superforms";
	  import type { updateSecertSchema } from "@/schema";

    type UsersData = {
        id: string;
        secret_name: string;
        secret_value: string;
        version: number;
    }
    export let form: SuperValidated<Infer<typeof updateSecertSchema>>;
    export let usersData: UsersData[] = [];
    export let currentPage: number = 1;
    export let totalPage: number = 0;
    export let onPageChange: (newPage: number) => void;

    const tabelDataStore = writable(usersData);

    const tabel = createTable(tabelDataStore, {
        page: addPagination(),
    });

    const columns = tabel.createColumns([
        tabel.column({
            accessor: 'id',
            header: 'ID',
        }),
        tabel.column({
            accessor: 'secret_name',
            header: 'Secret name',
        }),
        tabel.column({
            accessor: 'secret_value',
            header: 'Secret Value',
        }),
        tabel.column({
            accessor: 'version',
            header: 'Version',
        }),
        tabel.column({
          accessor: ({ id }) => id,
          header: "Action",
          cell: ({ row }: { row: BodyRow<UsersData> }) => {
            //@ts-ignore
            const originalData = row.original; // Access original data
            //@ts-ignore
            return createRender(Action, {
              updatedSchema: form,
              secret: originalData,
            });
          }
        })
    ]);

    const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tabel.createViewModel(columns);

    $: hasPreviousPage = currentPage > 1;
    $: hasNextPage = currentPage < totalPage;

    const handlePageChange = (newPageIndex: number) => {
        // Ensure the new page index is valid (within bounds)
        if (newPageIndex > 0 && newPageIndex <= totalPage) {
            onPageChange(newPageIndex);
        }
    }


    $: tabelDataStore.set(usersData);

</script>

<div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#if $pageRows.length === 0}
        <!-- Display "No data found" if there are no rows -->
        <Table.Row>
          <Table.Cell colspan={$headerRows[0].cells.length} class="text-center py-4">
            No data found
          </Table.Cell>
        </Table.Row>
      {:else}
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      {/if}
      </Table.Body>
    </Table.Root>
    <div class="flex items-center justify-end space-x-4 py-4">
        <Button
          variant="outline"
          size="sm"
          on:click={() => handlePageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          >
          Previous
          </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNextPage}
          on:click={() => handlePageChange(currentPage + 1)}>
          Next
          </Button>
    </div>
</div>