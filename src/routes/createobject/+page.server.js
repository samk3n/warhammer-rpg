import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    createobject: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);


        if(data.name.length < 3) {
            return {
                error: true,
                message: "Le nom du groupe doit contenir au moins 3 caractères."
            } 
        }

        if(data.encombrement < 0) {
            return {
                error: true,
                message: "L'encombrement doit être positif."
            } 
        }

        try {
            // Create the object
            const createObject = await fetch('/api/createRecord', {
				method: 'PUT',
				body: JSON.stringify({collection: "objects", data: data}),
				headers: {
					'content-type': "application/json"
				}
			});
            const createObjectJson = await createObject.json();

            if(createObjectJson.error) {
                return {
                    error: true,
                    message: "Erreur lors de la création de l'objet."
                }
            }            

        }
        catch (err) {
            console.log("Error: " + err);
            return {
				error: true,
				message: "Une erreur s'est produite lors de la création de l'objet."
			};
        }

        throw redirect(303, "/objects");

    }
}