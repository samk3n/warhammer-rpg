export async function load({fetch}){
    const getSpells = await fetch("/api/getFullCollection", {
        method: 'POST',
        body: JSON.stringify({collection: "spells", sort: "name"}),
        headers: {
            'content-type': "application/json"
        }
    });
    const getSpellsJson = await getSpells.json();

    if(getSpellsJson.error) {
        return {
            error: true,
            message: "Erreur lors du chargements des objets."
        }
    }

    return {
        spells: getSpellsJson.records
    }
}