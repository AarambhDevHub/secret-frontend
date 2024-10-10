import { getSecretsApi, updateSecretsApi } from "@/API/api"
import type { PageServerLoad } from "./$types"
import { withActionHandler } from "@/API/actionUtils";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { updateSecertSchema } from "@/schema";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, url }) => {
    let token = cookies.get('token');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = 10;

    const response = await withActionHandler(() => getSecretsApi({ cookie: token as string, limit, page }));
    if(response.total_count != 0) {
        const totalPage = Math.ceil(response.total_count / limit);
        const pageIndex =  url.searchParams.get('page') ? parseInt(url.searchParams.get('page') || '1') : 1;
        return {
            secret: response.secret,
            counts: response.total_count,
            totalPage: totalPage,
            pageIndex: pageIndex,
            form: await superValidate(zod(updateSecertSchema)),
        }
    }else {
        return {
            secret: [],
            counts: 0,
            totalPage: 0,
            pageIndex: 1,
            form: await superValidate(zod(updateSecertSchema)),
        }
    }
}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(updateSecertSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const token = cookies.get('token');

        return withActionHandler(async () => {
            const response = await updateSecretsApi({
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
