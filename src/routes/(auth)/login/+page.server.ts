import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { loginSchema } from "@/schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import { loginApi } from "@/API/api";
import { withActionHandler } from "@/API/actionUtils";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(loginSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(loginSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        return withActionHandler(async () => {
            const response = await loginApi(form.data);
    
            if (response.status === "success" && response) {
                // Assuming your API response includes a token on successful login
                event.cookies.set("token", response.token, {
                    httpOnly: true,
                    path: '/',
                    secure: true, // Ensure cookies are sent only over HTTPS
                    sameSite: "strict",
                    maxAge: 60 * 60 // 1 week
                });
    
                return {
                    form,
                    apiResponse: response,
                };
            } else {
                return fail(400, {
                    form,
                    apiResponse: response,
                });
            }            
        }, { defaultForm: form, returnFormOnError: true })
       
    },
};
