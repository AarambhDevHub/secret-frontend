import { fail, superValidate } from "sveltekit-superforms"
import type { PageServerLoad } from "./$types"
import { zod } from "sveltekit-superforms/adapters";
import { userDatabaseSchema } from "@/schema";
import type { Actions } from "@sveltejs/kit";
import { withActionHandler } from "@/API/actionUtils";
import { DatabaseConfigutationApI } from "@/API/api";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(userDatabaseSchema))
    }
}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(userDatabaseSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const token = cookies.get('token');

        return withActionHandler(async () => {
            const response = await DatabaseConfigutationApI({
                cookie: token as string,
                ...form.data
            });
    
            return ({
                form,
                apiResponse: response
            }) 
        }, { defaultForm: form, returnFormOnError: true })
       
    },
};
