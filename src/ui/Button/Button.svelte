<script lang="ts">
    import Icon from "@iconify/svelte";
    export let onClick: string | (() => void) = null;
    export let target: "_blank" | "_self" | "_parent" | "_top" = "_self";
    export let withEnterIcon: boolean = false;
    export let fullWidth: boolean = false;
    export let text: string;
    export let style: string = null;
</script>

{#if typeof onClick === "string"}
    <a href={onClick} {target} class="btn" class:fullWidth {style}>
        {#if withEnterIcon}
            <Icon icon="iconoir:long-arrow-down-right" width="25" height="25" />
        {/if}
        {text}
        {#if fullWidth}
            <span style="width: 20px" />
        {/if}
    </a>
{:else}
    <button on:click={onClick} class="btn" class:fullWidth {style}>
        {#if withEnterIcon}
            <Icon icon="iconoir:long-arrow-down-right" width="25" height="25" />
        {/if}
        {text}
        {#if fullWidth}
            <span style="width: 20px" />
        {/if}
    </button>
{/if}

<style>
    a.btn,
    a.btn:hover {
        text-decoration: none;
    }
    button.btn,
    button.btn:hover {
        border: none;
    }

    .btn {
        cursor: pointer;
        padding: 12px;
        background: #e2d4ce;
        color: #573222;
        transition: all 0.3s;
        text-transform: uppercase;
        font-weight: 600;
        display: inline-flex;
        justify-content: space-between;
        gap: 12px;
        width: max-content;
        align-items: center;
        border-radius: 6px;
        box-sizing: border-box;
    }
    .btn:hover {
        background: #e4d7d2;
    }
    .btn.fullWidth {
        width: 100%;
    }
</style>
