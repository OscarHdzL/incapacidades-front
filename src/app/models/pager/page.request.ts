
export class PageRequest<T> {
	model: T|undefined;
	page: number;
	pageSize: number;
	order: string;
	desc: boolean;

	constructor(options: {
		model?: T;
		page?: number;
		pageSize?: number;
		order?: string;
		desc?: boolean;
	} = {}) {
		this.model = options.model;
		this.page = options.page || 1;
		this.pageSize = options.pageSize || 10;
		this.order = options.order || '';
		this.desc = options.desc || true;
	}
}

