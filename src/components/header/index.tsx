import { NavLink, useLocation, useNavigate, useMatch } from 'react-router-dom';
import { Avatar } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCity } from '@/store/slice/filtersSlice';
import { setQuery } from '@/store/slice/searchSlice';
import { renameSkills } from '@/store/slice/skillsSlice';
import hh from '../image/hh.png';
import styles from './styles.module.css';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);
  const isVacanciesActive = useMatch('/vacancies/*');
  const isAboutActive = useMatch('/about');

  const handleVacanciesClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname !== '/vacancies') {
      navigate('/vacancies');
    }

    dispatch(setCity('all'));
    dispatch(setQuery(query));
    dispatch(renameSkills());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={hh} alt="logo" width={30} />
        <a className={styles.logo}>.FrontEnd</a>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/vacancies"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
          onClick={handleVacanciesClick}
        >
          Вакансии FE {isVacanciesActive && <span className={styles.dot}></span>}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <Avatar radius="xl" />
          Обо мне {isAboutActive && <span className={styles.dot}></span>}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
