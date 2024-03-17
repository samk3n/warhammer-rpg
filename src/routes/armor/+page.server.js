export async function load({fetch}){
    const getArmor = await fetch("/api/getFullCollection", {
        method: 'POST',
        body: JSON.stringify({collection: "armor", sort: "name"}),
        headers: {
            'content-type': "application/json"
        }
    });
    const getArmorJson = await getArmor.json();

    if(getArmorJson.error) {
        return {
            error: true,
            message: "Erreur lors du chargements des armures."
        }
    }

    return {
        armor: getArmorJson.records,
    }
}