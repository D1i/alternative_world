import {useCallback, useMemo, useState} from "react";
import {Button, FormGroup, Input} from "@mui/material";

import s from './style.module.scss';

function CreateItem() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [mass, setMass] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [maxStack, setMaxStack] = useState('');
    const [durability, setDurability] = useState('');

    const handleSetId = useCallback((event) => {
        setId(event.value);
    }, []);

    const handleSetName = useCallback((event) => {
        setName(event.value);
    }, []);

    const handleSetMass = useCallback((event) => {
        setMass(event.value);
    }, []);

    const handleSetWidth = useCallback((event) => {
        setWidth(event.value);
    }, []);

    const handleSetHeight = useCallback((event) => {
        setHeight(event.value);
    }, []);

    const handleSetMaxStack = useCallback((event) => {
        setMaxStack(event.value);
    }, []);

    const handleSetDurability = useCallback((event) => {
        setDurability(event.value);
    }, []);

    return (
        <div className={s.container}>
            <FormGroup>
                <Input type='number' required placeholder='id' onChange={handleSetId} value={id}/>
                <Input type='text' required placeholder='name' onChange={handleSetName} value={name}/>
                <Input type='number' required placeholder='mass' onChange={handleSetMass} value={mass}/>
                <Input type='number' required placeholder='width' onChange={handleSetWidth} value={width}/>
                <Input type='number' required placeholder='height' onChange={handleSetHeight} value={height}/>
                <Input type='number' placeholder='maxStack' onChange={handleSetMaxStack} value={maxStack}/>
                <Input type='number' placeholder='durability' onChange={handleSetDurability} value={durability}/>
                <Button>СОЗДАТЬ</Button>
            </FormGroup>
        </div>
    )
}

export {CreateItem};
