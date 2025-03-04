import {
  Link,
  Params,
  ParamParseKey,
  useLoaderData,
  LoaderFunction,
  ActionFunctionArgs,
} from 'react-router-dom';
import { Paths } from '../routes';

type FileInfo = {
  type: string
  count: number
  size: number
};

interface DocumentLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.document>>;
};

export const loader: LoaderFunction = async ({ params }: DocumentLoaderArgs) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/parser/${params.id}`);
  const data = await res.json();
  return data;
};


export default function Document(): JSX.Element {
  const document: IDocument = useLoaderData() as IDocument;

  const groupImagesInfo = () => {
    const imageTypes: FileInfo[] = [];
    if (document.files?.length > 0) {
      for (const file of document.files) {
        if (!imageTypes.some((img: FileInfo) => img.type === file.ext)) {
          const info = { type: '', count: 0, size: 0 };
          info.type = file.ext;
          info.count += 1;
          info.size += Number(file.size);
          imageTypes.push(info);
        } else {
          const itemIndex = imageTypes.findIndex((item: FileInfo) => item.type === file.ext);
          const newCount = imageTypes[itemIndex].count + 1;
          const newSize = imageTypes[itemIndex].size + Number(file.size);

          imageTypes[itemIndex] = { type: file.ext, count: newCount, size: newSize };
        }
      }
    }

    return imageTypes;
  }

  const imageTypeInfo = groupImagesInfo();

  return (
    <div className='details'>
      <div className='flex flex-wrap lg:flex-row lg:justify-between'>
        <h2 className='mb-2 mt-0 text-3xl font-medium leading-tight text-primary'>
          {document.title ? document.title : 'Document Info'}
        </h2>
        <Link
          to='/'
          className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
        >
          Close
        </Link>
      </div>

      {/* Images section */}
      <div className='mt-12'>
        <div className='mb-12'>
          <span className='font-medium'>Page URL: </span>
          <span>{document.url}</span>
        </div>
        <div>
          <h4 className='text-xl font-medium leading-tight mb-6'>Images Info:</h4>
          <div className='flex flex-wrap flex-col lg:flex-row'>
            {imageTypeInfo?.map((item: FileInfo) => (
              <div
                key={item.type}
                className='block rounded-lg bg-secondary-300 text-center mr-8 mb-8 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'
              >
                <h5
                  className='mb-4 font-medium leading-tight text-neutral-800 dark:text-neutral-50'
                >
                  <span className='uppercase'>{item.type}</span>(s)
                </h5>
                <p className='mb-2 text-base'>
                  <span className='text-neutral-800'>Count: </span>
                  <span className='text-neutral-600'>{item.count}</span>
                </p>
                <p className='mb-2 text-base'>
                  <span className='text-neutral-800'>Total bytes: </span>
                  <span className='text-neutral-600'>{item.size}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Links section */}
        <div className='mt-12'>
          <h4 className='text-xl font-medium leading-tight mb-6'>Links:</h4>
          <div className='flex flex-col lg:flex-row lg:justify-between'>
            <div className='w-1/2 mb-8 lg:mb-0 pr-0 lg:pr-8'>
              <h5 className='mb-4 font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                Internal
              </h5>
              <ul className='w-96'>
                {document.links?.filter((item) => !item.external).map((item) => (
                  <li
                    key={item.path}
                    className='w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50'
                  >
                    {item.path}
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-1/2 pl-0 lg:pl-8'>
              <h5 className='mb-4 font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                External
              </h5>
              <ul className='w-96'>
                {document.links?.filter((item) => item.external).map((item) => (
                  <li
                    key={item.path}
                    className='w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50'
                  >
                    {item.path}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
