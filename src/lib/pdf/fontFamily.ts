import { Font } from "@react-pdf/renderer";

let registered = false;

export function registerPdfFonts(): void {
  if (registered) return;
  registered = true;

  Font.register({
    family: "NotoSans",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts/hinted/ttf/NotoSans/NotoSans-Regular.ttf",
        fontWeight: "normal",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts/hinted/ttf/NotoSans/NotoSans-Bold.ttf",
        fontWeight: "bold",
      },
    ],
  });
}

export const PDF_FONT_FAMILY = "NotoSans";
