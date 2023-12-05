import { PhysicPlayerTypes } from 'src/types';

const physicPlayers: Array<PhysicPlayerTypes.PhysicPlayer> = [
    {
        id: 0,
        name: 'Vlad',
        speed: 200,
        direction: '🠗',
        state: 'stand',
        width: 48,
        height: 48,
        color: 'blue',
        x: 64,
        y: 64,
    },
    {
        id: 1,
        name: 'Maxim',
        speed: 200,
        direction: '🠗',
        state: 'stand',
        width: 48,
        height: 48,
        color: 'red',
        x: 128,
        y: 64,
    },
    {
        id: 2,
        name: 'Kirill',
        speed: 200,
        direction: '🠗',
        state: 'stand',
        width: 48,
        height: 48,
        color: 'green',
        x: 64,
        y: 128,
    },
];

export { physicPlayers };
