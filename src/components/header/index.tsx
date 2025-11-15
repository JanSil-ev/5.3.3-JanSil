import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const skills = useAppSelector((state) => state.skills.skills);

  const handleVacanciesClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname !== '/vacancies') {
      navigate('/vacancies');
    }

    dispatch(setCity('all'));
    dispatch(setQuery(''));
    dispatch(renameSkills());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={hh} alt="logo" width={30} />
        <a className={styles.logo}>.FrontEnd</a>
      </div>

      <nav className={styles.nav}>
        <Link
          to="/vacancies"
          className={`${styles.link} ${styles.active}`}
          onClick={handleVacanciesClick}
        >
          Вакансии FE <span className={styles.dot}></span>
        </Link>

        <Link to="/about" className={styles.link}>
          <Avatar radius="xl" />
          <p>Обо мне</p>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
