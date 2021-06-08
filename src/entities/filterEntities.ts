import { ICandidate } from "./createEntities";

export const filterProp = (entities: ICandidate[], field: keyof ICandidate, value: string) => {
    return entities.filter((item) => {
        return (item[field] as any).startsWith(value);
    })
}

export const includesAnyPermissions = (entities: ICandidate[], permissions: string[]) => {
    return entities.filter((item) => {
        return permissions.some((permission) => {
            return item.permitted.has(permission);
        })
    })
}

export const sortProp = (entities: ICandidate[], field: keyof ICandidate) => {
    return entities.sort((item1, item2) => {
        return item1[field] > item2[field] ? 1 : -1;
    })
}
