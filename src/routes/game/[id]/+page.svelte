<script>
    import {getRecordFromId} from "$lib/utils.js"
    import Modal from "$lib/Components/Modal.svelte";

    export let data;
    export let form;

    $: if(form && form.message){
        formModalOpen = true;
    }

    let deleteGameModalOpen = false;
    let formModalOpen = false;

</script>

{#if data && data.game && data.characters}

    <h1 class="h1">{data.game.name}</h1>

    {#if data.isMaster}

    <p class="italic"> Vous êtes le maître du jeu!</p>
    <a href={"/createcharac/" + data.game.id}>
        <button class="btn1">Créer un personnage</button>
    </a>

    <p class="h2">Personnages</p>
    <section>
        {#if data.characters.length == 0}
        <p class="txt1">Aucun personnage dans cette partie.</p>
        {/if}
        {#each data.characters as character}
        <div class="whiteCard">

            <h2 class="h3">{character.name}</h2>

            {#if character.isPlayable && character.user}
                {#await getRecordFromId("users", character.user)}
                <p>Joueur: </p>
                {:then user}
                <p>Joueur: {user.username}</p>
                {/await}
            {:else if character.isPlayable}
                <p>Joueur: aucun</p>
            {:else}
                <p>Non jouable</p>
            {/if}

            <a href={"/character/" + character.id}>
                <button>Voir</button>
            </a>
            
        </div>
        {/each}
        
        <button class="delete" on:click={() => deleteGameModalOpen = true}>Supprimer la partie</button>
        <Modal isOpen={deleteGameModalOpen} >
            <form method="POST" action="?/deleteGame">
                <input type="hidden" name="id" value={data.game.id} />
                <section class="modal">
                    <p>Voulez-vous vraiment supprimer cette partie?</p>
                    <button type="button" on:click={() => deleteGameModalOpen = false}>Fermer</button>
                    <button class="delete" type="submit" on:click={() => deleteGameModalOpen = false}>Supprimer la partie</button>
                </section>
            </form>
        </Modal>
    </section>


    {:else}

        {#if !data.isUserInGame}

        {#await getRecordFromId("users", data.game.owner)}
        <p class="italic">Maître du jeu: </p>
        {:then user}
        <p class="italic">Maître du jeu: {user.username}</p>
        {/await}
        <p class="h2">Personnages</p>
        <section>
            {#if data.characters.length == 0}
            <p class="txt1">Aucun personnage disponible dans cette partie.</p>
            {/if}
            {#each data.characters as character}
            <div class="whiteCard">
                <h2 class="h3">{character.name}</h2>
                <form method="POST" action="?/joinGame">
                    <input type="hidden" name="characId" value={character.id} />
                    <input type="hidden" name="gameId" value={data.game.id} />
                    <button>Choisir</button>
                </form>
                
            </div>
            {/each}
        </section>

        {:else}

        {#await getRecordFromId("users", data.game.owner)}
        <p class="italic">Maître du jeu: </p>
        {:then user}
        <p class="italic">Maître du jeu: {user.username}</p>
        {/await}
        <p class="h2">Votre personnage</p>
        <section class="whiteCard">
            <h2 class="h3">{data.characters[0].name}</h2>
            <a href={"/character/" + data.characters[0].id}>
                <button>Jouer</button>
            </a>
        </section>

        {/if}

    {/if}

    {#if form && form.message}
    <Modal isOpen={formModalOpen}>
        <section class="modal">
            <p>{form.message}</p>
            <button on:click={() => formModalOpen = false}>Fermer</button>
        </section>
    </Modal>
    {/if}

{/if}



{#if data.error}
<h1 class="h1">{data.message}</h1>
<a href="/">
    <button class="btn1">Accueil</button>
</a>
{/if}


<style lang="scss">

</style>