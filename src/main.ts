import App from './App.svelte';
import data from './data';

const app = new App({
	target: document.body,
	...data
});

export default app;