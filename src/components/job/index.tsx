import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Tabs } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCity } from '@/store/slice/filtersSlice';
import { ListJob } from './listJob';
import Search from './Search';
import Skills from './skills';
import Title from './title';
import styles from './styles.module.css';
import { fetchJob } from '@/store/slice/JobSlice';


export default function JobPage() {
const dispatch = useAppDispatch();
const navigate = useNavigate();
const params = useParams<{ city?: string }>();

const city = useAppSelector((state) => state.filters.city);
const query = useAppSelector((state) => state.search.query);
const skills = useAppSelector((state) => state.skills.skills);

const [activeTab, setActiveTab] = useState<string>();

const cityMap: Record<string, string> = {
  '1': 'moscow',
  '2': 'petersburg',
};

const handleTabChange = (value: string | null) => {

  if (value === activeTab) {
    setActiveTab('all');
    dispatch(setCity(''));
    navigate(`/vacancies`);
    dispatch(fetchJob({ query, city: '', skills}));
    return;
  }


  if (value) {
    setActiveTab(value);
    const cityParam = cityMap[value] || '';
    dispatch(setCity(cityParam));
    navigate(`/vacancies/${cityParam}`);
console.log(cityParam)
    dispatch(fetchJob({ query, city: cityParam, skills }));
  }
};

useEffect(() => {
console.log(activeTab)
}, []);



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title />
        <Search />
      </div>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <Skills />
        </div>
        <div className={styles.rightColumn}>
          <Tabs value={activeTab === 'all' ? null : activeTab} onChange={handleTabChange}>
            <Tabs.List className={styles.tabsList}>
              <Tabs.Tab
                value="1"
                className={`${styles.tab} ${activeTab === '1' ? styles.tabActive : ''}`}
              >
                Москва
              </Tabs.Tab>
              <Tabs.Tab
                value="2"
                size={14}
                className={`${styles.tab} ${activeTab === '2' ? styles.tabActive : ''}`}
              >
                Санкт-Петербург
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <ListJob />
        </div>
      </div>
    </div>
  );
}
