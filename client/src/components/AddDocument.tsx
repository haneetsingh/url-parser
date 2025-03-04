import React, { useState } from 'react';
import { TERipple, TEInput } from 'tw-elements-react';
import Spinner from './Spinner';
import ErrorAlert from './ErrorAlert';

type Props = {
  error: string
  loading: boolean;
  setError: (value: string | ((prevValue: string) => string)) => void;
  setLoading: (value: boolean | ((prevValue: boolean) => boolean)) => void;
  saveDocument: (url: string) => void
}

const AddDocument: React.FC<Props> = ({ error, setError, loading, setLoading, saveDocument }): JSX.Element => {
  const [url, setUrl] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    saveDocument(url);

    if (error !== '') {
      setUrl('');
      setError('');
    }
  };

  return(
    <div>
      <h2 className='mb-5 mt-0 text-xl font-medium leading-tight text-primary'>
        {'Submit a URL to extract information'}
      </h2>
      {error ? <ErrorAlert error={error} /> : null}
      <form onSubmit={handleSubmit}>
        <TEInput
          required
          type='text'
          label='Enter URL'
          size='lg'
          className='mb-6'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></TEInput>
        <TERipple rippleColor='light' className='w-full'>
          <button
            type='submit'
            className='inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
          >
            {loading ? <Spinner /> : 'Submit'}
          </button>
        </TERipple>
      </form>
    </div>
  );
};

export default AddDocument;
