import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 5;
  position: relative;
`;

const Face = styled.div`
  position: absolute;
  border: 1px solid yellow;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

const Eye = styled.div`
  width: 30%;
  height: 30%;
  position: absolute;
  border: 1px solid blue;
  top: calc(${props => props.y - props.top}px - 15%);
  left: calc(${props => props.x - props.left}px - 15%);
`;

const Mouth = styled.div`
  width: 60%;
  height: 30%;
  position: absolute;
  border: 1px solid orange;
  top: calc(${props => props.y - props.top}px - 15%);
  left: calc(${props => props.x - props.left}px - 30%);
`;

export default class Thumb extends Component {
  state = {
    faces: [],
  };

  _imgRef = img => (this.img = img);

  _detectFaces = async () => {
    const faceDetector = new window.FaceDetector();

    const faces = await faceDetector.detect(this.img);

    this.setState({ faces });
  };

  componentWillReceiveProps(nextProps) {
    this.reader.readAsDataURL(nextProps.file);
  }

  componentDidMount() {
    this.reader = new FileReader();

    this.reader.onloadend = () => {
      this.img.src = this.reader.result;
    };

    this.img.onload = this._detectFaces;

    this.reader.readAsDataURL(this.props.file);
  }

  render() {
    const { file, index } = this.props;
    const { faces } = this.state;

    return (
      <Wrapper>
        <img alt={file.name} ref={this._imgRef} />

        {faces.map((face, faceIndex) => {
          const { top, left, width, height } = face.boundingBox;

          return (
            <Face key={`face-${faceIndex}`} top={top} left={left} width={width} height={height}>
              {face.landmarks.map((landmark, index) => {
                const { x, y } = landmark.location;
                const key = `landmark-${faceIndex}-${index}`;

                switch (landmark.type) {
                  case "eye":
                    return <Eye key={key} x={x} y={y} top={top} left={left} />;
                  case "mouth":
                    return <Mouth key={key} x={x} y={y} top={top} left={left} />
                }
              })}
            </Face>
          );
        })}
      </Wrapper>
    );
  }
}
