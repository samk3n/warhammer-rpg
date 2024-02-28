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