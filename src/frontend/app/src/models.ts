export interface IPerson {
    id: number;
    fullName: string;
}

export interface IApplicationStat {
    documentname: string;
    count: number;
}

export type ApplicationsStats = IApplicationStat[];
