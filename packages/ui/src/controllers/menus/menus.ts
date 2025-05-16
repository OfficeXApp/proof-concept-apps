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

import type { IAccessor } from '@univerjs/core';
import type { IMenuButtonItem } from '../../services/menu/menu';
import { CommandType, EDITOR_ACTIVATED, FOCUSING_FX_BAR_EDITOR, IContextService, IUndoRedoService, RedoCommand, UndoCommand } from '@univerjs/core';

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
    handler: () => {
        console.log('Save file clicked');
        // @ts-ignore
        window.penpalParent?.logMessage('Save file clicked, propagated in parent');
    },
};

export const ShareCommand = {
    id: 'share',
    type: CommandType.COMMAND,
    handler: () => {
        console.log('Share clicked');
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
