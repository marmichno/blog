import { createStore, applyMiddleware, Provider} from 'redux';
import {ArticleComments} from '../ArticleComments';
import validArticleComments from '../__mocks__/validArticleComments.json';

const store = createStore(() => [], {}, applyMiddleware());

test("check if comments are visible after api call", async () => {

    fetch.mockResponseOnce(JSON.stringify(validArticleComments));

    const {getAllByText} = render(<Provider store={store}><ArticleComments/></Provider>);

    await waitFor(() => {
        expect(getAllByText('id labore ex et quam laborum'));
        expect(getAllByText('Eliseo@gardner.biz'));
        expect(getAllByText('laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'));
    })
})