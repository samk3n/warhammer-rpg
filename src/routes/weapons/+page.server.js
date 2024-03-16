export async function load({fetch}){
    const getMeleeWeapons = await fetch("/api/getFullCollection", {
        method: 'POST',
        body: JSON.stringify({collection: "meleeWeapons", sort: "name"}),
        headers: {
            'content-type': "application/json"
        }
    });
    const getMeleeWeaponsJson = await getMeleeWeapons.json();

    if(getMeleeWeaponsJson.error) {
        return {
            error: true,
            message: "Erreur lors du chargements des armes de mêlée."
        }
    }

    const getRangeWeapons = await fetch("/api/getFullCollection", {
        method: 'POST',
        body: JSON.stringify({collection: "rangeWeapons", sort: "name"}),
        headers: {
            'content-type': "application/json"
        }
    });
    const getRangeWeaponsJson = await getRangeWeapons.json();

    if(getRangeWeaponsJson.error) {
        return {
            error: true,
            message: "Erreur lors du chargements des armes à distance."
        }
    }

    return {
        meleeWeapons: getMeleeWeaponsJson.records,
        rangeWeapons: getRangeWeaponsJson.records
    }
}