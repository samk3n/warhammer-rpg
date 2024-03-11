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
    const response = await fetch('/api/updateRecord', {
            method: "PUT",
            body: JSON.stringify({collection: collection, updates: updates, id: id}),
            headers: {
                'content-type': "application/json"
            }
        }
    );
    const respJson = await response.json();
    if(respJson.error){
        return {
            error: true,
            message: "Erreur lors de la mise à jour du personnage."
        }
    }

    return {
        success: true
    }
}


export async function updateAttribute(character, attribute, value){
    await updateRecord("characters", character.id, {[attribute]: value});
}

export async function updateGroup(group, attribute, value){
    await updateRecord("groups", group.id, {[attribute]: value});
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