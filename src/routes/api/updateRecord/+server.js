import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
	const { collection, updates, id } = await request.json();

    try {
        await locals.pb.collection(collection).update(id, updates);
    }
    catch(err) {
        console.log("----Error: " + err);
        return json({
            error: true
        });
    }
    
	return json({
        success: true
    });
}
