import { useEffect, useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { MainPage } from './components/MainPage';
import { NavBar } from './components/NavBar';
import { User } from './types';
import { authorize, logout } from './utils/common.utils';
import st from 'styled-components';

const AppWrapper = st.div`
  margin-top: 3rem;
`;

const LoginPageWrapper = st.div`
  width: 100%;
  height: calc(100vh - 3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cfd2e7;
`;

function App() {
  const [user, setUser] = useState<User | null>(null);
  console.log('version 1.0.11');

  useEffect(() => {
    const doAuthFlow = async () => {
      try {
        const userData = await authorize();
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    }

    doAuthFlow();
  }, []);

  return (
    <AppWrapper>
      <NavBar
        isLoggedIn={user !== null}
        logoutUser={() => {
          logout();
          setUser(null);
        }}
      />
      {user ? (
        <MainPage user={user} />
      ) : (
        <LoginPageWrapper>
          <LoginPage setUserData={(user) => { setUser(user); }} />
        </LoginPageWrapper>
      )}
      <div id='cardIcon'></div>
    </AppWrapper>
  );
}

export default App;
