import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import HomePage from 'pages/HomePage/HomePage';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};
