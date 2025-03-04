import { object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    url: string({
      required_error: 'URL is required'
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: 'id is required'
    }),
  }),
};

export const getDocumentSchema = object({
  ...params,
});

export const createDocumentSchema = object({
  ...payload,
});

export type ReadDocumentInput = TypeOf<typeof getDocumentSchema>;
export type CreateDocumentInput = TypeOf<typeof createDocumentSchema>;
