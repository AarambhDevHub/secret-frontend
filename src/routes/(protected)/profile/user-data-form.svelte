<script lang="ts">
	import * as Form from '@/components/ui/form';
	import { Input } from "@/components/ui/input";
	import { userDataSchema, type UserDataInterFace, type UserDataSchema } from "@/schema";
	import { Reload } from "svelte-radix";
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

    export let userDataForm: SuperValidated<Infer<UserDataSchema>>;
    export let userData: UserDataInterFace;

    let isSubmitting: boolean = false;

    const form = superForm(userDataForm, {
        validators: zodClient(userDataSchema),
        dataType: 'json',
        resetForm: false,
        invalidateAll: false,
        onUpdate({ result }) {
            const { data } = result;
            if(data.updateUserDataResponse.status === "success"){
                $formData.email = data.updateUserDataResponse.data.user.email;
                $formData.name = data.updateUserDataResponse.data.user.name;
                toast.success("Successfully updated user name.");
            }
        },
    });

    const { form: formData, enhance, submitting } = form;

    $: $formData.email = userData.email;
    $: $formData.name = userData.name;
    $: isSubmitting = $submitting;

</script>

<form method="post" use:enhance action="?/updateUserData">
    <Form.Field {form} name="name">
        <Form.Control let:attrs>
            <Form.Label>Name</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.name}
                placeholder="john doe"
                disabled={isSubmitting}
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.email}
                placeholder="john.doe@example.com"
                readonly
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button class="mt-3 w-full" isLoading={isSubmitting}>
        Submit
    </Form.Button>
</form>
