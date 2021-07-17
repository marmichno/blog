export const getArticle = async (id) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const response = await request.json();
    return response;
}