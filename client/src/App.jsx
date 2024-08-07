import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import UserProfile from './components/UserProfile';


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
    },
    {
      path:`/user/:username`,
      element:<UserProfile/>
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
