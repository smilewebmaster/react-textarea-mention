# react-textarea-mention

> Mentions in TextArea for React

[![NPM](https://img.shields.io/npm/v/react-textarea-mention.svg)](https://www.npmjs.com/package/react-textarea-mention) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

#### npm

```sh
$ npm install --save react-textarea-mention
```

## Getting Started

```javascript
import React from 'react';

const MyComponent = props => {
    const handleChange = content => {
        console.log(content);
    }

  return (
    <Mention
        onChange={v => console.log(v)}
        field="username"
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
  );
};
export default MyComponent;
```

# Example

![React Textarea Mention](https://i.ibb.co/HHKF7xx/react-mention.png)



# Props

`symbol`


`cssClass`


`data`


`field`


`onChange`

# More Coming Up...

### Pull Requests

Pull requests are welcome

### License

React TextArea Mention may be freely distributed under the MIT license.
