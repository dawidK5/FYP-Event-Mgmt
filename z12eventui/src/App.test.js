import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {CreateEventBasic} from './pages/Events';
import Home from './pages/Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home page renders correctly', () => {
  test('Renders heading in the home screen', () => {
    render(<MemoryRouter>
      <Home />
    </MemoryRouter>
    );
    const expected = screen.getAllByText('All Events');
    expect(expected[0]).toBeInTheDocument();
  });
});

describe('Event registration page renders correctly', () => {
  test('Renders heading in the event hosting screen', () => {
    render(<MemoryRouter>
      <CreateEventBasic />
    </MemoryRouter>
    );
    const expected = screen.getAllByText('Host a new event');
    expect(expected[0]).toBeInTheDocument();
  });
});

describe('Login page renders correctly', () => {
  test('Renders heading in the event hosting screen', () => {
    render(<MemoryRouter>
      <App />
    </MemoryRouter>
    );
    const expected = screen.getAllByText('All events');
    expect(expected[0]).toBeInTheDocument();
  });
});
