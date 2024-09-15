import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { theme } from "../../Theme";
import { Menu } from "../Menu";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <ThemeProvider theme={theme}>
      <div
        className="container"
        style={{
          backgroundColor: "white",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          margin: "0",
        }}
      >
        <Menu />

        <div
          className="content"
          style={{
            display: "flex",
            padding: "0.5vw",
            backgroundColor: "white",
          }}
        >
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Container;
