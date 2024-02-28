<script>
    export let isOpen = false;
</script>

<div class="container" style:display={isOpen ? "flex" : "none"}>
    <slot/>
</div>

<style lang="scss">
    .container {
        background-color: rgba(0,0,0,0.2);

        position: fixed;
        z-index: 50;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        justify-content: center;
        align-items: center;
    }
    
</style>