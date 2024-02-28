<script>
    import {getRecordFromId} from "$lib/utils.js"
    import Modal from "../../../lib/Components/Modal.svelte";
    export let data;

    let deleteCharacModalOpen = false;
    let deleteGameModalOpen = false;

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
            <p>{character.isPlayable ? "Jouable" : "Non jouable"}</p>
            <a href="/">
                <button>Voir</button>
            </a>

            <button class="delete" on:click={() => deleteCharacModalOpen = true}>Supprimer</button>
            <Modal isOpen={deleteCharacModalOpen} >
                <form method="POST" action="?/deleteCharac">
                    <input type="hidden" name="id" value={character.id} />
                    <input type="hidden" name="user" value={character.user} />
                    <input type="hidden" name="game" value={character.game} />
                    <section class="modal">
                        <p>Voulez-vous vraiment supprimer ce personnage?</p>
                        <button class="delete" type="submit" on:click={() => deleteCharacModalOpen = false}>Supprimer</button>
                    </section>
                </form>
            </Modal>
            
        </div>
        {/each}
        
        <button class="delete" on:click={() => deleteCharacModalOpen = true}>Supprimer la partie</button>
        <Modal isOpen={deleteGameModalOpen} >
            <form method="POST" action="?/deleteGame">
                <input type="hidden" name="id" value={data.game.id} />
                <section class="modal">
                    <p>Voulez-vous vraiment supprimer ce personnage?</p>
                    <button class="delete" type="submit" on:click={() => deleteCharacModalOpen = false}>Supprimer la partie</button>
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
                <button>Choisir</button>
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
        </section>

        {/if}

    {/if}

{/if}



{#if data.error}
<h1 class="h1">{data.message}</h1>
<a href="/">
    <button class="btn1">Accueil</button>
</a>
{/if}


<style lang="scss">
    .delete {
        background-color: var(--warningColor);
    }

    .modal {
        background-color: white;
        border-radius: 20px;

        padding: 50px 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 30px;
    }
</style>