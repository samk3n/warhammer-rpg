// TALENTS DB IDs
const AFFABLE = "000000000000001";
const COSTAUD = "000000000000032";
const DOIGTSDEFEE = "000000000000043";
const DURACUIRE = "000000000000045";
const GUERRIERNE = "000000000000064";
const IMPERTURBABLE = "000000000000071";
const PERSPICACE = "000000000000114";
const REFLEXESFOUDROYANTS = "000000000000124";
const TIREURDEPRECISION = "000000000000146";
const TRESFORT = "000000000000154";
const TRESRESISTANT = "000000000000155";
const VIVACITE = "000000000000162";

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

export async function createSpell(data){
    if(data.name.length < 3){
        return {
            error: true,
            message: "Le nom du sort doit contenir au moins 3 caractères."
        }
    }
    if(data.ni < 0) {
        return {
            error: true,
            message: "Le NI doit être positif."
        }
    }
    if(data.portee.length < 3){
        return {
            error: true,
            message: "La portée du sort doit contenir au moins 3 caractères."
        }
    }
    if(data.cible.length < 3){
        return {
            error: true,
            message: "La cible du sort doit contenir au moins 3 caractères."
        }
    }
    if(data.duree.length < 3){
        return {
            error: true,
            message: "La durée du sort doit contenir au moins 3 caractères."
        }
    }
    if(data.effets.length < 3){
        return {
            error: true,
            message: "Les effets du sort doivent contenir au moins 3 caractères."
        }
    }
   
    await createRecord("spells", data);  
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
    character.characteristics[characteristic][characElement] = value;
    await updateRecord("characters", character.id, {characteristics: character.characteristics});
}

export async function updateBaseSkill(character, skill, skillElement, value, spe=""){
    if(spe != ""){
        character.baseSkills[skill][spe][skillElement] = value;
    }
    else {
        character.baseSkills[skill][skillElement] = value;
    }
    await updateRecord("characters", character.id, {baseSkills: character.baseSkills});
}

export async function updateAdvancedSkill(character, skill, skillElement, value, spe=""){
    if(spe != ""){
        character.advancedSkills[skill][spe][skillElement] = value;
    }
    else {
        character.advancedSkills[skill][skillElement] = value;
    }
    await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills});
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

export async function increaseCharacteristic(character, characteristic, isMaster = false) {
    if(isMaster){
        character.characteristics[characteristic].aug += 1;
        await updateRecord("characters", character.id, {characteristics: character.characteristics});
    }
    else {
        for (let [key, value] of  xpCostCharac.entries()) {
            if(character.characteristics[characteristic].aug <= key && character.xpEarned - character.xpSpent >= value){
                character.xpSpent += value;
                character.characteristics[characteristic].aug += 1;
                await updateRecord("characters", character.id, {characteristics: character.characteristics, "xpSpent": character.xpSpent});
                return;
            }
        }
    }
    
}

export async function decreaseCharacteristic(character, characteristic, isMaster = false) {
    if(character.characteristics[characteristic].aug - 1 >= 0) {
        if(isMaster){
            character.characteristics[characteristic].aug -= 1;
            await updateRecord("characters", character.id, {characteristics: character.characteristics});
        }
        else {
            for (let [key, value] of  xpCostCharac.entries()) {
                if((character.characteristics[characteristic].aug <= key || character.characteristics[characteristic].aug == (key+1)) && character.xpSpent >= value) {
                    character.xpSpent -= value;
                    character.characteristics[characteristic].aug -= 1;
                    await updateRecord("characters", character.id, {characteristics: character.characteristics, "xpSpent": character.xpSpent});
                    return;
                }
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

export async function increaseBaseSkill(character, skill, isMaster = false, spe="") {
    if(isMaster) {
        if(spe != "") {
            character.baseSkills[skill][spe].aug += 1;
        }
        else {
            character.baseSkills[skill].aug += 1;
        }
        await updateRecord("characters", character.id, {baseSkills: character.baseSkills});
    }
    else {
        if(spe != "") {
            for (let [key, value] of  xpCostSkill.entries()) {
                if(character.baseSkills[skill][spe].aug <= key && character.xpEarned - character.xpSpent >= value) {
                    character.xpSpent += value;
                    character.baseSkills[skill][spe].aug += 1;
                    await updateRecord("characters", character.id, {baseSkills: character.baseSkills, "xpSpent": character.xpSpent});
                    return;
                }
            }
        }
        else {
            for (let [key, value] of  xpCostSkill.entries()) {
                if(character.baseSkills[skill].aug <= key && character.xpEarned - character.xpSpent >= value) {
                    character.xpSpent += value;
                    character.baseSkills[skill].aug += 1;
                    await updateRecord("characters", character.id, {baseSkills: character.baseSkills, "xpSpent": character.xpSpent});
                    return;
                }
            }
        }
    }
}

export async function decreaseBaseSkill(character, skill, isMaster = false, spe="") {
    if(spe != "") {
        if(character.baseSkills[skill][spe].aug - 1 >= 0) {
            if(isMaster) {
                character.baseSkills[skill][spe].aug -= 1;
                await updateRecord("characters", character.id, {baseSkills: character.baseSkills});
            }
            else {
                for (let [key, value] of  xpCostSkill.entries()) {
                    if((character.baseSkills[skill][spe].aug <= key || character.baseSkills[skill][spe].aug == (key+1)) && character.xpSpent >= value ) {
                        character.xpSpent -= value;
                        character.baseSkills[skill][spe].aug -= 1;
                        await updateRecord("characters", character.id, {baseSkills: character.baseSkills, "xpSpent": character.xpSpent});
                        return;
                    }
                }
            }
        }
    }
    else {
        if(character.baseSkills[skill].aug - 1 >= 0) {
            if(isMaster) {
                character.baseSkills[skill].aug -= 1;
                await updateRecord("characters", character.id, {baseSkills: character.baseSkills});
            }
            else {
                for (let [key, value] of  xpCostSkill.entries()) {
                    if((character.baseSkills[skill].aug <= key || character.baseSkills[skill].aug == (key+1)) && character.xpSpent >= value ) {
                        character.xpSpent -= value;
                        character.baseSkills[skill].aug -= 1;
                        await updateRecord("characters", character.id, {baseSkills: character.baseSkills, "xpSpent": character.xpSpent});
                        return;
                    }
                }
            }
        }
    }
}

export async function increaseAdvancedSkill(character, skill, spe="", isMaster = false) {
    if(isMaster) {
        if(spe != ""){
            character.advancedSkills[skill][spe].aug += 1;
        }
        else {
            character.advancedSkills[skill].aug += 1;
        }
        
        await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills});
    }
    else {
        if(spe != ""){
            for (let [key, value] of  xpCostSkill.entries()) {
                if(character.advancedSkills[skill][spe].aug <= key && character.xpEarned - character.xpSpent >= value) {
                    character.xpSpent += value;
                    character.advancedSkills[skill][spe].aug += 1;
                    await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills, "xpSpent": character.xpSpent});
                    return;
                }
            }
        }
        else {
            for (let [key, value] of  xpCostSkill.entries()) {
                if(character.advancedSkills[skill].aug <= key && character.xpEarned - character.xpSpent >= value) {
                    character.xpSpent += value;
                    character.advancedSkills[skill].aug += 1;
                    await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills, "xpSpent": character.xpSpent});
                    return;
                }
            }
        }
    }
}

export async function decreaseAdvancedSkill(character, skill, spe="", isMaster = false) {
    if(spe != ""){
        if(character.advancedSkills[skill][spe].aug - 1 >= 0) {
            if(isMaster) {
                character.advancedSkills[skill][spe].aug -= 1;
                await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills});
            }
            else {
                for (let [key, value] of  xpCostSkill.entries()) {
                    if((character.advancedSkills[skill][spe].aug <= key || character.advancedSkills[skill][spe].aug == (key+1)) && character.xpSpent >= value ) {
                        character.xpSpent -= value;
                        character.advancedSkills[skill][spe].aug -= 1;
                        await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills, "xpSpent": character.xpSpent});
                        return;
                    }
                }
            }
        }
    }
    else {
        if(character.advancedSkills[skill].aug - 1 >= 0) {
            if(isMaster) {
                character.advancedSkills[skill].aug -= 1;
                await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills});
            }
            else {
                for (let [key, value] of  xpCostSkill.entries()) {
                    if((character.advancedSkills[skill].aug <= key || character.advancedSkills[skill].aug == (key+1)) && character.xpSpent >= value ) {
                        character.xpSpent -= value;
                        character.advancedSkills[skill].aug -= 1;
                        await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills, "xpSpent": character.xpSpent});
                        return;
                    }
                }
            }
        }
    }
}

export function calculateWoundsMax(character){
    const bf = Math.floor( (character.characteristics.force.init + character.characteristics.force.aug) / 10 );
    const be = Math.floor( (character.characteristics.endurance.init + character.characteristics.endurance.aug) / 10 );
    const bfm = Math.floor( (character.characteristics.forceMentale.init + character.characteristics.forceMentale.aug) / 10 );

    let wounds = bf + 2*be + bfm;

    if(character.talents.includes(DURACUIRE)) {
        wounds += Math.floor(getCharacteristicFull(character, "endurance") / 10);
    }

    return wounds;
}

export async function addObjectToCharac(character, objId){
    if(character.possessions.includes(objId)) {
        character.nbPossessions[objId].count += 1;
    }
    else {
        character.nbPossessions[objId] = {count: 1};
    }
    await updateRecord("characters", character.id, {"possessions+": objId, "nbPossessions": character.nbPossessions});
}

export async function updateCharacObjectCount(charac, objId, value){
    charac.nbPossessions[objId].count = value;
    await updateRecord("characters", charac.id, {"nbPossessions": charac.nbPossessions});
}

export async function deleteObjectFromCharac(charac, objId){
    delete charac.nbPossessions[objId];
    await updateRecord("characters", charac.id, {"possessions-": objId, "nbPossessions": charac.nbPossessions});
}

export async function addMeleeWeaponToCharac(character, mwId){
    if(character.meleeWeapons.includes(mwId)) {
        character.nbMeleeWeapons[mwId].count += 1;
        await updateRecord("characters", character.id, {"nbMeleeWeapons": character.nbMeleeWeapons});
    }
    else {
        character.nbMeleeWeapons[mwId] = {count: 1};
        await updateRecord("characters", character.id, {"meleeWeapons+": mwId, "nbMeleeWeapons": character.nbMeleeWeapons});
    }
}

export async function updateCharacMeleeWeaponsCount(charac, mwId, value){
    charac.nbMeleeWeapons[mwId].count = value;
    await updateRecord("characters", charac.id, {"nbMeleeWeapons": charac.nbMeleeWeapons});
}

export async function deleteMeleeWeaponFromCharac(charac, mwId){
    delete charac.nbMeleeWeapons[mwId];
    await updateRecord("characters", charac.id, {"meleeWeapons-": mwId, "nbMeleeWeapons": charac.nbMeleeWeapons});
}

export async function addRangeWeaponToCharac(character, rwId){
    if(character.rangeWeapons.includes(rwId)) {
        character.nbRangeWeapons[rwId].count += 1;
        await updateRecord("characters", character.id, {"nbRangeWeapons": character.nbRangeWeapons});
    }
    else {
        character.nbRangeWeapons[rwId] = {count: 1};
        await updateRecord("characters", character.id, {"rangeWeapons+": rwId, "nbRangeWeapons": character.nbRangeWeapons});
    }
}

export async function updateCharacRangeWeaponsCount(charac, rwId, value){
    charac.nbRangeWeapons[rwId].count = value;
    await updateRecord("characters", charac.id, {"nbRangeWeapons": charac.nbRangeWeapons});
}

export async function deleteRangeWeaponFromCharac(charac, rwId){
    delete charac.nbRangeWeapons[rwId];
    await updateRecord("characters", charac.id, {"rangeWeapons-": rwId, "nbRangeWeapons": charac.nbRangeWeapons});
}

export async function addTalentToCharac(charac, talentId){
    charac.nbTalents[talentId] = {count: 1};
    await updateRecord("characters", charac.id, {"talents+": talentId, "nbTalents": charac.nbTalents});
}

export async function updateCharacTalentCount(charac, talentId, value){
    charac.nbTalents[talentId].count = parseInt(value);
    await updateRecord("characters", charac.id, {"nbTalents": charac.nbTalents});
}

export async function deleteTalentFromCharac(charac, talentId){
    delete charac.nbTalents[talentId];
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

export async function updateMeleeWeapon(mw, attribute, value){
    await updateRecord("meleeWeapons", mw.id, {[attribute]: value});
}

export async function updateRangeWeapon(rw, attribute, value){
    await updateRecord("rangeWeapons", rw.id, {[attribute]: value});
}

export async function updateArmor(armor, attribute, value){
    await updateRecord("armor", armor.id, {[attribute]: value});
}

export function transformWordIntoColor(word){
    const length = word.length;
    let r1 = 0;
    let g1 = 0;
    let b1 = 0;
    if(length % 2 == 0){
        r1 = 180
    }
    else if(length % 3 == 0){
        g1 = 180;
    }
    else {
        b1 = 180;
    }
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
            r2 += match.length*30;
        }
    }

    for(let letter of letters2){
        if(word.match(new RegExp(letter, "g"))){
            const match = word.match(new RegExp(letter, "g"));
            g2 += match.length*30;
        }
    }

    for(let letter of letters3){
        if(word.match(new RegExp(letter, "g"))){
            const match = word.match(new RegExp(letter, "g"));
            b2 += match.length*30;
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

    let r16 = r < 10 ? "0"+r : r.toString(16);
    let g16 = g < 10 ? "0"+g : g.toString(16);
    let b16 = b < 10 ? "0"+b : b.toString(16);
    r16 = r16.length == 1 ? "0"+r16 : r16;
    g16 = g16.length == 1 ? "0"+g16 : g16;
    b16 = b16.length == 1 ? "0"+b16 : b16;

    // console.log(word + " - " + r16 + "," + g16 + "," + b16)

    return "#" + r16 + g16 + b16;
}

export function getHoverColor(hexcolor) {
    var r = parseInt(hexcolor.substring(1,3),16);
    var g = parseInt(hexcolor.substring(3,5),16);
    var b = parseInt(hexcolor.substring(5,7),16);

    const ratio = 0.2;

    r = r - Math.floor(r * ratio) > 255 ? 255 : r - Math.floor(r * ratio);
    g = g - Math.floor(g * ratio) > 255 ? 255 : g - Math.floor(g * ratio);
    b = b - Math.floor(b * ratio) > 255 ? 255 : b - Math.floor(b * ratio);

    let r16 = r < 10 ? "0"+r : r.toString(16);
    let g16 = g < 10 ? "0"+g : g.toString(16);
    let b16 = b < 10 ? "0"+b : b.toString(16);
    r16 = r16.length == 1 ? "0"+r16 : r16;
    g16 = g16.length == 1 ? "0"+g16 : g16;
    b16 = b16.length == 1 ? "0"+b16 : b16;

    return "#" + r16 + g16 + b16;
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

export async function updateCharacterPlayable(character, checked){
    await updateRecord("characters", character.id, {isPlayable: checked});
    if(!checked){
        await updateRecord("users", character.user, {"games-": character.game});
        await updateRecord("characters", character.id, {user: ""});
    }
}

export async function createObject(data){
    if(data.name.length < 3){
        return {
            error: true,
            message: "Le nom de l'objet doit contenir au moins 3 caractères."
        }
    }
    if(data.encombrement < 0 || data.encombrement == "") {
        return {
            error: true,
            message: "L'encombrement doit être positif."
        }
    }
    await createRecord("objects", data);  
}

export function compareObjectsString(a, b){
    return a.toUpperCase() > b.toUpperCase() ? 1 : a.toUpperCase() < b.toUpperCase() ? -1 : 0;
}

export function isCharacCorrupted(character){
    const be = Math.floor((character.characteristics.endurance.init + character.characteristics.endurance.aug) / 10);
    const bfm = Math.floor((character.characteristics.forceMentale.init + character.characteristics.forceMentale.aug) / 10);
    
    return character.corruption > (be + bfm);
}

export function getEncombrementMax(character) {
    let encombrement = Math.floor( getCharacteristicFull(character, "force") / 10) + Math.floor(getCharacteristicFull(character, "endurance") / 10);
    if(character.talents.includes(COSTAUD)){
        encombrement += character.nbTalents[COSTAUD].count;
    }   
    return encombrement;
}

export function getEncombrement(character) {
    let enc = 0;
    if(character.expand) {
        if(character.expand.possessions){
            for(let obj of character.expand.possessions) {
                enc += obj.encombrement;
            }
        }
        if(character.expand.meleeWeapons){
            for(let mw of character.expand.meleeWeapons) {
                enc += mw.encombrement;
            }
        }
        if(character.expand.rangeWeapons){
            for(let rw of character.expand.rangeWeapons) {
                enc += rw.encombrement;
            }
        }
    }

    return enc;
}


export function getCharacteristicInit(character, characteristic){
    return character.characteristics[characteristic].init;
}

export function getCharacteristicAug(character, characteristic) {
    return character.characteristics[characteristic].aug;
}

export function getCharacteristicFull(character, characteristic){
    let value = character.characteristics[characteristic].init + character.characteristics[characteristic].aug;

    if(("sociabilite" == characteristic && character.talents.includes(AFFABLE)) ||
    ("dexterite" == characteristic && character.talents.includes(DOIGTSDEFEE)) ||
    ("capCombat" == characteristic && character.talents.includes(GUERRIERNE)) ||
    ("forceMentale" == characteristic && character.talents.includes(IMPERTURBABLE)) ||
    ("intelligence" == characteristic && character.talents.includes(PERSPICACE)) ||
    ("agilite" == characteristic && character.talents.includes(REFLEXESFOUDROYANTS)) ||
    ("capTir" == characteristic && character.talents.includes(TIREURDEPRECISION)) ||
    ("force" == characteristic && character.talents.includes(TRESFORT)) ||
    ("endurance" == characteristic && character.talents.includes(TRESRESISTANT)) ||
    ("initiative" == characteristic && character.talents.includes(VIVACITE))){
        value += 5;
    }

    return value;
}

export function getBaseSkillFull(character, skill, spe=""){
    if(spe != ""){
        return getCharacteristicFull(character, character.baseSkills[skill].charac) + character.baseSkills[skill][spe].aug;
    }
    else {
        return getCharacteristicFull(character, character.baseSkills[skill].charac) + character.baseSkills[skill].aug;
    }
}

export function getBaseSkillAug(character, skill, spe=""){
    if(spe != ""){
        return character.baseSkills[skill][spe].aug;
    }
    else {
        return character.baseSkills[skill].aug;
    }
}

export function getAdvancedSkillFull(character, skill, spe=""){
    if(spe != "") {
        return getCharacteristicFull(character, character.advancedSkills[skill].charac) + character.advancedSkills[skill][spe].aug;
    }
    else {
        return getCharacteristicFull(character, character.advancedSkills[skill].charac) + character.advancedSkills[skill].aug;
    }
}

export function getAdvancedSkillAug(character, skill, spe=""){
    if(spe != "") {
        return character.advancedSkills[skill][spe].aug;
    }
    else {
        return character.advancedSkills[skill].aug;
    }
}

export async function removeAdvancedSkill(character, skill, spe="") {
    if(spe != "") {
        character.advancedSkills[skill].spe = character.advancedSkills[skill].spe.filter((element) => element != spe);
    }
    else {
        delete character.advancedSkills[skill];
    }
    await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills});
}

export async function addAdvancedSkill(character, skill, charac, spe="") {
    if(spe != "") {
        if(character.advancedSkills[skill]) {
            if(!character.advancedSkills[skill].spe.includes(spe)) {
                character.advancedSkills[skill].spe.push(spe);
                if(!character.advancedSkills[skill][spe]) {
                    character.advancedSkills[skill][spe] = {aug: 0, editable: false};
                }
            }
        }
        else {
            character.advancedSkills[skill] = {aug: 0, spe: [spe], grouped: true, charac: charac, [spe]: {aug: 0, editable: false}};
        }       
    }
    else {
        if(!character.advancedSkills[skill]){
            character.advancedSkills[skill] = {aug: 0, charac: charac, editable: false}
        }
    }
    await updateRecord("characters", character.id, {advancedSkills: character.advancedSkills});
    
}

export async function addBaseSkillSpecialty(character, skill, specialty) {
    if(character.baseSkills[skill] && !character.baseSkills[skill].spe.includes(specialty)){
        character.baseSkills[skill].spe = [...character.baseSkills[skill].spe, specialty];
        if(!character.baseSkills[skill][specialty]) {
            character.baseSkills[skill][specialty] = {aug: 0, editable: false};
        }
        await updateRecord("characters", character.id, {baseSkills: character.baseSkills});
    }
}

export async function removeBaseSkillSpecialty(character, skill, specialty) {
    if(character.baseSkills[skill] && character.baseSkills[skill].spe.includes(specialty)) {
        character.baseSkills[skill].spe = character.baseSkills[skill].spe.filter((element) => element != specialty);
        await updateRecord("characters", character.id, {baseSkills: character.baseSkills});
    }
}

export const characNameMap = new Map([
    ["capCombat", "CC"],
    ["capTir", "CT"],
    ["force", "F"],
    ["endurance", "E"],
    ["initiative", "I"],
    ["agilite", "Ag"],
    ["dexterite", "Dex"],
    ["intelligence", "Int"],
    ["forceMentale", "FM"],
    ["sociabilite", "Soc"],
]);

export const baseSkillsNameMap = new Map([
    ["art", "Art"],
    ["athletisme", "Athlétisme"],
    ["calme", "Calme"],
    ["charme", "Charme"],
    ["chevaucher", "Chevaucher"],
    ["commandement", "Commandement"],
    ["conduiteAttelage", "Conduite d'attelage"],
    ["cac", "C. à C."],
    ["discretion", "Discrétion"],
    ["divertissement", "Divertissement"],
    ["empriseAnimaux", "Emprise sur les animaux"],
    ["escalade", "Escalade"],
    ["esquive", "Esquive"],
    ["intimidation", "Intimidation"],
    ["intuition", "Intuition"],
    ["marchandage", "Marchandage"],
    ["navigation", "Navigation"],
    ["pari", "Pari"],
    ["perception", "Perception"],
    ["ragot", "Ragôt"],
    ["ramer", "Ramer"],
    ["resistance", "Résistance"],
    ["resistanceAlcool", "Résistance à l'alcool"],
    ["subornation", "Subornation"],
    ["survieExterieur", "Survie en extérieur"],
]);

export const advancedSkillsNameMap = new Map([
    ["crochetage", "Crochetage"],
    ["dressage", "Dressage"],
    ["escamotage", "Escamotage"],
    ["evaluation", "Évaluation"],
    ["focalisation", "Focalisation"],
    ["guerison", "Guérison"],
    ["langue", "Langue"],
    ["metier", "Métier"],
    ["musicien", "Musicien"],
    ["natation", "Natation"],
    ["piegeage", "Piégeage"],
    ["pistage", "Pistage"],
    ["priere", "Prière"],
    ["projectiles", "Projectiles"],
    ["recherche", "Recherche"],
    ["representation", "Représentation"],
    ["savoir", "Savoir"],
    ["signesSecrets", "Signes secrets"],
    ["soinAnimaux", "Soin aux animaux"],
    ["voile", "Voile"]
]);

export async function convertCoins(character, from, to) {
    if(character){
        if(from == "gold" && character.gold > 0) {
            character.gold -= 1;
            if(to == "silver") {
                character.silver += 20;
            }
            else if(to == "copper") {
                character.copper += 240;
            }
        }
        else if(from == "silver") {
            if(to == "gold") {
                if(character.silver >= 20) {
                    character.silver -= 20;
                    character.gold += 1;
                }
            }
            else if(to == "copper") {
                if(character.silver > 0) {
                    character.silver -= 1;
                    character.copper += 12;
                }
            }
        }
        else if(from == "copper") {
            if(to == "gold") {
                if(character.copper >= 240) {
                    character.copper -= 240;
                    character.gold += 1;
                }
            }
            else if(to == "silver") {
                if(character.copper >= 12) {
                    character.copper -= 12;
                    character.silver +=1;
                }
            }
        }
        await updateRecord("characters", character.id, {gold: character.gold, silver: character.silver, copper: character.copper});
    }
}

export async function increaseTalentCount(character, talent) {
    let maxi = 0;

    if(!isNaN(talent.maxi)){
        maxi = parseInt(talent.maxi);
    }
    else if("None" == talent.maxi) {
        maxi = 1e1000;
    }
    else if(talent.maxi.toLowerCase().startsWith('b')) {
        if(talent.maxi == "BCC") {
            maxi = Math.floor(getCharacteristicFull(character, "capCombat") / 10);
        }
        else if(talent.maxi == "BCT") {
            maxi = Math.floor(getCharacteristicFull(character, "capTir") / 10);
        }
        else if(talent.maxi == "BF") {
            maxi = Math.floor(getCharacteristicFull(character, "force") / 10);
        }
        else if(talent.maxi == "BE") {
            maxi = Math.floor(getCharacteristicFull(character, "endurance") / 10);
        }
        else if(talent.maxi == "BI") {
            maxi = Math.floor(getCharacteristicFull(character, "initiative") / 10);
        }
        else if(talent.maxi == "BA") {
            maxi = Math.floor(getCharacteristicFull(character, "agilite") / 10);
        }
        else if(talent.maxi == "BD") {
            maxi = Math.floor(getCharacteristicFull(character, "dexterite") / 10);
        }
        else if(talent.maxi == "BInt") {
            maxi = Math.floor(getCharacteristicFull(character, "intelligence") / 10);
        }
        else if(talent.maxi == "BFM") {
            maxi = Math.floor(getCharacteristicFull(character, "forceMentale") / 10);
        }
        else if(talent.maxi == "BS") {
            maxi = Math.floor(getCharacteristicFull(character, "sociabilite") / 10);
        }
    }
    else {
        console.log("Talent invalid maxi.");
    }

    if(character.nbTalents[talent.id].count + 1 <= maxi){
        character.nbTalents[talent.id].count += 1;
        await updateRecord("characters", character.id, {nbTalents: character.nbTalents});
    }
}

export async function decreaseTalentCount(character, talent) {
    if(character.nbTalents[talent.id].count > 1){
        character.nbTalents[talent.id].count -= 1;
        await updateRecord("characters", character.id, {nbTalents: character.nbTalents});
    }
}