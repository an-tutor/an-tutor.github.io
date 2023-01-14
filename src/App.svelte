<script lang="ts">
	import { data } from './data'
	import About from './components/About/About.svelte'
</script>

<About {...data.about} />

<style>
	:global(body) {
		background-color: #f5f5f5;
		color: #573222;
		max-width: 720px;
		margin: 0 auto;
		font-family: 'Montserrat', sans-serif;
	}
</style>
