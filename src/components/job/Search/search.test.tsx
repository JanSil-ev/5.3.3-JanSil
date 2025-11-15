import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import Search from './index';

const mockDispatch = vi.fn();
const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn((selector) =>
    selector.name === 'job' ? { isLoading: false } : { query: '' }
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams, mockSetSearchParams],
  };
});

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>
  );
}

describe('Search component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен рендерить поле ввода и кнопку', () => {
    renderWithProviders(<Search />);
    expect(screen.getByPlaceholderText('Должность или название компании')).toBeInTheDocument();
    expect(screen.getByText('Найти')).toBeInTheDocument();
  });

  it('при клике на кнопку вызывает dispatch и обновляет параметры запроса', () => {
    renderWithProviders(<Search />);
    const input = screen.getByPlaceholderText('Должность или название компании');
    const button = screen.getByText('Найти');

    fireEvent.change(input, { target: { value: 'React Developer' } });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('при нажатии Enter вызывает handleSearch', () => {
    renderWithProviders(<Search />);
    const input = screen.getByPlaceholderText('Должность или название компании');

    fireEvent.change(input, { target: { value: 'Frontend' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
