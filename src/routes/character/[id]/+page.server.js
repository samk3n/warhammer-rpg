import { redirect } from '@sveltejs/kit';

export async function load({fetch, params, locals}){
    const characId = params.id;
    let isMaster = false;

    const characResponse = await fetch("/api/findRecord", {
        method: "POST",
        body: JSON.stringify({collection: "characters", filter: 'id="' + characId + '"', expand: "user,group,game"}),
        headers: {
            'content-type': "application/json"
        }
    });

    const character = await characResponse.json();

    // If the currently logged in user is not the character user or is the master of the game, redirect to the game page.
    if(locals.user.id != character.record.user && locals.user.id != character.record.expand.game.owner) {
        throw redirect(303, "/game/" + game.record.id);
    }

    if(locals.user.id == character.record.expand.game.owner){
        isMaster = true;
    }

    return {
        character: character.record,
        isMaster: isMaster
    }
}

export const actions = {
    leaveCharac: async ({request, fetch}) => {
        const data = await request.formData();
        const characId = data.get("characId");
        const gameId = data.get("gameId");
        const userId = data.get("userId");

        try {
            // Remove the user from the character
            const updateCharac = await fetch('/api/updateRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "characters", updates: {user: ''}, id: characId}),
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
    
            // Remove the game from the user
            const updateUser = await fetch('/api/updateRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "users", updates: {'games-': gameId}, id: userId}),
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
        }
        catch(err) {
            console.log("Error: " + err);
            return {
                error: true,
                message: "Un problème est survenu."
            }
        }
    },

    deleteCharac: async ({fetch, request}) => {
        const data = await request.formData();
        const characId = data.get("characId");
        const userId = data.get("userId");
        const gameId = data.get("gameId");        

        try {
            // If character has a user, remove the game from the user.
            if(userId != ''){
                const update = await fetch('/api/updateRecord', {
                    method: 'PUT',
                    body: JSON.stringify({collection: "users", updates: {'games-': gameId}, id: userId}),
                    headers: {
                        'content-type': "application/json"
                    }
                });
                
                const updateJson = await update.json();
                
                if(updateJson.error){
                    return{
                        error: true,
                        message: "Un problème est survenu."
                    };
                }
                
            }

            // Delete the character record
            const response = await fetch("/api/deleteRecord", {
                method: "DELETE",
                body: JSON.stringify({collection: "characters", id: characId}),
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

        throw redirect(303, "/game/" + gameId);
    },

    leaveGroup: async ({fetch, request}) => {
        const data = await request.formData();
        const groupId = data.get("groupId");
        const characId = data.get("characId");

        try {
            const updateCharac = await fetch('/api/updateRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "characters", updates: {group: ""}, id: characId}),
                headers: {
                    'content-type': "application/json"
                }
            });
            const updateCharacJson = await updateCharac.json();

            if(updateCharacJson.error){
                return {
                    error: true,
                    message: "Problème lors du retrait du groupe au personnage."
                }
            }

            const updateGroup = await fetch('/api/updateRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "groups", updates: {"characters-": characId}, id: groupId}),
                headers: {
                    'content-type': "application/json"
                }
            });
            const updateGroupJson = await updateGroup.json();

            if(updateGroupJson.error){
                return {
                    error: true,
                    message: "Problème lors du retrait du personnage au groupe."
                }
            }
        }
        catch (err) {
            console.log("Error: " + err);
            return {
                error: true,
                message: "Un problème est survenu."
            }
        }

        throw redirect(303, "/character/" + characId);
    }
}