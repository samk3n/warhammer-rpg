import { redirect } from '@sveltejs/kit';

export async function load({fetch, url}) {
    const gameId = url.searchParams.get("gameId");
    const characId = url.searchParams.get("characId");

    // If one of the parameters is null, redirect to home
    if(!gameId || !characId) {
        throw redirect(303, "/");
    }

    // Get all groups in DB
    const response = await fetch('/api/getFullCollection', {
        method: 'POST',
        body: JSON.stringify({collection: "groups"}),
        headers: {
            'content-type': "application/json"
        }
    });

    // List of groups
    const json = await response.json();
    let groups = json.records;

    // Removes the groups that don't belong in this game
    groups = groups.filter((group) => {
        return group.game == gameId;
    });
    
    return {
        groups: groups,
        characId: characId
    }
}

export const actions = {
    joinGroup: async ({request, fetch}) => {
        const data = await request.formData();
        const characId = data.get("characId");
        const groupId = data.get("groupId");

        try {

            // Update the character record with the new group joined
            const characUpdate = await fetch('/api/updateRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "characters", updates: {group: groupId}, id: characId}),
                headers: {
                    'content-type': "application/json"
                }
            });
            const characUpdateJson = await characUpdate.json();

            if(characUpdateJson.error){
                return {
                    error: true,
                    message: "Problème lors de l'ajout du groupe au personnage."
                }
            }

            // Update the group with the character that joined
            const groupUpdate = await fetch('/api/updateRecord', {
                method: 'PUT',
                body: JSON.stringify({collection: "groups", updates: {"characters+": characId}, id: groupId}),
                headers: {
                    'content-type': "application/json"
                }
            });
            const groupUpdateJson = await groupUpdate.json();

            if(groupUpdateJson.error){
                return {
                    error: true,
                    message: "Problème lors de l'ajout du personnage au groupe."
                }
            }

        }
        catch(err) {
            console.log("Error: " + err);
            return {
                error: true,
                message: "Un problème est survenu lorsque vous avez tenté de rejoindre le groupe."
            }
        }

        throw redirect(303, "/character/" + characId)
        
    }
}