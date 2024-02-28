import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch }) {
	if(!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}
}