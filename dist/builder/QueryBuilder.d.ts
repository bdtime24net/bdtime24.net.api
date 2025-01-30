import { Query } from 'mongoose';
export declare class QueryBuilder<T> {
    modelQuery: Query<T[], T>;
    query: Record<string, unknown>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>);
    search(searchableFields: string[]): this;
    filter(): this;
    sort(): this;
    paginate(): this;
    fields(): this;
}
