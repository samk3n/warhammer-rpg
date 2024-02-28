import { redirect } from '@sveltejs/kit';

export async function load({locals, fetch}) {
	if(!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}

    const collection = await fetch('/api/getFullCollection', {
        method: 'POST',
        body: JSON.stringify({collection: "games"}),
        headers: {
            'content-type': "application/json"
        }
    });

    // List of created games
    let games = await collection.json();
    // List of games the currently logged in user has already joined
    const userGamesList = locals.user.games;

    // Removes the games that the currently logged in user has already joined
    games = games.filter((game) => {
        return !userGamesList.includes(game.id);
    });
    
    return {
        games: games
    }
}