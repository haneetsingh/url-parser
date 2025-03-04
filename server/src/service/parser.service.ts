import {
  FilterQuery,
  QueryOptions,
} from 'mongoose';
import DocumentModel, { ParserDocument, DocumentType } from '../models/parser.model';

export async function findDocument(
  query: FilterQuery<ParserDocument>,
  options: QueryOptions = { lean: true }
) {
  return DocumentModel.findOne(query, {}, options);
};

export async function findAllDocuments(
  query: FilterQuery<ParserDocument>,
  options: QueryOptions = { lean: true }
) {
  return DocumentModel.find(query, {}, options);
};

export async function createDocument(
  input: DocumentType
) {
  return DocumentModel.create(input);
};

