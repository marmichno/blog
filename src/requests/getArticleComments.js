export const getArticleComments = async (id) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    const response = await request.json();
    return response;
}