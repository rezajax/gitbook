import { DocumentBlockFile } from '@gitbook/api';
import { BlockProps } from './Block';
import { tcls } from '@/lib/tailwind';
import IconDownload from '@geist-ui/icons/download';

export function File(props: BlockProps<DocumentBlockFile>) {
    const { block, context, style } = props;

    const file = context.revision.files.find((f) => f.id === block.data.ref.file);
    if (!file) {
        return null;
    }

    return (
        <a
            href={file.downloadURL}
            download={file.name}
            className={tcls(
                'flex',
                'flex-row',
                'items-center',
                'rounded',
                'border',
                'border-slate-200',
                'hover:border-slate-300',
                'px-5',
                'py-2',
                'text-slate-500',
                'hover:text-slate-700',
                style,
            )}
        >
            <div className={tcls('mr-5')}>
                <IconDownload className={tcls('w-6', 'h-6')} />
            </div>
            <div>
                <div className={tcls('text-base')}>{file.name}</div>
                <div className={tcls('text-xs')}>{getHumanFileSize(file.size ?? 0)}</div>
            </div>
        </a>
    );
}

const ONE_KB = 1024;
const ONE_MB = ONE_KB * 1024;

/**
 * Return a file size as human readable formatted string.
 */
function getHumanFileSize(size: number): string {
    if (size > ONE_MB) {
        const mbSize = size / ONE_MB;
        return `${mbSize.toFixed(0)}MB`;
    }
    if (size > ONE_KB) {
        const kbSize = size / ONE_KB;
        return `${kbSize.toFixed(0)}KB`;
    }

    return `${size}B`;
}