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
                    value : '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                street : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Street'
                    },
                    value : '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                pincode : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'PIN CODE'
                    },
                    value : '',
                    validation :{
                        required : true,
                        minLength : 5,
                        maxLength : 5
                    },
                    valid : false,
                    touched : false
                },
                country : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Country'
                    },
                    value : '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                email : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'email',
                        placeholder : 'Your Email'
                    },
                    value : '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                delivery : {
                    elementType : 'select',
                    elementConfig : {
                        options : [
                                    {value : 'fastest', displayValue : 'Fastest'},
                                    {value : 'cheapest', displayValue : 'Cheapest'}
                                    ]
                    },
                    validation : {},
                    valid : true,
                    value : ''
                }
        },
        formIsValid : false,
        loading : false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading : true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price, // Always calculate price on the backend........
            orderData : formData
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        updatedFormElement.touched = true;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm : updatedOrderForm, formIsValid : formIsValid});
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid ;
        }

         if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid ;
        }


        return isValid;
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
                 <form onSubmit = {this.orderHandler} >
                    {formElementsArray.map(formElement =>(
                      <Input 
                            key = {formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            invalid = {!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            touched ={formElement.config.touched}
                            change = {(event) => this.onChangeHandler(event, formElement.id)} />  
                    ))}        
                    <Button btnTyp ="Success" disabled = {!this.state.formIsValid}>Order</Button>
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