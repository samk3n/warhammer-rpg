<script>
    import { getRecordFromId } from '$lib/utils.js';

    export let data;
</script>

{#if data && data.games}
{#if data.games.length == 0}
<h1 class="text-3xl font-semibold">Vous n'avez rejoint aucune partie pour le moment.</h1>
<a href={"/findgame"}>
    <button class="btn btn-neutral btn-wide mt-10">Trouver une partie</button>
</a>
{/if}

{#each data.games as game}
<section class="card bg-base-300 shadow-lg mt-10 w-11/12 mx-2 sm:w-4/5 md:w-3/5 lg:w-3/6">
    <div class="card-body items-center">
        <h2 class="text-2xl font-semibold">{game.name}{game.password ? " *" : ""}</h2>
        <div class="divider"></div>
        {#if data.user.id === game.owner}
        <p class="italic text-xl text-center">Vous êtes le maître du jeu!</p>
        {:else}
        {#await getRecordFromId("users", game.owner)}
        <p class="italic text-xl text-center">Maître du jeu: </p>
        {:then user}
        <p class="italic text-xl text-center">Maître du jeu: {user.username}</p>
        {/await}
        {/if}

        <p class="mt-2 text-2xl text-center">Nbre de personnages: {game.characters.length}</p>
    </div>

    <div class="card-actions justify-center">
        <a href={"/game/" + game.id}>
            <button class="btn btn-neutral btn-wide">Jouer</button>
        </a>
    </div>
    
</section>
{/each}
{/if}