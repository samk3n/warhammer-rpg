export async function load({fetch}){
    const getTalents = await fetch("/api/getFullCollection", {
        method: 'POST',
        body: JSON.stringify({collection: "talents"}),
        headers: {
            'content-type': "application/json"
        }
    });
    const getTalentsJson = await getTalents.json();

    if(getTalentsJson.error) {
        return {
            error: true,
            message: "Erreur lors du chargements des talents."
        }
    }

    return {
        talents: getTalentsJson.records
    }
}