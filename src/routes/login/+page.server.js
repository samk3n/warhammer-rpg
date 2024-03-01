import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals }) => {
		const data = await request.formData();
		const username = data.get('user');
		const password = data.get('password');

        try {
			await locals.pb.collection('users').authWithPassword(username, password);
		}
		catch(err) {
			console.log("Error: " + err);
			return {
				error: true,
				message: "Le nom d'utilisateur/email et/ou le mot de passe sont incorrects."
			}
		}

        throw redirect(303, "/");
	}
};