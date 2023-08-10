import { BagClass } from '../bag-generator/bag-generator';
import { editBag } from 'src/redux/HUDReducer';
import { cloneDeep } from 'lodash';

class Bag {
    put = ({ importHUD, item, position, dispatch }) => {
        const wrappedImportHUD = new BagClass({
            width: importHUD.specialData.inner.x,
            height: importHUD.specialData.inner.y,
        });

        wrappedImportHUD.setWrapper(importHUD.specialData);

        const isSameBag = wrappedImportHUD.hasItem(item);
        if (
            !wrappedImportHUD.itemPut({
                ...item,
                x: position.cellX,
                y: position.cellY,
            })
        ) {
            return false;
        }

        dispatch(editBag(wrappedImportHUD.getSerializableObject()));

        if (isSameBag) {
            return;
        }

        return true;
    };

    pullOut = ({ exportHUD, item, dispatch }) => {
        const wrappedExportHUD = new BagClass({
            width: exportHUD.specialData.inner.x,
            height: exportHUD.specialData.inner.y,
        });

        wrappedExportHUD.setWrapper(exportHUD.specialData);

        wrappedExportHUD.itemRemove(item);

        dispatch(editBag(wrappedExportHUD.getSerializableObject()));

        return true;
    };
}

class Foundry {
    put = ({ importHUD, item, dispatch, target }) => {
        if (importHUD.specialData[target]) {
            return false;
        }

        const newExemplarImportHUD = cloneDeep(importHUD);

        newExemplarImportHUD.specialData[target] = item;
        dispatch(editBag(newExemplarImportHUD.specialData));

        return newExemplarImportHUD;
    };

    pullOut = ({ exportHUD, dispatch, target }) => {
        const newExemplarExportHUD = cloneDeep(exportHUD);
        newExemplarExportHUD.specialData[target] = null;

        dispatch(editBag(newExemplarExportHUD.specialData));

        return true;
    };
}

class Ammunition {}

class QuicklySlot {}

class CraftingSlot {}

class In {
    Bag: ({
        importHUD,
        item,
        position,
        dispatch,
    }: {
        importHUD: any;
        item: any;
        position: any;
        dispatch: any;
    }) => boolean;
    Foundry: ({
        importHUD,
        item,
        dispatch,
        target,
    }: {
        importHUD: any;
        item: any;
        dispatch: any;
        target: any;
    }) => undefined | boolean;

    constructor() {
        this.Bag = new Bag().put;
        this.Foundry = new Foundry().put;
    }
}

class From {
    Bag: ({
        exportHUD,
        item,
        dispatch,
    }: {
        exportHUD: any;
        item: any;
        dispatch: any;
    }) => boolean;
    Foundry: ({
        exportHUD,
        item,
        dispatch,
        target,
    }: {
        exportHUD: any;
        item: any;
        dispatch: any;
        target: any;
    }) => boolean;

    constructor() {
        this.Bag = new Bag().pullOut;
        this.Foundry = new Foundry().pullOut;
    }
}

class ItemizationWorker {
    In: In;
    From: From;

    constructor() {
        this.In = new In();
        this.From = new From();
    }
}

export const itemizationWorker = new ItemizationWorker();
