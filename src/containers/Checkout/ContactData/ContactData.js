import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class contactData extends Component {

    state = {
        orderForm : {
                name : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Name'
                    },
                    value : ''
                },
                street : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Street'
                    },
                    value : ''
                },
                pincode : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'PIN CODE'
                    },
                    value : ''
                },
                country : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Country'
                    },
                    value : ''
                },
                email : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'email',
                        placeholder : 'Your Email'
                    },
                    value : ''
                },
                delivery : {
                    elementType : 'select',
                    elementConfig : {
                        options : [
                                    {value : 'fastest', displayValue : 'Fastest'},
                                    {value : 'cheapest', displayValue : 'Cheapest'}
                                    ]
                    },
                    value : ''
                }
        },
        loading : false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading : true});

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price, // Always calculate price on the backend........
       }

       axios.post('/orders.json', order)
        .then(response => {  
                        this.setState({loading : false}) 
                        this.props.history.push('/')  
                    })
        .catch(error => this.setState({loading : false}));
    }

    onChangeHandler = (event, inputIdentifier) =>{
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm : updatedOrderForm});
    }

    render() {

        let formElementsArray =[];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            });
        }

        let form = (
                 <form>
                    {formElementsArray.map(formElement =>(
                      <Input 
                            key = {formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            change = {(event) => this.onChangeHandler(event, formElement.id)} />  
                    ))}        
                    <Button btnTyp ="Success" clicked ={this.orderHandler}>Order</Button>
                </form>
            );

        if(this.state.loading){
            form = <Spinner />;
        }

        return (
                <div className ={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                     {form}
                </div>
            );
    }

}


export default contactData;