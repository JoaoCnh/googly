import React, { Component } from "react";
import styled from "styled-components";

import Thumb from "./Thumb";

const SUPPORTED = ["jpg", "gif", "png", "jpeg"];

const Files = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default class Example extends Component {
  state = {
    files: []
  };

  _handleUpload = event => {
    const files = Array.from(event.target.files).filter(file => {
      const ext = file.name.split(".").pop();

      return SUPPORTED.includes(ext);
    });

    this.setState({ files });
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this._handleUpload} />

        <hr />

        <Files>
          {this.state.files.map((file, index) => (
            <Thumb key={`thumb-${index}`} file={file} index={index} />
          ))}
        </Files>
      </div>
    );
  }
}
