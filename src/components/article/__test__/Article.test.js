import { createStore, applyMiddleware, Provider} from 'redux';
import {Article} from '../Article';
import validArticlesJson from '../__mocks__/validArticles.json';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

const store = createStore(() => [], {}, applyMiddleware());



// test("check if articles are visible after api call", async () => {
//     fetch.mockResolvedValue(validArticlesJson);

//     const {getAllByText} = render(<Provider store={store}><Article/></Provider>);

// })