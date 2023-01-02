import { updateModel } from './model';

export function startTask() {
	updateModel((core) => {
		core.currentTask = 1;
	});
}
