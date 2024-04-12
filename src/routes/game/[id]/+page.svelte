<script>
    import {getRecordFromId, updateGameField, characNameMap, getCharacteristicFull} from "$lib/utils.js"

    export let data;
    export let form;

    let gameFormModal;

    let editNotes = false;

    $: if(form && form.message){
        gameFormModal.showModal();
    }

    const objects = new Map(
        [["/objects", "Objets"],
        ["/talents", "Talents"],
        ["/weapons", "Armes"],
        ["/armor", "Armures"],
        ["/spells", "Sorts"],]
    );

</script>

<section class="flex flex-col gap-10 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6 xl:w-2/6">
{#if data && data.game}

    <h1 class="text-3xl font-bold">{data.game.name}</h1>

    {#if data.isMaster}
        <p class="italic text-xl"> Vous êtes le maître du jeu!</p>
    {:else }
        {#await getRecordFromId("users", data.game.owner)}
        <p class="italic text-xl">Maître du jeu: </p>
        {:then user}
        <p class="italic text-xl">Maître du jeu: {user.username}</p>
        {/await}
    {/if}


    {#if data.isMaster}
    <a href={"/createcharac/?gameId=" + data.game.id}>
        <button class="btn btn-primary xs:btn-wide text-xl">Créer un personnage</button>
    </a>
    <section class="flex flex-wrap justify-center gap-2">
        {#each objects as [key, value]}
        <a href={key}>
            <button class="btn btn-secondary">{value}</button>
        </a>
        {/each}
    </section>
    {/if}

    {#if !data.isUserInGame || data.isMaster}
    <p class="text-xl font-semibold">Personnages</p>
    {:else}
    <p class="text-xl font-semibold">Votre personnage</p>
    {/if}

    <section class="w-full flex flex-col gap-10">
        {#if !data.game.expand || !data.game.expand.characters || data.game.expand.characters.length == 0}
            <p class="text-lg italic text-center">Aucun personnage disponible dans cette partie.</p>
        {:else}

            {#each data.game.expand.characters as character}
            <div class="card bg-base-300 shadow-lg w-full">
                <div class="card-body items-center">
                    <h2 class="text-2xl font-semibold">{character.name}</h2>

                    {#if character.isPlayable && character.user}
                        {#await getRecordFromId("users", character.user)}
                        <p class="mt-2 text-lg text-center italic">Joueur: </p>
                        {:then user}
                        <p class="mt-2 text-lg text-center italic">Joueur: {user.username}</p>
                        {/await}
                    {:else if character.isPlayable}
                        <p class="mt-2 text-lg text-center italic">Joueur: aucun</p>
                    {:else}
                        <p class="mt-2 text-lg text-center italic">Non jouable</p>
                    {/if}
                    <div class="divider"></div>
                    <div class="flex flex-wrap gap-3 w-full">
                        <p class="font-bold text-xl input flex-1 flex gap-2 items-center">Race: <span class="font-normal">{character.race}</span></p>
                        <p class="font-bold text-xl input flex-1 flex gap-2 items-center">Classe: <span class="font-normal">{character.classe}</span></p>
                    </div>
                    <div class="grid grid-cols-2 2xs:grid-cols-5 gap-1">
                        {#each new Map(Object.entries(character.characteristics).sort((a, b) => a[1].order - b[1].order)) as [charac, prop]}
                        <div class="form-control">
                            <label class="label font-semibold self-center" for={charac}>{characNameMap.get(charac)}</label>
                            <input class="input text-center disabled:text-base-content disabled:cursor-default" type="number" disabled name={charac} value={getCharacteristicFull(character, charac)} />
                        </div>
                        {/each}

                    </div>
                </div>

                {#if data.isMaster || data.isUserInGame}
                <div class="card-actions justify-center">
                    <a href={"/character/" + character.id}>
                        <button class="btn btn-neutral xs:btn-wide">{data.isMaster ? "Voir" : "Jouer"}</button>
                    </a>
                </div>
                {:else}
                <form class="card-actions justify-center" method="POST" action="?/joinGame">
                    <input type="hidden" name="characId" value={character.id} />
                    <input type="hidden" name="gameId" value={data.game.id} />
                    <button class="btn btn-neutral btn-wide">Choisir</button>
                </form>
                {/if}
                
            </div>
            {/each}
        {/if}
        
    </section>

    {#if data.isMaster}
        <section id="notes" class="card bg-base-300 w-full">
            <section class="card-body">
                <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                    <h2 class="card-title">Notes</h2>
                    <input type="checkbox" class="toggle toggle-info justify-self-end" bind:checked={editNotes} />
                </div>
                <section class="" style:display={editNotes ? "block" : "none"}>
                    <div class="form-control">
                        <textarea on:change={(event) => updateGameField(data.game, "notes", event.target.value)} 
                        class="textarea textarea-bordered sm:text-lg h-96 disabled:text-base-content disabled:cursor-default" 
                        disabled={!data.isMaster}  
                        name="notes" value={data.game.notes} />
                    </div>
                </section>
            </section>
        </section>
        {/if}
        
        <!-- Delete game button form -->
        {#if data.isMaster}
        <section class="flex justify-center mt-10">
            <button class="btn btn-error" onclick="deleteGameModal.showModal()">Supprimer la partie</button>
        </section>
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
                <button>Close</button>
            </form>
        </dialog>
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



{#if data.error}
<h1 class="text-2xl font-semibold text-center">{data.message}</h1>
<a href="/">
    <button class="btn btn-neutral xs:btn-wide">Accueil</button>
</a>
{/if}

</section>