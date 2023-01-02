<script lang="ts">
	import { taskData } from '$lib/data';
	import { model } from '$lib/model';
	import { onMount } from 'svelte';

	interface Draggable {
		src: string;
		offsetX: number;
		offsetY: number;
	}

	let draggables: Draggable[] = [];
	let offsetInImageX = -1;
	let offsetInImageY = -1;
	let index = -1;

	onMount(() => {
		window.addEventListener('mousedown', mouseDown);
		window.addEventListener('mousemove', move);
		window.addEventListener('mouseup', mouseUp);

		return () => {
			window.removeEventListener('mousedown', mouseDown);
			window.removeEventListener('mousemove', move);
			window.removeEventListener('mouseup', mouseUp);
		};
	});

	function mouseDown(e: MouseEvent) {
		const q = document.querySelectorAll(':hover');
		const el = q[q.length - 1];
		if (el && el.tagName == 'IMG') {
			const img = el as HTMLImageElement;
			if (img.alt != 'toolbox' && img.alt != 'drag object') return;
			console.log('set object', img);
			e.preventDefault();
			if (img.alt == 'toolbox') {
				const bounds = img.getBoundingClientRect();
				draggables = [...draggables, { src: img.src, offsetX: bounds.left, offsetY: bounds.top }];
				console.log(bounds);
				index = draggables.length - 1;
			} else {
				index = parseInt(img.dataset.index ?? '-1');
			}
			offsetInImageX = e.clientX - draggables[index].offsetX;
			offsetInImageY = e.clientY - draggables[index].offsetY;
			//console.log('set drag index', index);
		}
	}

	function move(e: MouseEvent) {
		if (index >= 0) {
			e.preventDefault();
			draggables[index].offsetX = e.clientX - offsetInImageX;
			draggables[index].offsetY = e.clientY - offsetInImageY;
			draggables = draggables;
			//console.log(draggables[index]);
		}
	}

	function mouseUp(e: MouseEvent) {
		if (index >= 0) {
			if (e.clientX < 110) {
				// remove
				draggables.splice(index, 1);
				draggables = draggables;
			}
			e.preventDefault();
			index = -1;
			//console.log('release object');
		}
		offsetInImageX = -1;
		offsetInImageY = -1;
	}
</script>

<div class="flex h-screen min-w-[900px] overflow-y-hidden">
	<div class="h-full bg-gray-200 flex-none p-4">
		<h2 class="mb-16 text-gray-800 italic">Stempelkiste</h2>
		{#each taskData[$model.currentTask].toolbox as src}<img
				{src}
				alt="toolbox"
				draggable="false"
				class="border-2 border-transparent m-8 mx-auto hover:border-yellow-400"
			/>
		{/each}
	</div>
	<div class="h-full flex-auto relative overflow-hidden">
		<div class="ml-8 mt-8">
			<img src={taskData[$model.currentTask].task} alt="A1" class="mt-6" draggable="false" />
		</div>
	</div>
	<div class="h-full bg-gray-100 flex-none">
		<div class="p-4">
			Aufgabe {taskData[$model.currentTask].title}<br />
			Antwort einloggen:
			<select class="ml-4 text-xl">
				<option>-</option>
				<option>A</option>
				<option>B</option>
				<option>C</option>
				<option>D</option>
				<option>E</option>
			</select><br /><button
				class="mt-4 border-2 border-pink-300 rounded-full px-2 hover:bg-pink-100">Abschicken</button
			>
		</div>
	</div>
</div>

{#each draggables as d, index}
	<img
		src={d.src}
		data-index={index}
		alt="drag object"
		style={`left:${d.offsetX}px;top:${d.offsetY}px`}
		class="absolute border-2 border-transparent hover:border-yellow-400"
	/>
{/each}

<!--<div class="mx-auto w-fit mt-12">
	<h1 class="text-2xl">Aufgabe A1</h1>
	<img src="A1.png" alt="A1" class="mt-6" draggable="false" />
	<div class="absolute left-4 inset-y-6 p-4 bg-gray-100">
		<p>Toolbox</p>
		<img
			src="A1_1.png"
			alt="toolbox"
			draggable="false"
			class="border-2 border-transparent mt-6 mx-auto hover:border-yellow-400"
		/><img
			src="A1_2.png"
			alt="toolbox"
			draggable="false"
			class="border-2 border-transparent mt-6 mx-auto hover:border-yellow-400"
		/>
	</div>
	{#each draggables as d, index}
		<img
			src={d.src}
			data-index={index}
			alt="drag object"
			style={`left:${d.offsetX}px;top:${d.offsetY}px`}
			class="absolute border-2 border-transparent hover:border-yellow-400"
		/>
	{/each}
	<div class="absolute right-4 top-4 bg-gray-100 p-4">
		Antwort einloggen: <select class="ml-4 text-xl">
			<option>-</option>
			<option>A</option>
			<option>B</option>
			<option>C</option>
			<option>D</option>
			<option>E</option>
		</select><br /><button class="mt-4 border rounded-full px-2 hover:bg-white">Abschicken</button>
	</div>
</div>-->
