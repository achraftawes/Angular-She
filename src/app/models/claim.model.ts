export interface IMessage {
    id: number;
    body: string;
    from: {
        userName: string;
    } | null;
    to: {
        userName: string;
    } | null;
}

export interface IClaim {
    idClaim: string;
    body: string;
    resolved: boolean;
    posted: number;
    typeClaim: null;
    messages: IMessage[];
}
