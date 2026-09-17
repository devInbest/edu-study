'use client';

import { useEffect, useMemo, useState } from 'react';

import { Select, TextInput } from '@mantine/core';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';

import AppButton from '@/components/common/AppButton/AppButton';
import CollegeCard from '@/components/colleges/CollegeCard/CollegeCard';
import { filterColleges, getCollegeFiltersMeta } from '@/data/colleges';

import classes from './CollegeDirectory.module.scss';

const PAGE_SIZE = 9;

const selectChevron = <IconChevronDown size={16} stroke={1.75} />;

export default function CollegeDirectory() {
  const meta = useMemo(() => getCollegeFiltersMeta(), []);
  const [q, setQ] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [stream, setStream] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const results = useMemo(
    () => filterColleges({ q, state, city, stream }),
    [q, state, city, stream]
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [q, state, city, stream]);

  const visible = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  const cityOptions = useMemo(() => {
    if (!state) return meta.cities;
    return [
      ...new Set(
        filterColleges({ state }).map((college) => college.city)
      ),
    ].sort();
  }, [meta.cities, state]);

  return (
    <div className={classes.wrap}>
      <div className={classes.filters}>
        <TextInput
          placeholder="Search college, course, city…"
          leftSection={<IconSearch size={16} />}
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
          className={classes.search}
        />
        <Select
          placeholder="Stream"
          data={meta.streams}
          value={stream || null}
          onChange={(value) => setStream(value || '')}
          clearable
          rightSection={selectChevron}
          rightSectionPointerEvents="none"
          classNames={{ input: classes.selectInput }}
        />
        <Select
          placeholder="State"
          data={meta.states}
          value={state || null}
          onChange={(value) => {
            setState(value || '');
            setCity('');
          }}
          clearable
          searchable
          rightSection={selectChevron}
          rightSectionPointerEvents="none"
          classNames={{ input: classes.selectPointer }}
        />
        <Select
          placeholder="City"
          data={cityOptions}
          value={city || null}
          onChange={(value) => setCity(value || '')}
          clearable
          searchable
          rightSection={selectChevron}
          rightSectionPointerEvents="none"
          classNames={{ input: classes.selectPointer }}
        />
      </div>

      <p className={classes.count}>
        Showing <strong>{visible.length}</strong>
        {results.length !== visible.length ? (
          <>
            {' '}
            of <strong>{results.length}</strong>
          </>
        ) : null}{' '}
        college{results.length === 1 ? '' : 's'}
      </p>

      {results.length ? (
        <>
          <div className={classes.grid}>
            {visible.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          {hasMore ? (
            <div className={classes.moreWrap}>
              <AppButton
                variant="outline"
                color="navy"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                View more
              </AppButton>
            </div>
          ) : null}
        </>
      ) : (
        <div className={classes.empty}>
          <h3>No colleges match your filters</h3>
          <p>Try a different search term or clear one of the filters.</p>
        </div>
      )}
    </div>
  );
}
