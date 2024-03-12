import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({ request, fetch }) => {
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

            const response = await fetch('/api/createRecord', {
				method: 'PUT',
				body: JSON.stringify({collection: "users", data: data}),
				headers: {
					'content-type': "application/json"
				}
			});
			const respJson = await response.json();

			if(respJson.error){
				return {
					error: true,
					message: "Un problème est survenu lors de la création du compte."
				}
			}

		}
		catch(err) {
			console.log("Error: " + err);
			return {
				error: true,
				message: "Un problème est survenu lors de l'inscription."
			}
		}

        throw redirect(303, "/login");

	},
};