import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { collection, sort } = await request.json();

    let records;
    
    try {
        if(sort){
            records = await locals.pb.collection(collection).getFullList({sort: sort});
        }
        else {
            records = await locals.pb.collection(collection).getFullList();
        }
    }
    catch(err) {
        console.log("getFullCollection Error: " + err);
        return json({
            error: true,
            message: "Erreur lors de la récupération des " + collection
        })
    }
    
	return json({
        success: true,
        records: records
    });
}
