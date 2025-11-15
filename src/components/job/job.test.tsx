import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import JobPage from './index';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn((selector) =>
    selector.name === 'filters' ? { city: 'all' } : { city: 'all' }
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  };
});

vi.mock('./title', () => ({ default: () => <div data-testid="title" /> }));
vi.mock('./Search', () => ({ default: () => <div data-testid="search" /> }));
vi.mock('./skills', () => ({ default: () => <div data-testid="skills" /> }));
vi.mock('./listJob', () => ({ ListJob: () => <div data-testid="listJob" /> }));

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>
  );
}

describe('JobPage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({});
  });

  it('должен отображать базовую структуру (Title, Search, Skills, ListJob)', () => {
    renderWithProviders(<JobPage />);
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('skills')).toBeInTheDocument();
    expect(screen.getByTestId('listJob')).toBeInTheDocument();
  });

  it('при клике по табу "Москва" должен вызывать dispatch и navigate', () => {
    renderWithProviders(<JobPage />);
    const tab = screen.getByText('Москва');
    fireEvent.click(tab);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/vacancies/moscow');
  });

  it('при повторном клике по активному табу должен сбрасывать на "all"', () => {
    renderWithProviders(<JobPage />);
    const tab = screen.getByText('Москва');

    fireEvent.click(tab);
    fireEvent.click(tab);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'filters/setCity', payload: 'all' });
    expect(mockNavigate).toHaveBeenCalledWith('/vacancies');
  });
});
