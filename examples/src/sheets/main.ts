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

import type { Methods, RemoteProxy } from 'penpal';
import { LocaleType, LogLevel, Univer, UniverInstanceType, UserManagerService } from '@univerjs/core';
import { FUniver } from '@univerjs/core/facade';
import { UniverDebuggerPlugin } from '@univerjs/debugger';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { BLANK_WORKBOOK_DATA_DEMO } from '@univerjs/mockdata';
import { UniverNetworkPlugin } from '@univerjs/network';
import { UniverRPCMainThreadPlugin } from '@univerjs/rpc';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsConditionalFormattingPlugin } from '@univerjs/sheets-conditional-formatting';
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation';
import { UniverSheetsFilterPlugin } from '@univerjs/sheets-filter';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsHyperLinkPlugin } from '@univerjs/sheets-hyper-link';
import { UniverSheetsNotePlugin } from '@univerjs/sheets-note';
import { UniverSheetsNoteUIPlugin } from '@univerjs/sheets-note-ui';
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt';
import { UniverSheetsSortPlugin } from '@univerjs/sheets-sort';
import { UniverSheetsTablePlugin } from '@univerjs/sheets-table';
import { UniverSheetsThreadCommentPlugin } from '@univerjs/sheets-thread-comment';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor';
import { UniverUIPlugin } from '@univerjs/ui';
import { connect, WindowMessenger } from 'penpal';
import { enUS, faIR, frFR, ruRU, viVN, zhCN, zhTW } from '../locales';
import { ALLOWED_ORIGINS } from '../main';
import { UniverSheetsCustomMenuPlugin } from './custom-menu';
import ImportCSVButtonPlugin from './custom-plugin/import-csv-button';
import '@univerjs/sheets/facade';
import '@univerjs/ui/facade';
import '@univerjs/docs-ui/facade';
import '@univerjs/sheets-ui/facade';
import '@univerjs/sheets-data-validation/facade';
import '@univerjs/engine-formula/facade';
import '@univerjs/sheets-filter/facade';
import '@univerjs/sheets-formula/facade';
import '@univerjs/sheets-numfmt/facade';
import '@univerjs/sheets-hyper-link-ui/facade';
import '@univerjs/sheets-thread-comment/facade';
import '@univerjs/sheets-conditional-formatting/facade';
import '@univerjs/sheets-find-replace/facade';
import '@univerjs/sheets-drawing-ui/facade';
import '@univerjs/sheets-zen-editor/facade';
import '@univerjs/sheets-crosshair-highlight/facade';
import '@univerjs/sheets-formula-ui/facade';
import '@univerjs/sheets-table/facade';
import '@univerjs/sheets-sort/facade';
import '@univerjs/network/facade';
import '../global.css';
import './styles';

/* eslint-disable-next-line node/prefer-global/process */
const IS_E2E: boolean = !!process.env.IS_E2E;

const LOAD_LAZY_PLUGINS_TIMEOUT = 100;
const LOAD_VERY_LAZY_PLUGINS_TIMEOUT = 1_000;

export const mockUser = {
    userID: 'Owner_qxVnhPbQ',
    name: 'Owner',
    avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAInSURBVHgBtZU9TxtBEIbfWRzFSIdkikhBSqRQkJqkCKTCFkqVInSUSaT0wC8w/gXxD4gU2nRJkXQWhAZowDUUWKIwEgWWbEEB3mVmx3dn4DA2nB/ppNuPeWd29mMIPXDr+RxwtgRHeW6+guNPRxogqnL7Dwz9psJ27S4NShaeZTH3kwXy6I81dlRKcmRui88swdq9AcSFL7Buz1Vmlns64MiLsCjzwnIYHLH57tbfFbs7KRaXyEU8FVZofqccOfA5l7Q8LPIkGrwnb2RPNEXWFVMUF3L+kDCk0btDDAMzOm5YfAHDwp4tG74wnzAsiOYMnJ3GoDybA7IT98/jm5+JNnfiIzAS6LlqHQBN/i6b2t/cV1Hh6BfwYlHnHP4AXi5q/8kmMMpOs8+BixZw/Fd6xUEHEbnkgclvQP2fGp7uShRKnQ3G32rkjV1th8JhIGG7tR/JyjGteSOZELwGMmNqIIigRCLRh2OZIE6BjItdd7pCW6Uhm1zzkUtungSxwEUzNpQ+GQumtH1ej1MqgmNT6vwmhCq5yuwq56EYTbgeQUz3yvrpV1b4ok3nYJ+eYhgYmjRUqErx2EDq0Fr8FhG++iqVGqxlUJI/70Ar0UgJaWHj6hYVHJrfKssAHot1JfqwE9WVWzXZVd5z2Ws/4PnmtEjkXeKJDvxUecLbWOXH/DP6QQ4J72NS0adedp1aseBfXP8odlZFfPvBF7SN/8hky1TYuPOAXAEipMx15u5ToAAAAABJRU5ErkJggg==',
    anonymous: false,
    canBindAnonymous: false,
};

interface IFileData {
    file?: any;
    contents?: {
        content: any;
    };
}

// eslint-disable-next-line max-lines-per-function
function createNewInstance(fileData?: IFileData, editable = false) {
    // univer
    const univer = new Univer({
        // theme: greenTheme,
        darkMode: localStorage.getItem('local.darkMode') === 'dark',
        locale: LocaleType.EN_US,
        locales: {
            [LocaleType.EN_US]: enUS,
            [LocaleType.ZH_CN]: zhCN,
            [LocaleType.FR_FR]: frFR,
            [LocaleType.RU_RU]: ruRU,
            [LocaleType.ZH_TW]: zhTW,
            [LocaleType.VI_VN]: viVN,
            [LocaleType.FA_IR]: faIR,
        },
        logLevel: LogLevel.VERBOSE,
    });

    const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
    univer.registerPlugin(UniverRPCMainThreadPlugin, { workerURL: worker });

    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
        container: 'app',
    });
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverSheetsPlugin, { notExecuteFormula: true });
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsNumfmtPlugin, {
        disableTextFormatAlert: true,
        disableTextFormatMark: true,
    });
    univer.registerPlugin(UniverSheetsZenEditorPlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin, { notExecuteFormula: true });
    univer.registerPlugin(UniverSheetsFormulaPlugin, { notExecuteFormula: true });
    univer.registerPlugin(UniverSheetsDataValidationPlugin);
    univer.registerPlugin(UniverSheetsConditionalFormattingPlugin);
    univer.registerPlugin(UniverSheetsFilterPlugin);
    univer.registerPlugin(UniverSheetsSortPlugin);
    univer.registerPlugin(UniverSheetsHyperLinkPlugin);
    univer.registerPlugin(UniverSheetsThreadCommentPlugin);
    univer.registerPlugin(UniverSheetsCustomMenuPlugin);

    univer.registerPlugin(UniverSheetsTablePlugin);
    univer.registerPlugin(UniverNetworkPlugin);
    univer.registerPlugin(UniverSheetsNotePlugin);
    univer.registerPlugin(UniverSheetsNoteUIPlugin);
    univer.registerPlugin(ImportCSVButtonPlugin);

    // If we are running in e2e platform, we should immediately register the debugger plugin.
    // if (IS_E2E) {
    //     univer.registerPlugin(UniverDebuggerPlugin, {
    //         performanceMonitor: {
    //             enabled: false,
    //         },
    //     });
    // }
    univer.registerPlugin(UniverDebuggerPlugin, {
        performanceMonitor: {
            enabled: false,
        },
    });

    const injector = univer.__getInjector();
    const userManagerService = injector.get(UserManagerService);
    userManagerService.setCurrentUser(mockUser);

    const _workbookData = fileData?.contents?.content ? fileData.contents.content : { ...BLANK_WORKBOOK_DATA_DEMO, id: fileData?.file.id, name: fileData?.file?.name?.replace('.officex-spreadsheet', '') };

    // create univer sheet instance
    let workbook;
    if (!IS_E2E) {
        workbook = univer.createUnit(UniverInstanceType.UNIVER_SHEET, _workbookData);
    }
    if (!editable && workbook) {
        const univerAPI = FUniver.newAPI(univer);
        const permission = univerAPI.getPermission();
        const workbookEditablePermission = permission.permissionPointsDefinition.WorkbookEditablePermission;
        const unitId = workbook.getUnitId();
        if (unitId) {
            permission.setWorkbookPermissionPoint(unitId, workbookEditablePermission, false);
            console.log(`Workbook ${unitId} set to readonly status.`);
        }
    }

    setTimeout(() => {
        import('./lazy').then((lazy) => {
            const plugins = lazy.default();
            plugins.forEach((p) => univer.registerPlugin(p[0], p[1]));
        });
    }, LOAD_LAZY_PLUGINS_TIMEOUT);

    setTimeout(() => {
        import('./very-lazy').then((lazy) => {
            const plugins = lazy.default();
            plugins.forEach((p) => univer.registerPlugin(p[0], p[1]));
        });
    }, LOAD_VERY_LAZY_PLUGINS_TIMEOUT);

    univer.onDispose(() => {
        worker.terminate();
        window.univer = undefined;
        window.univerAPI = undefined;
    });

    window.univer = univer;
    window.univerAPI = FUniver.newAPI(univer);
    window.appTypeFlag = 'spreadsheet';
}

const connectPenpal = async () => {
    const messenger = new WindowMessenger({
        remoteWindow: window.parent,
        // Defaults to the current origin.
        allowedOrigins: ALLOWED_ORIGINS,
    });

    const connection = connect({
        messenger,
        // Methods the iframe window is exposing to the parent window.
        methods: {
            checkstatus(logSanityCheck: string) {
                console.log(`logSanityCheck: ${logSanityCheck}`);
                return Date.now();
            },
        },
    });

    const remote = await connection.promise;
    window.penpalParent = remote;

    // @ts-ignore
    const fileData = await remote.getFileData();
    console.log('FILE_DATA  = ', fileData);

    createNewInstance(fileData, fileData.contents.editable);
    window.createNewInstance = createNewInstance;
};

connectPenpal();

declare global {
    // eslint-disable-next-line ts/naming-convention
    interface Window {
        univer?: Univer;
        univerAPI?: ReturnType<typeof FUniver.newAPI>;
        createNewInstance?: typeof createNewInstance;
        penpalParent?: RemoteProxy<Methods>;
        appTypeFlag?: 'spreadsheet' | 'document';
    }
}
