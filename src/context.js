import React, { Component } from 'react';
import {storeProducts,detailProduct} from './data';


const ProductContext = React.createContext();
// Provider
// Consumer


class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: storeProducts,
        cart:[],
        modalOpen:false,
        modalProduct : detailProduct,
        cartSubTotal :0,
        cartTax :0,
        CartTotals :0
    };
    componentDidMount(){
        this.setProducuts();
    }
    setProducuts =()=>{
        let tempProducts = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProducts =  [...tempProducts , singleItem];

        })
        this.setState(()=>{
            return {products : tempProducts}
        })
    }
    
    getItem = id =>{
        const product =this.state.products.find(item => item.id === id);
        return product;
    }
    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product};
        })
    };
    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price ;
        this.setState(()=>{
            return {products : tempProducts , cart : [...this.state.cart,product]}
        },
        ()=>{this.addTotals();
        })
    };

    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return{modalProduct:product,modalOpen:true}
        })
    }
closeModal = () =>{
    this.setState(()=>{
        return{modalOpen:false}
    })
}
increment = (id) => { //---> הוספה של כמות של אותו פריט בלחצן הפלוס
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(()=>{return{cart : [...tempCart]}},
    ()=>{this.addTotals()}) //---> a callback function call to addTotals
}

decrement = (id) => { //----> הסרה של כמות הפריט בלחצן המינוס
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    if(product.count === 0 ){
        {alert("ATTENTION: The product has removed!")}
        this.removeItem(id);
    }else{
        product.total = product.count * product.price;
        this.setState(
            ()=>{
                return{cart : [...tempCart]};
            },

        ()=>{//---> a callback function call to addTotals();
            this.addTotals();
        }
        ); 
    
    }



}
removeItem = (id) => {
   let tempProducts = [...this.state.products];
   let tempCart = [...this.state.cart];



   tempCart = tempCart.filter(item => item.id !== id);

   const index = tempProducts.indexOf(this.getItem(id));
   let removedProduct = tempProducts[index];
   removedProduct.inCart = false;
   removedProduct.count = 0;
   removedProduct.total = 0;

   this.setState(() => {
       return {
           cart : [...tempCart],
           product:[...tempProducts]
       };
   },
   ()=>{    //---> a callback function
       this.addTotals();
   }
   );
};

clearCart = (id) => {
    this.setState(()=>{
        return {cart:[]};
    },()=>{
        this.setProducuts();
        this.addTotals();
    });
}
addTotals =()=>{
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total))
    const tempTax = subTotal * 0.1 ;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax
    this.setState(()=>{
        return {
            cartSubTotal:subTotal,
            cartTax:tax,
            CartTotals:total
        }
    }) 
}


render() {
        return (
            <ProductContext.Provider 
            value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };