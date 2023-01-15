<script lang="ts">
    import { Accordion, AccordionItem } from "svelte-collapsible";
    import Icon from "@iconify/svelte";
    import Button from "../../ui/Button/Button.svelte";
    import UnorderedList from "../../ui/UnorderedList/UnorderedList.svelte";
    import StarLine from "../../ui/StarLine/StarLine.svelte";

    export let classes: {
        title: string;
        btn: {
            text: string;
            href: string;
        };
        points: {
            id: string;
            title: string;
            content: (string | string[])[];
        }[];
    }[];

    let key: string;
</script>

{#each classes as { title, btn, points }, i}
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
                            <Icon icon="iconoir:plus" width={24} height={24} />
                        </div>
                        <div
                            class="iconWrapper"
                            class:transparent={key !== point.id}
                        >
                            <Icon icon="iconoir:minus" width={24} height={24} />
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
        withEnterIcon
        fullWidth
        style="margin-bottom: 15px; margin-top: -5px"
    />
    {#if i !== classes.length - 1}
        <StarLine />
    {/if}
{/each}

<style>
    h3 {
        text-align: center;
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
</style>
