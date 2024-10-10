<script lang="ts">
	import { Button } from "@/components/ui/button";
	import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
	import { Edit, ViewIcon } from "lucide-svelte";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { updateSecertSchema } from '@/schema';
	import { zodClient } from "sveltekit-superforms/adapters";
    import * as Form from '@/components/ui/form';
	import Input from "@/components/ui/input/input.svelte";
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";

    export let updatedSchema: SuperValidated<Infer<typeof updateSecertSchema>>;
    export let secret: {
        id: string;
        secret_name: string;
        secret_value: string;
        version: number;
    };

    let isSubmitting = false;

    $: isOpen = false

    $: openChangeHandler = () => {
        isOpen = true;
    }

    const onClickPageChangeHandler = (id: string) =>{
        goto(`/secret/${id}`)
    }


    const form = superForm(updatedSchema, {
        validators: zodClient(updateSecertSchema),
        dataType: 'json',
        resetForm: false,
        invalidateAll: true,
        onUpdate({ result }) {
			const { data } = result;

			if (data?.apiResponse) {
				if (data.apiResponse?.status === 'fail' || data.apiResponse?.status != 'success') {
					toast.error(data.apiResponse.message);
				} else {
					toast.success(data.apiResponse.message);
                    isOpen = false;
				}
			}
		},
    });

    const { form: formData, enhance, submitting } = form;

    const setFormData = () => {
		$formData.secret_name = secret.secret_name;
		$formData.secret_value = secret.secret_value;
		$formData.id = secret.id;
	};

    $: if (isOpen) {
		setFormData();
	}

    $: isSubmitting = $submitting;
</script>

<div>
    <Button size="sm" on:click={openChangeHandler} variant="outline">
        <Edit class="h-4 w-4" />
    </Button>
    <Button size="sm" variant="outline" on:click={() => onClickPageChangeHandler(secret.id)}>
        <ViewIcon class="h-4 w-4" />
    </Button>
    
    <Dialog open={isOpen} onOpenChange={(open) => { isOpen = open }}>
        <DialogContent>
            <DialogTitle>Update Secret</DialogTitle>
            <form method="post" use:enhance>
                <Form.Field {form} name="secret_name">
                    <Form.Control let:attrs>
                        <Form.Label>Secret Name</Form.Label>
                        <Input 
                            {...attrs} 
                            bind:value={$formData.secret_name}
                            disabled={isSubmitting} 
                        />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <Form.Field {form} name="secret_value">
                    <Form.Control let:attrs>
                        <Form.Label>Secret value</Form.Label>
                        <Input 
                            {...attrs} 
                            bind:value={$formData.secret_value}
                            disabled={isSubmitting} 
                        />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <Form.Button isLoading={isSubmitting}>
                    Updated Secret
                </Form.Button>
            </form>
        </DialogContent>
    </Dialog>
</div>