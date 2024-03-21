<script>
    import {PUBLIC_DB_ADDRESS} from "$env/static/public";
    import {textColorBasedOnBG, transformWordIntoColor, getHoverColor} from "$lib/utils.js";
    import PocketBase from 'pocketbase';
    import { onDestroy, onMount } from "svelte";
    export let data;

    // Object used in the show modal
    let spellToShow = {id: ""};
    // Ref to the edit modal
    let showSpellModal;

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

    <section class="card w-full">
        <section class="grid grid-cols-3 gap-2">
            {#each spells as spell}
            <button class="btn" 
            style="--bgColor: {transformWordIntoColor(spell.name)}; --color: {textColorBasedOnBG(transformWordIntoColor(spell.name))}; --hoverColor: {getHoverColor(transformWordIntoColor(spell.name))}" 
            on:click={() => {
                spellToShow.id= spell.id;
                spellToShow.name = spell.name;
                spellToShow.ni = spell.ni;
                spellToShow.portee = spell.portee;
                spellToShow.cible = spell.cible;
                spellToShow.duree = spell.duree;
                spellToShow.effets = spell.effets;
                showSpellModal.show();
            }}>{spell.name}</button>
            {/each}
        </section>

        <dialog id="showSpellModal" class="modal modal-bottom sm:modal-middle" bind:this={showSpellModal} >
            <section class="modal-box form-control bg-base-300">
                <input type="hidden" name="id" value={spellToShow.id} />

                <div class="form-control">
                    <label class="label" for="name">Nom</label>
                    <input on:change={(event) => spellToShow.name = event.target.value}
                     disabled class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="name" value={spellToShow.name}/>
                </div>
                <div class="form-control">
                    <label class="label" for="ni">NI</label>
                    <input on:change={(event) => spellToShow.ni = event.target.value}
                     disabled class="input input-bordered disabled:text-base-content disabled:cursor-default" type="number" name="ni" value={spellToShow.ni}/>
                </div>
                <div class="form-control">
                    <label class="label" for="portee">Portée</label>
                    <input on:change={(event) => spellToShow.portee = event.target.value}
                    disabled class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="portee" value={spellToShow.portee}/>
                </div>
                <div class="form-control">
                    <label class="label" for="cible">Cible</label>
                    <input on:change={(event) => spellToShow.cible = event.target.value}
                    disabled class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="cible" value={spellToShow.cible}/>
                </div>
                <div class="form-control">
                    <label class="label" for="duree">Durée</label>
                    <input on:change={(event) => spellToShow.duree = event.target.value}
                    disabled class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="duree" value={spellToShow.duree}/>
                </div>
                <div class="form-control">
                    <label class="label" for="effets">Effets</label>
                    <input on:change={(event) => spellToShow.effets = event.target.value}
                    disabled class="input input-bordered disabled:text-base-content disabled:cursor-default" type="text" name="effets" value={spellToShow.effets}/>
                </div>

                <div class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="showSpellModal.close()"
                    on:click={() => {
                        spellToShow.id="";
                        spellToShow.name = "";
                        spellToShow.ni = "";
                        spellToShow.portee = "";
                        spellToShow.cible = "";
                        spellToShow.duree = "";
                        spellToShow.effets = "";
                    }}>Fermer</button>
                </div>
            </section>
            <form method="dialog" class="modal-backdrop  bg-neutral bg-opacity-40">
                <button on:click={() => {
                    spellToShow.id="";
                    spellToShow.name = "";
                    spellToShow.ni = "";
                    spellToShow.portee = "";
                    spellToShow.cible = "";
                    spellToShow.duree = "";
                    spellToShow.effets = "";
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