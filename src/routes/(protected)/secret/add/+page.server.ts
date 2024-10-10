import { fail, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "../$types";
import { zod } from "sveltekit-superforms/adapters";
import { addSecertSchema } from "@/schema";
import type { Actions } from "@sveltejs/kit";
import { withActionHandler } from "@/API/actionUtils";
import { saveSecretsApi } from "@/API/api";


export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(addSecertSchema)),
    }
}


export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(addSecertSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const token = cookies.get('token');

        return withActionHandler(async () => {
            const response = await saveSecretsApi({
                cookie: token as string,
                data: form.data.values
            });
    
            return ({
                form,
                apiResponse: response
            }) 
        }, { defaultForm: form, returnFormOnError: true })
       
    },
};

