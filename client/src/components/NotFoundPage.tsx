import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom'

const ErrorPage: React.FC = () => {
	const error = useRouteError()

	return (
		<div
			id='error-page'
			className='flex flex-col gap-8 justify-center items-center h-screen'
		>
			<h1 className='text-4xl font-bold'>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p className='text-slate-400'>
				<i>
					{isRouteErrorResponse(error)
						? error.error?.message || error.statusText
						: 'Unknown error message'
					}
				</i>
			</p>
			<p>
				<Link
					to='/'
					className='text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600'
				>
					{'Go back'}
				</Link>
			</p>
		</div>
  );
}

export default ErrorPage;
