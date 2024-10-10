import { fail, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { userDataSchema, passwordChangeSchema } from "@/schema";
import { zod } from "sveltekit-superforms/adapters";
import { dataMeApi, UpdatedUserNameAPI, UpdatedUserPasswordAPI } from "@/API/api";
import { withActionHandler } from "@/API/actionUtils";

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('token');

    const result = await withActionHandler(() => dataMeApi({ cookies: token as string }), {
        returnFormOnError: false,
    });

    const user = result.status === 'success' ? result.data.user : null;

    return {
        userDataForm: await superValidate(zod(userDataSchema)),
        passwordChangeForm: await superValidate(zod(passwordChangeSchema)),
        user: user,
    };
};

export const actions: Actions = {
    updateUserData: async ({ request, cookies }) => {
        const userDataForm = await superValidate(request, zod(userDataSchema));

        if (!userDataForm.valid) {
            return fail(400, { userDataForm });  // Only return userDataForm
        }

        const token = cookies.get('token');

        return withActionHandler(async () => {
            const response = await UpdatedUserNameAPI({ cookie: token as string, name: userDataForm.data.name });
            return ({
                userDataForm,  // Update only userDataForm
                updateUserDataResponse: response,
            });
        }, {
            defaultForm: userDataForm,
            returnFormOnError: true,
            errorResponseKey: 'updateUserDataResponse',
            formKey: 'userDataForm',
        });
    },
    updateUserPassword: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(passwordChangeSchema));

        if (!form.valid) {
            return fail(400, { passwordChangeForm: form });  // Only return passwordChangeForm
        }

        const token = cookies.get('token');

        return withActionHandler(async () => {
            const response = await UpdatedUserPasswordAPI({ 
                cookie: token as string, 
                new_password: form.data.newpassword, 
                new_password_confirm: form.data.newpasswordConfirm,
                old_password: form.data.oldpassword,
            });
            return {
                passwordChangeForm: form,  // Update only passwordChangeForm
                updateUserPasswordResponse: response,
            };
        }, {
            defaultForm: form,
            returnFormOnError: true,
            errorResponseKey: 'updateUserPasswordResponse',
            formKey: 'passwordChangeForm',
        });
    },
};
