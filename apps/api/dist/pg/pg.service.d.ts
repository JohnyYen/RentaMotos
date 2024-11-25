export declare class PgService {
    private pool;
    constructor();
    execute(query: string, params?: any[]): Promise<any>;
    pagination(table: string, page?: number, limit?: number, orderBy?: string, orderDirection?: string): Promise<{
        data: any;
        count: any;
    }>;
    private getTotalCount;
}
