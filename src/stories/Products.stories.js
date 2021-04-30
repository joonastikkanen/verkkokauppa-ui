// Product.stories.js

import React from 'react';

import { Products } from './Products';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Demo/Add to Cart',
  component: Products,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Products {...args} />;

export const ProductList = Template.bind({});
ProductList.args = {
  //primary: true,
  //label: 'Button',
  //json: '{"1": "ProductA", "2": "ProductB", "3": "ProductC"}',
};
