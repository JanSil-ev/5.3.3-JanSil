import { useEffect, useState } from 'react';
import { IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { Center, Loader, Pagination, Stack, Tabs, Text } from '@mantine/core';
import JobCard from '@/components/JobCart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJob } from '@/store/slice/JobSlice';




export function ListJob() {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useAppSelector((state) => state.job);
  const { city } = useAppSelector((state) => state.filters);
  const { query } = useAppSelector((state) => state.search);
  const { skills } = useAppSelector((state) => state.skills);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

useEffect(() => {
  const queryParam = searchParams.get('query') ?? query;
  const cityParam = searchParams.get('city') ?? city;
  const skillsParam = searchParams.get('skills')?.split(',') ?? skills;



  dispatch(
    fetchJob({
      query: queryParam,
      city: cityParam,
      page,
      skills: skillsParam,
    })
  );
}, [city, query, skills, page, searchParams, dispatch]);


  if (isLoading)
    return (
      <Center py="xl">
        <Loader data-testid="loader" size="md" />
      </Center>
    );

  if (error)
    return (
      <Center py="xl">
        <Text c="red">{error}</Text>
      </Center>
    );

  if (!data?.items?.length)
    return (
      <Center py="xl">
        <Text>Вакансии не найдены</Text>
      </Center>
    );

  const totalPages = data?.pages ?? Math.ceil((data.found || 0) / 10);

  return (
    <Stack gap="md">
      {data?.items?.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}

      {totalPages > 1 && (
        <Center mt="md">
          <Pagination
            value={page}
            onChange={setPage}
            total={totalPages}
            color="brand"
            size="md"
            radius="md"
          />
        </Center>
      )}
    </Stack>
  );
}


const listloader = async ({}) => {}

export {listloader}