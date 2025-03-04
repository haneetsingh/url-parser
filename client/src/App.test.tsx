import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLoaderData } from 'react-router-dom';
import App from './App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('App component', () => {
  it('renders AddDocument component', () => {
    (useLoaderData as jest.Mock).mockReturnValue([]);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Submit a URL to extract information/i)).toBeInTheDocument();
  });

  it('renders "Parsed URLs" heading when there are documents', () => {
    const documents = [
      { _id: '1', title: 'Test Document', url: 'https://www.test.com' },
    ];

    (useLoaderData as jest.Mock).mockReturnValue(documents);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Parsed URLs/i)).toBeInTheDocument();
  });

  it('renders list of documents', () => {
    const documents = [
      { _id: '1', title: 'Test Document', url: 'https://www.test.com' },
    ];

    (useLoaderData as jest.Mock).mockReturnValue(documents);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Test Document/i)).toBeInTheDocument();
  });

  it('renders the correct number of list items', () => {
    const documents = [
      { _id: '1', title: 'Test Document 1', url: 'https://www.test1.com' },
      { _id: '2', title: 'Test Document 2', url: 'https://www.test2.com' },
      { _id: '3', title: 'Test Document 3', url: 'https://www.test3.com' },
    ];

    (useLoaderData as jest.Mock).mockReturnValue(documents);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(documents.length);
  });

  it('renders "No URLs to show" message when there are no documents', () => {
    (useLoaderData as jest.Mock).mockReturnValue([]);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/No URLs to show/i)).toBeInTheDocument();
  });
});