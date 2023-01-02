<script lang="ts">
	import { model } from '$lib/model';
	import Task from '../components/Task.svelte';
	import { startTask } from '$lib/controller';
</script>

{#if $model.currentTask == -1}
	<div class="container mx-auto px-4">
		<h1 class="mt-24 text-xl">Eine tägliche Portion an Känguru der Mathematik</h1>
		<p class="mt-4">
			<button
				on:click={startTask}
				class="px-3 border-2 border-pink-400 rounded-full hover:bg-pink-200 transition-colors py-0.5"
				>Starten</button
			>
		</p>
	</div>
{:else}
	<Task />
{/if}
