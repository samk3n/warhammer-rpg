<script>
    import "../app.scss";
    import 'iconify-icon';
    import Header from "$lib/Components/Header.svelte";
    import {afterNavigate} from "$app/navigation";
    import { page } from '$app/stores';
    import {pathsList} from "$lib/Stores/pathStore.js";
    import { get } from "svelte/store";

    afterNavigate(({from}) => {
        // If there is a previous page.
        if(from){
            const previousPage = from.url.pathname;
            const tmpList = get(pathsList);
            // If we are on the home page, empty the list if previous paths.
            if($page.url.pathname == "/"){
                pathsList.set(["/"]);
            }
            // If we went back and forth (ex: / -> /aaa -> /bbb -> /aaa),
            // Remove the "loop" (/aaa to /bbb)
            // So the new list of path is ["/"], because we are in "/aaa",
            // and the only route before that in our history is "/".
            else if($page.url.pathname == tmpList[tmpList.length-1]){
                tmpList.pop();
                pathsList.set(tmpList);
            }
            // Add the previous page to the paths list.
            else {
                if(previousPage != "/"){
                    pathsList.update(items => [...items, previousPage]);
                }
            }
        }
    });

    export let data;
    
</script>

<div class="app">
    <Header user={data?.user} />
    <main class="main">
         <slot />
    </main>
  
</div>
  
<style lang="scss">
    .app {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;

        position: relative;
        overflow-x: hidden;
    }
  
    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;

        padding-top: 80px;
        width: 60%;
    }

    @media (max-width: 768px) {
        .main {
            width: 90%;
        }
    }

  </style>