<script lang="ts">
    import type { TContacts } from "../../data";
    import Button from "../../ui/Button/Button.svelte";
    export let contacts: TContacts;
</script>

<h3 id="contacts">Контакты</h3>
<div class="wrapper wrapper-mw">
    {#each contacts as { title, icon, link }}
        <Button fullWidth {icon} onClick={link} text={title} />
    {/each}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-bottom: 70px;
    }
</style>
