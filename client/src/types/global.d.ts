// types/global.d.ts

export {}

type File = {
  ext: string
  name: string
  size: string
  path: string
}

type Link = {
  path: string
  external: boolean
}

declare global {
  interface IDocument {
    _id: string
    url: string
    title: string
    files: File[]
    links: Link[]
  }

  type ErrorType = {
    message: string
    status?: number
  }
}