import React from "react";
import styled from "styled-components";
import faker from "faker";
import { Button } from "@material-ui/core";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px lightgrey solid;
  margin: 0rem 1rem;
  padding: 1rem 0rem;
  &:hover {
    background: whitesmoke;
  }
`;

const ItemImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 0.25rem;
`;

const ProductName = styled.div`
  font-size: 1rem;
  font-weight: 450;
  color: black;
`;

const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 1rem;
  justify-content: space-between;
`;

const PriceCartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 15rem;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-family: BogleWeb, Helvetica Neue, Helvetica, Arial, sans-serif;
  align-self: center;
`;

const Qty = styled.div`
  border: 2px solid black;
  padding: 0.1rem 0.5rem;
  width: 1.5rem;
  text-align: center;
  align-self: center;
  font-weight: 500;
  font-size: 0.9rem;
`;

const CheckoutBtn = styled((props) => (
  <Button {...props} variant="contained">
    {props.children}
  </Button>
))`
  && {
    align-self: center;
    width: 15rem;
    margin: 1rem;
    background: rgb(0, 113, 220);
    color: white;
  }
  &:hover {
    background: rgb(0, 113, 250) !important;
  }
`;

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    let cartItems = [
      { 
        name: "Marketside Organic Vegetable Tray",
        image: "https://i5.walmartimages.com/asr/ad0453f9-9d6d-4d71-a173-1d042c977d4d_5.44769736c448799bb4ae9226803a61e4.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        qty: 1,
        price: 10.78, 
      },
      { 
        name: "Pepsi Soda Mini Cans",
        image: "https://i5.walmartimages.com/asr/9e188334-9985-4ddb-a30a-1233a4d61251.09814bdf8b97f471bd0f1c2dd4bc472e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        qty: 1,
        price: 2.5, 
      },
      { 
        name: "Canyon Bakehouse Honey White Bread",
        image: "https://i5.walmartimages.com/asr/2a6f5ed8-21be-4bc4-8863-cc58818726fc_1.5e4baf943eee86e0cbc01fab6e04e966.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        qty: 1,
        price: 10.78, 
      },
      { 
        name: "Danimals Strawberry Smoothie",
        image: "https://i5.walmartimages.com/asr/9105f260-6e59-4b3c-bd94-c0a8ffd9a218.cd095ecbc1f237a346ab396bee9e7e2a.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        qty: 1,
        price: 10.78, 
      },
      { 
        name: "CAP Barbell Coated Hex Dumbbell",
        image: "https://i5.walmartimages.com/asr/062ce6a2-872e-4373-9136-ea2af93cc6af_1.e189a569e61ea2bdb00b9958f98fb221.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        qty: 1,
        price: 10.78, 
      },
    ];
    console.log("cart items", cartItems);
    this.setState({ cartItems });
  }

  render() {
    let cartList = this.state.cartItems.map((item) => {
      return (
        <CartItem>
          <ItemImage src={item.image} />
          <ProductDetailsContainer>
            <ProductName>{item.name}</ProductName>
            <PriceCartContainer>
              <Qty>{item.qty}</Qty>
              <Price>{formatter.format(item.price)}</Price>
            </PriceCartContainer>
          </ProductDetailsContainer>
        </CartItem>
      );
    });

    return (
      <CartContainer>
        {cartList}
        <CheckoutBtn onClick={() => this.props.goToPage("Recommendation")}>
          Checkout
        </CheckoutBtn>
      </CartContainer>
    );
  }
}

export default Cart;
