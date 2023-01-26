import { readFileSync } from 'fs';

export const convertImageToBase64 = (imagePath: string) => {
  const base64Image =
    'data:image/png;base64,' +
    Buffer.from(readFileSync(imagePath)).toString('base64');
  return base64Image;
};
