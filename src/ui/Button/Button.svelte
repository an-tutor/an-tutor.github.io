<script lang="ts">
    import Icon from "@iconify/svelte";
    export let onClick: string | (() => void) = null;
    export let target: "_blank" | "_self" | "_parent" | "_top" = "_self";
    export let icon: string = null; //"iconoir:long-arrow-down-right"
    export let fullWidth: boolean = false;
    export let text: string;
    export let style: string = null;
</script>

{#if typeof onClick === "string"}
    <a href={onClick} {target} class="btn" class:fullWidth {style}>
        {#if !!icon}
            <div class="icon-wrapper">
                <Icon {icon} width="25" height="25" />
            </div>
        {/if}
        {text}
        {#if !!icon && fullWidth}
            <div class="icon-wrapper" />
        {/if}
    </a>
{:else}
    <button on:click={onClick} class="btn" class:fullWidth {style}>
        {#if !!icon}
            <div class="icon-wrapper">
                <Icon {icon} width="25" height="25" />
            </div>
        {/if}
        {text}
        {#if !!icon && fullWidth}
            <div class="icon-wrapper" />
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
        background: #2ac28f;
        color: #fff;
        transition: all 0.3s;
        text-transform: uppercase;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        width: max-content;
        align-items: center;
        border-radius: 6px;
        box-sizing: border-box;
    }
    .btn:hover {
        background: #006851;
    }
    .btn.fullWidth {
        width: 100%;
        text-align: center;
    }
    .icon-wrapper {
        width: 25px;
        height: 25px;
        min-width: 25px;
    }
</style>
