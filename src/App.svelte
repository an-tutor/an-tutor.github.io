<script lang="ts">
	import data from "./data";
    import Avatar from "./components/Avatar/Avatar.svelte";
	import About from "./components/About/About.svelte";
	import TypesOfClasses from "./components/TypesOfClasses/TypesOfClasses.svelte";
	import Footer from "./components/Footer/Footer.svelte";
	import Nav from "./components/Nav/Nav.svelte";
	const { about, sections, classes, contacts } = data;
</script>

<Avatar />
<About {...about} />
<TypesOfClasses {classes} {sections} />
<Footer {contacts} />
<Nav {classes} />

<style>
	:global(html) {
		scroll-padding-top: 20px;
		scroll-behavior: smooth;
	}
	:global(body) {
		background-color: #fff;
		color: #000;
		font-family: "Montserrat", sans-serif;
		padding: 0;
	}
	:global(.wrapper-mw) {
		max-width: 720px;
		margin: 0 auto;
		font-family: "Montserrat", sans-serif;
		padding: 8px;
	}
	:global(h3) {
		text-align: center;
		margin-block: 20px;
	}
	@keyframes -global-color-change {
		0%,
		100% {
			color: #2ac28f;
		}
		15%,
		85% {
			color: #0aa57f;
		}
		30%,
		70% {
			color: #006851;
		}
		40%,
		60% {
			color: #00483c;
		}
		50% {
			color: #07203b;
		}
	}
	@keyframes -global-color-change-gold {
		0%,
		100% {
			color: #ff5500;
		}
		50% {
			color: #ff9b29;
		}
	}
	@keyframes -global-color-change-blue {
		0%,
		100% {
			color: #456ec7;
		}
		50% {
			color: #8499eb;
		}
	}
	@keyframes -global-border-color-change {
		0%,
		100% {
			border-color: #2ac28f;
		}
		15%,
		85% {
			border-color: #0aa57f;
		}
		30%,
		70% {
			border-color: #006851;
		}
		40%,
		60% {
			border-color: #00483c;
		}
		50% {
			border-color: #07203b;
		}
	}
	@keyframes -global-border-color-change-gold {
		0%,
		100% {
			border-color: #ff5500;
		}
		50% {
			border-color: #ff9b29;
		}
	}
	@keyframes -global-bg-color-change {
		0%,
		100% {
			background-color: #2ac28f;
		}
		15%,
		85% {
			background-color: #0aa57f;
		}
		30%,
		70% {
			background-color: #006851;
		}
		40%,
		60% {
			background-color: #00483c;
		}
		50% {
			background-color: #07203b;
		}
	}
</style>
