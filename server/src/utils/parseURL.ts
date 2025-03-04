import path from 'path';
import cheerio from 'cheerio';
import { URL } from 'node:url';
import { mapFileType } from './mapFileType';
import { DocumentFile, DocumentLink, FileType } from '../models/parser.model';
import logger from './logger';

export default async function parseURL(url: string) {
  const links: DocumentLink[] = [];
  const files: DocumentFile[] = [];
  let pageURL = new URL(url);

  // fetch the document for url
  const response = await fetch(pageURL);
  // get document body from response
  const body = await response.text();

  // load document body to cheerio
  const $ = cheerio.load(body);
  // get page title of the document
  const title = $('title').text();
  // get all internal & external links in the document
  const linkItems = $('body a[href*="/"]');
  // prepare link url and link type
  linkItems.each((_, ele) => {
    // get href attribute's value of link element
    let link = '';
    let linkPath = $(ele).attr('href') ?? '';
    // convert relative path to absolute path
    if (linkPath.startsWith('/')) {
      link = new URL(linkPath, pageURL).toString();
    } else {
      link = linkPath;
    }
    // prepare link data for storing to database
    const linkData: DocumentLink = { path: '', external: false };
    if (!links.some((item) => item.path === link)) {
      const linkURL = new URL(link);
      linkData.path = link;
      linkData.external = linkURL.origin !== pageURL.origin;
      links.push(linkData);
    }
  });

  // get all images in the document
  const imageItems = $('body img');
  imageItems.each((_, ele) => {
    // get src attribute's value of image element
    let fileURL = $(ele).attr('src') ?? '';
    // prepare image data for storing to database
    const fileData: DocumentFile = { path: '', name: '' };
    // convert relative file path to absolute path
    if (fileURL.startsWith('/')) {
      fileURL = `${pageURL.origin}${fileURL}`;
    }

    const { name, ext } = path.parse(fileURL);
    const fileExt = mapFileType(ext);
    fileData.name = name;
    fileData.path = fileURL;

    if (fileExt !== '') {
      fileData.ext = fileExt as unknown as FileType;
    }

    files.push(fileData);
  });

  // get byte size of the files
  for (const file of files) {
    // fetch file to get blob, byte size and extension
    const imageUrlData = await fetch(file.path);
    const blob = await imageUrlData.blob();
    file.size = blob.size;
    const contentType = imageUrlData.headers.get('content-type')!;
    const fileExt = mapFileType(contentType);
    if (fileExt) {
      file.ext = fileExt as unknown as FileType;
    }
  }

  return {
    title,
    files,
    links
  };
};
