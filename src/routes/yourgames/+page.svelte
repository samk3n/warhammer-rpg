<script>
    import { getRecordFromId } from '$lib/utils.js';

    export let data;
</script>

<div>
    {#if data.games.length == 0}
    <h1 class="h2">Vous n'avez rejoint aucune partie pour le moment.</h1>
    {/if}

    {#each data?.games as game}
    <section class="whiteCard">
        <h1 class="h2 name">{game.name}{game.password ? " *" : ""}</h1>

        {#if data.user.id === game.owner}
        <p class="italic">Vous êtes le maître du jeu!</p>
        {:else}
        {#await getRecordFromId("users", game.owner)}
        <p class="italic">Maître du jeu: </p>
        {:then user}
        <p class="italic">Maître du jeu: {user.username}</p>
        {/await}
        {/if}

        <p class="txt1">Nbre de personnages: {game.characters.length}</p>
    
        <a href={"/game/" + game.id}>
            <button class="btn2">Jouer</button>
        </a>
    </section>
    {/each}
</div>

<style lang="scss">
    h1, p {
        margin: 0;
        text-align: center;
    }

    div {
        margin: 50px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;

        section {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
        }
    }
</style>