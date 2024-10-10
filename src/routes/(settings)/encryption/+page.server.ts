import { fail, superValidate } from "sveltekit-superforms"
import type { PageServerLoad } from "./$types"
import { zod } from "sveltekit-superforms/adapters"
import { userEncryptionSchema } from "@/schema"
import type { Actions } from "@sveltejs/kit"
import { withActionHandler } from "@/API/actionUtils"
import { encryptionMethodApi } from "@/API/api"

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(userEncryptionSchema))
    }
}


export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(userEncryptionSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const token = cookies.get('token');

        return withActionHandler(async () => {
            const response = await encryptionMethodApi({
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
