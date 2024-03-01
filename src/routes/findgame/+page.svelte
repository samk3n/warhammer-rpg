<script>
    import { getRecordFromId } from '$lib/utils.js';
    import Modal from "$lib/Components/Modal.svelte";
    import { redirect } from '@sveltejs/kit';
    import { goto } from '$app/navigation';

    export let data;

    let passwordModalOpen = false;
    let passwordModalMessage = "";

    let typedPassword;

    function validatePassword(password, gameId){
        if(password == typedPassword){
            goto("/game/"+gameId);
        }
        else {
            passwordModalMessage = "Mot de passe incorrect."
        }
    }
</script>

<div class="container">
    {#if data.games.length == 0}
    <h1 class="h2">Aucune partie trouvée.</h1>
    {/if}

    {#each data?.games as game}
    <section class="whiteCard">
        <h1 class="h2 name">{game.name}{game.password ? " *" : ""}</h1>
        {#await getRecordFromId("users", game.owner)}
        <p class="italic">Maître du jeu: </p>
        {:then user}
        <p class="italic">Maître du jeu: {user.username}</p>
        {/await}
        <p class="txt1">Nbre de personnages: {game.characters.length}</p>
    
        {#if game.password}
            <button class="btn2" on:click={() => passwordModalOpen = true} >Rejoindre</button>
            <Modal isOpen={passwordModalOpen}>
                <div class="modal">
                    <p class="txt1">Entrez le mot de passe</p>
                    {#if passwordModalMessage != ""}
                    <p class="warning">{passwordModalMessage}</p>
                    {/if}
                    <input class="txt1" type="password" name="typedPassword" bind:value={typedPassword} />
                    <button on:click={() => validatePassword(game.password, game.id)}>Valider</button>
                    <button class="delete" on:click={() => passwordModalOpen = false} >Fermer</button>
                </div>
            </Modal>
        {:else}
            <a href={"/game/" + game.id}>
                <button class="btn2">Rejoindre</button>
            </a>
        {/if}

    </section>
    {/each}
</div>

<style lang="scss">
    h1, p {
        margin: 0;
        text-align: center;
    }

    .container {
        margin: 30px 0;
        width: 80%;
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