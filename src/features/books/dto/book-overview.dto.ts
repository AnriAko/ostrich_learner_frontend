export interface BookOverviewDto {
    _id: string;
    b: string;
    p_count: number;
    userId: string;
    lastUpdated?: string;
    lastViewedPage?: number;
    lastViewedPageSize?: number;
}
