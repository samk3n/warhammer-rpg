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
    let talents = data.talents;

    onMount(async () => {
        pb = new PocketBase(PUBLIC_DB_ADDRESS);
        pb.authStore?.loadFromCookie(document.cookie || '');
        
        pb.collection("talents").subscribe("*", (e) => {
            if("update" == e.action){
                talents = talents.map((tal) => tal.id == e.record.id ? e.record : tal);
            }
            else if("create" == e.action){
                talents = [...talents, e.record];
            }
            else if("delete" == e.action){
                talents = talents.filter((tal) => tal.id != e.record.id);

            }
        });
    });

    onDestroy(() => {
        if(pb) pb.collection("talents").unsubscribe();
    });

</script>


<section class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-10/12 lg:w-3/6">
{#if data && data.talents}

    {#if talents.length == 0}
    <h2 class="text-2xl font-semibold text-center">Aucun talent trouvé!</h2>
    {/if}
    <h1 class="text-3xl font-bold text-center">Talents</h1>

    <section class="card bg-base-300 w-full mt-5">
        <table class="card-body table table-zebra">
            <thead>
                <tr>
                    <th class="w-1/3">Nom</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {#each talents as talent}
                    <tr>
                        <td class="text-[0.75rem] xs:text-sm lg:text-lg font-medium">{talent.name}</td>
                        <td class="text-[0.7rem] lg:text-lg">{talent.description}</td>
                    </tr>
                {/each}
            </tbody>
        </table>

    </section>


{:else}
    <h1 class="text-2xl font-semibold text-center">Page non trouvée</h1>
    <a href="/">
        <button class="btn btn-neutral mt-5">Accueil</button>
    </a>
{/if}
</section>