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

import { Inject, Injector, Plugin, UniverInstanceType } from '@univerjs/core';
import { IMenuManagerService, MenuItemType, RibbonStartGroup } from '@univerjs/ui';
import { SaveFileCommand, ShareCommand, DownloadFileCommand } from '../menus';

export const SHEETS_BUTTONS_PLUGIN = 'sheets-buttons-plugin';

export class SheetsButtonsPlugin extends Plugin {
    static override type = UniverInstanceType.UNIVER_SHEET;
    static override pluginName = SHEETS_BUTTONS_PLUGIN;

    constructor(
        @Inject(Injector) protected readonly _injector: Injector,
        @Inject(IMenuManagerService) private readonly _menuManagerService: IMenuManagerService
    ) {
        super();

        // Add the menu items
        this._menuManagerService.mergeMenu({
            [RibbonStartGroup.OTHERS]: {
                'save-file': {
                    order: 1,
                    menuItemFactory: () => ({
                        id: 'save-file',
                        type: MenuItemType.BUTTON,
                        title: 'Save',
                        tooltip: 'Save Spreadsheet',
                        commandId: 'save-file',
                    }),
                },
                'share': {
                    order: 2,
                    menuItemFactory: () => ({
                        id: 'share',
                        type: MenuItemType.BUTTON,
                        title: 'Share',
                        tooltip: 'Share Spreadsheet',
                        commandId: 'share',
                    }),
                },
                'download-file': {
                    order: 3,
                    menuItemFactory: () => ({
                        id: 'download-file',
                        type: MenuItemType.BUTTON,
                        title: 'Download',
                        tooltip: 'Download Spreadsheet',
                        commandId: 'download-file',
                    }),
                },
            },
        });
    }
}
