<script>
    import {getRecordFromId, 
        increaseCharacteristic, 
        decreaseCharacteristic, 
        updateAttribute, 
        updateCharacteristic, 
        increaseSkill, 
        decreaseSkill} from "$lib/utils.js"
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
                    type="number" name="capCombat" value={data.isMaster ? data.character.capCombat.init : data.character.capCombat.init + data.character.capCombat.aug} />
                    {#if data.isMaster || data.character.capCombat.editable}
                    <p class="italic font-semibold text-sm">{data.character.capCombat.aug} {data.character.capCombat.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.capCombat.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="capCombat" value={data.isMaster ? data.character.capTir.init : data.character.capTir.init + data.character.capTir.aug} />
                    {#if data.isMaster || data.character.capTir.editable}
                    <p class="italic font-semibold text-sm">{data.character.capTir.aug} {data.character.capTir.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.capTir.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="force" value={data.isMaster ? data.character.force.init : data.character.force.init + data.character.force.aug} />
                    {#if data.isMaster || data.character.force.editable}
                    <p class="italic font-semibold text-sm">{data.character.force.aug} {data.character.force.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.force.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="endurance" value={data.isMaster ? data.character.endurance.init : data.character.endurance.init + data.character.endurance.aug} />
                    {#if data.isMaster || data.character.endurance.editable}
                    <p class="italic font-semibold text-sm">{data.character.endurance.aug} {data.character.endurance.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.endurance.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="initiative" value={data.isMaster ? data.character.initiative.init : data.character.initiative.init + data.character.initiative.aug} />
                    {#if data.isMaster || data.character.initiative.editable}
                    <p class="italic font-semibold text-sm">{data.character.initiative.aug} {data.character.initiative.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.initiative.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="agilite" value={data.isMaster ? data.character.agilite.init : data.character.agilite.init + data.character.agilite.aug} />
                    {#if data.isMaster || data.character.agilite.editable}
                    <p class="italic font-semibold text-sm">{data.character.agilite.aug} {data.character.agilite.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.agilite.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="dexterite" value={data.isMaster ? data.character.dexterite.init : data.character.dexterite.init + data.character.dexterite.aug} />
                    {#if data.isMaster || data.character.dexterite.editable}
                    <p class="italic font-semibold text-sm">{data.character.dexterite.aug} {data.character.dexterite.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.dexterite.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="intelligence" value={data.isMaster ? data.character.intelligence.init : data.character.intelligence.init + data.character.intelligence.aug} />
                    {#if data.isMaster || data.character.intelligence.editable}
                    <p class="italic font-semibold text-sm">{data.character.intelligence.aug} {data.character.intelligence.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.intelligence.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="forceMentale" value={data.isMaster ? data.character.forceMentale.init : data.character.forceMentale.init + data.character.forceMentale.aug} />
                    {#if data.isMaster || data.character.forceMentale.editable}
                    <p class="italic font-semibold text-sm">{data.character.forceMentale.aug} {data.character.forceMentale.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.forceMentale.editable}
                    <div class="w-1/3 flex justify-center">
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
                    type="number" name="sociabilite" value={data.isMaster ? data.character.sociabilite.init : data.character.sociabilite.init + data.character.sociabilite.aug} />
                    {#if data.isMaster || data.character.sociabilite.editable}
                    <p class="italic font-semibold text-sm">{data.character.sociabilite.aug} {data.character.sociabilite.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.sociabilite.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(data.character, "sociabilite")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(data.character, "sociabilite")}>+</button>
                    </div>
                    {/if}
                </div>

                
            </section>
        </section>
    </section>


    <section class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Compétences de base</h2>

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-2">

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="art">
                        Art
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.art.editable}
                        on:change={(event) => updateCharacteristic(data.character, "art", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="art" 
                    value={data.isMaster ? data.character[data.character.art.charac].init + data.character[data.character.art.charac].aug : data.character[data.character.art.charac].init + data.character[data.character.art.charac].aug + data.character.art.aug} />
                    {#if data.isMaster || data.character.art.editable}
                    <p class="italic font-semibold text-sm">{data.character.art.aug} {data.character.art.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.art.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "art")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "art")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="athletisme">
                        Athlétisme
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.athletisme.editable}
                        on:change={(event) => updateCharacteristic(data.character, "athletisme", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="athletisme" 
                    value={data.isMaster ? data.character[data.character.athletisme.charac].init + data.character[data.character.athletisme.charac].aug : data.character[data.character.athletisme.charac].init + data.character[data.character.athletisme.charac].aug + data.character.athletisme.aug} />
                    {#if data.isMaster || data.character.athletisme.editable}
                    <p class="italic font-semibold text-sm">{data.character.athletisme.aug} {data.character.athletisme.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.athletisme.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "athletisme")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "athletisme")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="calme">
                        Calme
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.calme.editable}
                        on:change={(event) => updateCharacteristic(data.character, "calme", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="calme" 
                    value={data.isMaster ? data.character[data.character.calme.charac].init + data.character[data.character.calme.charac].aug : data.character[data.character.calme.charac].init + data.character[data.character.calme.charac].aug + data.character.calme.aug} />
                    {#if data.isMaster || data.character.calme.editable}
                    <p class="italic font-semibold text-sm">{data.character.calme.aug} {data.character.calme.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.calme.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "calme")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "calme")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="charme">
                        Charme
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.charme.editable}
                        on:change={(event) => updateCharacteristic(data.character, "charme", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="charme" 
                    value={data.isMaster ? data.character[data.character.charme.charac].init + data.character[data.character.charme.charac].aug : data.character[data.character.charme.charac].init + data.character[data.character.charme.charac].aug + data.character.charme.aug} />
                    {#if data.isMaster || data.character.charme.editable}
                    <p class="italic font-semibold text-sm">{data.character.charme.aug} {data.character.charme.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.charme.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "charme")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "charme")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="chevaucher">
                        Chevaucher
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.chevaucher.editable}
                        on:change={(event) => updateCharacteristic(data.character, "chevaucher", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="chevaucher" 
                    value={data.isMaster ? data.character[data.character.chevaucher.charac].init + data.character[data.character.chevaucher.charac].aug : data.character[data.character.chevaucher.charac].init + data.character[data.character.chevaucher.charac].aug + data.character.chevaucher.aug} />
                    {#if data.isMaster || data.character.chevaucher.editable}
                    <p class="italic font-semibold text-sm">{data.character.chevaucher.aug} {data.character.chevaucher.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.chevaucher.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "chevaucher")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "chevaucher")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="commandement">
                        Commandement
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.commandement.editable}
                        on:change={(event) => updateCharacteristic(data.character, "commandement", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="commandement" 
                    value={data.isMaster ? data.character[data.character.commandement.charac].init + data.character[data.character.commandement.charac].aug : data.character[data.character.commandement.charac].init + data.character[data.character.commandement.charac].aug + data.character.commandement.aug} />
                    {#if data.isMaster || data.character.commandement.editable}
                    <p class="italic font-semibold text-sm">{data.character.commandement.aug} {data.character.commandement.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.commandement.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "commandement")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "commandement")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="conduiteAttelage">
                        Conduite d'attelage
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.conduiteAttelage.editable}
                        on:change={(event) => updateCharacteristic(data.character, "conduiteAttelage", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="conduiteAttelage" 
                    value={data.isMaster ? data.character[data.character.conduiteAttelage.charac].init + data.character[data.character.conduiteAttelage.charac].aug : data.character[data.character.conduiteAttelage.charac].init + data.character[data.character.conduiteAttelage.charac].aug + data.character.conduiteAttelage.aug} />
                    {#if data.isMaster || data.character.conduiteAttelage.editable}
                    <p class="italic font-semibold text-sm">{data.character.conduiteAttelage.aug} {data.character.conduiteAttelage.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.conduiteAttelage.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "conduiteAttelage")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "conduiteAttelage")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="cacBase">
                        C. à C. (base)
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.cacBase.editable}
                        on:change={(event) => updateCharacteristic(data.character, "cacBase", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="cacBase" 
                    value={data.isMaster ? data.character[data.character.cacBase.charac].init + data.character[data.character.cacBase.charac].aug : data.character[data.character.cacBase.charac].init + data.character[data.character.cacBase.charac].aug + data.character.cacBase.aug} />
                    {#if data.isMaster || data.character.cacBase.editable}
                    <p class="italic font-semibold text-sm">{data.character.cacBase.aug} {data.character.cacBase.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.cacBase.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "cacBase")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "cacBase")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="cac">
                        C.à C.
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.cac.editable}
                        on:change={(event) => updateCharacteristic(data.character, "cac", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="cac" 
                    value={data.isMaster ? data.character[data.character.cac.charac].init + data.character[data.character.cac.charac].aug : data.character[data.character.cac.charac].init + data.character[data.character.cac.charac].aug + data.character.cac.aug} />
                    {#if data.isMaster || data.character.cac.editable}
                    <p class="italic font-semibold text-sm">{data.character.cac.aug} {data.character.cac.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.cac.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "cac")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "cac")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="discretion">
                        Discrétion
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.discretion.editable}
                        on:change={(event) => updateCharacteristic(data.character, "discretion", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="discretion" 
                    value={data.isMaster ? data.character[data.character.discretion.charac].init + data.character[data.character.discretion.charac].aug : data.character[data.character.discretion.charac].init + data.character[data.character.discretion.charac].aug + data.character.discretion.aug} />
                    {#if data.isMaster || data.character.discretion.editable}
                    <p class="italic font-semibold text-sm">{data.character.discretion.aug} {data.character.discretion.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.discretion.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "discretion")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "discretion")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="divertissement">
                        Divertissement
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.divertissement.editable}
                        on:change={(event) => updateCharacteristic(data.character, "divertissement", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="divertissement" 
                    value={data.isMaster ? data.character[data.character.divertissement.charac].init + data.character[data.character.divertissement.charac].aug : data.character[data.character.divertissement.charac].init + data.character[data.character.divertissement.charac].aug + data.character.divertissement.aug} />
                    {#if data.isMaster || data.character.divertissement.editable}
                    <p class="italic font-semibold text-sm">{data.character.divertissement.aug} {data.character.divertissement.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.divertissement.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "divertissement")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "divertissement")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="empriseAnimaux">
                        Emprise animaux
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.empriseAnimaux.editable}
                        on:change={(event) => updateCharacteristic(data.character, "empriseAnimaux", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="empriseAnimaux" 
                    value={data.isMaster ? data.character[data.character.empriseAnimaux.charac].init + data.character[data.character.empriseAnimaux.charac].aug : data.character[data.character.empriseAnimaux.charac].init + data.character[data.character.empriseAnimaux.charac].aug + data.character.empriseAnimaux.aug} />
                    {#if data.isMaster || data.character.empriseAnimaux.editable}
                    <p class="italic font-semibold text-sm">{data.character.empriseAnimaux.aug} {data.character.empriseAnimaux.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.empriseAnimaux.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "empriseAnimaux")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "empriseAnimaux")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="escalade">
                        Escalade
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.escalade.editable}
                        on:change={(event) => updateCharacteristic(data.character, "escalade", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="escalade" 
                    value={data.isMaster ? data.character[data.character.escalade.charac].init + data.character[data.character.escalade.charac].aug : data.character[data.character.escalade.charac].init + data.character[data.character.escalade.charac].aug + data.character.escalade.aug} />
                    {#if data.isMaster || data.character.escalade.editable}
                    <p class="italic font-semibold text-sm">{data.character.escalade.aug} {data.character.escalade.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.escalade.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "escalade")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "escalade")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="esquive">
                        Esquive
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.esquive.editable}
                        on:change={(event) => updateCharacteristic(data.character, "esquive", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="esquive" 
                    value={data.isMaster ? data.character[data.character.esquive.charac].init + data.character[data.character.esquive.charac].aug : data.character[data.character.esquive.charac].init + data.character[data.character.esquive.charac].aug + data.character.esquive.aug} />
                    {#if data.isMaster || data.character.esquive.editable}
                    <p class="italic font-semibold text-sm">{data.character.esquive.aug} {data.character.esquive.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.esquive.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "esquive")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "esquive")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="intimidation">
                        Intimidation
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.intimidation.editable}
                        on:change={(event) => updateCharacteristic(data.character, "intimidation", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="intimidation" 
                    value={data.isMaster ? data.character[data.character.intimidation.charac].init + data.character[data.character.intimidation.charac].aug : data.character[data.character.intimidation.charac].init + data.character[data.character.intimidation.charac].aug + data.character.intimidation.aug} />
                    {#if data.isMaster || data.character.intimidation.editable}
                    <p class="italic font-semibold text-sm">{data.character.intimidation.aug} {data.character.intimidation.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.intimidation.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "intimidation")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "intimidation")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="intuition">
                        Intuition
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.intuition.editable}
                        on:change={(event) => updateCharacteristic(data.character, "intuition", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="intuition" 
                    value={data.isMaster ? data.character[data.character.intuition.charac].init + data.character[data.character.intuition.charac].aug : data.character[data.character.intuition.charac].init + data.character[data.character.intuition.charac].aug + data.character.intuition.aug} />
                    {#if data.isMaster || data.character.intuition.editable}
                    <p class="italic font-semibold text-sm">{data.character.intuition.aug} {data.character.intuition.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.intuition.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "intuition")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "intuition")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="marchandage">
                        Marchandage
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.marchandage.editable}
                        on:change={(event) => updateCharacteristic(data.character, "marchandage", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="marchandage" 
                    value={data.isMaster ? data.character[data.character.marchandage.charac].init + data.character[data.character.marchandage.charac].aug : data.character[data.character.marchandage.charac].init + data.character[data.character.marchandage.charac].aug + data.character.marchandage.aug} />
                    {#if data.isMaster || data.character.marchandage.editable}
                    <p class="italic font-semibold text-sm">{data.character.marchandage.aug} {data.character.marchandage.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.marchandage.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "marchandage")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "marchandage")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="navigation">
                        Navigation
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.navigation.editable}
                        on:change={(event) => updateCharacteristic(data.character, "navigation", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="navigation" 
                    value={data.isMaster ? data.character[data.character.navigation.charac].init + data.character[data.character.navigation.charac].aug : data.character[data.character.navigation.charac].init + data.character[data.character.navigation.charac].aug + data.character.navigation.aug} />
                    {#if data.isMaster || data.character.navigation.editable}
                    <p class="italic font-semibold text-sm">{data.character.navigation.aug} {data.character.navigation.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.navigation.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "navigation")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "navigation")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="pari">
                        Pari
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.pari.editable}
                        on:change={(event) => updateCharacteristic(data.character, "pari", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="pari" 
                    value={data.isMaster ? data.character[data.character.pari.charac].init + data.character[data.character.pari.charac].aug : data.character[data.character.pari.charac].init + data.character[data.character.pari.charac].aug + data.character.pari.aug} />
                    {#if data.isMaster || data.character.pari.editable}
                    <p class="italic font-semibold text-sm">{data.character.pari.aug} {data.character.pari.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.pari.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "pari")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "pari")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="perception">
                        Perception
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.perception.editable}
                        on:change={(event) => updateCharacteristic(data.character, "perception", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="perception" 
                    value={data.isMaster ? data.character[data.character.perception.charac].init + data.character[data.character.perception.charac].aug : data.character[data.character.perception.charac].init + data.character[data.character.perception.charac].aug + data.character.perception.aug} />
                    {#if data.isMaster || data.character.perception.editable}
                    <p class="italic font-semibold text-sm">{data.character.perception.aug} {data.character.perception.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.perception.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "perception")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "perception")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="ragot">
                        Ragot
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.ragot.editable}
                        on:change={(event) => updateCharacteristic(data.character, "ragot", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="ragot" 
                    value={data.isMaster ? data.character[data.character.ragot.charac].init + data.character[data.character.ragot.charac].aug : data.character[data.character.ragot.charac].init + data.character[data.character.ragot.charac].aug + data.character.ragot.aug} />
                    {#if data.isMaster || data.character.ragot.editable}
                    <p class="italic font-semibold text-sm">{data.character.ragot.aug} {data.character.ragot.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.ragot.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "ragot")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "ragot")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="ramer">
                        Ramer
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.ramer.editable}
                        on:change={(event) => updateCharacteristic(data.character, "ramer", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="ramer" 
                    value={data.isMaster ? data.character[data.character.ramer.charac].init + data.character[data.character.ramer.charac].aug : data.character[data.character.ramer.charac].init + data.character[data.character.ramer.charac].aug + data.character.ramer.aug} />
                    {#if data.isMaster || data.character.ramer.editable}
                    <p class="italic font-semibold text-sm">{data.character.ramer.aug} {data.character.ramer.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.ramer.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "ramer")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "ramer")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="resistance">
                        Résistance
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.resistance.editable}
                        on:change={(event) => updateCharacteristic(data.character, "resistance", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="resistance" 
                    value={data.isMaster ? data.character[data.character.resistance.charac].init + data.character[data.character.resistance.charac].aug : data.character[data.character.resistance.charac].init + data.character[data.character.resistance.charac].aug + data.character.resistance.aug} />
                    {#if data.isMaster || data.character.resistance.editable}
                    <p class="italic font-semibold text-sm">{data.character.resistance.aug} {data.character.resistance.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.resistance.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "resistance")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "resistance")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="resistanceAlcool">
                        Résistance à l'alcool
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.resistanceAlcool.editable}
                        on:change={(event) => updateCharacteristic(data.character, "resistanceAlcool", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="resistanceAlcool" 
                    value={data.isMaster ? data.character[data.character.resistanceAlcool.charac].init + data.character[data.character.resistanceAlcool.charac].aug : data.character[data.character.resistanceAlcool.charac].init + data.character[data.character.resistanceAlcool.charac].aug + data.character.resistanceAlcool.aug} />
                    {#if data.isMaster || data.character.resistanceAlcool.editable}
                    <p class="italic font-semibold text-sm">{data.character.resistanceAlcool.aug} {data.character.resistanceAlcool.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.resistanceAlcool.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "resistanceAlcool")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "resistanceAlcool")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="subornation">
                        Subornation
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.subornation.editable}
                        on:change={(event) => updateCharacteristic(data.character, "subornation", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="subornation" 
                    value={data.isMaster ? data.character[data.character.subornation.charac].init + data.character[data.character.subornation.charac].aug : data.character[data.character.subornation.charac].init + data.character[data.character.subornation.charac].aug + data.character.subornation.aug} />
                    {#if data.isMaster || data.character.subornation.editable}
                    <p class="italic font-semibold text-sm">{data.character.subornation.aug} {data.character.subornation.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.subornation.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "subornation")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "subornation")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="survieExterieur">
                        Survie en extérieur
                        {#if data.isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" bind:checked={data.character.survieExterieur.editable}
                        on:change={(event) => updateCharacteristic(data.character, "survieExterieur", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="survieExterieur" 
                    value={data.isMaster ? data.character[data.character.survieExterieur.charac].init + data.character[data.character.survieExterieur.charac].aug : data.character[data.character.survieExterieur.charac].init + data.character[data.character.survieExterieur.charac].aug + data.character.survieExterieur.aug} />
                    {#if data.isMaster || data.character.survieExterieur.editable}
                    <p class="italic font-semibold text-sm">{data.character.survieExterieur.aug} {data.character.survieExterieur.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if !data.isMaster && data.character.survieExterieur.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(data.character, "survieExterieur")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(data.character, "survieExterieur")}>+</button>
                    </div>
                    {/if}
                </div>

            </section>
        </section>
    </section>
















    <!-- If master, expel player and delete character buttons + modal for deleting confirmation -->
    {#if data.isMaster}

        <!-- Master delete character or expel player -->
        <section class="flex gap-3 mt-10">
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