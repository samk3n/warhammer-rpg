<script>
    import {PUBLIC_DB_ADDRESS} from "$env/static/public";
    import {updateMeleeWeapon, deleteRecord, createMeleeWeapon, createRangeWeapon, updateRangeWeapon} from "$lib/utils.js";
    import PocketBase from 'pocketbase';
    import { onDestroy, onMount } from "svelte";

    export let data;

    // MELEE WEAPONS
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

    // RANGE WEAPONS
    // Range weapon used in the delete modal
    let rangeWeaponToDelete = {name: ""};
    // Ref to the delete modal
    let deleteRangeWeaponModal;
    // Range weapon used in the add modal
    let rangeWeaponToCreate = {name: "", groupe: "", proprietes: "", portee: ""};
    // Ref to the add modal
    let addRangeWeaponModal;
    // "Form" message after creating a rangeWeapon in DB
    let createRangeWeaponMessage = "";

    let pb;
    let meleeWeapons = data.meleeWeapons;
    let rangeWeapons = data.rangeWeapons;

    let meleeWeaponsTabActive = true;

    onMount(async () => {
        pb = new PocketBase(PUBLIC_DB_ADDRESS);
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

        pb.collection("rangeWeapons").subscribe("*", (e) => {
            if("update" == e.action){
                rangeWeapons = rangeWeapons.map((rw) => rw.id == e.record.id ? e.record : rw);
            }
            else if("create" == e.action){
                rangeWeapons = [...rangeWeapons, e.record];
            }
            else if("delete" == e.action){
                rangeWeapons = rangeWeapons.filter((rw) => rw.id != e.record.id);

            }
        }, {sort: "name"});
    });

    onDestroy(() => {
        if(pb){
            pb.collection("meleeWeapons").unsubscribe();
            pb.collection("rangeWeapons").unsubscribe();
        }
    });

</script>

<section class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-4/5 lg:w-4/6 xl:w-3/6">
{#if data}

    <h1 class="text-3xl font-bold text-center">Armes</h1>
    <div class="flex justify-center flex-wrap gap-5 my-5">
        <button class="btn btn-primary xs:btn-wide" on:click={() => addMeleeWeaponModal.show()}>Créer une arme de mêlée</button>
        <button class="btn btn-primary xs:btn-wide" on:click={() => addRangeWeaponModal.show()}>Créer une arme à distance</button>
    </div>

    <div role="tablist" class="tabs tabs-lg tabs-lifted w-full">
        <a href="" role="tab" class="tab" tabindex="0" class:tab-active={meleeWeaponsTabActive} on:click={() => meleeWeaponsTabActive = true}><iconify-icon class="text-3xl" icon="memory:sword"></iconify-icon></a>
        <a href="" role="tab" class="tab" tabindex="0" class:tab-active={!meleeWeaponsTabActive} on:click={() => meleeWeaponsTabActive = false}><iconify-icon class="text-3xl" icon="memory:bow-arrow"></iconify-icon></a>
    </div>

    <!-- MELEE WEAPONS -->
    {#if meleeWeaponsTabActive && data.meleeWeapons}
        {#if meleeWeapons.length == 0}
        <h2 class="text-xl font-semibold text-center">Aucune arme de mêlée trouvée.</h2>
        
        {:else}

        <section class="card bg-base-300 w-full">
            {#each meleeWeapons as mw}
            <section class="collapse p-2 rounded-lg odd:bg-base-200 even:bg-base-300">
                <input type="checkbox" /> 
                <div class="collapse-title flex gap-3 items-center">
                    <button class="btn btn-ghost btn-circle text-error btn-sm relative z-50"
                        on:click={() => {
                            meleeWeaponToDelete = mw;
                            deleteMeleeWeaponModal.show();
                    }}>X</button>
                    {mw.name}
                </div>
                <div class="collapse-content flex flex-col gap-3">
                    <div class="form-control">
                        <label class="label" for="name">Nom</label>
                        <input on:change={(event) => updateMeleeWeapon(mw, "name", event.target.value)}
                        class="input input-bordered" type="text" name="name" value={mw.name}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="encombrement">Enc.</label>
                        <input on:change={(event) => updateMeleeWeapon(mw, "encombrement", parseInt(event.target.value))}
                        class="input input-bordered" type="number" name="encombrement" value={mw.encombrement}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="groupe">Groupe</label>
                        <input on:change={(event) => updateMeleeWeapon(mw, "groupe", event.target.value)}
                        class="input input-bordered" type="text" name="groupe" value={mw.groupe}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="degats">Dégâts</label>
                        <input on:change={(event) => updateMeleeWeapon(mw, "degats", parseInt(event.target.value))}
                        class="input input-bordered" type="number" name="degats" value={mw.degats}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="proprietes">Propriétés</label>
                        <input on:change={(event) => updateMeleeWeapon(mw, "proprietes", event.target.value)}
                        class="input input-bordered" type="text" name="proprietes" value={mw.proprietes}/>
                    </div>      
                </div>
            </section>
            {/each}
        </section>
        {/if}
        
    <!-- RANGE WEAPONS -->
    {:else if !meleeWeaponsTabActive && data.rangeWeapons}
        {#if rangeWeapons.length == 0}
        <h2 class="text-xl font-semibold text-center">Aucune arme à distance trouvée.</h2>
        
        {:else}

        <section class="card bg-base-300 w-full">
            {#each rangeWeapons as rw}
            <section class="collapse p-2 rounded-lg odd:bg-base-200 even:bg-base-300">
                <input type="checkbox" /> 
                <div class="collapse-title flex gap-3 items-center">
                    <button class="btn btn-ghost btn-circle text-error btn-sm relative z-50"
                        on:click={() => {
                            rangeWeaponToDelete = rw;
                            deleteRangeWeaponModal.show();
                    }}>X</button>
                    {rw.name}
                </div>
                <div class="collapse-content flex flex-col gap-3">
                    <div class="form-control">
                        <label class="label" for="name">Nom</label>
                        <input on:change={(event) => updateRangeWeapon(rw, "name", event.target.value)}
                        class="input input-bordered" type="text" name="name" value={rw.name}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="encombrement">Enc.</label>
                        <input on:change={(event) => updateRangeWeapon(rw, "encombrement", parseInt(event.target.value))}
                        class="input input-bordered" type="number" name="encombrement" value={rw.encombrement}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="groupe">Groupe</label>
                        <input on:change={(event) => updateRangeWeapon(rw, "groupe", event.target.value)}
                        class="input input-bordered" type="text" name="groupe" value={rw.groupe}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="degats">Dégâts</label>
                        <input on:change={(event) => updateRangeWeapon(rw, "degats", parseInt(event.target.value))}
                        class="input input-bordered" type="number" name="degats" value={rw.degats}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="degats">Portée</label>
                        <input on:change={(event) => updateRangeWeapon(rw, "portee", event.target.value)}
                        class="input input-bordered" type="text" name="portee" value={rw.portee}/>
                    </div>
                    <div class="form-control">
                        <label class="label" for="proprietes">Propriétés</label>
                        <input on:change={(event) => updateRangeWeapon(rw, "proprietes", event.target.value)}
                        class="input input-bordered" type="text" name="proprietes" value={rw.proprietes}/>
                    </div>      
                </div>
            </section>
            {/each}
        </section>
        {/if}
    {/if}

    <!-- MELEE WEAPONS MODALS -->
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


    <!-- RANGE WEAPONS MODALS -->
    <dialog id="addRangeWeaponModal" class="modal modal-bottom sm:modal-middle" bind:this={addRangeWeaponModal} >
        <section class="modal-box form-control bg-base-300">
            <h1 class="text-3xl font-bold text-center">Créer une arme à distance</h1>

            <div class="form-control">
                <label class="label" for="name">Nom</label>
                <input on:change={(event) => rangeWeaponToCreate.name = event.target.value}
                class="input input-bordered" type="text" name="name" value={rangeWeaponToCreate.name}/>
            </div>
            <div class="form-control">
                <label class="label" for="encombrement">Enc.</label>
                <input on:change={(event) => rangeWeaponToCreate.encombrement = event.target.value}
                class="input input-bordered" type="number" name="encombrement" value={rangeWeaponToCreate.encombrement}/>
            </div>
            <div class="form-control">
                <label class="label" for="groupe">Groupe</label>
                <input on:change={(event) => rangeWeaponToCreate.groupe = event.target.value}
                class="input input-bordered" type="text" name="groupe" value={rangeWeaponToCreate.groupe}/>
            </div>
            <div class="form-control">
                <label class="label" for="degats">Dégâts</label>
                <input on:change={(event) => rangeWeaponToCreate.degats = event.target.value}
                class="input input-bordered" type="number" name="degats" value={rangeWeaponToCreate.degats}/>
            </div>
            <div class="form-control">
                <label class="label" for="portee">Portée</label>
                <input on:change={(event) => rangeWeaponToCreate.portee = event.target.value}
                class="input input-bordered" type="text" name="portee" value={rangeWeaponToCreate.portee}/>
            </div>
            <div class="form-control">
                <label class="label" for="proprietes">Propriétés</label>
                <input on:change={(event) => rangeWeaponToCreate.proprietes = event.target.value}
                class="input input-bordered" type="text" name="proprietes" value={rangeWeaponToCreate.proprietes}/>
            </div>

            {#if createRangeWeaponMessage != ""}
            <p class="text-warning text-center text-lg">{createRangeWeaponMessage}</p>
            {/if}

            <div class="modal-action">
                <button class="btn btn-neutral" type="button" onclick="addRangeWeaponModal.close()"
                on:click={() => {
                    rangeWeaponToCreate.name = "";
                    rangeWeaponToCreate.id="";
                    rangeWeaponToCreate.encombrement = "";
                    rangeWeaponToCreate.groupe = "";
                    rangeWeaponToCreate.degats = "";
                    rangeWeaponToCreate.portee = "";
                    rangeWeaponToCreate.proprietes = "";
                }}>Fermer</button>
                <button class="btn btn-success" type="submit"
                on:click={async() => {
                    const resp = await createRangeWeapon(rangeWeaponToCreate);
                    if(resp && resp.error){
                        createRangeWeaponMessage = resp.message;
                    }else {
                        createRangeWeaponMessage = "";
                        addRangeWeaponModal.close();
                    }
                }}>Créer</button>
            </div>
        </section>
        <form method="dialog" class="modal-backdrop  bg-neutral bg-opacity-40">
            <button on:click={() => {
                rangeWeaponToCreate.name = "";
                rangeWeaponToCreate.id="";
                rangeWeaponToCreate.encombrement = "";
                rangeWeaponToCreate.groupe = "";
                rangeWeaponToCreate.degats = "";
                rangeWeaponToCreate.portee = "";
                rangeWeaponToCreate.proprietes = "";
            }}>close</button>
        </form>
    </dialog>

    <dialog id="deleteRangeWeaponModal" class="modal modal-bottom sm:modal-middle" bind:this={deleteRangeWeaponModal}>
        <section class="modal-box form-control bg-base-300">

            <p class="text-xl">Voulez-vous vraiment supprimer cette arme? ({rangeWeaponToDelete.name})</p>

            <section class="modal-action">
                <button class="btn btn-neutral" type="button" onclick="deleteRangeWeaponModal.close()">Fermer</button>
                <button class="btn btn-error" type="submit" onclick="deleteRangeWeaponModal.close()"
                on:click={() => deleteRecord("rangeWeapons", rangeWeaponToDelete)}>Supprimer l'arme</button>
            </section>
        </section>
        <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
            <button>close</button>
        </form>
    </dialog>


{:else}
    <h1 class="text-2xl font-semibold text-center">Page non trouvée</h1>
    <a href="/">
        <button class="btn btn-neutral mt-5">Accueil</button>
    </a>
{/if}
</section>