import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { collection, filter, expand } = await request.json();
    
    let record;

    try {
        record = await locals.pb.collection(collection).getFirstListItem(filter, {expand: expand});
    }
    catch(err) {
        console.log("Error: " + err);
        return json({
            error: true
        });
    }
    
	return json({
        success: true,
        record: record
    });
}