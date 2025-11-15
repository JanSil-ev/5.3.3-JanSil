import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import Header from './index';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({ skills: [] }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/about' }),
  };
});

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>
  );
}

describe('Header component', () => {
  it('должен отображать логотип и название', () => {
    renderWithProviders(<Header />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('должен отображать навигационные элементы', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });

  it('клик по "Вакансии FE" вызывает dispatch и navigate', () => {
    renderWithProviders(<Header />);

    const link = screen.getByText('Вакансии FE');
    fireEvent.click(link);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/vacancies');
  });
});
