<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import type { PageData } from "./$types";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { userDatabaseSchema } from "@/schema";
	import * as Form from '@/components/ui/form';
	import { Input } from "@/components/ui/input";
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
	import { toast } from "svelte-sonner";
	import { Separator } from "@/components/ui/separator";


    export let data: PageData;

    let isSubmitting: boolean = false;

    const form = superForm(data.form, {
        validators: zodClient(userDatabaseSchema),
        dataType: 'json',
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

    function handlePortInput(e: Event) {
        $formData.port = parseInt((e.target as HTMLInputElement).value);
    }
</script>

<div class="flex justify-center items-center h-full">
<Card class="w-[600px]">
    <CardHeader>
        <CardTitle class="text-center font-bold text-2xl">Database Configuration</CardTitle> 
        <CardDescription class="text-center">
            Only PostgreSQL databases are allowed. Please enter your database credentials to connect.
        </CardDescription>
        <Separator />
    </CardHeader>
    <CardContent>
        <form method="post" use:enhance class="flex flex-col gap-4">
            <div class="flex flex-row flex-wrap gap-4">
                <Form.Field {form} name="host" class="flex-1">
                    <Form.Control let:attrs>
                        <Form.Label>Host</Form.Label>
                        <Input
                         {...attrs}
                         bind:value={$formData.host}
                         placeholder="localhost"
                         disabled={isSubmitting}
                        />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <Form.Field {form} name="username" class="flex-1">
                    <Form.Control let:attrs>
                        <Form.Label>Database Username</Form.Label>
                        <Input
                         {...attrs}
                         bind:value={$formData.username}
                         placeholder="root"
                         disabled={isSubmitting}
                        />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
            <div class="flex flex-row flex-wrap gap-4">
                <Form.Field {form} name="database" class="flex-1">
                    <Form.Control let:attrs>
                        <Form.Label>Database Name</Form.Label>
                        <Input
                        {...attrs}
                        bind:value={$formData.database}
                        placeholder="secret"
                         disabled={isSubmitting}
                         />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <Form.Field {form} name="port" class="flex-1">
                    <Form.Control let:attrs>
                        <Form.Label>Database Port</Form.Label>
                        <Input
                        {...attrs}
                        value={$formData.port}
                        on:input={handlePortInput}
                        placeholder="5432"
                        type="number"
                        disabled={isSubmitting}
                        />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
            <Form.Field {form} name="password" class="flex-1">
                <Form.Control let:attrs>
                    <Form.Label>Database Password</Form.Label>
                    <Input
                     {...attrs}
                     bind:value={$formData.password}
                     placeholder="********"
                     disabled={isSubmitting}
                     enablePasswordToggle
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Button isLoading={isSubmitting} class="w-full">
                Submit
            </Form.Button>
        </form>
    </CardContent>
</Card>
</div>