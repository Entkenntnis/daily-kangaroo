export interface Task {
	title: string;
	task: string;
	toolbox: string[];
}

export const taskData: Task[] = [
	{ title: 'A1', task: 'A1.png', toolbox: ['A1_1.png', 'A1_2.png'] },
	{
		title: 'A2',
		task: 'A2.png',
		toolbox: ['A2_1.png', 'A2_2.png', 'A2_3.png', 'A2_4.png', 'A2_5.png']
	}
];
