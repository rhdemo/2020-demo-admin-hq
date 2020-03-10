import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('../../Home'));


const Routes = () => (
  <Suspense fallback={<div className='route-loading'><h1>Loading...</h1></div>}>
    <Switch>
      <Route path='/' exact component={Home}/>
    </Switch>
  </Suspense>
);

export default Routes;