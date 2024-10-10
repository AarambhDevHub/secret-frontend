<script lang="ts">
	import * as Form from '@/components/ui/form';
	import CardWrapper from '@/components/auth/card-wrapper.svelte';
	import { registerSchema } from '@/schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '@/components/ui/input';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	let isSubmitting: boolean = false;

	const form = superForm(data.form, {
		validators: zodClient(registerSchema),
		dataType: 'json',
		onUpdate({ result }) {
			const { data } = result;
			if(!data.form.valid) {
				toast.error('Validation errors');
				isSubmitting = false;
                return;
			}
			if (data.apiResponse.status != 'success') {
				toast.error(data.apiResponse.message);
			} else {
				toast.success(data.apiResponse.message);
				setTimeout(() => goto('/login'), 1000);
			}
		}
	});

	const { form: formData, enhance, submitting } = form;

	$: isSubmitting = $submitting;
</script>

<title>
	Register Page
</title>

<CardWrapper
	headerLabel="Create an account"
	backButtonHref="/login"
	backButtonLabel="Already have an account?"
	classname="w-[600px]"
>
	<form method="POST" use:enhance class="flex flex-col gap-4">
		<div class="flex flex-row flex-wrap gap-4">
			<Form.Field {form} name="email" class="flex-1">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.email}
						placeholder="john.doe@example.com"
						disabled={isSubmitting}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="name" class="flex-1">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.name}
						placeholder="John Doe"
						disabled={isSubmitting}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="flex flex-row flex-wrap gap-4">
			<Form.Field {form} name="password" class="flex-1">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.password}
						type="password"
						placeholder="*******"
						disabled={isSubmitting}
						enablePasswordToggle
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="passwordConfirm" class="flex-1">
				<Form.Control let:attrs>
					<Form.Label>Confirm Password</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.passwordConfirm}
						type="password"
						placeholder="*******"
						disabled={isSubmitting}
						enablePasswordToggle
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<Form.Button class="mt-3 w-full" isLoading={isSubmitting}>
			Submit
		</Form.Button>
	</form>
</CardWrapper>
