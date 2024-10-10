import { withActionHandler } from '@/API/actionUtils';
import { registerApi } from '@/API/api';
import { registerSchema } from '@/schema';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		return withActionHandler(async () => {
			const response = await registerApi(form.data);

			return {
				form,
				apiResponse: response
			};
		}, { defaultForm: form, returnFormOnError: true });
	}
};
