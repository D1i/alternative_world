import { useCallback } from 'react'
import { Button, Container, Slider, Stack } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { coreStateSelector, setVolme } from '../../../../../redux/HUDReducer'

function Settings(props) {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector)
    const dispatch = useAppDispatch()

    const handleChangeVolme = useCallback(
        (event) => {
            dispatch(setVolme(event.target.value))
        },
        [dispatch]
    )

    return (
        <div>
            <Button onClick={props.handleBack}>МЕНЮ</Button>
            <Container>
                <Stack
                    spacing={1}
                    direction="row"
                    sx={{ mb: 1 }}
                    alignItems="center"
                >
                    <Slider
                        onChange={handleChangeVolme}
                        aria-label="Volume"
                        value={selectedCoreStateSelector.settings.volme}
                    />
                </Stack>
            </Container>
        </div>
    )
}

export { Settings }
