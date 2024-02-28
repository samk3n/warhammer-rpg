import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
	const { collection, data } = await request.json();

    let record;

    try {
        record = await locals.pb.collection(collection).create(data);
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
