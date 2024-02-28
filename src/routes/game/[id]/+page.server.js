

export async function load({params, fetch, locals}){
    const gameId = params.id;
    let game;
    let isMaster = false;
    let isUserInGame = false;
    const characters = [];
    
    try {
        const response = await fetch("/api/findRecord", {
            method: "POST",
            body: JSON.stringify({collection: "games", filter: 'id="' + gameId + '"'}),
            headers: {
                'content-type': "application/json"
            }
        });

        game = await response.json();

        isMaster = game.record.owner == locals.user.id;
        isUserInGame = locals.user.games.includes(game.record.id);

        // If user is master, retrieve every character to display on the page
        if(isMaster) {
            for(let characId of game.record.characters){
                const characResponse = await fetch('/api/findRecord', {
                    method: "POST",
                    body: JSON.stringify({collection: "characters", filter: 'id="' + characId + '"'}),
                    headers: {
                        'content-type': "application/json"
                    }
                });
                const charac = await characResponse.json();
                characters.push(charac.record);
            }
        }
        else {
            // If user is not the master and has not already joined the game.
            if(!isUserInGame) {
                for(let characId of game.record.characters){
                    const characResponse = await fetch('/api/findRecord', {
                        method: "POST",
                        body: JSON.stringify({collection: "characters", filter: 'id="' + characId + '"'}),
                        headers: {
                            'content-type': "application/json"
                        }
                    });
                    const charac = await characResponse.json();
                    
                    if(charac.record.isPlayable && charac.record.user == ''){
                        characters.push(charac.record);
                    }
                }
            }
            else {
                const response = await fetch("/api/findRecord", {
                    method: "POST",
                    body: JSON.stringify({collection: "characters", filter: 'user="' + locals.user.id + '"'}),
                    headers: {
                        'content-type': "application/json"
                    }
                });
                const charac = await response.json();
                characters.push(charac.record);
            }
        }
       
        if(game.error) {
            return {
                error: true,
                message: "Partie non trouvée."
            }
        }
    }
    catch(err) {
        return {
            error: true,
            message: "Something went wrong"
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
    deleteCharac: async ({fetch, request}) => {
        const data = await request.formData();
        const id = data.get("id");
        const user = data.get("user");
        const game = data.get("game");

        // If character has a user, remove the game from the user.
        if(user){
            const update = await fetch('/api/updateRecord', {
				method: 'PUT',
				body: JSON.stringify({collection: "users", updates: {'games+': "888"}, id: user}),
				headers: {
					'content-type': "application/json"
				}
			});
            
            const updateJson = await update.json();
            console.log(updateJson);
            
            if(updateJson.error){
                console.log("Error!");
                return;
            }
            
        }

        try {
            // const response = await fetch("/api/deleteRecord", {
            //     method: "DELETE",
            //     body: JSON.stringify({collection: "characters", id: id}),
            //     headers: {
            //         'content-type': "application/json"
            //     }
            // });

            // const respJson = await response.json();

            // if(respJson.error) {
            //     return {
            //         error: true,
            //         message: "Un problème est survenu."
            //     }
            // }
        }
        catch(err) {
            console.log("Error: " + err);
            return {
                error: true,
                message: "Un problème est survenu."
            }
        }
    },

    deleteGame: async ({request, fetch}) => {

    }
}