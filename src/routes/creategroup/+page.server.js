import { redirect } from '@sveltejs/kit';

export function load({url}){
    const characId = url.searchParams.get("characId");

    return {
        characId: characId
    }
;}

/** @type {import('./$types').Actions} */
export const actions = {
    creategroup: async ({ locals, request, fetch }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);


        if(data.name.length < 3) {
            return {
                error: true,
                message: "Le nom du groupe doit contenir au moins 3 caractères."
            } 
        }

        if(data.join && !locals.user.group) {
            data.characters = [data.characId];
        }

        try {
            const characResponse = await fetch('/api/findRecord', {
				method: 'POST',
				body: JSON.stringify({collection: "characters", filter: 'id="' + data.characId + '"'}),
				headers: {
					'content-type': "application/json"
				}
			});
            const charac = await characResponse.json();

            data.game = charac.record.game;
            
            const groupResponse = await fetch('/api/createRecord', {
				method: 'PUT',
				body: JSON.stringify({collection: "groups", data: data}),
				headers: {
					'content-type': "application/json"
				}
			});
            const group = await groupResponse.json();

            if(data.join && !locals.user.group) {
                await fetch('/api/updateRecord', {
                    method: 'PUT',
                    body: JSON.stringify({collection: "characters", updates: {group: group.record.id}, id: data.characId}),
                    headers: {
                        'content-type': "application/json"
                    }
                });
            }

        }
        catch (err) {
            console.log("Error: " + err);
            return {
				error: true,
				message: "Une erreur s'est produite."
			};
        }

        throw redirect(303, "/character/" + data.characId);
    }
}