import { useContext } from 'react'
import { AudioContext } from '../'

const useAudio = () => {
    return useContext(AudioContext)
}

export { useAudio }
