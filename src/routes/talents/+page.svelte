<script>
    import {PUBLIC_DB_ADDRESS} from "$env/static/public";
    import PocketBase from 'pocketbase';
    import { onDestroy, onMount } from "svelte";
    export let data;

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
            {#each talents as talent}
            <section class="collapse p-2 odd:bg-base-200 even:bg-base-300">
                <input type="checkbox" /> 
                <div class="collapse-title flex gap-3 items-center justify-between">
                    <p>{talent.name}</p>
                </div>
                <div class="collapse-content flex flex-col gap-3">
                    <div class="divider"></div>
                    {#if talent.test}
                    <p><span class="font-bold">Tests:</span> {talent.test}</p>
                    {/if}
                    <p>{talent.description}</p>
                </div>
            </section>
            {/each}
    </section>


{:else}
    <h1 class="text-2xl font-semibold text-center">Page non trouvée</h1>
    <a href="/">
        <button class="btn btn-neutral mt-5">Accueil</button>
    </a>
{/if}
</section>