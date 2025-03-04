import { useState } from 'react';
import {
  Link,
  Outlet,
  useNavigate,
  useLoaderData,
  LoaderFunction,
} from 'react-router-dom';
import './App.css';
import AddDocument from './components/AddDocument';

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/parser`);
  const data = await res.json();
  return data;
};

const App = () => {
  const navigate = useNavigate();
  let documents: IDocument[] = useLoaderData() as IDocument[];
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const addDocument = async (url: string) => {
    const reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'application/json');

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/parser`, {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify({
        url
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    } else {
      // push response to the start of the documents array
      documents.unshift(json);
      navigate(`document/${json._id}`);
    }

    setLoading(false);
  };

  return (
    <main className='min-h-screen bg-secondary-100'>
      <div className='flex h-full flex-col flex-wrap lg:flex-row'>
        {/* <!-- Left column container --> */}
        <div className='g-6 flex flex-col p-12 lg:w-4/12'>
          <AddDocument
            error={error}
            loading={loading}
            setError={setError}
            setLoading={setLoading}
            saveDocument={addDocument}
          />
          <hr className='my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50' />
          { documents.length > 0
            ? <>
              <h2 className='mb-2 mt-0 text-2xl font-medium leading-tight text-primary'>Parsed URLs</h2>
              <ul className='w-96 lg:w-full'>
                {documents.map((document: IDocument) => (
                  <li
                    key={document._id}
                    className='w-full border-b-2 border-neutral-300 border-opacity-100 py-4 dark:border-opacity-50'
                  >
                    <Link to={`/document/${document._id}`}>
                      {document.title ? document.title : document.url}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
            : <p>
              <i>{'No URLs to show'}</i>
            </p>
          }
        </div>

        {/* <!-- Right column container --> */}
        <div className='min-h-screen mb-12 md:mb-0 p-12 bg-white lg:w-8/12'>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default App;
