import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import Mention from "../Mention.js";

const Example = props => {
  return (
      <Fragment>
 <Mention
    onChange={v => console.log(v)}
      data={[
        {
          name: "John F",
          username: "john"
        },
        {
          name: "Jane Good",
          username: "jane"
        },
        {
          name: "Baby Face",
          username: "babyface"
        }
      ]}
    />
    <Mention
      data={[
        {
          name: "John F",
          username: "john"
        },
        {
          name: "Jane Good",
          username: "jane"
        },
        {
          name: "Baby Face",
          username: "babyface"
        }
      ]}
    />
      </Fragment>
   
  );
};
ReactDOM.render(<Example />, document.getElementById("app"));
