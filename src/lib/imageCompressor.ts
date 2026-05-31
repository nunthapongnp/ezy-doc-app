import imageCompression from 'browser-image-compression';

export interface CompressOptions {
    maxSizeKB: number;
    maxWidthOrHeight: number;
}

const DEFAULT_OPTIONS: CompressOptions = {
    maxSizeKB: 100,
    maxWidthOrHeight: 400,
};

export async function compressLogoImage(
    file: File,
    options: CompressOptions = DEFAULT_OPTIONS,
): Promise<string> {
    const compressed = await imageCompression(file, {
        maxSizeMB: options.maxSizeKB / 1024,
        maxWidthOrHeight: options.maxWidthOrHeight,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.85,
    });

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read compressed image'));
        reader.readAsDataURL(compressed);
    });
}
