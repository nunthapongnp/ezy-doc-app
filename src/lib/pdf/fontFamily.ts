import { Font } from '@react-pdf/renderer';

let registered = false;

export function registerPdfFonts(): void {
    if (registered) return;
    registered = true;

    Font.register({
        family: 'NotoSans',
        fonts: [
            {
                src: '/fonts/Noto_Sans/static/NotoSans-Regular.ttf',
                fontWeight: 'normal',
                fontStyle: 'normal',
            },
            {
                src: 'fonts/Noto_Sans/static/NotoSans-Bold.ttf',
                fontWeight: 'bold',
                fontStyle: 'normal',
            },
        ],
    });

    Font.register({
        family: 'NotoSansThai',
        fonts: [
            {
                src: '/fonts/Noto_Sans_Thai/static/NotoSansThai-Regular.ttf',
                fontWeight: 'normal',
                fontStyle: 'normal',
            },
            {
                src: '/fonts/Noto_Sans_Thai/static/NotoSansThai-Bold.ttf',
                fontWeight: 'bold',
                fontStyle: 'normal',
            },
        ],
    });
}

export const PDF_FONT_FAMILY = 'NotoSansThai';
