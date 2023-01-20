<script lang="ts">
    let bigAvatar: boolean = false;
</script>

<div class="wrapper">
    <img
        class:bigAvatar
        src="images/avatar.jpg"
        alt="me"
        on:click={() => bigAvatar = !bigAvatar}
        on:keypress={() => bigAvatar = !bigAvatar}
    >
    <span>an.tutor</span>
</div>

<style>
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
    }
    img {
        width: 30vw;
        max-width: 100px;
        height: 30vw;
        max-height: 100px;
        border-radius: 50%;
        transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .bigAvatar {
        width: 60vw;
        max-width: 300px;
        height: 60vw;
        max-height: 300px;
        border-radius: 20px;
    }
    span {
        color: #919191;
    }
</style>