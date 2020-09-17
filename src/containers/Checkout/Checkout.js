import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    state = {
        ingredients :null,
        price : 0
    }

    UNSAFE_componentWillMount(){
        console.log('hahahah')
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        let price = 0;
        for(let params of query.entries()){
            if(params[0] === 'totalPrice'){
                price = params[1];
            }else{
               ingredients[params[0]] = +params[1];     
            }
        }
            console.log(ingredients);
            this.setState({ingredients : ingredients, price : price});
        }


    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }





    render() {
        console.log(this.state.ingredients)
        return (

            <div>
                <CheckoutSummary 
                        ingredients = {this.state.ingredients}
                        checkoutCancelled ={this.checkoutCancelledHandler}
                        checkoutContinued = {this.checkoutContinuedHandler} />
                <Route 
                    path ={this.props.match.path + '/contact-data'} 
                    render = {(props) => (<ContactData ingredients = {this.state.ingredients} price = {this.state.price} {...props} />)}/>
            </div>
        );
    }
}


export default Checkout;