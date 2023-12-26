import {
    CustomizationSettings,
    Revision,
    RevisionPageDocument,
    RevisionPageGroup,
    Space,
} from '@gitbook/api';
import React from 'react';

import { ContentPointer } from '@/lib/api';
import { ContentRefContext } from '@/lib/references';
import { tcls } from '@/lib/tailwind';

import { PagesList } from './PagesList';
import { Trademark } from './Trademark';

export function TableOfContents(props: {
    space: Space;
    customization: CustomizationSettings;
    content: ContentPointer;
    context: ContentRefContext;
    pages: Revision['pages'];
    activePage: RevisionPageDocument;
    ancestors: Array<RevisionPageDocument | RevisionPageGroup>;
    header?: React.ReactNode;
    withHeaderOffset: boolean;
    visibleOnDesktop: boolean;
}) {
    const {
        space,
        customization,
        pages,
        activePage,
        ancestors,
        header,
        context,
        withHeaderOffset,
        visibleOnDesktop,
    } = props;

    return (
        <aside
            className={tcls(
                'relative',
                'group',
                'flex',
                'flex-col',
                'basis-full',
                'bg-light',
                'grow-0',
                'shrink-0',
                'shadow-transparent',
                'shadow-thinbottom',
                'navigation-open:shadow-dark/2',
                'z-[1]',
                'top-0',
                `h-[100vh]`,
                'lg:basis-72',
                'lg:navigation-open:border-b-0',
                'lg:sticky',
                'dark:bg-dark',
                'dark:navigation-open:shadow-light/2',
                withHeaderOffset ? 'lg:h-[calc(100vh_-_4rem)]' : 'lg:h-[100vh]',
                withHeaderOffset ? 'lg:top-16' : 'lg:top-0',
                visibleOnDesktop ? null : 'lg:hidden',

                /*                 withHeaderOffset ? SIDE_COLUMN_WITH_HEADER : SIDE_COLUMN_WITHOUT_HEADER, */
            )}
        >
            {header ? header : null}
            <div
                className={tcls(
                    withHeaderOffset ? 'pt-4' : null,
                    'hidden',
                    'lg:flex',
                    'flex-grow',
                    'flex-col',
                    'overflow-y-auto',
                    'lg:gutter-stable',
                    'lg:pr-2',
                    'group-hover:[&::-webkit-scrollbar]:bg-dark/1',
                    'group-hover:[&::-webkit-scrollbar-thumb]:bg-dark/3',
                    '[&::-webkit-scrollbar]:bg-transparent',
                    '[&::-webkit-scrollbar-thumb]:bg-transparent',
                    'dark:[&::-webkit-scrollbar]:bg-transparent',
                    'dark:[&::-webkit-scrollbar-thumb]:bg-transparent',
                    'dark:group-hover:[&::-webkit-scrollbar]:bg-light/1',
                    'dark:group-hover:[&::-webkit-scrollbar-thumb]:bg-light/3',
                    'navigation-open:flex', // can be auto height animated as such https://stackoverflow.com/a/76944290
                    /*                     header ? 'pt-3' : 'pt-6', */
                    'lg:-ml-5',
                    'lg:pb-16',
                )}
            >
                <PagesList
                    rootPages={pages}
                    pages={pages}
                    activePage={activePage}
                    ancestors={ancestors}
                    context={context}
                />
                <Trademark space={space} customization={customization} />
            </div>
        </aside>
    );
}
