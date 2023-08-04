import { keyVector } from 'src/core/types/movementCore'

export function showVector(codes: keyVector) {
    if (codes[0] === 'KeyW') {
        if (codes[1] === 'KeyA') {
            if (codes[2] === 'KeyD') {
                return '➚'
            }
            return '⬉'
        } else if (codes[1] === 'KeyS') {
            return 'STOP'
        } else if (codes[1] === 'KeyD') {
            if (codes[2] === 'KeyA') {
                return '⬉'
            }
            return '➚'
        }
        return '🠕'
    } else if (codes[0] === 'KeyA') {
        if (codes[1] === 'KeyW') {
            if (codes[2] === 'KeyD') {
                return '➚'
            }
            return '⬉'
        } else if (codes[1] === 'KeyS') {
            if (codes[2] === 'KeyD') {
                return '⬊'
            }
            return '⬋'
        }
        return '🠔'
    } else if (codes[0] === 'KeyS') {
        if (codes[1] === 'KeyA') {
            if (codes[2] === 'KeyD') {
                return '⬊'
            }
            return '⬋'
        } else if (codes[1] === 'KeyW') {
            return 'STOP'
        } else if (codes[1] === 'KeyD') {
            if (codes[2] === 'KeyA') {
                return '⬋'
            }
            return '⬊'
        }
        return '🠗'
    } else if (codes[0] === 'KeyD') {
        if (codes[1] === 'KeyW') {
            if (codes[2] === 'KeyS') {
                return '⬊'
            }
            return '➚'
        } else if (codes[1] === 'KeyA') {
            return 'STOP'
        } else if (codes[1] === 'KeyS') {
            return '⬊'
        }
        return '🠖'
    }
    return 'STOP'
}
