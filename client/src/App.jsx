import React from 'react';
import { createBrowserRouter,Link, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Signup />
    },
    {
      path:"/login",
      element: <Login />
    },
    {
      path:"/feed",
      element: <Feed />
    },
    {
    path:'/profile',
    element: <Profile />
    },
    {
      path:'/editprofile',
      element: <EditProfile />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
