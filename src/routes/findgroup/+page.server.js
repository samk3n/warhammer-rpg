import { redirect } from '@sveltejs/kit';

export async function load({fetch, url}) {
    const gameId = url.searchParams.get("gameId");
    const characId = url.searchParams.get("characId");

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
                    message: "Problème lors de l'ajout du personnages au groupe."
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

        throw redirect(303, "/character/" + characId)
        
    }
}