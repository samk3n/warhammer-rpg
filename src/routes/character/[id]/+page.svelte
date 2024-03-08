<script>
    import {getRecordFromId, increaseCharacteristic, decreaseCharacteristic, updateAttribute, updateCharacteristic} from "$lib/utils.js"
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
                <input on:change={(event) => updateAttribute(data.character, "race", event.target.value)} 
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="text" name="race" value={data.character.race} />
            </div>

            <div class="form-control">
                <label class="label" for="classe">Classe</label>
                <input on:change={(event) => updateAttribute(data.character, "classe", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="classe" value={data.character.classe} />
            </div>

            <div class="form-control">
                <label class="label" for="carriere">Carrière</label>
                <input on:change={(event) => updateAttribute(data.character, "carriere", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="carriere" value={data.character.carriere} />
            </div>

            <div class="form-control">
                <label class="label" for="echelon">Échelon</label>
                <input on:change={(event) => updateAttribute(data.character, "echelon", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="echelon" value={data.character.echelon} />
            </div>

            <div class="form-control">
                <label class="label" for="schemaCarriere">Schéma de carrière</label>
                <input on:change={(event) => updateAttribute(data.character, "schemaCarriere", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="schemaCarriere" value={data.character.schemaCarriere} />
            </div>

            <div class="form-control">
                <label class="label" for="statut">Statut</label>
                <input on:change={(event) => updateAttribute(data.character, "statut", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="statut" value={data.character.statut} />
            </div>

            <div class="form-control">
                <label class="label" for="age">Âge</label>
                <input on:change={(event) => updateAttribute(data.character, "age", parseInt(event.target.value))} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="number" name="age" value={data.character.age} />
            </div>

            <div class="form-control">
                <label class="label" for="taille">Taille</label>
                <input on:change={(event) => updateAttribute(data.character, "taille", parseInt(event.target.value))} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="number" name="taille" value={data.character.taille} />
            </div>

            <div class="form-control">
                <label class="label" for="cheveux">Cheveux</label>
                <input on:change={(event) => updateAttribute(data.character, "cheveux", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!data.isMaster} 
                type="text" name="cheveux" value={data.character.cheveux} />
            </div>

            <div class="form-control">
                <label class="label" for="yeux">Yeux</label>
                <input on:change={(event) => updateAttribute(data.character, "yeux", event.target.value)} 
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
                    <input on:change={(event) => updateAttribute(data.character, "destin", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="destin" value={data.character.destin} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="taille">Chance</label>
                    <input on:change={(event) => updateAttribute(data.character, "chance", parseInt(event.target.value))} 
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
                    <input on:change={(event) => updateAttribute(data.character, "resilience", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="resilience" value={data.character.resilience} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="determination">Détermination</label>
                    <input on:change={(event) => updateAttribute(data.character, "determination", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="determination" value={data.character.determination} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="motivation">Motivation</label>
                    <input on:change={(event) => updateAttribute(data.character, "motivation", parseInt(event.target.value))} 
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
                    <input on:change={(event) => updateAttribute(data.character, "mouvement", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="mouvement" value={data.character.mouvement} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="marche">Marche</label>
                    <input on:change={(event) => updateAttribute(data.character, "marche", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster} 
                    type="number" name="marche" value={data.character.marche} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="course">Course</label>
                    <input on:change={(event) => updateAttribute(data.character, "course", parseInt(event.target.value))} 
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
                    <input on:change={(event) => updateAttribute(data.character, "xpEarned", parseInt(event.target.value))} 
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
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Caractéristiques</h2>
                {#if data.isMaster}
                <input type="checkbox" class="toggle toggle-info justify-self-end" bind:checked={editCharac} />
                {/if}
            </div>

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-2">

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="capCombat">
                        CC
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.capCombat.editable}
                        on:change={(event) => updateCharacteristic(data.character, "capCombat", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "capCombat", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="capCombat" value={data.character.capCombat.init} />
                    {#if !data.isMaster && data.character.capCombat.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "capCombat")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "capCombat")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="capTir">
                        CT
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.capTir.editable}
                        on:change={(event) => updateCharacteristic(data.character, "capTir", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "capTir", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="capCombat" value={data.character.capTir.init} />
                    {#if !data.isMaster && data.character.capTir.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "capTir")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "capTir")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="force">
                        Force
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.force.editable}
                        on:change={(event) => updateCharacteristic(data.character, "force", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "force", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="force" value={data.character.force.init} />
                    {#if !data.isMaster && data.character.force.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "force")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "force")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="endurance">
                        Endurance
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.endurance.editable}
                        on:change={(event) => updateCharacteristic(data.character, "endurance", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "endurance", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="endurance" value={data.character.endurance.init} />
                    {#if !data.isMaster && data.character.endurance.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "endurance")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "endurance")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="initiative">
                        Initiative
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.initiative.editable}
                        on:change={(event) => updateCharacteristic(data.character, "initiative", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "initiative", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="initiative" value={data.character.initiative.init} />
                    {#if !data.isMaster && data.character.initiative.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "initiative")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "initiative")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="agilite">
                        Agilité
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.agilite.editable}
                        on:change={(event) => updateCharacteristic(data.character, "agilite", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "agilite", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="agilite" value={data.character.agilite.init} />
                    {#if !data.isMaster && data.character.agilite.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "agilite")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "agilite")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="dexterite">
                        Dextérité
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.dexterite.editable}
                        on:change={(event) => updateCharacteristic(data.character, "dexterite", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "dexterite", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="dexterite" value={data.character.dexterite.init} />
                    {#if !data.isMaster && data.character.dexterite.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "dexterite")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "dexterite")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="intelligence">
                        Intelligence
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.intelligence.editable}
                        on:change={(event) => updateCharacteristic(data.character, "intelligence", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "intelligence", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="intelligence" value={data.character.intelligence.init} />
                    {#if !data.isMaster && data.character.intelligence.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "intelligence")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "intelligence")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="forceMentale">
                        FM
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.forceMentale.editable}
                        on:change={(event) => updateCharacteristic(data.character, "forceMentale", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "forceMentale", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="forceMentale" value={data.character.forceMentale.init} />
                    {#if !data.isMaster && data.character.forceMentale.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "forceMentale")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "forceMentale")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="sociabilite">
                        Sociablité
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.sociabilite.editable}
                        on:change={(event) => updateCharacteristic(data.character, "sociabilite", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(data.character, "sociabilite", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!data.isMaster || !editCharac} 
                    type="number" name="sociabilite" value={data.character.sociabilite.init} />
                    {#if !data.isMaster && data.character.sociabilite.editable}
                    <div class="w-1/2 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "sociabilite")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "sociabilite")}>+</button>
                    </div>
                    {/if}
                </div>

                
            </section>
        </section>
    </section>














    

    <section class="card bg-base-300">
        <div class="card-body">
            <p>CC: {data.character.capCombat.init} #{data.character.capCombat.editable}#</p>
            <p>{data.character.capCombat.aug}</p>
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