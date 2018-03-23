import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 5;
  position: relative;
`;

const Face = styled.div`
  position: absolute;
  border: 1px solid yellow;
`;

const Eye = styled.div`
  position: absolute;
  border: 1px solid blue;
`;

const Mouth = styled.div`
  position: absolute;
  border: 1px solid orange;
`;

export default class Thumb extends Component {
  _imgRef = img => (this.img = img);
  _faceRef = face => (this.face = face);
  _mouthRef = mouth => (this.mouth = mouth);
  _leftEyeRef = leftEye => (this.leftEye = leftEye);
  _wrapperRef = wrapper => (this.wrapper = wrapper);
  _rightEyeRef = rightEye => (this.rightEye = rightEye);

  _detectFaces = async () => {
    const faceDetector = new window.FaceDetector();

    const faces = await faceDetector.detect(this.img);

    faces.forEach(face => {
      const { top, left, width, height } = face.boundingBox;

      this.wrapper.style.cssText = `
            width: ${width}px;
            height: ${height}px;
            top: ${top}px;
            left: ${left}px;
        `;

      face.landmarks.forEach((landmark, index) => {
        const { x, y } = landmark.location;

        switch (landmark.type) {
          case "eye":
            const css = `
                    width: 35%;
                    height: 35%;
                    top: ${y - top}px;
                    left: ${x - left}px;
                `;

            if (index === 0) {
              this.leftEye.style.cssText = css;
            } else {
              this.rightEye.style.cssText = css;
            }
            break;
          case "mouth":
            this.mouth.style.cssText = `
                    width: 50%;
                    height: 20%;
                    top: ${y - top}px;
                    left: ${x - left}px;
                `;
            break;
        }
      });
    });
  };

  componentDidMount() {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.img.src = reader.result;

      // welp
      setTimeout(this._detectFaces, 750);
    };

    reader.readAsDataURL(this.props.file);
  }

  render() {
    const { file, index } = this.props;

    return (
      <Wrapper innerRef={this._wrapperRef}>
        <img width={300} height={300} alt={file.name} ref={this._imgRef} />
        <Face innerRef={this._faceRef} />
        <Eye innerRef={this._leftEyeRef} />
        <Eye innerRef={this._rightEyeRef} />
        <Mouth innerRef={this._mouthRef} />
      </Wrapper>
    );
  }
}
