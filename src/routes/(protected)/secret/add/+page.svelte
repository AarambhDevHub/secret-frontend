<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import type { PageData } from "./$types";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { addSecertSchema } from "@/schema";
    import * as Form from '@/components/ui/form';
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { tick } from "svelte";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Separator } from "@/components/ui/separator";
    import { Plus, Trash2 } from 'lucide-svelte'; // Import the Trash icon for remove button
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";

    export let data: PageData;
    let isSubmitting: boolean = false;

    const form = superForm(data.form, {
        validators: zodClient(addSecertSchema),
        dataType: 'json',
        onUpdate({ result }) {
			const { data } = result;

			if (data?.apiResponse) {
				if (data.apiResponse?.status === 'fail' || data.apiResponse?.status != 'success') {
					toast.error(data.apiResponse.message);
				} else {
					toast.success(data.apiResponse.message);
                    setTimeout(() => goto('/secret'), 1000);
				}
			}
		},
    });

    const { form: formData, enhance, submitting } = form;

    $: isSubmitting = $submitting;

    // Add a new empty secret
    function addSecret() {
        $formData.values = [...$formData.values, {
            secret_name: '',
            secret_value: ''
        }];

        tick().then(() => {
            const secretNameInputs = Array.from(
                document.querySelectorAll<HTMLElement>("input[name^='values'][name$='.secret_name']")
            );
            const lastSecretNameInput = secretNameInputs[secretNameInputs.length - 1];
            if (lastSecretNameInput) {
                lastSecretNameInput.focus();
            }
        });
    }

    // Remove a secret by index
    function removeSecret(index: number) {
        if ($formData.values.length > 1) {
            $formData.values = $formData.values.filter((_, i) => i !== index);
        } else {
            console.error("At least one secret is required.");
        }
    }
</script>

<div class="p-4 flex items-center justify-center">
    <Card class="w-[400px]">
        <CardHeader>
            <CardTitle>Add Secrets</CardTitle>
            <Separator />
        </CardHeader>
        <CardContent>
            <form method="post" use:enhance class="space-y-3">
                <Form.Fieldset {form} name="values">
                    <div class="flex justify-end items-center">
                        <Button type="button" variant="outline" disabled={isSubmitting} size="sm" class="mt-2 gap-2" on:click={addSecret}>
                            <Plus class="h-4 w-4" />
                            Add Secret
                        </Button>
                    </div>

                    {#each $formData.values as _, i }
                    <div class="flex gap-4 justify-between">
                        <!-- Secret name input -->
                        <Form.ElementField {form} name="values[{i}].secret_name">
                            <Form.Control let:attrs>
                                <Form.Label>Secret name</Form.Label>
                                <Input {...attrs} bind:value={$formData.values[i].secret_name} placeholder="Secret Name" disabled={isSubmitting} />
                            </Form.Control>  
                            <Form.FieldErrors />
                        </Form.ElementField>
                        
                        <!-- Secret value input -->
                        <Form.ElementField {form} name="values[{i}].secret_value">
                            <Form.Control let:attrs>
                                <Form.Label>Secret value</Form.Label>
                                <Input {...attrs} bind:value={$formData.values[i].secret_value} placeholder="Secret Value" disabled={isSubmitting} />
                            </Form.Control>  
                            <Form.FieldErrors />
                        </Form.ElementField>
                        
                        <Button type="button" variant="destructive" disabled={isSubmitting} size="sm" class="mt-8" on:click={() => removeSecret(i)}>
                            <Trash2 class="h-4 w-4" />
                        </Button>
                    </div>
                    {/each}
                </Form.Fieldset>
                <Form.Button class="w-full" isLoading={isSubmitting}>
                    Submit
                </Form.Button>
            </form>
        </CardContent>
    </Card>
</div>
