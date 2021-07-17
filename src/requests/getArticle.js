export const getArticle = async (id) => {
    try{
        const request = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const response = await request.json();
        return response;
    }catch(error){
        console.log(error);
    }
}