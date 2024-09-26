import React, { FC, PropsWithChildren, Suspense } from 'react';
import {  Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};


const UsersPage = React.lazy(() => import('app/users/users.page'));

const UsersRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={UsersPage} />} />
    </Routes>
  );
};

export default UsersRoutes;
