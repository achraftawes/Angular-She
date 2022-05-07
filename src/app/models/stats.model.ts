export interface IStats {
    engagement: number;
    numberOfViews: number;
    successRate: number;
}

export interface IStatMap {
    [id: number]: IStats;
}
