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
    {:else }
        {#await getRecordFromId("users", data.game.owner)}
        <p class="italic text-xl">Maître du jeu: </p>
        {:then user}
        <p class="italic text-xl">Maître du jeu: {user.username}</p>
        {/await}
    {/if}


    {#if data.isMaster}
    <a href={"/createcharac/?gameId=" + data.game.id}>
        <button class="btn btn-primary btn-wide text-xl">Créer un personnage</button>
    </a>
    {/if}

    {#if !data.isUserInGame || data.isMaster}
    <p class="text-xl font-semibold">Personnages</p>
    {:else}
    <p class="text-xl font-semibold">Votre personnage</p>
    {/if}

    <section class="w-full flex flex-col gap-5">
        {#if data.game.expand.characters.length == 0}
        <p class="text-lg italic">Aucun personnage disponibles dans cette partie.</p>
        {/if}

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
                <div class="grid grid-cols-5 gap-1">
                    <div class="form-control">
                        <label class="label font-semibold self-center" for="cc">CC</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="cc" value={character.capCombat.init + character.capCombat.aug} />
                    </div>

                    <div class="form-control">
                        <label class="label font-semibold self-center" for="ct">CT</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="ct" value={character.capTir.init + character.capTir.aug} />
                    </div>

                    <div class="form-control">
                        <label class="label font-semibold self-center" for="f">F</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="f" value={character.force.init + character.force.aug} />
                    </div>

                    <div class="form-control">
                        <label class="label font-semibold self-center" for="e">E</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="e" value={character.endurance.init + character.endurance.aug} />
                    </div>

                    <div class="form-control">
                        <label class="label font-semibold self-center" for="i">I</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="i" value={character.initiative.init + character.initiative.aug} />
                    </div>
                </div>

                <div class="grid grid-cols-5 gap-1">
                    <div class="form-control">
                        <label class="label font-semibold self-center" for="ag">Ag</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="ag" value={character.agilite.init + character.agilite.aug} />
                    </div>

                    <div class="form-control">
                        <label class="label font-semibold self-center" for="dex">Dex</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="dex" value={character.dexterite.init + character.dexterite.aug} />
                    </div>

                    <div class="form-control">
                        <label class="label font-semibold self-center" for="int">Int</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="int" value={character.intelligence.init + character.intelligence.aug} />
                    </div>

                    <div class="form-control">
                        <label class="label font-semibold self-center" for="fm">FM</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="fm" value={character.forceMentale.init + character.forceMentale.aug} />
                    </div>

                    <div class="form-control">
                        <label class="label font-semibold self-center" for="soc">Soc</label>
                        <input class="input text-center disabled:text-base-content" type="number" disabled name="soc" value={character.sociabilite.init + character.sociabilite.aug} />
                    </div>
                </div>
            </div>

            {#if data.isMaster || data.isUserInGame}
            <div class="card-actions justify-center">
                <a href={"/character/" + character.id}>
                    <button class="btn btn-neutral btn-wide">{data.isMaster ? "Voir" : "Jouer"}</button>
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
        
        <!-- Delete game button form -->
        {#if data.isMaster}
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
                <button>Close</button>
            </form>
        </dialog>
        {/if}
        
    </section>
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