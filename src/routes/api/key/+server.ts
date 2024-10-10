import type { RequestHandler } from "@sveltejs/kit";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const GET: RequestHandler = async ({ fetch, url }) => {
    let key = url.searchParams.get('key');
    if (!key) {
        return Response.json({
            error: 'Key is required'
        }, { status: 400 }); // Set status to 400 for bad request
    }

    let secret = url.searchParams.get('secret');
    if (!secret) {
        return Response.json({
            error: 'Secret is required'
        }, { status: 400 }); // Set status to 400 for bad request
    }
    
    // Corrected URL construction
    const result = await fetch(`${API_BASE_URL}/keys/secert?key=${key}&secret=${secret}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!result.ok) {
        return Response.json({
            error: 'Failed to fetch secret from the external API',
        }, { status: result.status }); // Forward status from the external API if it fails
    }

    const response = await result.json();

    // Check if the response from the external API contains the expected data
    if (!response.value) {
        return Response.json({
            error: 'No value found in the response',
        }, { status: 404 }); // Not found if the value does not exist
    }

    return Response.json({
        value: response.value
    });
};
