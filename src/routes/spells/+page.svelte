<script>
    import {updateObject, deleteRecord, updateSpell} from "$lib/utils.js";
    import PocketBase from 'pocketbase';
    import { onMount } from "svelte";
    export let data;

    // Object used in the edit modal
    let spellToEdit = {id: ""};
    // Ref to the edit modal
    let editSpellModal;

    // Object used in the delete modal
    let spellToDelete = {name: ""};
    // Ref to the delete modal
    let deletSpellModal;

    let pb;
    let spells = data.spells;

    onMount(async () => {
        pb = new PocketBase("http://localhost:8090");
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

</script>

<section class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-10/12 lg:w-3/6">
{#if data && data.spells}

    {#if spells.length == 0}
    <h2 class="text-2xl font-semibold text-center">Aucun objet trouvé!</h2>
    {/if}
    <h1 class="text-3xl font-bold text-center">Sorts</h1>

    <section class="card bg-base-300 w-full">
        <table class="card-body table table-zebra">
            <thead>
                <tr>
                    <th class="">Nom</th>
                    <th class="">NI</th>
                    <th class="">Portée</th>
                    <th class="">Cible</th>
                    <th class="">Durée</th>
                    <th>Effets</th>
                </tr>
            </thead>
            <tbody>
                {#each spells as spell}
                    <tr>
                        <td class="text-[0.7rem] sm:text-sm font-medium">{spell.name}</td>
                        <td class="text-[0.7rem] sm:text-sm">{spell.ni}</td>
                        <td class="text-[0.7rem] sm:text-sm">{spell.portee}</td>
                        <td class="text-[0.7rem] sm:text-sm">{spell.cible}</td>
                        <td class="text-[0.7rem] sm:text-sm">{spell.duree}</td>
                        <td class="text-[0.7rem] sm:text-sm">{spell.effets}</td>
                        <!-- <td class="hidden xs:flex"><button class="btn btn-neutral btn-xs xs:btn-md" 
                        on:click={() => {
                            spellToEdit.id = spell.id;
                            spellToEdit.name = spell.name;
                            spellToEdit.ni = spell.ni;
                            spellToEdit.portee = spell.portee;
                            spellToEdit.cible = spell.cible;
                            spellToEdit.duree = spell.duree;
                            spellToEdit.effets = spell.effets;
                            editSpellModal.show();
                        }}>Modifier</button></td> -->
                {/each}
            </tbody>
        </table>

        <dialog id="editSpellModal" class="modal modal-bottom sm:modal-middle" bind:this={editSpellModal} >
            <section class="modal-box form-control bg-base-200">
                <input type="hidden" name="id" value={spellToEdit.id} />

                <div class="form-control">
                    <label class="label" for="name">Nom</label>
                    <input on:change={(event) => spellToEdit.name = event.target.value}
                     class="input input-bordered" type="text" name="name" value={spellToEdit.name}/>
                </div>
                <div class="form-control">
                    <label class="label" for="ni">NI</label>
                    <input on:change={(event) => spellToEdit.ni = event.target.value}
                     class="input input-bordered" type="number" name="ni" value={spellToEdit.ni}/>
                </div>
                <div class="form-control">
                    <label class="label" for="portee">Portée</label>
                    <input on:change={(event) => spellToEdit.portee = event.target.value}
                     class="input input-bordered" type="text" name="portee" value={spellToEdit.portee}/>
                </div>
                <div class="form-control">
                    <label class="label" for="cible">Cible</label>
                    <input on:change={(event) => spellToEdit.cible = event.target.value}
                     class="input input-bordered" type="text" name="cible" value={spellToEdit.cible}/>
                </div>
                <div class="form-control">
                    <label class="label" for="duree">Durée</label>
                    <input on:change={(event) => spellToEdit.duree = event.target.value}
                     class="input input-bordered" type="text" name="duree" value={spellToEdit.duree}/>
                </div>
                <div class="form-control">
                    <label class="label" for="effets">Effets</label>
                    <input on:change={(event) => spellToEdit.effets = event.target.value}
                     class="input input-bordered" type="text" name="effets" value={spellToEdit.effets}/>
                </div>

                <div class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="editSpellModal.close()"
                    on:click={() => {
                        spellToEdit.id="";
                        spellToEdit.name = "";
                        spellToEdit.ni = 0;
                        spellToEdit.portee = "";
                        spellToEdit.cible = "";
                        spellToEdit.duree = "";
                        spellToEdit.effets = "";
                    }}>Fermer</button>
                    <button class="btn btn-success" type="submit" onclick="editSpellModal.close()" 
                    on:click={() => {
                        updateSpell(spellToEdit, spellToEdit);
                    }}>Valider</button>
                </div>
            </section>
            <form method="dialog" class="modal-backdrop">
                <button on:click={() => {
                    spellToEdit.id="";
                    spellToEdit.name = "";
                    spellToEdit.ni = 0;
                    spellToEdit.portee = "";
                    spellToEdit.cible = "";
                    spellToEdit.duree = "";
                    spellToEdit.effets = "";
                }}>Close</button>
            </form>
        </dialog>

        <dialog id="deleteSpellModal" class="modal modal-bottom sm:modal-middle" bind:this={deletSpellModal}>
            <section class="modal-box form-control bg-base-200">

                <p class="text-xl">Voulez-vous vraiment supprimer ce sort? ({spellToDelete.name})</p>

                <section class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="deletObjectModal.close()">Fermer</button>
                    <button class="btn btn-error" type="submit" onclick="deletObjectModal.close()"
                    on:click={() => deleteRecord("spells", spellToDelete)}>Supprimer le sort</button>
                </section>
            </section>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
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