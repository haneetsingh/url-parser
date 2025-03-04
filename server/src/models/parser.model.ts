import mongoose from 'mongoose';

export enum FileType {
  GIF = 'gif',
  SVG = 'svg',
  PNG = 'png',
  JPEG = 'jpeg',
  WEBP = 'webp',
  APNG = 'apng',
  AVIF = 'avif',
}

export type DocumentFile = {
  path: string
  ext?: FileType
  name?: string
  size?: number
}

export type DocumentLink = {
  path?: string
  external?: boolean
}

export interface DocumentType {
  url: string
  title: string
  files: DocumentFile[]
  links: DocumentLink[]
}

export interface ParserDocument extends DocumentType, mongoose.Document {}

const fileSchema = new mongoose.Schema({
  path: { type: String },
  size: { type: Number },
  name: { type: String },
  ext: {
    type: String,
    default: FileType.PNG,
    enum: FileType,
  },
}, { _id : false });

const linkSchema = new mongoose.Schema({
  path: { type: String },
  external: { type: Boolean },
}, { _id : false })

const documentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  files: {
    type: [fileSchema],
  },
  links: {
    type: [linkSchema],
  },
}, {
  timestamps: true
});

const DocumentModel = mongoose.model<ParserDocument>('Document', documentSchema);

export default DocumentModel;
