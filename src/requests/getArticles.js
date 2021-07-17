export const getArticles = async () => {
    const request = await fetch('https://jsonplaceholder.typicode.com/posts');
    const response = await request.json();
    return response;
}