import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENTS = {
    salad : 0.5,
    cheese : 0.3,
    meat : 1.3,
    bacon : 0.7
}


class BurgerBuilder extends Component{

    state = {
        ingredients : {
            meat : 0,
            salad : 0,
            cheese : 0,
            bacon : 0
        },
        totalPrice : 4,
        purchaseable : false,
        purchasing : false,
        loading : false
    };

    updatePurchase(ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // }

        const sum = Object.keys(ingredients)
                    .map(items =>{
                        return ingredients[items];
                    })
                    .reduce((sum,ele)=>{
                        return sum + ele;
                    },0);

        this.setState({purchaseable : sum > 0});

    }


    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENTS[type];

        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});

        this.updatePurchase(updatedIngredients);
    }

    removeIngredientsHandler = (type) =>{

        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0)
            return;

        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice - INGREDIENTS[type];

        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});

        this.updatePurchase(updatedIngredients);
            

    }

    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () =>{
       // alert('you bied the burger');

       this.setState({loading : true});

       const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice, // Always calculate price on the backend........
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
        .then(response => this.setState({loading : false, purchasing : false}))
        .catch(error => this.setState({loading : false, purchasing : false}));
    }


    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 ;
        }

        let orderSummary =  <OrderSummary 
                                ingredients ={this.state.ingredients}
                                price = {this.state.totalPrice}
                                purchaseCanceled = {this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler}/>;

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
           <Aux>
               <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
               </Modal>
               <Burger ingredients = {this.state.ingredients}/>
               <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientsHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                    purchaseable = {this.state.purchaseable} />
           </Aux>   
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);