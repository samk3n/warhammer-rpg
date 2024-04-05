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

        const characteristic = (init, aug = 0, order, editable = false) => {
            return {"init": Number.parseInt(init), "aug": parseInt(aug), "editable": editable, order: order};
        }
        function characOrSkillObject(list) {
            let object = {};
            for(let element of list) {
                object[element[0]] = element[1];
            }
            return object;
        }

        const baseSkill = (charac, aug = 0, editable = false) => {
            return {"charac": charac, "aug": parseInt(aug), "editable": editable};
        }

        const groupedSkill = (charac, aug = 0, editable = false, ...spe) => {
            return {"charac": charac, "aug": parseInt(aug), "editable": editable, spe: spe, grouped: true};
        }

        // CHARACTERISTICS
        data.capCombat = characteristic(data.capCombat, data.capCombatAug, 0, data.capCombatEditable == "on");
        data.capTir = characteristic(data.capTir, data.capTirAug, 1, data.capTirEditable == "on");
        data.force = characteristic(data.force, data.forceAug, 2, data.forceEditable == "on");
        data.endurance = characteristic(data.endurance, data.enduranceAug, 3, data.enduranceEditable == "on");
        data.initiative = characteristic(data.initiative, data.initiativeAug, 4, data.initiativeEditable == "on");
        data.agilite = characteristic(data.agilite, data.agiliteAug, 5, data.agiliteEditable == "on");
        data.dexterite = characteristic(data.dexterite, data.dexteriteAug, 6, data.dexteriteEditable == "on");
        data.intelligence = characteristic(data.intelligence, data.intelligenceAug, 7, data.intelligenceEditable == "on");
        data.forceMentale = characteristic(data.forceMentale, data.forceMentaleAug, 8, data.forceMentaleEditable == "on");
        data.sociabilite = characteristic(data.sociabilite, data.sociabiliteAug, 9, data.sociabiliteEditable == "on");

        data.characteristics = characOrSkillObject([
            ["capCombat", data.capCombat],
            ["capTir", data.capTir],
            ["force", data.force],
            ["endurance", data.endurance],
            ["initiative", data.initiative],
            ["agilite", data.agilite],
            ["dexterite", data.dexterite],
            ["intelligence", data.intelligence],
            ["forceMentale", data.forceMentale],
            ["sociabilite", data.sociabilite],
        ]);

        // BASE SKILLS
        let art = groupedSkill("dexterite", data.artAug, data.artEditable == 'on');
        let athletisme = baseSkill("agilite", data.athletismeAug, data.athletismeEditable == 'on');
        let calme = baseSkill("forceMentale", data.calmeAug, data.calmeEditable == 'on');
        let charme = baseSkill("sociabilite", data.charmeAug, data.charmeEditable == 'on');
        let chevaucher = groupedSkill("agilite", data.chevaucherAug, data.chevaucherEditable == 'on');
        let commandement = baseSkill("sociabilite", data.commandementAug, data.commandementEditable == 'on');
        let conduiteAttelage = baseSkill("agilite", data.conduiteAttelageAug, data.conduiteAttelageEditable == 'on');
        let cacBase = baseSkill("capCombat", data.cacBaseAug, data.cacBaseEditable == 'on');
        let cac = groupedSkill("capCombat", data.cacAug, data.cacEditable == 'on');
        let discretion = groupedSkill("agilite", data.discretionAug, data.discretionEditable == 'on');
        let divertissement = groupedSkill("sociabilite", data.divertissementAug, data.divertissementEditable == 'on');
        let empriseAnimaux = baseSkill("forceMentale", data.empriseAnimauxAug, data.empriseAnimauxEditable == 'on');
        let escalade = baseSkill("force", data.escaladeAug, data.escaladeEditable == 'on');
        let esquive = baseSkill("agilite", data.esquiveAug, data.esquiveEditable == 'on');
        let intimidation = baseSkill("force", data.intimidationAug, data.intimidationEditable == 'on');
        let intuition = baseSkill("initiative", data.intuitionAug, data.intuitionEditable == 'on');
        let marchandage = baseSkill("sociabilite", data.marchandageAug, data.marchandageEditable == 'on');
        let navigation = baseSkill("initiative", data.navigationAug, data.navigationEditable == 'on');
        let pari = baseSkill("intelligence", data.pariAug, data.pariEditable == 'on');
        let perception = baseSkill("initiative", data.perceptionAug, data.perceptionEditable == 'on');
        let ragot = baseSkill("sociabilite", data.ragotAug, data.ragotEditable == 'on');
        let ramer = baseSkill("force", data.ramerAug, data.ramerEditable == 'on');
        let resistance = baseSkill("endurance", data.resistanceAug, data.resistanceEditable == 'on');
        let resistanceAlcool = baseSkill("endurance", data.resistanceAlcoolAug, data.resistanceAlcoolEditable == 'on');
        let subornation = baseSkill("sociabilite", data.subornationAug, data.subornationEditable == 'on');
        let survieExterieur = baseSkill("intelligence", data.survieExterieurAug, data.survieExterieurEditable == 'on');

        data.baseSkills = characOrSkillObject([
            ["art", art],
            ["athletisme", athletisme],
            ["calme", calme],
            ["charme", charme],
            ["chevaucher", chevaucher],
            ["commandement", commandement],
            ["conduiteAttelage", conduiteAttelage],
            ["cac", cac],
            ["discretion", discretion],
            ["divertissement", divertissement],
            ["empriseAnimaux", empriseAnimaux],
            ["escalade", escalade],
            ["esquive", esquive],
            ["intimidation", intimidation],
            ["intuition", intuition],
            ["marchandage", marchandage],
            ["navigation", navigation],
            ["pari", pari],
            ["perception", perception],
            ["ragot", ragot],
            ["ramer", ramer],
            ["resistance", resistance],
            ["resistanceAlcool", resistanceAlcool],
            ["subornation", subornation],
            ["survieExterieur", survieExterieur],
        ]);

        data.talents = data.talents.split(",");
        data.nbTalents = {};
        for(let talent of data.talents){
            data.nbTalents[talent] = {};
            data.nbTalents[talent].count = 1;
        }

        data.nbPossessions = {};
        

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