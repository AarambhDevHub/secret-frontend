<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import type { PageData } from "./$types";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import { EncryptionMethod, userEncryptionSchema } from "@/schema";
	import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
	import * as Form from '@/components/ui/form';
    import * as RadioGroup from '@/components/ui/radio-group'

    export let data: PageData;

    let isSubmitting: boolean = false;

    const form = superForm(data.form, {
        validators: zodClient(userEncryptionSchema),
        dataType: 'json',
        resetForm: false,
        onUpdate({ result }) {
            const { data } = result;

            if (data?.apiResponse) {
                if (data.apiResponse?.status === 'fail' || data.apiResponse?.status != 'success') {
                    toast.error(data.apiResponse.message);
                } else {
                    toast.success(data.apiResponse.message);
                }
            }
        },
    });

    const { form: formData, enhance, submitting } = form;

    $: isSubmitting = $submitting;

</script>

<div class="flex justify-center items-center h-full">
    <Card class="w-[400px]">
        <CardHeader>
            <CardTitle class="text-center font-bold text-2xl">Select Encryption Method</CardTitle> 
        </CardHeader>
        <CardContent>
            <form method="post" use:enhance>
                <Form.Fieldset {form} name="encryption_method">
                    <RadioGroup.Root 
                        bind:value={$formData.encryption_method} 
                        class="grid grid-cols-2 gap-4"
                    >
                        <Form.Control let:attrs>
                            <Form.Label
                                for={attrs.id}
                                class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <RadioGroup.Item value={EncryptionMethod.AES256} class="sr-only" {...attrs} />
                                {EncryptionMethod.AES256}
                            </Form.Label>
                        </Form.Control>
            
                        <Form.Control let:attrs>
                            <Form.Label
                                for={attrs.id}
                                class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <RadioGroup.Item value={EncryptionMethod.Blowfish} class="sr-only" {...attrs} />
                                {EncryptionMethod.Blowfish}
                            </Form.Label>
                        </Form.Control>
            
                        <Form.Control let:attrs>
                            <Form.Label
                                for={attrs.id}
                                class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <RadioGroup.Item value={EncryptionMethod.Chacha20} class="sr-only" {...attrs} />
                                {EncryptionMethod.Chacha20}
                            </Form.Label>
                        </Form.Control>
            
                        <Form.Control let:attrs>
                            <Form.Label
                                for={attrs.id}
                                class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <RadioGroup.Item value={EncryptionMethod.DESTripleDES} class="sr-only" {...attrs} />
                                {EncryptionMethod.DESTripleDES}
                            </Form.Label>
                        </Form.Control>
                    </RadioGroup.Root>
                    <Form.FieldErrors />            
                </Form.Fieldset>
                <Form.Button isLoading={isSubmitting} class="w-full">
                    Submit
                </Form.Button>
            </form>
        </CardContent>
    </Card>
</div>