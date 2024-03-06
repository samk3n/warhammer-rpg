<script>
    export let form;
</script>

<section class="w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">
    {#if form}
        <p class="text-warning font-semibold text-center">{form.message}</p>
    {/if}
    <form class="card bg-base-200 shadow-lg mt-10 w-full" method="POST" action="?/login">
        <section class="card-body">
            <div class="form-control">
                <label class="label" for="user">Nom d'utilisateur ou email</label>
                <input class="input input-bordered" type="text" name="user" />
            </div>
            <div class="form-control">
                <label class="label" for="password">Mot de passe</label>
                <input class="input input-bordered" type="password" name="password" />
            </div>
        </section>
        <section class="card-actions justify-center">
            <button class="btn btn-neutral btn-wide">Connexion</button>
        </section>
    </form>
</section>
<p class="mt-5">Si vous n'avez pas encore de compte, <a href="/register" class="underline" >inscrivez-vous!</a></p>