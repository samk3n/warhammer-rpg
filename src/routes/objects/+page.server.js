export async function load({fetch}){
    const getObjects = await fetch("/api/getFullCollection", {
        method: 'POST',
        body: JSON.stringify({collection: "objects"}),
        headers: {
            'content-type': "application/json"
        }
    });
    const getObjectsJson = await getObjects.json();

    if(getObjectsJson.error) {
        return {
            error: true,
            message: "Erreur lors du chargements de objects."
        }
    }

    return {
        objects: getObjectsJson.records
    }
}