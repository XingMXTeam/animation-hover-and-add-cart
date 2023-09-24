import logo from "./logo.svg";
import "./App.css";
import { useHoverCard } from "./core/useHover";
import { Button } from "antd";
import { useState } from "react";
import { addCart } from "./core/addCart";

const Card = ({ id, onAdd }) => {
  const { handleMouseEnter } = useHoverCard({
    containerSelectors: ".wrapper_" + id,
    cardSelectors: ".item" + id,
    additionalContentSelectors: ".footer",
  });

  return (
    <div className={"wrapper_" + id}>
      <div className={"item" + id} onMouseEnter={handleMouseEnter}>
        {/* <div className={"item" + id}> */}
        <img
          data-id={"cardImg" + id}
          style={{ width: "100%" }}
          src="./1.jpeg"
        />
        hello world
      </div>
      <div className="footer" style={{ display: "none" }}>
        <Button
          className="add"
          onClick={() => {
            onAdd()
            addCart({
              id,
            });
          }}
        >
          添加到购物车
        </Button>
      </div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <div id="container">
        <Card
          id="1"
          onAdd={() => {
            setCount(count+1);
          }}
        />
        <Card
          id="2"
          onAdd={() => {
            setCount(count+1);
          }}
        />
        <Card
          id="3"
          onAdd={() => {
            setCount(count+1);
          }}
        />
      </div>
      <div className="cart">
        <Button className="btn" id="footerCart">
          购物车
          <span className="count" id="count">
            {count}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default App;
