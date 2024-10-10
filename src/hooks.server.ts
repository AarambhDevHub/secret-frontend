import { dataMeApi } from '@/API/api';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');

    // Define protected and public paths.
    const protectedPaths = ['/database', '/encryption', '/secret', '/profile', '/logout'];
    const publicPaths = ['/api/key'];
    const authPaths = ['/login', '/register'];

    const isProtectedPath = protectedPaths.some(path => event.url.pathname.startsWith(path));
    const isPublicPath = publicPaths.some(path => event.url.pathname.startsWith(path));
    const isAuthPath = authPaths.some(path => event.url.pathname.startsWith(path));

    // Allow access to public paths without authentication.
    if (isPublicPath) {
        return resolve(event);
    }

    // Redirect to login if token is missing for protected paths or root.
    if (!token) {
        if(!isAuthPath) {
            console.log('Redirecting to /login because token is missing');
            return new Response(null, {
                status: 302,
                headers: {
                    location: '/login',
                },
            });
        }
    }

    let user = null;

    // Fetch user data if token exists.
    if (token) {
        try {
            const response = await dataMeApi({ cookies: token });
            if (response.status === 'success') {
                user = response.data.user;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }

        // If user is invalid, redirect to login.
        if (!user) {
            console.log('Redirecting to /login because user is invalid');
            return event.url.pathname !== '/logout' ?
                new Response(null, {
                status: 302,
                headers: {
                    location: '/logout',
                },
            }): resolve(event);
        }

        // Check if database connection exists and redirect if necessary.
        if (!user.dbConnectionExists) {
            console.log('Redirecting to /database because dbConnectionExists is false');
            return event.url.pathname !== '/database'
                ? new Response(null, {
                    status: 302,
                    headers: {
                        location: '/database',
                    },
                })
                : resolve(event);
        } else if (!user.encryption_method) {
            console.log('Redirecting to /encryption because encryption_method is not set');
            return event.url.pathname !== '/encryption'
                ? new Response(null, {
                    status: 302,
                    headers: {
                        location: '/encryption',
                    },
                })
                : resolve(event);
        } else {
            if (event.url.pathname === '/database' || event.url.pathname === '/encryption') {
                return new Response(null, {
                    status: 302,
                    headers: {
                        location: '/secret',
                    },
                });
            }
        }

        // Redirect to /secret for valid users not on protected paths.
        if (!isProtectedPath) {
            console.log('Redirecting to /secret for unprotected paths');
            return new Response(null, {
                status: 302,
                headers: {
                    location: '/secret',
                },
            });
        }
    }

    // Proceed with the request if no redirect conditions are met.
    return resolve(event);
};
