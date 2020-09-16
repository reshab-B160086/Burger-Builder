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
        ingredients : null,
        totalPrice : 4,
        purchaseable : false,
        purchasing : false,
        loading : false,
        error : false
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

       
       const queryParam = [];

       for(let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
       }

       queryParam.push('totalPrice=' + this.state.totalPrice);

       const queryString = queryParam.join('&');

       this.props.history.push({
                                pathname : '/checkout',
                                search : '?' + queryString
                               });


    }



    componentDidMount(){

        axios.get('https://react-my-burger-25912.firebaseio.com/ingredients.json')
            .then(response =>{
                const updatedIngredients = response.data;
                this.setState({ingredients : updatedIngredients});
                this.updatePurchase(updatedIngredients);
            })
            .catch(error=>{
                this.setState({error : true});
            });

    }







    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 ;
        }


        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary = null;

        if(this.state.ingredients){

            burger = (
                <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                       <BuildControls 
                            ingredientAdded = {this.addIngredientHandler}
                            ingredientRemoved = {this.removeIngredientsHandler}
                            disabled = {disabledInfo}
                            price = {this.state.totalPrice}
                            ordered = {this.purchaseHandler}
                            purchaseable = {this.state.purchaseable} />
                </Aux>);

                 orderSummary = <OrderSummary 
                                ingredients ={this.state.ingredients}
                                price = {this.state.totalPrice}
                                purchaseCanceled = {this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler}/>;

        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
           <Aux>
               <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
               </Modal>
               {burger}
           </Aux>   
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);