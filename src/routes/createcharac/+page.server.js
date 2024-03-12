import { redirect } from '@sveltejs/kit';

export function load({url}) {
    const gameId = url.searchParams.get("gameId");
    
    if(!gameId){
        throw redirect(303, "/");
    }
    
    return {
        gameId: gameId
    }    
}


/** @type {import('./$types').Actions} */
export const actions = {
    createCharac: async ({request, fetch}) => {
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

        if(data.capCombat < 0 || data.capCombat > 100 || data.capTir < 0 || data.capTir > 100 ||
            data.force < 0 || data.force > 100 || data.endurance < 0 || data.endurance > 100 ||
            data.initiative < 0 || data.initiative > 100 || data.agilite < 0 || data.agilite > 100 ||
            data.dexterite < 0 || data.dexterite > 100 || data.intelligence < 0 || data.intelligence > 100 ||
            data.forceMentale < 0 || data.forceMentale > 100 || data.sociabilite < 0 || data.sociabilite > 100 ||
            data.capCombat == "" || data.capTir == "" || data.force == "" || data.endurance == "" ||
            data.initiative == "" || data.agilite == "" || data.dexterite == "" || data.intelligence == "" ||
            data.forceMentale == "" || data.sociabilite == "") {
                return {
                    error: true,
                    message: "Les caractéristiques doivent être entre 0 et 100.",
                    data: data
                }
            }

        const baseCharacteristics = (init) => {
            return {"init": Number.parseInt(init), "aug": 0, "editable": false};
        }
        const baseSkills = (charac) => {
            return {"charac": charac, "aug": 0, "editable": false};
        }

        data.capCombat = baseCharacteristics(data.capCombat);
        data.capTir = baseCharacteristics(data.capTir);
        data.force = baseCharacteristics(data.force);
        data.endurance = baseCharacteristics(data.endurance);
        data.initiative = baseCharacteristics(data.initiative);
        data.agilite = baseCharacteristics(data.agilite);
        data.dexterite = baseCharacteristics(data.dexterite);
        data.intelligence = baseCharacteristics(data.intelligence);
        data.forceMentale = baseCharacteristics(data.forceMentale);
        data.sociabilite = baseCharacteristics(data.sociabilite);

        data.art = baseSkills("dexterite");
        data.athletisme = baseSkills("agilite");
        data.calme = baseSkills("forceMentale");
        data.charme = baseSkills("sociabilite");
        data.chevaucher = baseSkills("agilite");
        data.commandement = baseSkills("sociabilite");
        data.conduiteAttelage = baseSkills("agilite");
        data.cacBase = baseSkills("capCombat");
        data.cac = baseSkills("capCombat");
        data.discretion = baseSkills("agilite");
        data.divertissement = baseSkills("sociabilite");
        data.empriseAnimaux = baseSkills("forceMentale");
        data.escalade = baseSkills("force");
        data.esquive = baseSkills("agilite");
        data.intimidation = baseSkills("force");
        data.intuition = baseSkills("initiative");
        data.marchandage = baseSkills("sociabilite");
        data.navigation = baseSkills("initiative");
        data.pari = baseSkills("intelligence");
        data.perception = baseSkills("initiative");
        data.ragot = baseSkills("sociabilite");
        data.ramer = baseSkills("force");
        data.resistance = baseSkills("endurance");
        data.resistanceAlcool = baseSkills("endurance");
        data.subornation = baseSkills("sociabilite");
        data.survieExterieur = baseSkills("intelligence");

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
                message: "Un problème est survenu lors de la création du personnage.",
                data: data
            }
        }

        throw redirect(303, "/game/" + data.game);
    }
}