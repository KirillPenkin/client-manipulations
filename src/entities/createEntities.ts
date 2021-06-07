import { getRandomPart, getRandomResource } from "./const";

const entitiesNumber = 1000000;

export interface ICandidate {
    firstName: string;
    lastName: string;
    permitted: Set<string>;
}

export const entities = [] as ICandidate[];

const createEntity = (): ICandidate => {
    const permitted = new Set<string>();
    permitted.add(getRandomResource());
    permitted.add(getRandomResource());
    permitted.add(getRandomResource());
    permitted.add(getRandomResource());
    permitted.add(getRandomResource());
    return {
        firstName: `${getRandomPart()} ${getRandomPart()}`,
        lastName: `${getRandomPart()} ${getRandomPart()}`,
        permitted,
    }
}

for (let i=0; i< entitiesNumber; i++) {
    entities.push(createEntity());
}
