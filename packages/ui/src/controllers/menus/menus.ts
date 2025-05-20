/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { IAccessor, Workbook } from '@univerjs/core';
import type { IMenuButtonItem } from '../../services/menu/menu';
import { CommandType, EDITOR_ACTIVATED, FOCUSING_FX_BAR_EDITOR, IContextService, IResourceLoaderService, IUndoRedoService, IUniverInstanceService, RedoCommand, UndoCommand, UniverInstanceType } from '@univerjs/core';

import { combineLatest, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItemType } from '../../services/menu/menu';

const undoRedoDisableFactory$ = (accessor: IAccessor, isUndo: boolean) => {
    const undoRedoService = accessor.get(IUndoRedoService);
    const contextService = accessor.get(IContextService);

    return combineLatest([
        undoRedoService.undoRedoStatus$.pipe(map((v) => isUndo ? v.undos <= 0 : v.redos <= 0)),
        merge([of({}), contextService.contextChanged$]),
    ]).pipe(map(([undoDisable]) => {
        return undoDisable || contextService.getContextValue(EDITOR_ACTIVATED) || contextService.getContextValue(FOCUSING_FX_BAR_EDITOR);
    }));
};

export function UndoMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    return {
        id: UndoCommand.id,
        type: MenuItemType.BUTTON,
        icon: 'UndoSingle',
        title: 'Undo',
        tooltip: 'toolbar.undo',
        disabled$: undoRedoDisableFactory$(accessor, true),
    };
}

export function RedoMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    return {
        id: RedoCommand.id,
        type: MenuItemType.BUTTON,
        icon: 'RedoSingle',
        title: 'Redo',
        tooltip: 'toolbar.redo',
        disabled$: undoRedoDisableFactory$(accessor, false),
    };
}

export const SaveFileCommand = {
    id: 'save-file',
    type: CommandType.COMMAND,
    handler: async (accessor: IAccessor) => {
        console.log('Save file clicked');
        const univerInstanceService = accessor.get(IUniverInstanceService);
        const resourceLoaderService = accessor.get(IResourceLoaderService);
        // const localFileService = accessor.get(ILocalFileService);

        // Get current workbook/sheet
        const workbook = univerInstanceService.getCurrentUnitForType<Workbook>(UniverInstanceType.UNIVER_SHEET);

        console.log('workbook', workbook);

        if (!workbook) {
            return false;
        }

        // Save snapshot
        const snapshot = resourceLoaderService.saveUnit(workbook.getUnitId());

        console.log('snapshot', snapshot);

        if (!snapshot) {
            return false;
        }

        // Download the file
        const content = JSON.stringify(snapshot, null, 2);

        console.log('content', content);
        // @ts-ignore
        window.penpalParent?.saveFile(content);
    },
};

export const ShareCommand = {
    id: 'share',
    type: CommandType.COMMAND,
    handler: () => {
        console.log('Share clicked');
        // @ts-ignore
        window.penpalParent?.shareFile();
    },
};

export const DownloadFileCommand = {
    id: 'download-file',
    type: CommandType.COMMAND,
    handler: async (accessor: IAccessor) => {
        console.log('Download file clicked');
        const univerInstanceService = accessor.get(IUniverInstanceService);
        const resourceLoaderService = accessor.get(IResourceLoaderService);
        // const localFileService = accessor.get(ILocalFileService);

        // Get current workbook/sheet
        const workbook = univerInstanceService.getCurrentUnitForType<Workbook>(UniverInstanceType.UNIVER_SHEET);

        console.log('workbook', workbook);

        if (!workbook) {
            return false;
        }

        // Save snapshot
        const snapshot = resourceLoaderService.saveUnit(workbook.getUnitId());

        console.log('snapshot', snapshot);

        if (!snapshot) {
            return false;
        }

        // Download the file
        const content = JSON.stringify(snapshot, null, 2);

        console.log('content', content);

        // localFileService.downloadFile(new Blob([content]), fileName);

        // @ts-ignore
        window.penpalParent?.downloadFile(content);

        return true;
    },
};

export const SaveFileMenuItemFactory = (accessor: IAccessor): IMenuButtonItem => ({
    id: 'save-file',
    type: MenuItemType.BUTTON,
    title: 'Save',
    tooltip: 'Save File',
    commandId: SaveFileCommand.id,
});

export const ShareMenuItemFactory = (accessor: IAccessor): IMenuButtonItem => ({
    id: 'share',
    type: MenuItemType.BUTTON,
    title: 'Share',
    tooltip: 'Share',
    commandId: ShareCommand.id,
});

export const DownloadFileMenuItemFactory = (accessor: IAccessor): IMenuButtonItem => ({
    id: 'download-file',
    type: MenuItemType.BUTTON,
    title: 'Download',
    tooltip: 'Download File',
    commandId: DownloadFileCommand.id,
});
