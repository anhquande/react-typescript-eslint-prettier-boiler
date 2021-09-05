import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  concat,
  filter,
  interval,
  of,
  repeatWhen,
  scan,
  share,
  startWith,
  Subject,
  takeUntil,
  takeWhile,
} from 'rxjs';
type Props = {
  title: string;
};

const countdown$ = interval(1000)
  .pipe(
    startWith(5),
    scan(time => time - 1),
    takeWhile(time => time > 0),
  )
  .pipe(share());

const action$ = new Subject();
const snooze$ = action$.pipe(filter(action => action === 'snooze'));
const dismiss$ = action$.pipe(filter(action => action === 'dismiss'));

const alarm$ = concat(countdown$, of('RENG RENG RENG')).pipe(
  repeatWhen(() => snooze$),
);

const observable$ = concat(
  alarm$.pipe(takeUntil(dismiss$)),
  of('Have a nice day'),
);

export default function Alarm({ title }: Props) {
  const [state, setState] = useState<string>();
  useEffect(() => {
    const sub = observable$.subscribe(value => {
      console.log(value);
      setState('' + value.toString());
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);
  return (
    <div>
      <Typography variant={'h6'}>{title || ''}</Typography>
      <Typography variant={'body2'}>{state || ''}</Typography>
      <Button onClick={() => action$.next('snooze')}>Snooze</Button>
      <Button onClick={() => action$.next('dismiss')}>Dismiss</Button>
    </div>
  );
}
