<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    let tab: Writable<string> = getContext("Tabs");
    </script>
    
    <div
        class="bg-dark-bgMuted2 w-[80%] h-[40%] rounded-2xl shadow-lg mt-6 p-6 font-montserrat">
        <h1
            class="font-semibold text-black dark:text-white font-montserrat text-2xl">
            Import an existing repository
        </h1>
        <h6 class="font-normal mt-2 text-black dark:text-white">
            Don’t have a repository? We’ll create one for you, so you can <span
                class="text-dark-color-accent cursor-pointer"
                on:click="{() => {
                    tab.set('details');
                }}">skip this step.</span>
        </h6>
        {$tab}
    </div>
    