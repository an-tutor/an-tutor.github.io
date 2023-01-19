<script lang="ts">
    import StarLine from "../../ui/StarLine/StarLine.svelte";
    import Text from "../../ui/Text/Text.svelte";
    import UnorderedList from "../../ui/UnorderedList/UnorderedList.svelte";

    export let description: string;
    export let pros: string[];
    export let process: string;
</script>

<div class="wrapper-mw">
    {#if !!description}
        <Text text={description} style={{ textAlign: "center" }} wrapperTag="div" />
    {/if}
    
    {#if !!pros && pros.length > 0}
        <h3 id="about-me">ОБО МНЕ:</h3>
        <UnorderedList list={pros} />
    {/if}
    
    <StarLine />
    
    {#if !!process}
        <h3>КАК ПРОХОДЯТ ЗАНЯТИЯ</h3>
        <Text
            text={process}
            style={{ textAlign: "center", fontSize: 14 }}
            wrapperTag="div"
        />
    {/if}
</div>
