import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { collection, filter } = await request.json();
    let record;

    try {
        record = await locals.pb.collection(collection).getFirstListItem(filter);
    }
    catch(err) {
        console.log("Error: " + err);
        return json({
            error: true
        });
    }
    
	return json({record: record});
}