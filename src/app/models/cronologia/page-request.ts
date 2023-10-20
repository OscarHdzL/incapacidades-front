export class PageRequest<T> {

    public constructor(init?: Partial<T>) {
        Object.assign(this, init);
    }

    page?: number;
    pageSize? : number;
    order?: string;
    desc?: boolean;
    model?:T;  
    
  }