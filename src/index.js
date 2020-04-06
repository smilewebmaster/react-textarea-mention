import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import Mention from "../Mention.js";

const Example = props => {
  return (
      <Fragment>
        <h1>Welcome to React TextArea Mention </h1>
 <Mention
      data={[
        {
          name: "John Doe",
          username: "johndoe"
          },
          {
          name: "Jane Good",
          username: "janekesse"
          },
          {
          name: "Kofi Ghana",
          username: "kofighana"
          }
      ]}
    />
      </Fragment>
   
  );
};
ReactDOM.render(<Example />, document.getElementById("app"));
