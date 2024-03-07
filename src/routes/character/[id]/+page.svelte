<script>
    import {getRecordFromId, updateRecord} from "$lib/utils.js"
    import { onDestroy, onMount } from "svelte";
    import PocketBase from 'pocketbase';

    export let data;
    export let form;

    let pb;

    let characFormModal;

    let editCharac = false;

    $: if(form && form.message){
        characFormModal.showModal();
    }

    async function plusCarac(character, characteristic) {
        character[characteristic].init += 1;
        await updateRecord("characters", character.id, {[characteristic]: character[characteristic]});
    }
    async function minusCarac(character, characteristic) {
        character[characteristic].init -= 1;
        await updateRecord("characters", character.id, {[characteristic]: character[characteristic]});
    }

    async function updateCharacteristic(character, characteristic, change){
        if(change == null){
            if(typeof(character[characteristic]) == "number"){
                character[characteristic] = character[characteristic].toString();
                character[characteristic] = character[characteristic].slice(0, -1);
                character[characteristic] = parseInt(character[characteristic]);
            }
            else {
                character[characteristic] = character[characteristic].slice(0, -1);
            }
            
        }
        else {
            character[characteristic] += change;
        }
        await updateRecord("characters", character.id, {[characteristic]: character[characteristic]});
    }

    onMount(async () => {
        pb = new PocketBase("http://localhost:8090");
        pb.authStore?.loadFromCookie(document.cookie || '');

        pb.collection("characters").subscribe('*', (e) => {
            if("update" == e.action) {
                data.character = e.record;
            }
        })
    });

    onDestroy(() => {
        if(pb) pb.collection("characters").unsubscribe();
    });

</script>

<section class="flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">

{#if data && data.character}

    <!-- Character name -->
    <h1 class="text-3xl font-bold text-center">{data.character.name}</h1>

    {#if data.isMaster}

        <!-- Name of the player, no player, or unplayable -->
        {#if data.character.isPlayable && data.character.user}
            {#await getRecordFromId("users", data.character.user)}
            <p class="italic text-xl">Joueur: </p>
            {:then user}
            <p class="italic text-xl">Joueur: {user.username}</p>
            {/await}
        {:else if data.character.isPlayable}
            <p class="italic text-xl">Joueur: aucun</p>
        {:else}
            <p class="italic text-xl">Non jouable</p>
        {/if}

    {/if}

    <section class="card bg-base-300 w-full">
        <section class="card-body grid gap-5 grid-cols-1 xs:grid-cols-2">
            <div class="form-control">
                <label class="label" for="race">Race</label>
                <input on:select={(event) => console.log(event)} on:input={(event) => {
                    console.log(event);
                    updateCharacteristic(data.character, "race", event.data);
                }} 
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="text" name="race" value={data.character.race} />
            </div>

            <div class="form-control">
                <label class="label" for="classe">Classe</label>
                <input on:input={(event) => updateCharacteristic(data.character, "classe", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="classe" value={data.character.classe} />
            </div>

            <div class="form-control">
                <label class="label" for="carriere">Carrière</label>
                <input on:input={(event) => updateCharacteristic(data.character, "carriere", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="carriere" value={data.character.carriere} />
            </div>

            <div class="form-control">
                <label class="label" for="echelon">Échelon</label>
                <input on:input={(event) => updateCharacteristic(data.character, "echelon", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="echelon" value={data.character.echelon} />
            </div>

            <div class="form-control">
                <label class="label" for="schemaCarriere">Schéma de carrière</label>
                <input on:input={(event) => updateCharacteristic(data.character, "schemaCarriere", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="schemaCarriere" value={data.character.schemaCarriere} />
            </div>

            <div class="form-control">
                <label class="label" for="statut">Statut</label>
                <input on:input={(event) => updateCharacteristic(data.character, "statut", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="statut" value={data.character.statut} />
            </div>

            <div class="form-control">
                <label class="label" for="age">Âge</label>
                <input on:input={(event) => updateCharacteristic(data.character, "age", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="number" name="age" value={data.character.age} />
            </div>

            <div class="form-control">
                <label class="label" for="taille">Taille</label>
                <input on:input={(event) => updateCharacteristic(data.character, "taille", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="number" name="taille" value={data.character.taille} />
            </div>

            <div class="form-control">
                <label class="label" for="cheveux">Cheveux</label>
                <input on:input={(event) => updateCharacteristic(data.character, "cheveux", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="cheveux" value={data.character.cheveux} />
            </div>

            <div class="form-control">
                <label class="label" for="yeux">Yeux</label>
                <input on:input={(event) => updateCharacteristic(data.character, "yeux", event.data)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="yeux" value={data.character.yeux} />
            </div>

        </section>
    </section>

    <!-- DESTIN -->
    <section class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Destin</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-2">
                <div class="form-control items-center">
                    <label class="label" for="destin">Destin</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "destin", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="destin" value={data.character.destin} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="taille">Chance</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "chance", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="chance" value={data.character.chance} />
                </div>
            </section>
        </section>
    </section>

    <!-- RESILIENCE -->
    <section class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Résilience</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="destin">Résilience</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "resilience", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="resilience" value={data.character.resilience} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="determination">Détermination</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "determination", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="determination" value={data.character.determination} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="motivation">Motivation</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "motivation", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="motivation" value={data.character.motivation} />
                </div>
            </section>
        </section>
    </section>

    <!-- MOUVEMENT -->
    <section class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Mouvement</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="mouvement">Mouvement</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "mouvement", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="mouvement" value={data.character.mouvement} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="marche">Marche</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "marche", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="marche" value={data.character.marche} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="course">Course</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "course", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="course" value={data.character.course} />
                </div>
            </section>
        </section>
    </section>

    <!-- EXPERIENCE -->
    <section class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Expérience</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="xpEarned">Gagnée</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "xpEarned", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="xpEarned" value={data.character.xpEarned} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="xpSpent">Dépensée</label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled 
                    type="number" name="xpSpent" value={data.character.xpSpent} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="course">Disponible</label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled 
                    type="number" name="course" value={data.character.xpEarned - data.character.xpSpent} />
                </div>
            </section>
        </section>
    </section>

    <!-- CARACTERISTIQUES -->
    <section class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Caractéristiques</h2>
            {#if data.isMaster}
            <input type="checkbox" class="toggle toggle-info" bind:value={editCharac} />
            {/if}

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="xpEarned">Gagnée</label>
                    <input on:input={(event) => updateCharacteristic(data.character, "xpEarned", event.data)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="xpEarned" value={data.character.xpEarned} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="xpSpent">Dépensée</label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled 
                    type="number" name="xpSpent" value={data.character.xpSpent} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="course">Disponible</label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled 
                    type="number" name="course" value={data.character.xpEarned - data.character.xpSpent} />
                </div>
            </section>
        </section>
    </section>










    <section class="card bg-base-300">
        <div class="card-body">CC: {data.character.capCombat.init}</div>
        <div class="divider"></div>
        <div class="card-actions justify-center">
            <button class="btn btn-success" on:click={() => plusCarac(data.character, "capCombat")}>+</button>
            <button class="btn btn-warning" on:click={() => minusCarac(data.character, "capCombat")}>-</button>
        </div>
    </section>

    <section class="card bg-base-300">
        <div class="card-body">CT: {data.character.capTir.init}</div>
        <div class="divider"></div>
        <div class="card-actions justify-center">
            <button class="btn btn-success" on:click={() => plusCarac(data.character, "capTir")}>+</button>
            <button class="btn btn-warning" on:click={() => minusCarac(data.character, "capTir")}>-</button>
        </div>
    </section>









    <!-- If master, expel player and delete character buttons + modal for deleting confirmation -->
    {#if data.isMaster}

        <!-- Master delete character or expel player -->
        <section class="flex gap-3">
            {#if data.character.user}
                <form class="flex-1" method="POST" action="?/leaveCharac">
                    <input type="hidden" name="characId" value={data.character.id} />
                    <input type="hidden" name="gameId" value={data.character.game} />
                    <input type="hidden" name="userId" value={data.character.user} />
                    <button class="btn btn-warning">Expulser le joueur</button>
                </form>
            {/if}

            <button class="btn btn-error flex-1" onclick="deleteCharacModal.showModal()">Supprimer le personnage</button>
        </section>
        
        <!-- Delete character modal -->
        <dialog id="deleteCharacModal" class="modal modal-bottom sm:modal-middle" >
            <form class="modal-box form-control bg-base-200" method="POST" action="?/deleteCharac">
                <input type="hidden" name="characId" value={data.character.id} />
                <input type="hidden" name="userId" value={data.character.user} />
                <input type="hidden" name="gameId" value={data.character.game} />

                <p class="text-xl">Voulez-vous vraiment supprimer ce personnage?</p>

                <section class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="deleteCharacModal.close()">Fermer</button>
                    <button class="btn btn-error" type="submit" onclick="deleteCharacModal.close()">Supprimer le personnage</button>
                </section>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    
        <!-- If not master, leave character button -->
    {:else}
        <form method="POST" action="?/leaveCharac">
            <input type="hidden" name="characId" value={data.character.id} />
            <input type="hidden" name="gameId" value={data.character.game} />
            <input type="hidden" name="userId" value={data.character.user} />
            <button class="btn btn-warning" >Rendre le personnage</button>
        </form>

    {/if}

        

    
    <!-- Form message modal -->
    {#if form && form.message}
        <dialog id="characFormModal" class="modal modal-bottom sm:modal-middle" bind:this={characFormModal}>
            <section class="modal-box bg-base-200">
                <p class="text-xl">{form.message}</p>
                <div class="modal-action">
                    <button class="btn btn-neutral" onlick="characFormModal.close()">Fermer</button>
                </div>
            </section>
        </dialog>
    {/if}

{/if}
</section>