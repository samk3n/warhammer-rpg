import { redirect } from '@sveltejs/kit';

export async function load({locals, fetch}) {

    const response = await fetch('/api/getFullCollection', {
        method: 'POST',
        body: JSON.stringify({collection: "games"}),
        headers: {
            'content-type': "application/json"
        }
    });

    // List of created games
    const json = await response.json();
    let games = json.records;
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