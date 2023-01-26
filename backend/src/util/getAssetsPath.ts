import { join } from 'path';

/**
 * @param { string } path - assets/*
 * @returns ~/assets/path
 */
export const getAssetsPath = (path: string) => {
  const assetsPath = join(__dirname, `/../../assets/${path}`);
  return assetsPath;
};
