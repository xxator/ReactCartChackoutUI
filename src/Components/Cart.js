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
  font-family: roboto;
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
`;

const Price = styled.div`
  font-size: 1rem;
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
    let cartItems = [];
    for (let i = 0; i < 4; i++) {
      let item = {
        name: faker.commerce.productDescription().slice(0, 40) + "...",
        price: faker.commerce.price(),
        image: faker.image.fashion(),
        qty: 1,
      };
      cartItems.push(item);
    }
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
