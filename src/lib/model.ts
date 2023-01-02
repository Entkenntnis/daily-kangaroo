import { get, writable } from 'svelte/store';
import produce from 'immer';
import type { WritableDraft } from 'immer/dist/internal';

export interface CoreModel {
	currentTask: number;
}

export const model = writable<CoreModel>({ currentTask: -1 });

export function updateModel(recipe: (draft: WritableDraft<CoreModel>) => void) {
	model.set(produce(get(model), recipe));
}
