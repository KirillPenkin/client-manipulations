import { ICandidate } from "./createEntities";

export const filterProp = (entities: ICandidate[], field: string, value: string) => {
    return entities.filter((item) => {
        return (item[field] as string).startsWith(value);
    })
}

export const includesPermission = (entities: ICandidate[], value: string) => {
    return entities.filter((item) => {
        return item.permitted.has(value);
    });
}

export const sortProp = (entities: ICandidate[], field: string) => {
    return entities.sort((item1, item2) => {
        return item1[field] > item2[field] ? 1 : -1;
    })
}
