'use client';

import { useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { compressLogoImage } from '@/lib/imageCompressor';
import { useVendorStore } from '@/stores/vendorStore';
import { Label } from '@/components/ui/label';
import { useDropzone } from 'react-dropzone';

type UploadStatus = 'idle' | 'compressing' | 'done' | 'error';

export function LogoUpload() {
    const { t } = useTranslate();
    const { vendor, setLogo } = useVendorStore();
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [file, setFile] = useState<File>();

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setStatus('compressing');
        try {
            setFile(file);
            const dataUrl = await compressLogoImage(file);
            setLogo(dataUrl);
            setStatus('done');
        } catch {
            setFile(undefined);
            setStatus('error');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/webp': [],
        },
        multiple: false,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) void handleFile(file);
        },
    });

    const removeLogo = () => {
        setFile(undefined);
        setLogo(undefined);
        setStatus('idle');
    };

    return (
        <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('EDITOR.TAB.DATA.LOGO')}
            </Label>
            {vendor.logoDataUrl ? (
                <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={vendor.logoDataUrl}
                            alt="Logo"
                            className="size-16 rounded border object-contain"
                        />
                        <div>
                            <p className="text-sm font-medium">{t('ALL.LOGO.UPLOADED')}</p>
                            <p className="text-xs text-muted-foreground">{file?.name}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={removeLogo}
                        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'bg-muted/20 hover:bg-muted/40'}`}
                >
                    <div className="flex size-16 items-center justify-center rounded border border-dashed bg-muted/40">
                        <ImagePlus className="size-5 text-muted-foreground" />
                    </div>

                    <input {...getInputProps()} />

                    <p className="text-center text-sm text-muted-foreground">
                        {isDragActive ? t('ALL.FILE.DROP_HERE') : t('ALL.FILE.DRAG_AND_DROP')}
                    </p>

                    {status === 'compressing' && (
                        <span className="inline-flex items-center gap-1">
                            <Loader2 className="size-3 animate-spin" /> {t('ALL.FILE.COMPRESSING')}
                        </span>
                    )}
                </div>
            )}
            {status === 'error' && (
                <p className="text-xs text-destructive">
                    {}
                    {t('ALL.LOGO.ERROR')}
                </p>
            )}
        </div>
    );
}
