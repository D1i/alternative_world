import { Player } from '../player';

interface User {
    token: number;
    isAdmin: boolean;
    name: string;
    persons: Array<Player>;
}
