import React, { useEffect, useState } from 'react';
import { Inbox } from './Inbox';
import { PushData, PushMessageEventType, User } from '../types';
import { PushEventMessage } from './PushEventMessage';
import st from 'styled-components';

const MainPageWrapper = st.div`
  padding: 1rem;
`;


type MainPageProps = {
  user: User
};

export const MainPage = (props: MainPageProps) => {
  const [events, setEvents] = useState<PushData[]>([]);

  useEffect(() => {
    if (!navigator.serviceWorker) {
      console.log('MainPage no serviceWorker');
    } else {
      navigator.serviceWorker.addEventListener('message', (ev: PushMessageEventType) => {
        // console.log('MainPage NAVSW', ev.data);
        if (ev.data.name === 'SWPushNotification') {
          setEvents((evList) => [ev.data.data, ...evList]);
        }
      });
    }

  }, []);

  return (
    <MainPageWrapper>
      <h1> Main Page </h1>
      <div>
        <h4>User</h4>
        <h5> {props.user.firstName} {props.user.lastName} </h5>
        <h6> ID: {props.user.id} </h6>
        <h6> Email: {props.user.email} </h6>
      </div>
      <div>
        <h3>Events List</h3>
        {events.map((ev, id) => <PushEventMessage key={`ev-${id}`} message={ev} />)}
      </div>
      <Inbox />
    </MainPageWrapper>
  )
}
