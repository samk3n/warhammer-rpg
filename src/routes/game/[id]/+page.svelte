<script>
    import {getRecordFromId} from "$lib/utils.js"

    export let data;
    export let form;

    let gameFormModal;

    $: if(form && form.message){
        gameFormModal.showModal();
    }

</script>

<section class="flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">
{#if data && data.game && data.characters}

    <h1 class="text-3xl font-bold">{data.game.name}</h1>

    {#if data.isMaster}

    <p class="italic text-xl"> Vous êtes le maître du jeu!</p>
    <a href={"/createcharac/" + data.game.id}>
        <button class="btn btn-primary btn-wide text-xl">Créer un personnage</button>
    </a>

    <p class="text-xl font-semibold">Personnages</p>

    <section class="w-full flex flex-col gap-5">
        {#if data.characters.length == 0}
        <p class="text-lg italic">Aucun personnage dans cette partie.</p>
        {/if}

        {#each data.characters as character}
        <div class="card bg-base-200 shadow-lg w-full">
            <div class="card-body items-center">
                <h2 class="text-2xl font-semibold">{character.name}</h2>
                <div class="divider"></div>

                {#if character.isPlayable && character.user}
                    {#await getRecordFromId("users", character.user)}
                    <p class="mt-2 text-2xl text-center">Joueur: </p>
                    {:then user}
                    <p class="mt-2 text-2xl text-center">Joueur: {user.username}</p>
                    {/await}
                {:else if character.isPlayable}
                    <p class="mt-2 text-2xl text-center">Joueur: aucun</p>
                {:else}
                    <p class="mt-2 text-2xl text-center">Non jouable</p>
                {/if}
            </div>

            <div class="card-actions justify-center">
                <a href={"/character/" + character.id}>
                    <button class="btn btn-neutral btn-wide">Voir</button>
                </a>
            </div>
            
        </div>
        {/each}
        
        <button class="btn btn-error" onclick="deleteGameModal.showModal()">Supprimer la partie</button>
        <dialog id="deleteGameModal" class="modal modal-bottom sm:modal-middle" >
            <form class="modal-box form-control bg-base-200" method="POST" action="?/deleteGame">
                <input type="hidden" name="id" value={data.game.id} />

                <p class="text-xl">Voulez-vous vraiment supprimer cette partie?</p>
                <div class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="deleteGameModal.close()">Fermer</button>
                    <button class="btn btn-error" type="submit" onclick="deleteGameModal.close()">Supprimer la partie</button>
                </div>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        
    </section>


    {:else}

        {#if !data.isUserInGame}

        {#await getRecordFromId("users", data.game.owner)}
        <p class="italic text-xl">Maître du jeu: </p>
        {:then user}
        <p class="italic text-xl">Maître du jeu: {user.username}</p>
        {/await}
        <p class="text-xl font-semibold">Personnages</p>
        <section class="w-full flex flex-col gap-5">
            {#if data.characters.length == 0}
            <p class="text-lg italic">Aucun personnage disponible dans cette partie.</p>
            {/if}
            {#each data.characters as character}
            <div class="card bg-base-200 shadow-lg w-full">
                <div class="card-body items-center">
                    <h2 class="text-2xl font-semibold">{character.name}</h2>
                    <div class="divider"></div>
                </div>
                <form class="card-actions justify-center" method="POST" action="?/joinGame">
                    <input type="hidden" name="characId" value={character.id} />
                    <input type="hidden" name="gameId" value={data.game.id} />
                    <button class="btn btn-neutral btn-wide">Choisir</button>
                </form>
                
            </div>
            {/each}
        </section>

        {:else}

        {#await getRecordFromId("users", data.game.owner)}
        <p class="italic text-xl">Maître du jeu: </p>
        {:then user}
        <p class="italic text-xl">Maître du jeu: {user.username}</p>
        {/await}
        <p class="text-xl font-semibold">Votre personnage</p>
        <section class="card bg-base-200 shadow-lg w-full">
            <div class="card-body items-center">
                <h2 class="text-2xl font-semibold">{data.characters[0].name}</h2>
                <div class="divider"></div>
            </div>
            
            <section class="card-actions justify-center">
                <a href={"/character/" + data.characters[0].id}>
                    <button class="btn btn-neutral btn-wide">Jouer</button>
                </a>
            </section>
        </section>

        {/if}

    {/if}

    {#if form && form.message}
    <dialog id="gameFormModal" class="modal modal-bottom sm:modal-middle" bind:this={gameFormModal}>
        <section class="modal-box bg-base-200">
            <p class="text-xl">{form.message}</p>
            <div class="modal-action">
                <button class="btn btn-neutral" onclick="gameFormModal.close()">Fermer</button>
            </div>
        </section>
    </dialog>
    {/if}

{/if}



{#if data.error}
<h1 class="">{data.message}</h1>
<a href="/">
    <button class="">Accueil</button>
</a>
{/if}

</section>