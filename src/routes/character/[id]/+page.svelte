<script>
    import Modal from "$lib/Components/Modal.svelte";

    export let data;
    export let form;

    let formModalOpen = false;

    $: if(form && form.message){
        formModalOpen = true;
    }

    let deleteCharacModalOpen = false;
</script>

{#if data && data.character}

    <h1 class="h1">{data.character.name}</h1>

    {#if data.isMaster}

        <button class="delete" on:click={() => deleteCharacModalOpen = true}>Supprimer le personnage</button>
        <Modal isOpen={deleteCharacModalOpen} >
            <form method="POST" action="?/deleteCharac">
                <input type="hidden" name="characId" value={data.character.id} />
                <input type="hidden" name="userId" value={data.character.user} />
                <input type="hidden" name="gameId" value={data.character.game} />
                <section class="modal">
                    <p>Voulez-vous vraiment supprimer ce personnage?</p>
                    <button type="button" on:click={() => deleteCharacModalOpen = false}>Fermer</button>
                    <button class="delete" type="submit" on:click={() => deleteCharacModalOpen = false}>Supprimer le personnage</button>
                </section>
            </form>
        </Modal>

    {:else}

        <form method="POST" action="?/leaveCharac">
            <input type="hidden" name="characId" value={data.character.id} />
            <input type="hidden" name="gameId" value={data.character.game} />
            <button class="delete" >Rendre le personnage</button>
        </form>

    {/if}

    
    {#if form && form.message}
        <Modal isOpen={formModalOpen}>
            <section class="modal">
                <p>{form.message}</p>
                <button on:click={() => {formModalOpen = false}}>Fermer</button>
            </section>
        </Modal>
    {/if}
{/if}