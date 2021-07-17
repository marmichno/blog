import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {ArticleComments} from '../ArticleComments';
import validArticleComments from '../__mocks__/validArticleComments.json';
import {render, waitFor, fireEvent} from '@testing-library/react';
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import TestRenderer from "react-test-renderer";

const store = createStore(() => [], {}, applyMiddleware());

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(validArticleComments),
  })
);

afterEach(() => {
  jest.clearAllMocks();
});

test("check if comments are visible after api call", async () => {

    const {getAllByText} = render(<Provider store={store}><ArticleComments/></Provider>);

    await waitFor(() => {
        expect(getAllByText('id labore ex et quam laborum'));
        expect(getAllByText('Eliseo@gardner.biz'));
        expect(getAllByText('laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium'));
    })
});

test("handles exception - renders without comments", async () => {

fetch.mockImplementationOnce(() => Promise.reject("API FAILURE"));

  const {getByTestId} = render(<Provider store={store}><ArticleComments/></Provider>);

  await waitFor(() => {
    expect(getByTestId("commentsContainer")).toBeTruthy();
  })
});

test("get request is called after post request", async () => {
  
    const {getByTestId} = render(<Provider store={store}><ArticleComments/></Provider>);

    await waitFor(() => {
      fireEvent.click(getByTestId("postRequest"));
  })
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(3);
    })
  });

test("matches snapshot", () => {
  const tree = TestRenderer.create(<Provider store={store}><ArticleComments/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});