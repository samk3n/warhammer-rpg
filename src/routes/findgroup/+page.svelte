<script>
    import {getRecordFromId} from "$lib/utils.js";
    export let data;
</script>

{#if data && data.groups}

    {#if data.groups.length == 0}
        <h1 class="text-3xl font-semibold text-center">Aucun groupe trouvé.</h1>
    {/if}

    {#each data.groups as group}
    <section class="card bg-base-200 mt-10 w-11/12 mx-2 sm:w-4/5 md:w-3/5 lg:w-3/6">
        <section class="card-body items-center">
            <h2 class="text-base-content text-2xl font-semibold">{group.name}</h2>
            <div class="divider"></div>
            <h3 class="text-lg font-semibold text-center mb-4">Membres</h3>
            {#if group.characters.length == 0}
                <p>Groupe vide!</p>
            {/if}

            {#each group.characters as characId}
                {#await getRecordFromId("characters", characId) then character}
                    <input type="text" class="input input-bordered text-center disabled:text-base-content disabled:cursor-default" value={character.name} />
                {/await}
            {/each}
        </section>

        <form class="card-actions justify-center" method="POST" action="?/joinGroup">
            <input type="hidden" name="characId" value={data.characId} />
            <input type="hidden" name="groupId" value={group.id} />
            <button class="btn btn-neutral xs:btn-wide">Rejoindre</button>
        </form>
    </section>
    {/each}
{/if}