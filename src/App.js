import React from "react";
import Cart from "./Components/Cart";
import styled from "styled-components";
import Recommendation from "./Components/Recommendations";
import { IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const NavBar = styled.div`
  height: 4rem;
  width: 100%;
  background: rgb(0, 113, 220);
  display: flex;
  flex-direction: row;
`;

const NavBarHeading = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  align-self: center;
  font-family: sans-serif;
  margin: 1rem;
`;

const Back = styled(IconButton)`
  && {
    align-self: center;
    padding: 0.5rem;
    color: white;
  }
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pageMounted: "Recommendation",
    };
  }

  goToPage = (page) => {
    this.setState({ pageMounted: page });
  };

  render() {
    var Body = null;
    var NavContent = null;

    switch (this.state.pageMounted) {
      case "Cart":
        Body = <Cart goToPage={this.goToPage} />;
        NavContent = <NavBarHeading>{this.state.pageMounted}</NavBarHeading>;
        break;
      case "Recommendation":
        Body = <Recommendation goToPage={this.goToPage} />;
        NavContent = (
          <React.Fragment>
            <Back onClick={()=>this.goToPage('Cart')}>
              <ArrowBack />
            </Back>
            <NavBarHeading>You may also like</NavBarHeading>
          </React.Fragment>
        );
        break;
      default:
        break;
    }

    return (
      <RootContainer>
        <NavBar>{NavContent}</NavBar>
        {Body}
      </RootContainer>
    );
  }
}

export default App;
