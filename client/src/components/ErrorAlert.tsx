type Props = {
  error: string
}

const ErrorAlert: React.FC<Props> = ({ error }): JSX.Element => {
  return (
    <div className='bg-red-100 border border-red-400 text-red-700 mb-12 px-4 py-3 rounded relative' role='alert'>
      <strong className='font-bold'>{`${error}!! `}</strong>
    </div>
  );
};

export default ErrorAlert;