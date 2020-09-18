import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class contactData extends Component {

    state = {

        name : '',
        email :'',
        address : {
            street :'',
            postalCode : ''
        },
        loading : false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading : true});

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price, // Always calculate price on the backend........
            customer : {
                name : 'Reshab Gupta',
                address : {
                    street : 'Champasari',
                    pincode : '734003',
                    country : 'India'
                },
                email : 'test@test.com'
            },
                delivery : 'fastest'
       }

       axios.post('/orders.json', order)
        .then(response => {  
                        this.setState({loading : false}) 
                        this.props.history.push('/')  
                    })
        .catch(error => this.setState({loading : false}));
    }

    render() {

        let form = (
                 <form>
                        <Input inputtype = 'input' type ="text" name ="name" placeholder = "Your Name" />
                        <Input inputtype = 'input' type ="email" name ="email" placeholder = "Your Email" />
                        <Input inputtype = 'input' type ="text" name ="street" placeholder = "Your Street" />
                        <Input inputtype = 'input' type ="text" name ="postal" placeholder = "Your Postal Code" />
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