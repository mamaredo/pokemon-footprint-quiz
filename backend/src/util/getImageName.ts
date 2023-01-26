/**
 * @param { string } imagePath - hoge.png
 */
export const getImageName = (imagePath: string) => {
  const split = imagePath.split('.');
  return split[0];
};
