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

        // if (data.carriere.length < 3){
        //     return {
        //         error: true,
        //         message: "La carrière du personnage doit contenir au moins 3 caractères.",
        //         data: data
        //     }
        // }

        // if (data.echelon.length < 3){
        //     return {
        //         error: true,
        //         message: "L'échelon du personnage doit contenir au moins 3 caractères.",
        //         data: data
        //     }
        // }

        // if (data.statut.length < 3){
        //     return {
        //         error: true,
        //         message: "Le statut du personnage doit contenir au moins 3 caractères.",
        //         data: data
        //     }
        // }

        // if (data.schemaCarriere.length < 3){
        //     return {
        //         error: true,
        //         message: "Le schéma de carrière du personnage doit contenir au moins 3 caractères.",
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

        // if (data.cheveux.length < 3){
        //     return {
        //         error: true,
        //         message: "Les cheveux du personnage doivent contenir au moins 3 caractères.",
        //         data: data
        //     }
        // }

        // if (data.yeux.length < 3){
        //     return {
        //         error: true,
        //         message: "Les yeux du personnage doivent contenir au moins 3 caractères.",
        //         data: data
        //     }
        // }

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

        const baseCharacteristics = (init, aug = 0, editable = false) => {
            return {"init": Number.parseInt(init), "aug": parseInt(aug), "editable": editable};
        }
        const baseSkills = (charac, aug = 0, editable = false) => {
            return {"charac": charac, "aug": parseInt(aug), "editable": editable};
        }

        data.capCombat = baseCharacteristics(data.capCombat, data.capCombatAug, data.capCombatEditable == "on");
        data.capTir = baseCharacteristics(data.capTir, data.capTirAug, data.capTirEditable == "on");
        data.force = baseCharacteristics(data.force, data.forceAug, data.forceEditable == "on");
        data.endurance = baseCharacteristics(data.endurance, data.enduranceAug, data.enduranceEditable == "on");
        data.initiative = baseCharacteristics(data.initiative, data.initiativeAug, data.initiativeEditable == "on");
        data.agilite = baseCharacteristics(data.agilite, data.agiliteAug, data.agiliteEditable == "on");
        data.dexterite = baseCharacteristics(data.dexterite, data.dexteriteAug, data.dexteriteEditable == "on");
        data.intelligence = baseCharacteristics(data.intelligence, data.intelligenceAug, data.intelligenceEditable == "on");
        data.forceMentale = baseCharacteristics(data.forceMentale, data.forceMentaleAug, data.forceMentaleEditable == "on");
        data.sociabilite = baseCharacteristics(data.sociabilite, data.sociabiliteAug, data.sociabiliteEditable == "on");

        data.art = baseSkills("dexterite", data.artAug, data.artEditable == 'on');
        data.athletisme = baseSkills("agilite", data.athletismeAug, data.athletismeEditable == 'on');
        data.calme = baseSkills("forceMentale", data.calmeAug, data.calmeEditable == 'on');
        data.charme = baseSkills("sociabilite", data.charmeAug, data.charmeEditable == 'on');
        data.chevaucher = baseSkills("agilite", data.chevaucherAug, data.chevaucherEditable == 'on');
        data.commandement = baseSkills("sociabilite", data.commandementAug, data.commandementEditable == 'on');
        data.conduiteAttelage = baseSkills("agilite", data.conduiteAttelageAug, data.conduiteAttelageEditable == 'on');
        data.cacBase = baseSkills("capCombat", data.cacBaseAug, data.cacBaseEditable == 'on');
        data.cac = baseSkills("capCombat", data.cacAug, data.cacEditable == 'on');
        data.discretion = baseSkills("agilite", data.discretionAug, data.discretionEditable == 'on');
        data.divertissement = baseSkills("sociabilite", data.divertissementAug, data.divertissementEditable == 'on');
        data.empriseAnimaux = baseSkills("forceMentale", data.empriseAnimauxAug, data.empriseAnimauxEditable == 'on');
        data.escalade = baseSkills("force", data.escaladeAug, data.escaladeEditable == 'on');
        data.esquive = baseSkills("agilite", data.esquiveAug, data.esquiveEditable == 'on');
        data.intimidation = baseSkills("force", data.intimidationAug, data.intimidationEditable == 'on');
        data.intuition = baseSkills("initiative", data.intuitionAug, data.intuitionEditable == 'on');
        data.marchandage = baseSkills("sociabilite", data.marchandageAug, data.marchandageEditable == 'on');
        data.navigation = baseSkills("initiative", data.navigationAug, data.navigationEditable == 'on');
        data.pari = baseSkills("intelligence", data.pariAug, data.pariEditable == 'on');
        data.perception = baseSkills("initiative", data.perceptionAug, data.perceptionEditable == 'on');
        data.ragot = baseSkills("sociabilite", data.ragotAug, data.ragotEditable == 'on');
        data.ramer = baseSkills("force", data.ramerAug, data.ramerEditable == 'on');
        data.resistance = baseSkills("endurance", data.resistanceAug, data.resistanceEditable == 'on');
        data.resistanceAlcool = baseSkills("endurance", data.resistanceAlcoolAug, data.resistanceAlcoolEditable == 'on');
        data.subornation = baseSkills("sociabilite", data.subornationAug, data.subornationEditable == 'on');
        data.survieExterieur = baseSkills("intelligence", data.survieExterieurAug, data.survieExterieurEditable == 'on');

        data.nbPossessions = {};
        data.nbTalents = {};

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