import React from "react";
import faker from "faker";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import axios from 'axios';


var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0rem;
  background: whitesmoke;
  height: 100%;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 40vw;
  max-width: 40vw;
  height: 16rem;
  margin: 1rem;
`;

const SponsoredProduct = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50vw;
  max-width: 50vw;
  height: 17rem;
  margin: 0rem 1rem 0rem 1rem;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100vw;
  overflow: auto;
`;

const SponsoredProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100vw;
  overflow: auto;
  align-self: center;
`;

const SponsoredProductRootContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  align-self: center;
  margin: 0rem 0rem 1rem 0rem;
  background-color: white;
  box-shadow: 0px 0px 10px 1px lightgray;
`;


const ProductImg = styled.img`
  width: 80%;
  height: 50%;
  align-self: center;
`;

const ProductName = styled.div`
  font-size: 16px;
  align-self: center;
  margin-top: 0.5rem;
  height: 3rem;
`;

const SponsoredPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SponsoredText = styled.div`
  font-size: 16px;
  color: grey;
  margin: 1rem 0.5rem 0.5rem 0.5rem;
  font-weight: 500;
  color: rgb(0,113,220);
`;
const PriceContainer = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: row;
`;

const DisBubble = styled.div`
  position: relative;
  top: 1rem;
  font-size: 16px;
  left: 8rem;
  font-weight: 700;
  color: lightgreen;
  text-shadow: 1px 1px lightgreen;
`;

const OrigPrice = styled.div`
  font-weight: 700;
  font-size: 13px;
  text-decoration: line-through;
  align-self: center;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 15px;
  align-self: center;
  margin-top: 1rem;
`;

const DisPrice = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-left: 0.25rem;
  align-self: center;
  color: lightgreen;
  text-shadow: 1px 1px lightgreen;
`;

const AddBtn = styled.button`
  background: none;
  border: solid black 1px;
  width: 3.5rem;
  border-radius: 4px;
  height: 1.5rem;
`;

const ContinueBtn = styled((props) => (
  <Button {...props} variant="contained">
    {props.children}
  </Button>
))`
  && {
    align-self: center;
    width: 15rem;
    margin: 0rem 1rem;
    background: rgb(0, 113, 220);
    color: white;
  }
  &:hover {
    background: rgb(0, 113, 250) !important;
  }
`;

const SponsoredPrice = (props) => {
  return (
    <SponsoredPriceContainer>
      <PriceContainer>
        <OrigPrice>{formatter.format(props.price)}</OrigPrice>
        <DisPrice>{formatter.format(props.disPrice)}</DisPrice>
      </PriceContainer>
    </SponsoredPriceContainer>
  );
};

const ProductPrice = (props) => {
  return (
    <SponsoredPriceContainer>
      <PriceContainer>
        <Price>{formatter.format(props.price)}</Price>
      </PriceContainer>
    </SponsoredPriceContainer>
  );
};

class Recommendation extends React.Component {
  constructor() {
    super();
    this.state = {
      sponsoredProducts: [],
      recommendationList: [],
    };
  }

  async componentDidMount() {
    axios.get('http://172.28.106.45:8080/vas/recommendations').then(res => {
      console.log('api res',res);
      this.setState({ sponsoredProducts: res.data.data });
    })

    // for (let i = 0; i < 10; i++) {
    //   let item = {
    //     name: faker.commerce.productDescription().slice(0, 30) + "...",
    //     price: faker.commerce.price(),
    //     discountedPrice: faker.commerce.price(),
    //     image: "https://i5.walmartimages.com/asr/ad0453f9-9d6d-4d71-a173-1d042c977d4d_5.44769736c448799bb4ae9226803a61e4.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
    //     qty: 1,
    //   };
    //   recommendedItems.push(item);
    // }
    // console.log("cart items", recommendedItems);
    // this.setState({ sponsoredProducts: recommendedItems });

    let recommendedItems = [];
    for (let i = 0; i < 2; i++) {
      let item = {
        name: faker.commerce.productDescription().slice(0, 20) + "...",
        price: faker.commerce.price(),
        image: faker.image.fashion(),
        qty: 1,
      };
      recommendedItems.push(item);
    }
    this.setState({ recommendationList: recommendedItems });
  }

  render() {
    let SponsoredProducts = this.state.sponsoredProducts.map((item) => {
      return (
        <SponsoredProduct>
          <DisBubble>-10%</DisBubble>
          <ProductImg src={item.imageURL} />
          <SponsoredPrice price={item.price} disPrice={item.price-10} />
          <ProductName>{item.itemName}</ProductName>
          <AddBtn>Add</AddBtn>
        </SponsoredProduct>
      );
    });

    let RecommendedProducts = this.state.recommendationList.map((item) => {
      return (
        <Product>
          <ProductImg src={item.image} />
          <ProductPrice price={item.price} />
          <ProductName>{item.name}</ProductName>
          <AddBtn>Add</AddBtn>
        </Product>
      );
    });

    return (
      <RootContainer>
        <SponsoredProductRootContainer ><SponsoredText>Walmart+ Additional Savings</SponsoredText><SponsoredProductContainer>{SponsoredProducts}</SponsoredProductContainer></SponsoredProductRootContainer>
        <SponsoredProductRootContainer ><SponsoredText>You may also like</SponsoredText><ProductContainer>{RecommendedProducts}</ProductContainer></SponsoredProductRootContainer>
        <ContinueBtn>Continue</ContinueBtn>
      </RootContainer>
    );
  }
}

export default Recommendation;
