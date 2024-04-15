<script>
    import {PUBLIC_DB_ADDRESS} from "$env/static/public";
    import {textColorBasedOnBG, transformWordIntoColor, getHoverColor, updateSpell, createSpell, deleteRecord} from "$lib/utils.js";
    import PocketBase from 'pocketbase';
    import { onDestroy, onMount } from "svelte";
    export let data;

    // Object used in the edit modal
    let spellToEdit = {id: ""};
    // Ref to the edit modal
    let editSpellModal;

    // Object used in the add modal
    let spellToAdd = {id: "", name: "", ni: 0, portee: "", cible: "", duree: "", effets: ""};
    // Ref to the add modal
    let addSpellModal;
    let createSpellMessage = "";

    let pb;
    let spells = data.spells;

    onMount(async () => {
        pb = new PocketBase(PUBLIC_DB_ADDRESS);
        pb.authStore?.loadFromCookie(document.cookie || '');
        
        pb.collection("spells").subscribe("*", (e) => {
            if("update" == e.action){
                spells = spells.map((spell) => spell.id == e.record.id ? e.record : spell);
            }
            else if("create" == e.action){
                spells = [...spells, e.record];
            }
            else if("delete" == e.action){
                spells = spells.filter((spell) => spell.id != e.record.id);
            }
        });
    });

    onDestroy(() => {
        if(pb) pb.collection("spells").unsubscribe();
    });

</script>

<section class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-10/12 lg:w-3/6">
{#if data && data.spells}

    {#if spells.length == 0}
    <h2 class="text-2xl font-semibold text-center">Aucun sort trouvé!</h2>
    {/if}
    <h1 class="text-3xl font-bold text-center mb-5">Sorts</h1>
    <button class="btn btn-primary mt-5 xs:btn-wide" onclick="addSpellModal.showModal()">Créer un sort</button>

    <section class="card w-full">
        <section class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
            {#each spells as spell}
            <button class="btn" 
            style="--bgColor: {transformWordIntoColor(spell.name)}; --color: {textColorBasedOnBG(transformWordIntoColor(spell.name))}; --hoverColor: {getHoverColor(transformWordIntoColor(spell.name))}" 
            on:click={() => {
                spellToEdit.id= spell.id;
                spellToEdit.name = spell.name;
                spellToEdit.ni = spell.ni;
                spellToEdit.portee = spell.portee;
                spellToEdit.cible = spell.cible;
                spellToEdit.duree = spell.duree;
                spellToEdit.effets = spell.effets;
                editSpellModal.show();
            }}>{spell.name}</button>
            {/each}
        </section>

        <!-- EDIT MODAL -->
        <dialog id="editSpellModal" class="modal modal-bottom sm:modal-middle" bind:this={editSpellModal} >
            <section class="modal-box form-control bg-base-300">
                <input type="hidden" name="id" value={spellToEdit.id} />

                <div class="form-control">
                    <label class="label" for="name">Nom</label>
                    <input on:change={(event) => spellToEdit.name = event.target.value}
                     class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="name" value={spellToEdit.name}/>
                </div>
                <div class="form-control">
                    <label class="label" for="ni">NI</label>
                    <input on:change={(event) => spellToEdit.ni = event.target.value}
                     class="input input-bordered disabled:text-base-content disabled:cursor-default" type="number" name="ni" value={spellToEdit.ni}/>
                </div>
                <div class="form-control">
                    <label class="label" for="portee">Portée</label>
                    <input on:change={(event) => spellToEdit.portee = event.target.value}
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="portee" value={spellToEdit.portee}/>
                </div>
                <div class="form-control">
                    <label class="label" for="cible">Cible</label>
                    <input on:change={(event) => spellToEdit.cible = event.target.value}
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="cible" value={spellToEdit.cible}/>
                </div>
                <div class="form-control">
                    <label class="label" for="duree">Durée</label>
                    <input on:change={(event) => spellToEdit.duree = event.target.value}
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="duree" value={spellToEdit.duree}/>
                </div>
                <div class="form-control">
                    <label class="label" for="effets">Effets</label>
                    <input on:change={(event) => spellToEdit.effets = event.target.value}
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="effets" value={spellToEdit.effets}/>
                </div>

                <div class="modal-action">
                    <button class="btn btn-error" onclick="editSpellModal.close()"
                    on:click={() => deleteRecord("spells", spellToEdit)}
                    >Supprimer</button>
                    <button class="btn btn-success" onclick="editSpellModal.close()"
                    on:click={() => updateSpell(spellToEdit, spellToEdit)}
                    >Valider</button>
                    <button class="btn btn-neutral" onclick="editSpellModal.close()"
                    on:click={() => {
                        spellToEdit.id="";
                        spellToEdit.name = "";
                        spellToEdit.ni = "";
                        spellToEdit.portee = "";
                        spellToEdit.cible = "";
                        spellToEdit.duree = "";
                        spellToEdit.effets = "";
                    }}>Fermer</button>
                </div>
            </section>
            <form method="dialog" class="modal-backdrop  bg-neutral bg-opacity-40">
                <button on:click={() => {
                    spellToEdit.id="";
                    spellToEdit.name = "";
                    spellToEdit.ni = "";
                    spellToEdit.portee = "";
                    spellToEdit.cible = "";
                    spellToEdit.duree = "";
                    spellToEdit.effets = "";
                }}>Close</button>
            </form>
        </dialog>

        <!-- ADD MODAL -->
        <dialog id="addSpellModal" class="modal modal-bottom sm:modal-middle" bind:this={addSpellModal} >
            <section class="modal-box form-control bg-base-300">
                <input type="hidden" name="id" value={spellToAdd.id} />

                <div class="form-control">
                    <label class="label" for="name">Nom</label>
                    <input on:change={(event) => spellToAdd.name = event.target.value}
                     class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="name" value={spellToAdd.name}/>
                </div>
                <div class="form-control">
                    <label class="label" for="ni">NI</label>
                    <input on:change={(event) => spellToAdd.ni = event.target.value}
                     class="input input-bordered disabled:text-base-content disabled:cursor-default" type="number" name="ni" value={spellToAdd.ni}/>
                </div>
                <div class="form-control">
                    <label class="label" for="portee">Portée</label>
                    <input on:change={(event) => spellToAdd.portee = event.target.value}
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="portee" value={spellToAdd.portee}/>
                </div>
                <div class="form-control">
                    <label class="label" for="cible">Cible</label>
                    <input on:change={(event) => spellToAdd.cible = event.target.value}
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="cible" value={spellToAdd.cible}/>
                </div>
                <div class="form-control">
                    <label class="label" for="duree">Durée</label>
                    <input on:change={(event) => spellToAdd.duree = event.target.value}
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="duree" value={spellToAdd.duree}/>
                </div>
                <div class="form-control">
                    <label class="label" for="effets">Effets</label>
                    <input on:change={(event) => spellToAdd.effets = event.target.value}
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="effets" value={spellToAdd.effets}/>
                </div>

                {#if createSpellMessage != ""}
                    <p class="text-warning text-center text-lg">{createSpellMessage}</p>
                {/if}

                <div class="modal-action">
                    <button class="btn btn-success"
                    on:click={async () => {
                        const resp = await createSpell(spellToAdd);
                        if(resp && resp.error) {
                            createSpellMessage = resp.message;
                        }
                        else {
                            createSpellMessage = "";
                            addSpellModal.close();
                        }
                    }}
                    >Ajouter</button>
                    <button class="btn btn-neutral" onclick="addSpellModal.close()"
                    on:click={() => {
                        spellToAdd.id="";
                        spellToAdd.name = "";
                        spellToAdd.ni = 0;
                        spellToAdd.portee = "";
                        spellToAdd.cible = "";
                        spellToAdd.duree = "";
                        spellToAdd.effets = "";
                    }}>Fermer</button>
                </div>
            </section>
            <form method="dialog" class="modal-backdrop  bg-neutral bg-opacity-40">
                <button on:click={() => {
                    spellToAdd.id="";
                    spellToAdd.name = "";
                    spellToAdd.ni = 0;
                    spellToAdd.portee = "";
                    spellToAdd.cible = "";
                    spellToAdd.duree = "";
                    spellToAdd.effets = "";
                }}>Close</button>
            </form>
        </dialog>

    </section>


{:else}
    <h1 class="text-2xl font-semibold text-center">Page non trouvée</h1>
    <a href="/">
        <button class="btn btn-neutral mt-5">Accueil</button>
    </a>
{/if}
</section>

<style lang="scss">
    button {
        background-color: var(--bgColor);
        color: var(--color);

        &:hover {
            background-color: var(--hoverColor);
        }
    }
</style>