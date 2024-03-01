import { redirect } from '@sveltejs/kit';

export async function load({locals, fetch}) {

    const games = [];
    const userGames = locals.user.games;

    for(let gameId of userGames) {
        const response = await fetch('/api/findRecord', {
            method: 'POST',
            body: JSON.stringify({collection: "games", filter: 'id="' + gameId + '"'}),
            headers: {
                'content-type': "application/json"
            }
        });
        const game = await response.json();
        games.push(game.record);
    }

    return {
        games: games
    }
}