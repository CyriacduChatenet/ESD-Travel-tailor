import { FC, useState } from 'react';
import { Link } from '@travel-manager/functions';

import { ROUTES } from '@/setup/constants';

import reactLogo from '@/app/assets/react.svg';
import { useFetchHook } from '@travel-manager/hooks';

export const HomePage:FC = () => {
  const [count, setCount] = useState(0)
  const [string, setString] = useState('')

  const useFetch = new useFetchHook();

  useFetch.get(`${import.meta.env.VITE_APP_API_URL}`);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Link to={ROUTES.AUTH.SIGNIN}>Signin</Link>
      <br />
      <p>{string}</p>
    </div>
  )
}
