import { redirect } from '@sveltejs/kit'; 

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
    // If route is not /login or /register and no user logged in, redirect to /login
    if(url.pathname != "/login" && url.pathname != "/register" && !locals.pb.authStore.isValid){
        throw redirect(303, "/login");
    }

    // If route is /login or /register and user logged in, redirect to home
    if((url.pathname == "/login" || url.pathname == "/register") && locals.pb.authStore.isValid) {
		throw redirect(303, "/");
	}

    return {
        user: locals.user
    }
}