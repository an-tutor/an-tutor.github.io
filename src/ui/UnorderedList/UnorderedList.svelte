<script lang="ts">
    import Icon from "@iconify/svelte";
    export let list: any[];
    export let icon: string = 'nimbus:planet';
    export let theme: 'green' | 'blue' | 'red' = null;
</script>

{#if !!list && list.length > 0}
    <ul class:list class:green={theme === 'green'} class:blue={theme === 'blue'} class:red={theme === 'red'}>
        {#each list as el}
            <li>
                <div class="icon-wrapper">
                    <Icon icon={icon} width="20" height="20" />
                </div>
                {@html el}
            </li>
        {/each}
    </ul>
{/if}

<style>
    .list {
        list-style-type: none;
        padding-inline: 0;
    }
    .list li {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        margin-bottom: 9px;
    }
    .icon-wrapper {
        height: 20px;
        aspect-ratio: 1 / 1;
        transform: rotate(0deg);
        transition: transform 1s;
    }
    .icon-wrapper:hover {
        transform: rotate(360deg);
    }
    .list.green li:nth-child(n) .icon-wrapper {
        color: #2ac28f;
    }
    .list.green li:nth-child(2n) .icon-wrapper {
        color: #0aa57f;
    }
    .list.green li:nth-child(3n) .icon-wrapper {
        color: #006851;
    }
    .list.green li:nth-child(4n) .icon-wrapper {
        color: #00483c;
    }
    .list.green li:nth-child(5n) .icon-wrapper {
        color: #07203b;
    }
    .list.blue li:nth-child(n) .icon-wrapper {
        color: #fefeff;
    }
    .list.blue li:nth-child(2n) .icon-wrapper {
        color: #b6d6fe;
    }
    .list.blue li:nth-child(3n) .icon-wrapper {
        color: #6f9fea;
    }
    .list.blue li:nth-child(4n) .icon-wrapper {
        color: #526bca;
    }
    .list.blue li:nth-child(5n) .icon-wrapper {
        color: #305092;
    }
    .list.red li:nth-child(n) .icon-wrapper {
        color: #f8d9ca;
    }
    .list.red li:nth-child(2n) .icon-wrapper {
        color: #fda594;
    }
    .list.red li:nth-child(3n) .icon-wrapper {
        color: #fb6259;
    }
    .list.red li:nth-child(4n) .icon-wrapper {
        color: #d4343a;
    }
    .list.red li:nth-child(5n) .icon-wrapper {
        color: #e9152d;
    }
</style>