import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch }) {
	if(!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}

	// const update = await fetch('/api/updateRecord', {
	// 	method: 'PUT',
	// 	body: JSON.stringify({collection: "characters", updates: {'name': "test1"}, id: "c02q6m3hghmf3hz"}),
	// 	headers: {
	// 		'content-type': "application/json"
	// 	}
	// });
	
	// const updateJson = await update.json();
	// console.log(updateJson);

	// const find = await fetch('/api/findRecord', {
	// 	method: 'POST',
	// 	body: JSON.stringify({collection: "characters", filter: 'id="c02q6m3hghmf3hz"'}),
	// 	headers: {
	// 		'content-type': "application/json"
	// 	}
	// });

	// const findJson = await find.json();
	// console.log(findJson);
}