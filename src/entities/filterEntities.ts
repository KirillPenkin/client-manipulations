import { ICandidate } from "./createEntities";

export const filterProp = (entities: ICandidate[], field: keyof ICandidate, value: string) => {
    return entities.filter((item) => {
        const fieldValue = item[field] as string;
        return fieldValue.startsWith(value);
    })
}

export const includesAnyPermissions = (entities: ICandidate[], permissions: string[]) => {
    return entities.filter((item) => {
        return permissions.every((permission) => {
            return item.permitted.has(permission);
        })
    })
}

export const sortProp = (entities: ICandidate[], field: keyof ICandidate, isAccending: boolean) => {
    return entities.sort((item1, item2) => {
        if (isAccending) {
            return item1[field] > item2[field] ? 1 : -1;
        } else {
            return item1[field] < item2[field] ? 1 : -1;
        }
    })
}
