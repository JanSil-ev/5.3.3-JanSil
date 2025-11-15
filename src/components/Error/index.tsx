import { Link, useRouteError } from 'react-router-dom';
import { Button, Card, Center, Group, Image, Stack, Text, Title } from '@mantine/core';
import classes from './styles.module.css';
import catGif from '../image/Cat.gif';

export default function Error() {
const error = useRouteError()


  return (
    <Center className={classes.wrapper}>
      <Card shadow="sm" className={classes.card}>
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start">
            <div>
              <Title order={3} mb={4} className={classes.title}>
                Упс! Такой страницы
                <br />
                не существует
              </Title>
              <Text size="sm" className={classes.text}>
                Давайте перейдём к началу.
              </Text>
            </div>

            <Button component={Link} to="/" color="blue" size="xs" className={classes.button}>
              На главную
            </Button>
          </Group>

          <Image src={catGif} alt="Funny cat" radius="md" fit="cover" className={classes.image} />
        </Stack>
      </Card>
    </Center>
  );
}
