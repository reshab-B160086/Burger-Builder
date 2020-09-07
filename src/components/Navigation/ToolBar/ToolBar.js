import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../LOGO/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = (props)=>(

    <header className = {classes.ToolBar}>
        <DrawerToggle clicked = {props.drawerToggle} />
        <div className = {classes.Logo}>
            <Logo />
        </div>
        <nav className = {classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolBar;