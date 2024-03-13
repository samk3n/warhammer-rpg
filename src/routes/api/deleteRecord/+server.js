import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
	const { collection, id } = await request.json();

    try {
        await locals.pb.collection(collection).delete(id);
    }
    catch(err) {
        console.log("deleteRecord Error: " + err);
        return json({
            error: true
        });
    }
    
	return json({success: true});
}