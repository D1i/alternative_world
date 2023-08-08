import { Player } from '../types/player';

export function createPlayer(): Player {
    return {
        name: 'Saya',
        visualParams: {},
        characteristics: {},
        effects: {},
        state: {},
        ammunition: {
            head: null,
            neck: null,
            leftShoulder: null,
            rightShoulder: null,
            leftForearm: null,
            rightForearm: null,
            stomach: null,
            legs: null,
            feet: null,
            leftHand: null,
            rightHand: null,
            back: null,
            Breast: null,
            leftForearmUp: null,
            rightForearmUp: null,
            leftForearmDown: null,
            rightForearmDown: null,
            leftLegUp: null,
            rightLegUp: null,
            leftLegDown: null,
            rightLegDown: null,
        },
    };
}
