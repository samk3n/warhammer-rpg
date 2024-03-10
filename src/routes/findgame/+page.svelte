<script>
    import { getRecordFromId } from '$lib/utils.js';
    import { goto } from '$app/navigation';

    export let data;
    if (data.games.length == 0) {
        console.log("dbfhkbhb")
    }

    // Error message in the modal
    let passwordModalMessage = "";

    // The input value
    let typedPassword;

    // Ref to the password modal
    let passwordModal;

    // Game instance for the password modal
    let currentGame;

    // Validate the password in the modal
    function validatePassword(){        
        if(currentGame.password == typedPassword){
            goto("/game/"+currentGame.id);
            passwordModalMessage = "";
        }
        else {
            passwordModalMessage = "Mot de passe incorrect."
        }

        typedPassword = "";
    }

    // Open the modal if there is a password, or just go to the selected game page
    function joinGame(game) {
        if(game && game.password) {
            currentGame = game;
            passwordModal.showModal();
        }
        else {
            goto("/game/" + game.id);
        }
    }
</script>

{#if data && data.games}
    {#if data.games.length == 0}

        <h1 class="text-3xl font-semibold text-center">Aucune partie trouvée.</h1>
        <a href="/creategame">
            <button class="btn btn-neutral xs:btn-wide mt-5" >Créer une partie</button>
        </a>
    
    {/if}

    {#each data.games as game}
    <section class="card bg-base-200 mt-10 w-11/12 mx-2 sm:w-4/5 md:w-3/5 lg:w-3/6">
        <div class="card-body items-center">
            <h2 class="text-base-content text-2xl font-semibold">{game.name}{game.password ? " *" : ""}</h2>
            <div class="divider"></div>
            {#await getRecordFromId("users", game.owner)}
            <p class="italic text-xl text-center">Maître du jeu: </p>
            {:then user}
            <p class="italic text-xl text-center">Maître du jeu: {user.username}</p>
            {/await}
            <p class="mt-2 text-2xl text-center">Nbre de personnages: {game.characters.length}</p>
        </div>

        <div class="card-actions justify-center">
            <button class="btn btn-neutral xs:btn-wide" on:click={() => joinGame(game)} >Rejoindre</button>
        </div>
    </section>
    {/each}

    <dialog id="passwordModal" class="modal modal-bottom sm:modal-middle" bind:this={passwordModal}>
        <div class="modal-box form-control bg-base-200">
            {#if passwordModalMessage != ""}
            <p class="text-lg text-warning font-medium">{passwordModalMessage}</p>
            {/if}
            <label for="typedPassword" class="label text-xl">Entrez le mot de passe</label>
            <input class="input input-bordered" type="password" name="typedPassword" bind:value={typedPassword} />

            <div class="modal-action">
                <button class="btn btn-error" on:click={() => passwordModal.close()} >Fermer</button>
                <button class="btn btn-neutral" on:click={() => validatePassword()}>Valider</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

{/if}