import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

class contactData extends Component {

    state = {

        name : '',
        email :'',
        address : {
            street :'',
            postalCode : ''
        }
    }

    render() {

        return (

                <div className ={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    <form>
                        <input type ="text" name ="name" placeholder = "Your Name" />
                        <input type ="email" name ="email" placeholder = "Your Email" />
                        <input type ="text" name ="street" placeholder = "Your Street" />
                        <input type ="text" name ="postal" placeholder = "Your Postal Code" />
                        <Button btnTyp ="Success">Order</Button>
                    </form>
                </div>
            );
    }

}


export default contactData;