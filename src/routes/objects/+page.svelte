<script>
    import {PUBLIC_DB_ADDRESS} from "$env/static/public";
    import {updateObject, deleteRecord} from "$lib/utils.js";
    import PocketBase from 'pocketbase';
    import { onDestroy, onMount } from "svelte";
    export let data;

    // Object used in the edit modal
    let objectToEdit = {id: ""};
    // Ref to the edit modal
    let editObjectModal;

    // Object used in the delete modal
    let objectToDelete = {name: ""};
    // Ref to the delete modal
    let deletObjectModal;

    let pb;
    let objects = data.objects;

    onMount(async () => {
        pb = new PocketBase(PUBLIC_DB_ADDRESS);
        pb.authStore?.loadFromCookie(document.cookie || '');
        
        pb.collection("objects").subscribe("*", (e) => {
            if("update" == e.action){
                objects = objects.map((obj) => obj.id == e.record.id ? e.record : obj);
            }
            else if("create" == e.action){
                objects = [...objects, e.record];
            }
            else if("delete" == e.action){
                objects = objects.filter((obj) => obj.id != e.record.id);

            }
        });
    });

    onDestroy(() => {
        if(pb) pb.collection("objects").unsubscribe();
    });

</script>


<section class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6 xl:w-2/6">
{#if data && data.objects}

    {#if objects.length == 0}
    <h2 class="text-2xl font-semibold text-center">Aucun objet trouvé!</h2>
    {/if}
    <h1 class="text-3xl font-bold text-center">Objets</h1>
    <a href="/createobject">
        <button class="btn btn-primary mt-5 xs:btn-wide">Créer un objet</button>
    </a>

    <section class="card bg-base-300 w-full">
        <table class="card-body table table-zebra">
            <thead>
                <tr>
                    <th class="w-2/3">Nom</th>
                    <th>Enc.</th>
                </tr>
            </thead>
            <tbody>
                {#each objects as object}
                    <tr>
                        <td class="text-[0.7rem] xs:text-sm lg:text-lg">{object.name}</td>
                        <td class="text-[0.7rem] xs:text-sm lg:text-lg">{object.encombrement}</td>
                        <td><button class="btn btn-neutral btn-xs xs:btn-md" 
                        on:click={() => {
                            objectToEdit.id = object.id;
                            objectToEdit.name = object.name;
                            objectToEdit.encombrement = object.encombrement;
                            editObjectModal.show();
                        }}>Modifier</button></td>
                        <td><button class="btn btn-error btn-xs xs:btn-md"
                            on:click={() => {
                                objectToDelete = object;
                                deletObjectModal.show();
                            }}>Supprimer</button></td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <dialog id="editObjectModal" class="modal modal-bottom sm:modal-middle" bind:this={editObjectModal} >
            <section class="modal-box form-control bg-base-200">
                <input type="hidden" name="id" value={objectToEdit.id} />

                <div class="form-control">
                    <label class="label" for="name">Nom</label>
                    <input on:change={(event) => objectToEdit.name = event.target.value}
                     class="input input-bordered" type="text" name="name" value={objectToEdit.name}/>
                </div>
                <div class="form-control">
                    <label class="label" for="encombrement">Enc.</label>
                    <input on:change={(event) => objectToEdit.encombrement = event.target.value}
                     class="input input-bordered" type="number" name="encombrement" value={objectToEdit.encombrement}/>
                </div>

                <div class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="editObjectModal.close()"
                    on:click={() => {
                        objectToEdit.name = "";
                        objectToEdit.id="";
                        objectToEdit.encombrement = 0;
                    }}>Fermer</button>
                    <button class="btn btn-success" type="submit" onclick="editObjectModal.close()" 
                    on:click={() => {
                        updateObject(objectToEdit, "name", objectToEdit.name);
                        updateObject(objectToEdit, "encombrement", objectToEdit.encombrement);
                    }}>Valider</button>
                </div>
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
                <button on:click={() => {
                    objectToEdit.name = "";
                    objectToEdit.id="";
                    objectToEdit.encombrement = 0;
                }}>Close</button>
            </form>
        </dialog>

        <dialog id="deletObjectModal" class="modal modal-bottom sm:modal-middle" bind:this={deletObjectModal}>
            <section class="modal-box form-control bg-base-200">

                <p class="text-xl">Voulez-vous vraiment supprimer cet objet? ({objectToDelete.name})</p>

                <section class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="deletObjectModal.close()">Fermer</button>
                    <button class="btn btn-error" type="submit" onclick="deletObjectModal.close()"
                    on:click={() => deleteRecord("objects", objectToDelete)}>Supprimer l'objet</button>
                </section>
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
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