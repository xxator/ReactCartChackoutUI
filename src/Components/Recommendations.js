import React from "react";
import faker from "faker";
import styled from "styled-components";

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
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 40vw;
  max-width: 40vw;
  height: 20rem;
  border-bottom: solid 1px lightgray;
  margin: 1rem;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100vw;
  overflow: auto;
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
  height: 4.5rem;
`;

const SponsoredPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SponsoredText = styled.div`
  font-size: 12px;
  color: grey;
  margin-top: 0.25rem;
  font-weight: 500;
`;
const PriceContainer = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: row;
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
`;

const AddBtn = styled.button`
  background: none;
  border: solid black 1px;
  width: 3.5rem;
  border-radius: 4px;
  height: 1.5rem;
`;

const SponsoredPrice = (props) => {
  return (
    <SponsoredPriceContainer>
      <SponsoredText>Sponsored</SponsoredText>
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

  componentDidMount() {
    let recommendedItems = [];
    for (let i = 0; i < 10; i++) {
      let item = {
        name: faker.commerce.productDescription().slice(0, 40) + "...",
        price: faker.commerce.price(),
        discountedPrice: faker.commerce.price(),
        image: faker.image.fashion(),
        qty: 1,
      };
      recommendedItems.push(item);
    }
    console.log("cart items", recommendedItems);
    this.setState({ sponsoredProducts: recommendedItems });

    recommendedItems = [];
    for (let i = 0; i < 10; i++) {
      let item = {
        name: faker.commerce.productDescription().slice(0, 40) + "...",
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
        <Product>
          <ProductImg src={item.image} />
          <SponsoredPrice price={item.price} disPrice={item.discountedPrice} />
          <ProductName>{item.name}</ProductName>
          <AddBtn>Add</AddBtn>
        </Product>
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
        <ProductContainer>{SponsoredProducts}</ProductContainer>
        <ProductContainer>{RecommendedProducts}</ProductContainer>
      </RootContainer>
    );
  }
}

export default Recommendation;
