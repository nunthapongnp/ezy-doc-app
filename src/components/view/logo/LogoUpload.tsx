'use client';

import { useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { compressLogoImage } from '@/lib/imageCompressor';
import { useVendorStore } from '@/stores/vendorStore';
import { Label } from '@/components/ui/label';

type UploadStatus = 'idle' | 'compressing' | 'done' | 'error';

export function LogoUpload() {
    const { t } = useTranslate();
    const { vendor, setLogo } = useVendorStore();
    const [status, setStatus] = useState<UploadStatus>('idle');

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setStatus('compressing');
        try {
            const dataUrl = await compressLogoImage(file);
            setLogo(dataUrl);
            setStatus('done');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('EDITOR.LOGO')}
            </Label>
            <div className="flex items-center gap-3">
                {vendor.logoDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={vendor.logoDataUrl}
                        alt=""
                        className="size-16 rounded border object-contain"
                    />
                ) : (
                    <div className="flex size-16 items-center justify-center rounded border border-dashed bg-muted/40">
                        <ImagePlus className="size-5 text-muted-foreground" />
                    </div>
                )}
                <label className="cursor-pointer text-sm text-primary underline">
                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) void handleFile(file);
                        }}
                    />
                    {status === 'compressing' ? (
                        <span className="inline-flex items-center gap-1">
                            <Loader2 className="size-3 animate-spin" /> Compressing…
                        </span>
                    ) : (
                        'Upload logo'
                    )}
                </label>
            </div>
            {status === 'done' && <p className="text-xs text-emerald-600">✓ Logo ready</p>}
            {status === 'error' && (
                <p className="text-xs text-destructive">Compression failed. Try a smaller image.</p>
            )}
        </div>
    );
}
