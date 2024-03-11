import { redirect } from '@sveltejs/kit';


export async function load({params, fetch, locals}){
    const gameId = params.id;
    let game;
    let isMaster = false;
    let isUserInGame = false;
    const characters = [];
    //
    try {
        const response = await fetch("/api/findRecord", {
            method: "POST",
            body: JSON.stringify({collection: "games", filter: 'id="' + gameId + '"', expand: "characters"}),
            headers: {
                'content-type': "application/json"
            }
        });

        game = await response.json();

        if(game.error) {
            return {
                error: true,
                message: "Partie non trouvée."
            }
        }

        isMaster = game.record.owner == locals.user.id;
        isUserInGame = locals.user.games.includes(game.record.id);

        // If user is not master
        if(!isMaster){
            // If user is not the master and has not already joined the game.
            if(!isUserInGame) {
                if(game.record.expand.characters) {
                    game.record.expand.characters = game.record.expand.characters.filter((charac) => charac.isPlayable && charac.user == '');
                }
            }
            // If user is not master and has already joined the game.
            else {
                if(game.record.expand.characters) {
                    game.record.expand.characters = game.record.expand.characters.filter((charac) => {
                        return charac.user == locals.user.id;
                    });
                }
            }
        }
    }
    catch(err) {
        return {
            error: true,
            message: "Une erreur s'est produite."
        }
    }
    
    return {
        game: game.record,
        characters: characters,
        isMaster: isMaster,
        isUserInGame: isUserInGame
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    deleteGame: async ({request, fetch}) => {
        const data = await request.formData();
        const id = data.get("id");

        try {
            const response = await fetch("/api/deleteRecord", {
                method: "DELETE",
                body: JSON.stringify({collection: "games", id: id}),
                headers: {
                    'content-type': "application/json"
                }
            });
    
            const respJson = await response.json();
    
            if(respJson.error) {
                return {
                    error: true,
                    message: "Un problème est survenu."
                }
            }
        }
        catch(err) {
            console.log("Error: " + err);
            return {
                error: true,
                message: "Un problème est survenu."
            }
        }

        throw redirect(303, "/yourgames");
    },

    joinGame: async ({request, fetch, locals}) => {
        const data = await request.formData();
        const characId = data.get("characId");
        const gameId = data.get("gameId");

        try {
            const updateCharac = await fetch('/api/updateRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "characters", updates: {user: locals.user.id}, id: characId}),
                headers: {
                    'content-type': "application/json"
                }
            });
            
            const updateCharacJson = await updateCharac.json();

            if(updateCharacJson.error){
                return{
                    error: true,
                    message: "Un problème est survenu."
                };
            }

            const updateUser = await fetch('/api/updateRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "users", updates: {'games+': gameId}, id: locals.user.id}),
                headers: {
                    'content-type': "application/json"
                }
            });
            
            const updateUserJson = await updateUser.json();
            
            if(updateUserJson.error){
                return{
                    error: true,
                    message: "Un problème est survenu."
                };
            }

            const characResponse = await fetch('/api/findRecord', {
                method: 'POST',
                body: JSON.stringify({collection: "characters", filter: 'id="' + characId + '"'}),
                headers: {
                    'content-type': "application/json"
                }
            });
            const charac = await characResponse.json();
        }
        catch(err) {
            console.log("Error: " + err);
            return {
                error: true,
                message: "Un problème est survenu."
            }
        }

        throw redirect(303, "/character/" + characId);
    }
}