<script lang="ts">
    import Icon from "@iconify/svelte";
    export let list: any[];
    export let icon: string = "nimbus:planet";
</script>

{#if !!list && list.length > 0}
    <ul class:list>
        {#each list as el}
            <li>
                <div class="icon-wrapper">
                    <Icon {icon} width="20" height="20" />
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
    .list li:nth-child(n) .icon-wrapper {
        color: #2ac28f;
    }
    .list li:nth-child(2n) .icon-wrapper {
        color: #0aa57f;
    }
    .list li:nth-child(3n) .icon-wrapper {
        color: #006851;
    }
    .list li:nth-child(4n) .icon-wrapper {
        color: #00483c;
    }
    .list li:nth-child(5n) .icon-wrapper {
        color: #07203b;
    }
</style>
