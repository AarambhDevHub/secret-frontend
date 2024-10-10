<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { passwordChangeSchema, type PasswordChangeSchema, type UserDataInterFace} from "@/schema";
    import * as Form from '@/components/ui/form';
	import { Input } from "@/components/ui/input";
	import { toast } from "svelte-sonner";

    export let passwordChangeForm: SuperValidated<Infer<PasswordChangeSchema>>;

    let isSubmitting: boolean = false;

    const form = superForm(passwordChangeForm, {
        validators: zodClient(passwordChangeSchema),
        dataType: 'json',
        invalidateAll: false,
        onUpdate({ result }) {
            const { data } = result;
            if(data.updateUserPasswordResponse.status == 400 || data.updateUserPasswordResponse.status == 'fail') {
                toast.error(data.updateUserPasswordResponse.message)
            }else{
                toast.success("Password update Successful!")
            }
        },
    });

    const { form: formData, enhance, submitting } = form;

    $: isSubmitting = $submitting;

</script>

<form method="post" use:enhance action="?/updateUserPassword">
    <Form.Field {form} name="oldpassword">
        <Form.Control let:attrs>
            <Form.Label>Old Password</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.oldpassword}
                placeholder="*********"
                disabled={isSubmitting}
                enablePasswordToggle
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="newpassword">
        <Form.Control let:attrs>
            <Form.Label>New Password</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.newpassword}
                placeholder="*********"
                disabled={isSubmitting}
                enablePasswordToggle
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="newpasswordConfirm">
        <Form.Control let:attrs>
            <Form.Label>New password Confirm</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.newpasswordConfirm}
                placeholder="*********"
                disabled={isSubmitting}
                enablePasswordToggle
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button class="mt-3 w-full" isLoading={isSubmitting}>
        Submit
    </Form.Button>
</form>
