import { ChangeEvent, useCallback, useState } from 'react'
import { Button, FormGroup, Input } from '@mui/material'

import s from './style.module.scss'

function CreateItem() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [mass, setMass] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [maxStack, setMaxStack] = useState('')
    const [durability, setDurability] = useState('')

    const handleSetId = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            setId(event.target.value)
        },
        []
    )

    const handleSetName = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            setName(event.target.value)
        },
        []
    )

    const handleSetMass = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            setMass(event.target.value)
        },
        []
    )

    const handleSetWidth = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            setWidth(event.target.value)
        },
        []
    )

    const handleSetHeight = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            setHeight(event.target.value)
        },
        []
    )

    const handleSetMaxStack = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            setMaxStack(event.target.value)
        },
        []
    )

    const handleSetDurability = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            setDurability(event.target.value)
        },
        []
    )

    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        <div className={s.container}>
            <FormGroup>
                <Input
                    type="number"
                    required
                    placeholder="id"
                    onChange={handleSetId}
                    value={id}
                />
                <Input
                    type="text"
                    required
                    placeholder="name"
                    onChange={handleSetName}
                    value={name}
                />
                <Input
                    type="number"
                    required
                    placeholder="mass"
                    onChange={handleSetMass}
                    value={mass}
                />
                <Input
                    type="number"
                    required
                    placeholder="width"
                    onChange={handleSetWidth}
                    value={width}
                />
                <Input
                    type="number"
                    required
                    placeholder="height"
                    onChange={handleSetHeight}
                    value={height}
                />
                <Input
                    type="number"
                    placeholder="maxStack"
                    onChange={handleSetMaxStack}
                    value={maxStack}
                />
                <Input
                    type="number"
                    placeholder="durability"
                    onChange={handleSetDurability}
                    value={durability}
                />
                <Button>СОЗДАТЬ</Button>
            </FormGroup>
        </div>
    )
}

export { CreateItem }
