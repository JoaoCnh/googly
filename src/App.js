import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import Example from "./Example";

import instructions from "./instructions.md";

const Container = styled.div`
  width: 55%;
  margin: auto;
  padding: 8% 0 0;
`;

const Inner = styled.div`
  z-index: 1;
  width: 100%;
  padding: 45px;
  background: white;
  position: relative;
  margin: 0 auto 100px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

class App extends Component {
  state = {
    isEnabled: false
  };

  componentDidMount() {
    if (typeof window.FaceDetector === "undefined") {
      return;
    }

    this.setState({ isEnabled: true });
  }

  render() {
    let content = null;

    if (!this.state.isEnabled) {
      content = <ReactMarkdown source={instructions} />;
    } else {
      content = <Example />;
    }

    return (
      <Container>
        <Inner>{content}</Inner>
      </Container>
    );
  }
}

export default App;
