import { sounds } from './sounds'

export function playSound(id: number): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const audio = new Audio(sounds[id])
    audio
        .play()
        .then((status) => {
            console.log(status)
        })
        .catch((error) => {
            console.error(error)
        })

    if (id === 3) {
        audio.volume = 0.0
    }
}
