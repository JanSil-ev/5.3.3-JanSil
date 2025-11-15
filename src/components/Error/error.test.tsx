import { render, screen } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import Error from './index';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Error component', () => {
  it('должен отображать сообщение об ошибке', () => {
    renderWithRouter(<Error />);

    expect(screen.getByText(/Упс! Такой страницы/i)).toBeInTheDocument();

    expect(screen.getByText(/Давайте перейдём к началу/i)).toBeInTheDocument();
  });

  it('должна быть кнопка-ссылка "На главную"', () => {
    renderWithRouter(<Error />);

    const button = screen.getByRole('link', { name: /на главную/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/');
  });

  it('должно отображаться изображение кота', () => {
    renderWithRouter(<Error />);

    const image = screen.getByAltText(/funny cat/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('Cat.gif'));
  });
});
