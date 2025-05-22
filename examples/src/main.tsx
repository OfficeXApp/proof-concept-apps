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

import { render } from '@univerjs/design';
import { defaultTheme } from '@univerjs/themes';
import { ThemeSwitcherService } from '@univerjs/ui';

import './global.css';

export const LOCAL_DEV_MODE = false;
export const IFRAME_PARENT_URL = LOCAL_DEV_MODE ? 'http://localhost:5173' : 'https://drive.officex.app';

// package info
// eslint-disable-next-line node/prefer-global/process
if (process.env.NODE_ENV === 'production') {
    console.table({
        // eslint-disable-next-line node/prefer-global/process
        NODE_ENV: process.env.NODE_ENV,
        // eslint-disable-next-line node/prefer-global/process
        GIT_COMMIT_HASH: process.env.GIT_COMMIT_HASH,
        // eslint-disable-next-line node/prefer-global/process
        GIT_REF_NAME: process.env.GIT_REF_NAME,
        // eslint-disable-next-line node/prefer-global/process
        BUILD_TIME: process.env.BUILD_TIME,
    });
}

function Examples() {
    new ThemeSwitcherService().injectThemeToHead(defaultTheme);

    const demos = [{
        title: '📊 Sheets',
        href: './sheets/',
    }, {
        title: '📝 Docs',
        href: './docs/',
    }];

    return (
        <section
            className="univer-flex univer-h-full univer-flex-col univer-items-center univer-justify-center univer-gap-6"
        >
            <p>Loading...</p>
            {/* <header className="univer-flex univer-items-center">
                <h1 style={{ fontFamily: 'sans-serif' }}>OfficeX</h1>

            </header>

            <section className="univer-flex univer-flex-wrap univer-justify-center univer-gap-6">
                {demos.map((demo) => (
                    <a
                        key={demo.title}
                        className={`
                          univer-rounded-lg univer-bg-primary-500 univer-px-6 univer-py-2.5 univer-font-medium
                          univer-text-white univer-no-underline univer-shadow-sm univer-transition-all
                          univer-duration-300 univer-ease-in-out
                          hover:univer-scale-105 hover:univer-bg-emerald-500
                        `}
                        href={demo.href}
                    >
                        <span>{demo.title}</span>
                    </a>
                ))}
            </section> */}
        </section>
    );
}

render(<Examples />, document.getElementById('app')!);

// , {
    //     title: '📽️ Slides',
    //     href: './slides/',
    // }, {
    //     title: '🗂️ Sheets Multi Instance',
    //     href: './sheets-multi/',
    // }, {
    //     title: '🏡 Sheets Multi Units',
    //     href: './sheets-multi-units/',
    // }, {
    //     title: '📄 Sheets Uniscript',
    //     href: './sheets-uniscript/',
    // }, {
    //     title: '📚 Docs Uniscript',
    //     href: './docs-uniscript/',
    // }, {
    //     title: '🌌 Uni Mode',
    //     href: './uni/',
    // }, {
    //     title: '📱 Mobile',
    //     href: './mobile-s/',
    // }
