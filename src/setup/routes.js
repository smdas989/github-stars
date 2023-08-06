import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Home from '../pages/home';

const routeMapper = [
  {
    path: '/home',
    component: Home,
    exact: true,
  },
];

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Link to={'/home'}>Go to Home</Link>}
        />
        {routeMapper.map(({ component, exact, path }) => (
          <Route
            key={path}
            path={path}
            element={React.createElement(component)}
            exact={exact}
          />
        ))}
        <Route
          path="*"
          // element={<PageNotFound />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
