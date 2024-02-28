import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { collection, filter } = await request.json();
    let records;

    try {
        records = await locals.pb.collection(collection).getList(1, 50 , {
            filter: 'created >= "2022-01-01 00:00:00"',
        });
    }
    catch(err) {
        console.log("-----Error: " + err);
        return json({
            error: true
        });
    }
    
	return json({records: records});
}