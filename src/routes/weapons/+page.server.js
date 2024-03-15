export async function load({fetch}){
    const getMeleeWeapons = await fetch("/api/getFullCollection", {
        method: 'POST',
        body: JSON.stringify({collection: "meleeWeapons"}),
        headers: {
            'content-type': "application/json"
        }
    });
    const getMeleeWeaponsJson = await getMeleeWeapons.json();

    if(getMeleeWeaponsJson.error) {
        return {
            error: true,
            message: "Erreur lors du chargements des objets."
        }
    }

    return {
        meleeWeapons: getMeleeWeaponsJson.records
    }
}