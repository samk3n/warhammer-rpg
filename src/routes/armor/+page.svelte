<script>
    import {PUBLIC_DB_ADDRESS} from "$env/static/public";
    import {updateArmor, deleteRecord, createArmor} from "$lib/utils.js";
    import PocketBase from 'pocketbase';
    import { onDestroy, onMount } from "svelte";

    export let data;

    // armor used in the edit modal
    let armorToEdit = {id: ""};
    // Ref to the edit modal
    let editArmorModal;
    // Armor used in the delete modal
    let armorToDelete = {name: ""};
    // Ref to the delete modal
    let deleteArmorModal;
    // Armor used in the add modal
    let armorToCreate = {name: "", proprietes: ""};
    // Ref to the add modal
    let addArmorModal;
    // "Form" message after creating an armor in DB
    let createArmorMessage = "";


    let pb;
    let armor = data.armor;

    // const parts = new Map([['head', "Tête"], ['leftArm', "Bras gauche"], ['rightArm', 'Bras droit'], ['body', "Corps"], ['leftLeg', 'Jambe gauche'], ['rightLeg', 'Jambe droite'], ['shield', 'Bouclier']]);


    onMount(async () => {
        pb = new PocketBase(PUBLIC_DB_ADDRESS);
        pb.authStore?.loadFromCookie(document.cookie || '');
        
        pb.collection("armor").subscribe("*", (e) => {
            if("update" == e.action){
                armor = armor.map((armor) => armor.id == e.record.id ? e.record : armor);
            }
            else if("create" == e.action){
                armor = [...armor, e.record];
            }
            else if("delete" == e.action){
                armor = armor.filter((armor) => armor.id != e.record.id);

            }
        }, {sort: "name"});
    });

    onDestroy(() => {
        if(pb) pb.collection("armor").unsubscribe();
    });

</script>

<section class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">
{#if data && data.armor}

    <h1 class="text-3xl font-bold text-center">Armures</h1>
    <button class="btn btn-primary xs:btn-wide" on:click={() => addArmorModal.show()}>Créer une armure</button>


        {#if armor.length == 0}
        <h2 class="text-xl font-semibold text-center">Aucune armure trouvée.</h2>
        
        {:else}

        <section class="card bg-base-300 w-full">
            <table class="card-body table table-zebra">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Localisation</th>
                        <th>Enc.</th>
                        <th>PA</th>
                        <th>Propriétés</th>
                    </tr>
                </thead>
                <tbody>
                    {#each armor as a}
                        <tr class="cursor-pointer hover:ring-0" on:click={() => {
                            armorToEdit.id = a.id;
                            armorToEdit.name = a.name;
                            armorToEdit.encombrement = a.encombrement;
                            armorToEdit.localisation = a.localisation;
                            armorToEdit.pa = a.pa;
                            armorToEdit.proprietes = a.proprietes;
                            editArmorModal.show();
                        }}>
                            <td class="text-[0.7rem] xs:text-sm lg:text-lg">
                                <button class="btn btn-ghost btn-circle text-error btn-sm"
                                on:click={(event) => {
                                    event.stopPropagation();
                                    armorToDelete = a;
                                    deleteArmorModal.show();
                                }}>X</button>
                                {a.name}</td>
                            <td class="text-[0.7rem] xs:text-sm lg:text-lg">{a.localisation}</td>
                            <td class="text-[0.7rem] xs:text-sm lg:text-lg">{a.encombrement}</td>
                            <td class="text-[0.7rem] xs:text-sm lg:text-lg">{a.pa}</td>
                            <td class="text-[0.7rem] xs:text-sm lg:text-lg">{a.proprietes}</td>
                            <td></td>
                        </tr>
                    {/each}
                </tbody>
            </table>

        </section>
        {/if}

    <!--MODALS -->
    <dialog id="addArmorModal" class="modal modal-bottom sm:modal-middle" bind:this={addArmorModal} >
        <section class="modal-box form-control bg-base-300">
            <h1 class="text-3xl font-bold text-center">Créer une armure</h1>

            <div class="form-control">
                <label class="label" for="name">Nom</label>
                <input on:change={(event) => armorToCreate.name = event.target.value}
                class="input input-bordered" type="text" name="name" value={armorToCreate.name}/>
            </div>
            <div class="form-control">
                <label class="label" for="encombrement">Enc.</label>
                <input on:change={(event) => armorToCreate.encombrement = event.target.value}
                class="input input-bordered" type="number" name="encombrement" value={armorToCreate.encombrement}/>
            </div>
            <!-- <div class="form-control">
                <label class="label" for="localisation">Localisation</label>
                <select class="select select-bordered" name="localisation" value={armorToCreate.localisation}
                on:change={(event) => armorToCreate.localisation = event.target.value}>
                    <option value=""></option>
                    {#each parts as [key, value]}
                        <option value={key} >{value}</option>
                    {/each}
                </select>
            </div> -->
            <div class="form-control">
                <label class="label" for="pa">PA</label>
                <input on:change={(event) => armorToCreate.pa = event.target.value}
                class="input input-bordered" type="number" name="pa" value={armorToCreate.pa}/>
            </div>
            <div class="form-control">
                <label class="label" for="proprietes">Propriétés</label>
                <input on:change={(event) => armorToCreate.proprietes = event.target.value}
                class="input input-bordered" type="text" name="proprietes" value={armorToCreate.proprietes}/>
            </div>

            {#if createArmorMessage != ""}
            <p class="text-warning text-center text-lg">{createArmorMessage}</p>
            {/if}

            <div class="modal-action">
                <button class="btn btn-neutral" type="button" onclick="addArmorModal.close()"
                on:click={() => {
                    armorToCreate.name = "";
                    armorToCreate.id="";
                    armorToCreate.encombrement = "";
                    armorToCreate.pa = "";
                    armorToCreate.proprietes = "";
                }}>Fermer</button>
                <button class="btn btn-success" type="submit"
                on:click={async() => {
                    const resp = await createArmor(armorToCreate);
                    if(resp && resp.error){
                        createArmorMessage = resp.message;
                    }else {
                        createArmorMessage = "";
                        addArmorModal.close();
                    }
                }}>Créer</button>
            </div>
        </section>
        <form method="dialog" class="modal-backdrop  bg-neutral bg-opacity-40">
            <button on:click={() => {
                armorToCreate.name = "";
                armorToCreate.id="";
                armorToCreate.encombrement = "";
                armorToCreate.pa = "";
                armorToCreate.proprietes = "";
            }}>close</button>
        </form>
    </dialog>

    <dialog id="editArmorModal" class="modal modal-bottom sm:modal-middle" bind:this={editArmorModal} >
        <section class="modal-box form-control bg-base-300">
            <input type="hidden" name="id" value={armorToEdit.id} />

            <div class="form-control">
                <label class="label" for="name">Nom</label>
                <input on:change={(event) => armorToEdit.name = event.target.value}
                class="input input-bordered" type="text" name="name" value={armorToEdit.name}/>
            </div>
            <div class="form-control">
                <label class="label" for="encombrement">Enc.</label>
                <input on:change={(event) => armorToEdit.encombrement = event.target.value}
                class="input input-bordered" type="number" name="encombrement" value={armorToEdit.encombrement}/>
            </div>
            <div class="form-control">
                <label class="label" for="pa">PA</label>
                <input on:change={(event) => armorToEdit.pa = event.target.value}
                class="input input-bordered" type="number" name="pa" value={armorToEdit.pa}/>
            </div>
            <div class="form-control">
                <label class="label" for="proprietes">Propriétés</label>
                <input on:change={(event) => armorToEdit.proprietes = event.target.value}
                class="input input-bordered" type="text" name="proprietes" value={armorToEdit.proprietes}/>
            </div>                

            <div class="modal-action">
                <button class="btn btn-neutral" type="button" onclick="editArmorModal.close()"
                on:click={() => {
                    armorToEdit.name = "";
                    armorToEdit.id="";
                    armorToEdit.encombrement = "";
                    armorToEdit.pa = "";
                    armorToEdit.proprietes = "";
                }}>Fermer</button>
                <button class="btn btn-success" type="submit" onclick="editArmorModal.close()" 
                on:click={() => {
                    updateArmor(armorToEdit, armorToEdit);
                }}>Valider</button>
            </div>
        </section>
        <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
            <button on:click={() => {
                armorToEdit.name = "";
                armorToEdit.id="";
                armorToEdit.encombrement = "";
                armorToEdit.pa = "";
                armorToEdit.proprietes = "";
            }}>Close</button>
        </form>
    </dialog>

    <dialog id="deleteArmorModal" class="modal modal-bottom sm:modal-middle" bind:this={deleteArmorModal}>
        <section class="modal-box form-control bg-base-300">

            <p class="text-xl">Voulez-vous vraiment supprimer cette armure? ({armorToDelete.name})</p>

            <section class="modal-action">
                <button class="btn btn-neutral" type="button" onclick="deleteArmorModal.close()">Fermer</button>
                <button class="btn btn-error" type="submit" onclick="deleteArmorModal.close()"
                on:click={() => deleteRecord("armor", armorToDelete)}>Supprimer l'armure</button>
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