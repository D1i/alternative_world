const diagonalSpd = (speed: number) => speed / 2 ** (1 / 2);

const getSpeedComponents = (speed: number, direction: string) => {
    switch (direction) {
        case '➚':
            return [diagonalSpd(speed), diagonalSpd(speed)];
        case '⬉':
            return [-diagonalSpd(speed), diagonalSpd(speed)];
        case '🠕':
            return [0, speed];
        case '⬊':
            return [diagonalSpd(speed), -diagonalSpd(speed)];
        case '⬋':
            return [-diagonalSpd(speed), -diagonalSpd(speed)];
        case '🠔':
            return [-speed, 0];
        case '🠖':
            return [speed, 0];
        case '🠗':
            return [0, -speed];
        case 'STOP':
            return [0, 0];
        default:
            return [0, 0];
    }
};

export { diagonalSpd, getSpeedComponents };
