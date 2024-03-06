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
        
        if(data.isPlayable == 'on') {
            data.isPlayable = true;
        }

        if (data.name.length < 3){
            return {
                error: true,
                message: "Le nom du personnage doit contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.race.length < 3){
            return {
                error: true,
                message: "La race du personnage doit contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.classe.length < 3){
            return {
                error: true,
                message: "La classe du personnage doit contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.carriere.length < 3){
            return {
                error: true,
                message: "La carrière du personnage doit contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.echelon.length < 3){
            return {
                error: true,
                message: "L'échelon du personnage doit contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.statut.length < 3){
            return {
                error: true,
                message: "Le statut du personnage doit contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.schemaCarriere.length < 3){
            return {
                error: true,
                message: "Le schéma de carrière du personnage doit contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.age < 0){
            return {
                error: true,
                message: "L'âge du personnage doit être positif.",
                data: data
            }
        }

        if (data.taille < 0){
            return {
                error: true,
                message: "La taille du personnage doit être positive.",
                data: data
            }
        }

        if (data.cheveux.length < 3){
            return {
                error: true,
                message: "Les cheveux du personnage doivent contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.yeux.length < 3){
            return {
                error: true,
                message: "Les yeux du personnage doivent contenir au moins 3 caractères.",
                data: data
            }
        }

        if (data.destin < 0){
            return {
                error: true,
                message: "Le destin du personnage doit être positif.",
                data: data
            }
        }

        if (data.chance < 0){
            return {
                error: true,
                message: "La chance du personnage doit être positive.",
                data: data
            }
        }

        if (data.resilience < 0){
            return {
                error: true,
                message: "La résilience du personnage doit être positive.",
                data: data
            }
        }

        if (data.determination < 0){
            return {
                error: true,
                message: "La détermination du personnage doit être positive.",
                data: data
            }
        }

        if (data.motivation < 0){
            return {
                error: true,
                message: "La motivation du personnage doit être positive.",
                data: data
            }
        }

        if (data.mouvement < 0){
            return {
                error: true,
                message: "Le mouvement du personnage doit être positif.",
                data: data
            }
        }

        if (data.marche < 0){
            return {
                error: true,
                message: "La marche du personnage doit être positive.",
                data: data
            }
        }

        if (data.course < 0){
            return {
                error: true,
                message: "La course du personnage doit être positive.",
                data: data
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
                message: "Un problème est survenu.",
                data: data
            }
        }

        throw redirect(303, "/game/" + data.game);
    }
}