import * as React from "react";
import "./styles.css";
import Container from "../Container";
import { Carousel } from ".";

export const EnvelopCarousel = () => (
  <Container>
    <div
      className="App-Carousel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',

      }}>
      <div className="example-container">
        <Carousel />
      </div>
    </div>
  </Container>
);

