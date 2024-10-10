import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies }) => {
    // Delete the 'token' cookie
    cookies.delete('token', {
        path: '/', // Ensure this matches the path the cookie was set on
        sameSite: 'strict',
        expires: new Date(0) // Set to the past to delete
    });

    // Create a response that includes the redirect
    return new Response(null, {
        status: 302,
        headers: {
            location: '/login' // Redirect to the login page
        }
    });
};
