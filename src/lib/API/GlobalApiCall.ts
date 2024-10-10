import { RedirectError } from './errorUtils';

interface GlobalApiCallProps {
    url: string,
    options: RequestInit
}

export const GlobalApiCall = async ({ url, options }: GlobalApiCallProps) => {
    try {

        const response = await fetch(url, {
            ...options,
            credentials: 'include',
        });
    
        if(response.status === 401) {
            throw new RedirectError(302, '/logout', 'Session expired');
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    
        return response;
    }
    catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }

}