import { redirect } from '@sveltejs/kit';

export function load({params}) {
    const gameId = params.gameId;

    return {
        gameId: gameId
    }    
}


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, fetch}) => {
        
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        if (data.name.length < 3){
            return {
                error: true,
                message: "Le nom du personnage doit contenir au moins 3 caractères."
            }
        }

        try {
            // Creates the new character
            const recordResponse = await fetch('/api/createRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "characters", data: data}),
                headers: {
                    'content-type': "application/json"
                }
            });
            const charac = await recordResponse.json();

            // Updates the game with the new character
            await fetch('/api/updateRecord', {
                method: "PUT",
                body: JSON.stringify({collection: "games", id: data.game, updates: { 'characters+': charac.record.id }}),
                headers: {
                    'content-type': "application/json"
                }
            });
            
        }
        catch(err) {
            console.log("Error: " + err);
            return {
                error: true,
                message: "Un problème est survenu."
            }
        }

        throw redirect(303, "/game/" + data.game);
    }
}