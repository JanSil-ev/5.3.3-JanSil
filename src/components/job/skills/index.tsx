import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Pill, PillGroup, Text, TextInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { addSkill, removeSkill, setSkills } from '@/store/slice/skillsSlice';
import classes from './styles.module.css';

export default function Skills() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.skills.skills);

  const [inputValue, setInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddSkill = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    const trimmed = inputValue.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    const updated = [...skills, trimmed];
    newSearchParams.set('skills', updated.toString());

    setSearchParams(newSearchParams);
    dispatch(addSkill(trimmed));
    setInputValue('');
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    const newSearchParams = new URLSearchParams(searchParams);

    if (updated.length === 0) {
      newSearchParams.delete('skills');
    } else {
      newSearchParams.set('skills', updated.toString());
    }

    setSearchParams(newSearchParams);
    dispatch(removeSkill(skill));
  };

  useEffect(() => {
    const queryParam = searchParams.get('skills');
    if (!queryParam || !queryParam.trim()) return;

    const parsed = queryParam
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (parsed.length > 0) {
      dispatch(setSkills(parsed));
    }
  }, [dispatch, searchParams]);


  return (
    <div>
      <div className={classes.container}>
        <Text className={classes.sectionTitle}>Ключевые навыки</Text>
        <div className={classes.inputRow}>
          <TextInput
            placeholder="Навык"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            classNames={{ input: classes.textInput }}
          />
          <ActionIcon data-testid="add" className={classes.addButton} onClick={handleAddSkill}>
            <IconPlus size={18} />
          </ActionIcon>
        </div>

        <PillGroup className={classes.pillGroup}>
          {skills.map((skill) => (
            <Pill
              data-testid={skill}
              className={classes.skills}
              key={skill}
              withRemoveButton
              onRemove={() => handleRemoveSkill(skill)}
            >
              {skill}
            </Pill>
          ))}
        </PillGroup>
      </div>

    </div>
  );
}
