<script lang="ts">
    import { Accordion, AccordionItem } from "svelte-collapsible";
    import Icon from "@iconify/svelte";
    import Button from "../../ui/Button/Button.svelte";
    import UnorderedList from "../../ui/UnorderedList/UnorderedList.svelte";
    import type { TClasses } from "../../data";

    export let classes: TClasses;

    let key: string;
</script>

{#each classes as { title, btn, points }, i}
    <div class="card">
        <h3>{title}</h3>
        <Accordion bind:key>
            {#each points as point}
                <AccordionItem key={point.id} class="wrapper">
                    <button slot="header" class="header">
                        <div class="iconsWrapper">
                            <div
                                class="iconWrapper"
                                class:transparent={key === point.id}
                            >
                                <Icon
                                    icon="iconoir:plus"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <div
                                class="iconWrapper"
                                class:transparent={key !== point.id}
                            >
                                <Icon
                                    icon="iconoir:minus"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                        <span>
                            {point.title}
                        </span>
                    </button>
                    <div slot="body">
                        {#each point.content as item}
                            {#if typeof item === "string"}
                                {@html item}
                            {:else}
                                <UnorderedList list={item} />
                            {/if}
                        {/each}
                    </div>
                </AccordionItem>
            {/each}
        </Accordion>
        <Button
            onClick={btn.href}
            target="_blank"
            text={btn.text}
            fullWidth
            icon="iconoir:planet"
        />
        <div class="star-wrapper">
            <Icon icon="iconoir:star" width="20" height="20" />
        </div>
    </div>
{/each}

<style>
    .card {
        padding: 15px;
        border: solid 1px #000;
        border-radius: 6px;
        margin-bottom: 20px;
        position: relative;
        animation: border-color-change 3s infinite;
    }
    h3 {
        text-align: center;
        margin-top: 0;
        margin-bottom: 5px;
    }
    .header {
        color: #000;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        cursor: pointer;
        padding-inline: 0;
    }
    .header:not(:disabled):active {
        background-color: transparent;
    }
    .iconsWrapper {
        position: relative;
        width: 24px;
        height: 24px;
    }
    .iconWrapper {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 1;
        transition: all 0.3s;
    }
    .transparent {
        opacity: 0;
    }
    .star-wrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        width: 50px;
        height: 20px;
        top: -10px;
        left: 18px;
        animation: color-change 3s infinite;
    }
</style>
