import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { Button, Loader, TextInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQuery } from '@/store/slice/searchSlice';
import classes from './styles.module.css';

export default function Search() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.job);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQueryInput] = useState(() => searchParams.get('query') ?? '');

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    dispatch(setQuery(trimmedQuery));

    const newSearchParams = new URLSearchParams(searchParams);

    if (trimmedQuery) {
      newSearchParams.set('query', trimmedQuery);
    } else {
      newSearchParams.delete('query');
    }

    setSearchParams(newSearchParams);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={classes.container}>
      <TextInput
        placeholder="Должность или название компании"
        leftSection={<IconSearch size={16} />}
        radius="md"
        size="md"
        className={classes.input}
        value={query}
        onChange={(e) => setQueryInput(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        rightSection={isLoading ? <Loader size="xs" /> : null}
      />
      <Button
        radius="md"
        size="md"
        className={classes.button}
        onClick={handleSearch}
        loading={isLoading}
      >
        Найти
      </Button>
    </div>
  );
}
