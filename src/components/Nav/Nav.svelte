<script lang="ts">
    import Icon from "@iconify/svelte";
    import clickOutside from "svelte-outside-click";
    import type { TClasses } from "../../data";
    export let classes: TClasses;

    let shown: boolean = false;
    const showMenuHandle = (e) => {
        e.stopPropagation();
        shown = true;
    };
    const clickOutsideHandle = () => {
        if (shown === true) shown = false;
    };
</script>

<div class="wrapper">
    <a href="#about-me" class="btn">
        <div class="icon-wrapper">
            <Icon icon="clarity:avatar-solid" width="24" height="24" />
        </div>
        <span class="subtitle">Обо мне</span>
    </a>
    <button class="btn" on:click={showMenuHandle}>
        <div class="icon-wrapper">
            <Icon icon="ion:menu" width="24" height="24" />
        </div>
        <span class="subtitle">Типы занятий</span>
    </button>
    <a href="#contacts" class="btn">
        <div class="icon-wrapper">
            <Icon icon="charm:at-sign" width="24" height="24" />
        </div>
        <span class="subtitle">Контакты</span>
    </a>
</div>
<div class="menu-popup" class:shown use:clickOutside={clickOutsideHandle}>
    {#each classes as { title, href }}
        <a href={`#${href}`} on:click={() => (shown = false)}>{title}</a>
    {/each}
</div>

<style>
    .wrapper {
        position: fixed;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: #fff;
        z-index: 99;
        bottom: 0;
        left: 0;
        width: 100vw;
        border-top: 1px solid;
        animation: border-color-change 3s infinite;
        height: 50px;
    }
    a.btn,
    a:hover.btn {
        text-decoration: none;
    }
    button.btn,
    button:active.btn {
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
    }
    .btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #000;
        cursor: pointer;
    }
    .subtitle {
        font-size: 9px;
    }
    .menu-popup {
        position: fixed;
        bottom: 55px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background-color: #fff;
        border: 1px solid;
        animation: border-color-change 3s infinite;
        z-index: 100;
        max-height: 0;
        max-width: 80vw;
        opacity: 0;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
    }

    .menu-popup a,
    .menu-popup a:hover {
        text-decoration: none;
        color: #000;
        text-align: center;
    }
    .shown {
        opacity: 1;
        max-height: 1000px;
        transition: all 0.3s ease-in-out;
    }
</style>
