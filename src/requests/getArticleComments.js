export const getArticleComments = async (id) => {
    try{
        const request = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const response = await request.json();
        return response;
    }catch(error){
        console.log(error);
    }
}