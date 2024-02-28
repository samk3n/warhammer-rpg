import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { collection } = await request.json();

    let games;
    
    try {
        games = await locals.pb.collection(collection).getFullList();
    }
    catch(err) {
        console.log("Error: " + err);
        return {
            erro: true
        }
    }
    
	return json(games);
}
