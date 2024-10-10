import { fail, redirect } from '@sveltejs/kit';
import { handleApiError } from './errorUtils';

interface ActionOptions {
    returnFormOnError?: boolean;
    defaultForm?: any;
    errorResponseKey?: string;
    formKey?: string;
}

export const withActionHandler = async <T>(
    action: () => Promise<T>,
    options: ActionOptions = { returnFormOnError: false }
) => {
    try {
        return await action();
    } catch (error) {
        const { status, message, location } = handleApiError(error);
        const errorKey = options.errorResponseKey || 'apiResponse';
        const formKey = options.formKey || 'form';
        if (location) {
            throw redirect(302, location);
        }
        else if (options.returnFormOnError) {

            return fail(400,{
                [formKey]: options.defaultForm ?? {},
                [errorKey]: { status, message }
            });
        } else {
            return fail(400, { [errorKey]: { status, message } });
        }
    }
};
