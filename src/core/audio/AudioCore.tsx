import { createContext } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { addSound } from '../../redux/HUDReducer'
import { AudioBuilder } from './AudioBuilder'

const AudioContext = createContext<(id: string) => AudioBuilder>(null)

interface props {
    children: React.ReactNode
}

function AudioCore(props: props) {
    const dispatch = useAppDispatch()

    const audioCoreInit = (id: string): AudioBuilder => {
        const sound: AudioBuilder = new AudioBuilder(id, dispatch)
        dispatch(addSound(id))
        return sound
    }

    return (
        <AudioContext.Provider value={audioCoreInit}>
            {props.children}
        </AudioContext.Provider>
    )
}

export { AudioContext, AudioCore }
