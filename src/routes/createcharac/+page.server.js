import { redirect } from '@sveltejs/kit';

export async function load({url, fetch}) {
    const gameId = url.searchParams.get("gameId");
    
    if(!gameId){
        throw redirect(303, "/");
    }

    // Get all talents
    const talentResponse = await fetch("/api/getFullCollection", {
        method: "POST",
        body: JSON.stringify({collection: "talents", sort: "name"}),
        headers: {
            'content-type': "application/json"
        }
    });
    const talentResponseJson = await talentResponse.json();
    let talents = talentResponseJson.records;
    
    return {
        gameId: gameId,
        talents: talents
    }    
}


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, fetch}) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        data.characteristics = JSON.parse(data.characteristics);
        data.baseSkills = JSON.parse(data.baseSkills);
        data.advancedSkills = JSON.parse(data.advancedSkills);
        data.advancedSkillsProps = JSON.parse(data.advancedSkillsProps);
        
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

        // if (data.race.length < 3){
        //     return {
        //         error: true,
        //         message: "La race du personnage doit contenir au moins 3 caractères.",
        //         data: data
        //     }
        // }

        // if (data.classe.length < 3){
        //     return {
        //         error: true,
        //         message: "La classe du personnage doit contenir au moins 3 caractères.",
        //         data: data
        //     }
        // }

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

        if(data.capCombatAug < 0 || data.capTirAug < 0 || data.forceAug < 0 || data.enduranceAug < 0 || data.initiativeAug < 0 || 
            data.agiliteAug < 0  || data.dexteriteAug < 0  || data.intelligenceAug < 0 || data.intelligenceAug > 100 ||
            data.forceMentaleAug < 0 || data.sociabiliteAug < 0 || data.artAug < 0 || data.athletismeAug < 0 || data.calmeAug < 0 ||
            data.charmeAug < 0 || data.chevaucherAug < 0 || data.commandementAug < 0 || data.conduiteAttelageAug < 0 ||
            data.cacBaseAug < 0 || data.cacAug < 0 || data.discretionAug < 0 || data.divertissementAug < 0 || data.empriseAnimauxAug < 0 ||
            data.escaladeAug < 0 || data.esquiveAug < 0 || data.intimidationAug < 0 || data.intuitionAug < 0 || data.marchandageAug < 0 ||
            data.navigationAug < 0 || data.pariAug < 0 || data.perceptionAug < 0 || data.ragotAug < 0 || data.ramerAug < 0 ||
            data.resistanceAug < 0 || data.resistanceAlcoolAug < 0 || data.subornationAug < 0 || data.survieExterieurAug < 0) {
                return {
                    error: true,
                    message: "Les augmentations doivent être positives.",
                    data: data
                }
            }

        data.talents = data.talents.length > 0 ? data.talents.split(",") : [];
        data.nbTalents = {};
        if(data.talents.length > 0) {
            for(let talent of data.talents){
                data.nbTalents[talent] = {};
                data.nbTalents[talent].count = 1;
            }
        }

        data.nbPossessions = {};
        data.nbMeleeWeapons = {};
        data.nbRangeWeapons = {};
        

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