<script>
    import {updateMeleeWeapon, deleteRecord, createMeleeWeapon} from "$lib/utils.js";
    import PocketBase from 'pocketbase';
    import { onDestroy, onMount } from "svelte";

    export let data;

    // Melee weapon used in the edit modal
    let meleeWeaponToEdit = {id: ""};
    // Ref to the edit modal
    let editMeleeWeaponModal;
    // Melee weapon used in the delete modal
    let meleeWeaponToDelete = {name: ""};
    // Ref to the delete modal
    let deleteMeleeWeaponModal;
    // Melee weapon used in the add modal
    let meleeWeaponToCreate = {name: "", groupe: "", proprietes: ""};
    // Ref to the add modal
    let addMeleeWeaponModal;

    // "Form" message after creating a meleeWeapon in DB
    let createMeleeWeaponMessage = "";

    let pb;
    let meleeWeapons = data.meleeWeapons;

    onMount(async () => {
        pb = new PocketBase("http://localhost:8090");
        pb.authStore?.loadFromCookie(document.cookie || '');
        
        pb.collection("meleeWeapons").subscribe("*", (e) => {
            if("update" == e.action){
                meleeWeapons = meleeWeapons.map((mw) => mw.id == e.record.id ? e.record : mw);
            }
            else if("create" == e.action){
                meleeWeapons = [...meleeWeapons, e.record];
            }
            else if("delete" == e.action){
                meleeWeapons = meleeWeapons.filter((mw) => mw.id != e.record.id);

            }
        }, {sort: "name"});
    });

    onDestroy(() => {
        if(pb) pb.collection("meleeWeapons").unsubscribe();
    });

</script>

<section class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">
{#if data && data.meleeWeapons}

    <h1 class="text-3xl font-bold text-center">Armes de mêlée</h1>
    <button class="btn btn-primary mt-5 xs:btn-wide" on:click={() => addMeleeWeaponModal.show()}>Créer une arme de mêlée</button>

    {#if meleeWeapons.length == 0}
    <h2 class="text-2xl font-semibold text-center">Aucune arme de mêlée trouvée!</h2>
    
    {:else}

    <section class="card bg-base-300 w-full">
        <table class="card-body table table-zebra">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Groupe</th>
                    <th>Enc.</th>
                    <th>Dégâts</th>
                    <th>Propriétés</th>
                </tr>
            </thead>
            <tbody>
                {#each meleeWeapons as mw}
                    <tr class="cursor-pointer hover:ring-0" on:click={() => {
                        meleeWeaponToEdit.id = mw.id;
                        meleeWeaponToEdit.name = mw.name;
                        meleeWeaponToEdit.encombrement = mw.encombrement;
                        meleeWeaponToEdit.groupe = mw.groupe;
                        meleeWeaponToEdit.degats = mw.degats;
                        meleeWeaponToEdit.proprietes = mw.proprietes;
                        editMeleeWeaponModal.show();
                    }}>
                        <td class="text-[0.7rem] xs:text-sm lg:text-lg">
                            <button class="btn btn-ghost btn-circle text-error btn-sm"
                            on:click={(event) => {
                                event.stopPropagation();
                                meleeWeaponToDelete = mw;
                                deleteMeleeWeaponModal.show();
                            }}>X</button>
                            {mw.name}</td>
                        <td class="text-[0.7rem] xs:text-sm lg:text-lg">{mw.groupe}</td>
                        <td class="text-[0.7rem] xs:text-sm lg:text-lg">{mw.encombrement}</td>
                        <td class="text-[0.7rem] xs:text-sm lg:text-lg">{mw.degats}</td>
                        <td class="text-[0.7rem] xs:text-sm lg:text-lg">{mw.proprietes}</td>
                        <td></td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <dialog id="addMeleeWeaponModal" class="modal modal-bottom sm:modal-middle" bind:this={addMeleeWeaponModal} >
            <section class="modal-box form-control bg-base-300">
                <h1 class="text-3xl font-bold text-center">Créer une arme de mêlée</h1>

                <div class="form-control">
                    <label class="label" for="name">Nom</label>
                    <input on:change={(event) => meleeWeaponToCreate.name = event.target.value}
                     class="input input-bordered" type="text" name="name" value={meleeWeaponToCreate.name}/>
                </div>
                <div class="form-control">
                    <label class="label" for="encombrement">Enc.</label>
                    <input on:change={(event) => meleeWeaponToCreate.encombrement = event.target.value}
                     class="input input-bordered" type="number" name="encombrement" value={meleeWeaponToCreate.encombrement}/>
                </div>
                <div class="form-control">
                    <label class="label" for="groupe">Groupe</label>
                    <input on:change={(event) => meleeWeaponToCreate.groupe = event.target.value}
                     class="input input-bordered" type="text" name="groupe" value={meleeWeaponToCreate.groupe}/>
                </div>
                <div class="form-control">
                    <label class="label" for="degats">Dégâts</label>
                    <input on:change={(event) => meleeWeaponToCreate.degats = event.target.value}
                     class="input input-bordered" type="number" name="degats" value={meleeWeaponToCreate.degats}/>
                </div>
                <div class="form-control">
                    <label class="label" for="proprietes">Propriétés</label>
                    <input on:change={(event) => meleeWeaponToCreate.proprietes = event.target.value}
                     class="input input-bordered" type="text" name="proprietes" value={meleeWeaponToCreate.proprietes}/>
                </div>

                {#if createMeleeWeaponMessage != ""}
                <p class="text-warning text-center text-lg">{createMeleeWeaponMessage}</p>
                {/if}

                <div class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="addMeleeWeaponModal.close()"
                    on:click={() => {
                        meleeWeaponToCreate.name = "";
                        meleeWeaponToCreate.id="";
                        meleeWeaponToCreate.encombrement = "";
                        meleeWeaponToCreate.groupe = "";
                        meleeWeaponToCreate.degats = "";
                        meleeWeaponToCreate.proprietes = "";
                    }}>Fermer</button>
                    <button class="btn btn-success" type="submit"
                    on:click={async() => {
                        const resp = await createMeleeWeapon(meleeWeaponToCreate);
                        console.log(resp);
                        if(resp && resp.error){
                            createMeleeWeaponMessage = resp.message;
                        }else {
                            createMeleeWeaponMessage = "";
                            addMeleeWeaponModal.close();
                        }
                    }}>Créer</button>
                </div>
            </section>
            <form method="dialog" class="modal-backdrop  bg-neutral bg-opacity-40">
                <button on:click={() => {
                    meleeWeaponToCreate.name = "";
                    meleeWeaponToCreate.id="";
                    meleeWeaponToCreate.encombrement = "";
                    meleeWeaponToCreate.groupe = "";
                    meleeWeaponToCreate.degats = "";
                    meleeWeaponToCreate.proprietes = "";
                }}>close</button>
            </form>
        </dialog>

        <dialog id="editMeleeWeaponModal" class="modal modal-bottom sm:modal-middle" bind:this={editMeleeWeaponModal} >
            <section class="modal-box form-control bg-base-300">
                <input type="hidden" name="id" value={meleeWeaponToEdit.id} />

                <div class="form-control">
                    <label class="label" for="name">Nom</label>
                    <input on:change={(event) => meleeWeaponToEdit.name = event.target.value}
                     class="input input-bordered" type="text" name="name" value={meleeWeaponToEdit.name}/>
                </div>
                <div class="form-control">
                    <label class="label" for="encombrement">Enc.</label>
                    <input on:change={(event) => meleeWeaponToEdit.encombrement = event.target.value}
                     class="input input-bordered" type="number" name="encombrement" value={meleeWeaponToEdit.encombrement}/>
                </div>
                <div class="form-control">
                    <label class="label" for="groupe">Groupe</label>
                    <input on:change={(event) => meleeWeaponToEdit.groupe = event.target.value}
                     class="input input-bordered" type="text" name="groupe" value={meleeWeaponToEdit.groupe}/>
                </div>
                <div class="form-control">
                    <label class="label" for="degats">Dégâts</label>
                    <input on:change={(event) => meleeWeaponToEdit.degats = event.target.value}
                     class="input input-bordered" type="number" name="degats" value={meleeWeaponToEdit.degats}/>
                </div>
                <div class="form-control">
                    <label class="label" for="proprietes">Propriétés</label>
                    <input on:change={(event) => meleeWeaponToEdit.proprietes = event.target.value}
                     class="input input-bordered" type="text" name="proprietes" value={meleeWeaponToEdit.proprietes}/>
                </div>                

                <div class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="editMeleeWeaponModal.close()"
                    on:click={() => {
                        meleeWeaponToEdit.name = "";
                        meleeWeaponToEdit.id="";
                        meleeWeaponToEdit.encombrement = 0;
                        meleeWeaponToEdit.groupe = "";
                        meleeWeaponToEdit.degats = 0;
                        meleeWeaponToEdit.proprietes = "";
                    }}>Fermer</button>
                    <button class="btn btn-success" type="submit" onclick="editMeleeWeaponModal.close()" 
                    on:click={() => {
                        updateMeleeWeapon(meleeWeaponToEdit, meleeWeaponToEdit);
                    }}>Valider</button>
                </div>
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
                <button on:click={() => {
                    meleeWeaponToEdit.name = "";
                    meleeWeaponToEdit.id="";
                    meleeWeaponToEdit.encombrement = 0;
                    meleeWeaponToEdit.groupe = "";
                    meleeWeaponToEdit.degats = 0;
                    meleeWeaponToEdit.proprietes = "";
                }}>Close</button>
            </form>
        </dialog>

        <dialog id="deleteMeleeWeaponModal" class="modal modal-bottom sm:modal-middle" bind:this={deleteMeleeWeaponModal}>
            <section class="modal-box form-control bg-base-300">

                <p class="text-xl">Voulez-vous vraiment supprimer cette arme? ({meleeWeaponToDelete.name})</p>

                <section class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="deleteMeleeWeaponModal.close()">Fermer</button>
                    <button class="btn btn-error" type="submit" onclick="deleteMeleeWeaponModal.close()"
                    on:click={() => deleteRecord("meleeWeapons", meleeWeaponToDelete)}>Supprimer l'arme</button>
                </section>
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
                <button>close</button>
            </form>
        </dialog>
    </section>
    {/if}


{:else}
    <h1 class="text-2xl font-semibold text-center">Page non trouvée</h1>
    <a href="/">
        <button class="btn btn-neutral mt-5">Accueil</button>
    </a>
{/if}
</section>