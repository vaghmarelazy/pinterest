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
      path:"/app",
      element: <Signup />
    },
    {
      path:"/app/login",
      element: <Login />
    },
    {
      path:"/api/feed",
      element: <Feed />
    },
    {
    path:'/api/profile',
    element: <Profile />
    },
    {
      path:'/api/editprofile',
      element: <EditProfile />
    },
    {
      path:`/api/user/:username`,
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
