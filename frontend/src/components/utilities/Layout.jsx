import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({setAuth, name}) {
  const role  = window.localStorage.getItem("role")
  return (
    <div>
      <Navbar setAuth={setAuth} name={name}/>
      {role !== "Voting Delegate" ? <Sidebar setAuth={setAuth} /> : <></>}
      <Outlet /> 
    </div>
  );
}

export default Layout;
