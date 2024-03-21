export async function getRecordFromId(collection, id){
    const response = await fetch('/api/findRecord', {
            method: "POST",
            body: JSON.stringify({collection: collection, filter: 'id="' + id + '"'}),
            headers: {
                'content-type': "application/json"
            }
        }
    );
    
    const user = await response.json();
    
    return user.record;
}

export async function updateRecord(collection, id, updates){
    try {
        const response = await fetch('/api/updateRecord', {
            method: "PUT",
            body: JSON.stringify({collection: collection, updates: updates, id: id}),
            headers: {
                'content-type': "application/json"
            }
        });
        const respJson = await response.json();
        if(respJson.error){
            return {
                error: true,
                message: "Erreur lors de la mise à jour de l'élément dans " + collection
            }
        }
    }
    catch (err) {
        return {
            error: true,
            message: "Erreur lors de la mise à jour de l'élément dans " + collection
        }
    }

    return {
        success: true
    }
}

export async function createRecord(collection, data){
    try {
        const response = await fetch('/api/createRecord', {
            method: "PUT",
            body: JSON.stringify({collection: collection, data: data}),
            headers: {
                'content-type': "application/json"
            }
        });
        const respJson = await response.json();
        if(respJson.error){
            return {
                error: true,
                message: "Erreur lors de la création de l'élément dans " + collection
            }
        }
    }
    catch (err){
        return {
            error: true,
            message: "Erreur lors de la création de l'élément dans " + collection
        }
    }

    return {
        success: true
    }
}

export async function createMeleeWeapon(data){
    if(data.name.length < 3){
        return {
            error: true,
            message: "Le nom de l'arme doit contenir au moins 3 caractères."
        }
    }
    if(data.encombrement < 0 || !data.encombrement) {
        return {
            error: true,
            message: "L'encombrement doit être positif."
        }
    }
    if(data.groupe.length < 3){
        return {
            error: true,
            message: "Le groupe de l'arme doit contenir au moins 3 caractères."
        }
    }
    if(data.degats < 0 || !data.degats) {
        return {
            error: true,
            message: "Les dégâts doivent être positifs."
        }
    }
    await createRecord("meleeWeapons", data);  
}

export async function createRangeWeapon(data){
    if(data.name.length < 3){
        return {
            error: true,
            message: "Le nom de l'arme doit contenir au moins 3 caractères."
        }
    }
    if(data.encombrement < 0 || !data.encombrement) {
        return {
            error: true,
            message: "L'encombrement doit être positif."
        }
    }
    if(data.groupe.length < 3){
        return {
            error: true,
            message: "Le groupe de l'arme doit contenir au moins 3 caractères."
        }
    }
    if(data.degats < 0 || !data.degats) {
        return {
            error: true,
            message: "Les dégâts doivent être positifs."
        }
    }
    if(data.portee.length < 1){
        return {
            error: true,
            message: "La portée de l'arme ne doit pas être vide."
        }
    }
    await createRecord("rangeWeapons", data);  
}

export async function createArmor(data){
    if(data.name.length < 3){
        return {
            error: true,
            message: "Le nom de l'armure doit contenir au moins 3 caractères."
        }
    }
    if(data.encombrement < 0 || !data.encombrement) {
        return {
            error: true,
            message: "L'encombrement doit être positif."
        }
    }
    if(data.pa < 0 || !data.pa) {
        return {
            error: true,
            message: "Les dégâts doivent être positifs."
        }
    }
    await createRecord("armor", data);  
}


export async function updateAttribute(character, attribute, value){
    await updateRecord("characters", character.id, {[attribute]: value});
}

export async function updateGroup(group, attribute, value){
    await updateRecord("groups", group.id, {[attribute]: value});
}

export async function updateObject(object, attribute, value){
    await updateRecord("objects", object.id, {[attribute]: value});
}

export async function updateCharacteristic(character, characteristic, characElement, value){
    character[characteristic][characElement] = value;
    await updateRecord("characters", character.id, {[characteristic]: character[characteristic]});
}


const xpCostCharac = new Map([
    [5, 25],
    [10, 30],
    [15, 40],
    [20, 50],
    [25, 70],
    [30, 90],
    [35, 120],
    [40, 150],
    [45, 190],
    [50, 230],
    [55, 180],
    [60, 330],
    [65, 390],
    [70, 450]
]);

export async function increaseCharacteristic(character, characteristic) {
    for (let [key, value] of  xpCostCharac.entries()) {
        if(character[characteristic].aug <= key && character.xpEarned - character.xpSpent >= value){
            character.xpSpent += value;
            character[characteristic].aug += 1;
            await updateRecord("characters", character.id, {[characteristic]: character[characteristic], "xpSpent": character.xpSpent});
            return;
        }
    }
}

export async function decreaseCharacteristic(character, characteristic) {
    if(character[characteristic].aug - 1 >= 0) {
        for (let [key, value] of  xpCostCharac.entries()) {
            if((character[characteristic].aug <= key || character[characteristic].aug == (key+1)) && character.xpSpent >= value) {
                character.xpSpent -= value;
                character[characteristic].aug -= 1;
                await updateRecord("characters", character.id, {[characteristic]: character[characteristic], "xpSpent": character.xpSpent});
                return;
            }
        }
    }
}

const xpCostSkill = new Map([
    [5, 10],
    [10, 15],
    [15, 20],
    [20, 30],
    [25, 40],
    [30, 60],
    [35, 80],
    [40, 110],
    [45, 140],
    [50, 180],
    [55, 220],
    [60, 270],
    [65, 320],
    [70, 380]
]);

export async function increaseSkill(character, skill) {
    for (let [key, value] of  xpCostSkill.entries()) {
        if(character[skill].aug <= key && character.xpEarned - character.xpSpent >= value) {
            character.xpSpent += value;
            character[skill].aug += 1;
            await updateRecord("characters", character.id, {[skill]: character[skill], "xpSpent": character.xpSpent});
            return;
        }
    }
}

export async function decreaseSkill(character, skill) {
    if(character[skill].aug - 1 >= 0) {
        for (let [key, value] of  xpCostSkill.entries()) {
            if((character[skill].aug <= key || character[skill].aug == (key+1)) && character.xpSpent >= value ) {
                character.xpSpent -= value;
                character[skill].aug -= 1;
                await updateRecord("characters", character.id, {[skill]: character[skill], "xpSpent": character.xpSpent});
                return;
            }
        }
    }
}

export function calculateWoundsMax(character){
    const bf = Math.floor( (character.force.init + character.force.aug) / 10 );
    const be = Math.floor( (character.endurance.init + character.endurance.aug) / 10 );
    const bfm = Math.floor( (character.forceMentale.init + character.forceMentale.aug) / 10 );

    return bf + 2*be + bfm;
}

export async function deleteRecord(collection, record){
    const response = await fetch('/api/deleteRecord', {
        method: "DELETE",
        body: JSON.stringify({collection: collection, id: record.id}),
        headers: {
            'content-type': "application/json"
        }
    });
    const respJson = await response.json();
    if(respJson.error){
        return {
            error: true,
            message: "Erreur lors de la suppression de l'objet."
        }
    }

    return {
        success: true
    }

}

export async function getFullCollection(collection){
    const response = await fetch('/api/getFullCollection', {
        method: "POST",
        body: JSON.stringify({collection: collection}),
        headers: {
            'content-type': "application/json"
        }
    });
    const respJson = await response.json();
    if(respJson.error){
        return {
            error: true,
            message: "Erreur lors de la récupération des " + collection
        }
    }
    
    return respJson.records;
}

export async function addObjectToCharac(charac, objId){
    charac.nbPossessions[objId] = {count: 1};
    await updateRecord("characters", charac.id, {"possessions+": objId, "nbPossessions": charac.nbPossessions});
}

export async function updateCharacObjectCount(charac, objId, value){
    charac.nbPossessions[objId].count = value;
    await updateRecord("characters", charac.id, {"nbPossessions": charac.nbPossessions});
}

export async function deleteObjectFromCharac(charac, objId){
    charac.nbPossessions[objId] = {};
    await updateRecord("characters", charac.id, {"possessions-": objId, "nbPossessions": charac.nbPossessions});
}

export async function addTalentToCharac(charac, talentId){
    charac.nbTalents[talentId] = {count: 1};
    await updateRecord("characters", charac.id, {"talents+": talentId, "nbTalents": charac.nbTalents});
}

export async function updateCharacTalentCount(charac, talentId, value){
    charac.nbTalents[talentId].count = value;
    await updateRecord("characters", charac.id, {"nbTalents": charac.nbTalents});
}

export async function deleteTalentFromCharac(charac, talentId){
    charac.nbTalents[talentId] = {};
    await updateRecord("characters", charac.id, {"talents-": talentId, "nbTalents": charac.nbTalents});
}

export async function updateSpell(spell, data){
    await updateRecord("spells", spell.id, data);
}

export async function addSpellToCharac(charac, spellId){
    await updateRecord("characters", charac.id, {"spells+": spellId});
}

export async function deleteSpellFromCharac(charac, spellId){
    await updateRecord("characters", charac.id, {"spells-": spellId});
}

export async function updateMeleeWeapon(mw, data){
    await updateRecord("meleeWeapons", mw.id, data);
}

export async function updateRangeWeapon(rw, data){
    await updateRecord("rangeWeapons", rw.id, data);
}

export async function updateArmor(armor, data){
    await updateRecord("armor", armor.id, data);
}

export async function addMeleeWeaponToCharac(charac, mwId){
    await updateRecord("characters", charac.id, {"meleeWeapons+": mwId});
}

export async function deleteMeleeWeaponFromCharac(charac, mwId){
    await updateRecord("characters", charac.id, {"meleeWeapons-": mwId});
}

export async function addRangeWeaponToCharac(charac, rwId){
    await updateRecord("characters", charac.id, {"rangeWeapons+": rwId});
}

export async function deleteRangeWeaponFromCharac(charac, rwId){
    await updateRecord("characters", charac.id, {"rangeWeapons-": rwId});
}

export function transformWordIntoColor(word){
    const length = word.length;
    let r1 = length > 15 ? 150 : length > 10 ? 170 : 190;
    let g1 = length > 15 ? 150 : length > 10 ? 170 : 190;
    let b1 = length > 15 ? 150 : length > 10 ? 170 : 190;
    let r2 = 0;
    let g2 = 0;
    let b2 = 0;
    
    const letters1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const letters2 = ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
    const letters3 = ['q', 'r', 's', 't', 'u', 'v', 'w'];
    const xyz = ['x', 'y', 'z'];

    for(let letter of letters1){
        if(word.match(new RegExp(letter, "g"))){
            const match = word.match(new RegExp(letter, "g"));
            r2 += match.length*8;
            g2 += match.length*4;
        }
    }

    for(let letter of letters2){
        if(word.match(new RegExp(letter, "g"))){
            const match = word.match(new RegExp(letter, "g"));
            g2 += match.length*8;
            b2 += match.length*4;
        }
    }

    for(let letter of letters3){
        if(word.match(new RegExp(letter, "g"))){
            const match = word.match(new RegExp(letter, "g"));
            b2 += match.length*8;
            r2 += match.length*4;
        }
    }

    for(let letter of xyz){
        if(word.match(new RegExp(letter, "g"))){
            const match = word.match(new RegExp(letter, "g"));
            r2 += match.length*10;
            g2 += match.length*10;
            b2 += match.length*10;
        }
    }

    let r = (r1 + r2);
    let g =  (g1 + g2);
    let b = (b1 + b2);

    r = r > 255 ? 255 : r;
    g = g > 255 ? 255 : g;
    b = b > 255 ? 255 : b;

    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

export function getHoverColor(hexcolor) {
    var r = parseInt(hexcolor.substring(1,3),16);
    var g = parseInt(hexcolor.substring(3,5),16);
    var b = parseInt(hexcolor.substring(5,7),16);

    r = r - Math.floor(r * 0.1) > 255 ? 255 : r - Math.floor(r * 0.1);
    g = g - Math.floor(g * 0.1) > 255 ? 255 : g - Math.floor(g * 0.1);
    b = b - Math.floor(b * 0.1) > 255 ? 255 : b - Math.floor(b * 0.1);
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

export function textColorBasedOnBG(hexcolor){
    var r = parseInt(hexcolor.substring(1,3),16);
    var g = parseInt(hexcolor.substring(3,5),16);
    var b = parseInt(hexcolor.substring(5,7),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

export async function updateGameField(game, field, value){
    await updateRecord("games", game.id, {[field]: value});
}