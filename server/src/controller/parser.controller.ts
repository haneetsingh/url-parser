// import mongoose from 'mongoose';
import { URL } from 'node:url';
import { NextFunction, Request, Response } from 'express';
import { findDocument, findAllDocuments, createDocument } from '../service/parser.service';
import { ReadDocumentInput, CreateDocumentInput } from '../schema/parser.schema';
import parseURL from '../utils/parseURL';
import logger from '../utils/logger';

export async function getAllDocumentsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const documents = await findAllDocuments({}, { sort: { createdAt: -1 }});

    return res.send(documents);
  } catch (error) {
    next(error);
  }
};

export async function getDocumentHandler(
  req: Request<ReadDocumentInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const id: string = req.params.id;
    const document = await findDocument({ _id: id });

    if (!document) {
      return res.status(404).send('Not found.');
    }

    return res.send(document);
  } catch (error) {
    next(error);
  }
};

export async function createDocumentHandler(
  req: Request<{}, {}, CreateDocumentInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const url: string = req.body.url;

    const { title, files, links } = await parseURL(url);
    const document = await createDocument({ url, title, files, links });

    return res.send(document);
  } catch (error) {
    next(error);
  }
};
