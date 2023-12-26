import IconExternal from '@geist-ui/icons/externalLink';
import { RevisionPageLink } from '@gitbook/api';
import Link from 'next/link';

import { ContentRefContext, resolveContentRef } from '@/lib/references';
import { tcls } from '@/lib/tailwind';

export async function PageLinkItem(props: { page: RevisionPageLink; context: ContentRefContext }) {
    const { page, context } = props;

    const resolved = await resolveContentRef(page.target, context);

    return (
        <li className={tcls('flex', 'flex-col')}>
            <Link
                href={resolved?.href ?? '#'}
                className={tcls(
                    'flex',
                    'flex-row',
                    'justify-start',
                    'items-center',
                    'gap-3',
                    'pl-5',
                    'pr-1.5',
                    'py-1.5',
                    'text-sm',
                    'transition-colors',
                    'duration-100',
                    'text-dark/8',
                    'dark:text-light/7',
                    'font-normal',
                    'hover:bg-dark/1',
                    'dark:hover:bg-light/2',
                )}
            >
                {page.title}
                <IconExternal
                    className={tcls(
                        'w-3',
                        'h-3',
                        'stroke-current',
                        'transition-colors',
                        '[&>path]:transition-[stroke-opacity]',
                        '[&>path]:[stroke-opacity:0.40]',
                        'group-hover:[&>path]:[stroke-opacity:1]',
                    )}
                />
            </Link>
        </li>
    );
}
