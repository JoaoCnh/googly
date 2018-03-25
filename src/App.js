import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMedium from '@fortawesome/fontawesome-free-brands/faMedium';
import faGithubSquare from '@fortawesome/fontawesome-free-brands/faGithubSquare';
import faTwitterSquare from '@fortawesome/fontawesome-free-brands/faTwitterSquare';

import Example from "./Example";

import instructions from "./instructions";

const Container = styled.div`
  width: 55%;
  margin: auto;
  padding: 8% 0 0;
`;

const Title = styled.h1`
  color: #76b852;
`;

const Link = styled.a`
  text-decoration: none;
  margin: 0 10px 0 10px;
  color: ${props => props.color};

  &:hover,
  &:focus,
  &:active,
  &:visited {
    color: ${props => props.color};
  }
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
      content = <ReactMarkdown source={instructions} escapeHtml={false} />;
    } else {
      content = <Example />;
    }

    return (
      <Container>
        <Inner>
          <Title>
            {`Follow me @ `}
            <Link href="https://medium.com/@joomiguelcunha" target="_blank" color="#03a87c">
              <FontAwesomeIcon icon={faMedium} />
            </Link>
            <Link href="https://twitter.com/lokuzt" target="_blank" color="#1da1f2">
              <FontAwesomeIcon icon={faTwitterSquare} />
            </Link>
            <Link href="https://github.com/JoaoCnh" target="_blank" color="#000000">
              <FontAwesomeIcon icon={faGithubSquare} />
            </Link>
          </Title>
          {content}
        </Inner>
      </Container>
    );
  }
}

export default App;
