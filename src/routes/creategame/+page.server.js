import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	creategame: async ({ locals, request, fetch }) => {
		const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

		let game;

        if(data.name.length < 3) {
            return {
                error: true,
                message: "Le nom de la partie doit contenir au moins 3 caractères."
            }
        }

        if(data.passwordEnabled && data.password.length == 0) {
            return {
                error: true,
                message: "Le mot de passe ne doit pas être vide s'il est activé."
            }
        }

        data["owner"] = locals.user.id;

        try {
			// Creates the new game record.
			const recordResponse = await fetch('/api/createRecord', {
				method: 'PUT',
				body: JSON.stringify({collection: "games", data: data}),
				headers: {
					'content-type': "application/json"
				}
			});
            game = await recordResponse.json();

			// Adds the new game to the logged in user's list of games
            await fetch('/api/updateRecord', {
				method: 'PUT',
				body: JSON.stringify({collection: "users", updates: {'games+': game.record.id}, id: locals.user.id}),
				headers: {
					'content-type': "application/json"
				}
			});

		}
		catch(err) {
			console.log("Error: " + err);
            return {
				error: true,
				message: "Une erreur s'est produite."
			};
		}

		throw redirect(303, "/game/" + game.record.id);
	}
};