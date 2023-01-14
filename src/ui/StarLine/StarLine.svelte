<script lang="ts">
    import Icon from "@iconify/svelte";
</script>

<div class="wrapper-lines">
    <div class="star-wrapper">
        <Icon icon="iconoir:star" width="20" height="20" />
    </div>
</div>

<style>
    .wrapper-lines {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .wrapper-lines::before,
    .wrapper-lines::after {
        position: relative;
        content: '';
        width: 72px;
        height: 1px;
        background-color: #573222cc;
        top: 10px;
    }
    .wrapper-lines::before {
        margin-right: 20px;   
    }
    .wrapper-lines::after {
        margin-left: 20px;   
    }

    .star-wrapper {
        transform: rotate(0deg);
        transition: transform .3s;
    }
    .star-wrapper:hover {
        transform: rotate(70deg);
    }
</style>
