<script>
    import {getRecordFromId} from "$lib/utils.js"

    export let data;
    export let form;

    let characFormModal;

    $: if(form && form.message){
        characFormModal.showModal();
    }

</script>

<section class="flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">
{#if data && data.character}

    <h1 class="text-3xl font-bold">{data.character.name}</h1>

    {#if data.isMaster}

        {#if data.character.isPlayable && data.character.user}
            {#await getRecordFromId("users", data.character.user)}
            <p class="italic text-xl">Joueur: </p>
            {:then user}
            <p class="italic text-xl">Joueur: {user.username}</p>
            {/await}
        {:else if data.character.isPlayable}
            <p class="italic text-xl">Joueur: aucun</p>
        {:else}
            <p class="italic text-xl">Non jouable</p>
        {/if}

        <section class="flex gap-3">
            {#if data.character.user}
            <form class="flex-1" method="POST" action="?/leaveCharac">
                <input type="hidden" name="characId" value={data.character.id} />
                <input type="hidden" name="gameId" value={data.character.game} />
                <input type="hidden" name="userId" value={data.character.user} />
                <button class="btn btn-warning">Expulser le joueur</button>
            </form>
            {/if}

            <button class="btn btn-error flex-1" onclick="deleteCharacModal.showModal()">Supprimer le personnage</button>
        </section>
        
        <dialog id="deleteCharacModal" class="modal modal-bottom sm:modal-middle" >
            <form class="modal-box form-control bg-base-200" method="POST" action="?/deleteCharac">
                <input type="hidden" name="characId" value={data.character.id} />
                <input type="hidden" name="userId" value={data.character.user} />
                <input type="hidden" name="gameId" value={data.character.game} />

                <p class="text-xl">Voulez-vous vraiment supprimer ce personnage?</p>

                <section class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="deleteCharacModal.close()">Fermer</button>
                    <button class="btn btn-error" type="submit" onclick="deleteCharacModal.close()">Supprimer le personnage</button>
                </section>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

    {:else}

        <form method="POST" action="?/leaveCharac">
            <input type="hidden" name="characId" value={data.character.id} />
            <input type="hidden" name="gameId" value={data.character.game} />
            <input type="hidden" name="userId" value={data.character.user} />
            <button class="" >Rendre le personnage</button>
        </form>

    {/if}

    
    {#if form && form.message}
        <dialog id="characFormModal" class="modal modal-bottom sm:modal-middle" bind:this={characFormModal}>
            <section class="modal-box bg-base-200">
                <p class="text-xl">{form.message}</p>
                <div class="modal-action">
                    <button class="btn btn-neutral" onlick="characFormModal.close()">Fermer</button>
                </div>
            </section>
        </dialog>
    {/if}
{/if}
</section>