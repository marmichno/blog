import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {ArticlesList} from '../ArticlesList';
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import TestRenderer from "react-test-renderer";

const store = createStore(() => [], {}, applyMiddleware());

test("matches snapshot", () => {
    const tree = TestRenderer.create(<Provider store={store}><ArticlesList/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });