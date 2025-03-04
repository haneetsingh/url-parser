import logger from "./logger";

/**
 * maps file extensions to standard names
 * @param ext @type {string} extension of the file
 * @returns @type {string} standard extension name
 */
export const mapFileType = (ext: string): string => {
  let type: string = '';

  if (ext.includes('png')) {
    type = 'png';
  } else if (ext.includes('svg')) {
    type = 'svg';
  } else if (ext.includes('gif')) {
    type = 'gif';
  } else if (ext.includes('jpg')) {
    type = 'jpeg';
  } else if (ext.includes('pjp')) {
    type = 'jpeg';
  } else if (ext.includes('jfif')) {
    type = 'jpeg';
  } else if (ext.includes('jpeg')) {
    type = 'jpeg';
  } else if (ext.includes('pjpeg')) {
    type = 'jpeg';
  } else if (ext.includes('webp')) {
    type = 'webp';
  } else if (ext.includes('avif')) {
    type = 'avif';
  } else if (ext.includes('apng')) {
    type = 'apng';
  }

  return type;
};
