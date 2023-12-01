import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { MainBoxLayout } from './Layout.styled';
import { Header } from 'components/Header/Header';

export const Layout = () => {
  return (
    <MainBoxLayout>
      <Header />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </MainBoxLayout>
  );
};
