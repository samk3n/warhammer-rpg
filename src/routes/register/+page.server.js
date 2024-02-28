import { redirect } from '@sveltejs/kit';

export function load({locals}) {
	if(locals.pb.authStore.isValid) {
		throw redirect(303, "/");
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({ locals, request, fetch }) => {
		const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

		if(data.username.length < 3) {
			return {
				error: true,
				message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
				username: data.username,
				email: data.email,
			}
		}

		if(data.password.length <8) {
			return {
				error: true,
				message: "Le mot de passe doit contenir au moins 8 caractères.",
				username: data.username,
				email: data.email,
			}
		}

		data["passwordConfirm"] = data.password;

        try {
			// const newUser = await locals.pb.collection('users').create(data);

            const response = await fetch('/api/createRecord', {
				method: 'PUT',
				body: JSON.stringify({collection: "users", data: data}),
				headers: {
					'content-type': "application/json"
				}
			});

		}
		catch(err) {
			console.log("Error: " + err);
			// return err;
		}

        throw redirect(303, "/login");

	},
};