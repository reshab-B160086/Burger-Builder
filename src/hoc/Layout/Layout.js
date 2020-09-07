import React, {Component} from 'react';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer : false
    }

    closedSideDrawerHandler = ()=>{
        this.setState({showSideDrawer : false});
    }

    drawerToggleHandler = ()=>{
        this.setState((prevState) =>{
            return {showSideDrawer : !prevState.showSideDrawer}
        });
    }


    render(){
        return(
             <Aux>
                  <ToolBar drawerToggle = {this.drawerToggleHandler}/>
                  <SideDrawer 
                        open = {this.state.showSideDrawer}
                        closed = {this.closedSideDrawerHandler} />
                  <main className = {classes.Content}>
                     {this.props.children}
                  </main>
            </Aux>
        );
    }
}

export default Layout;