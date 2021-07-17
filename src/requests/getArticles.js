export const getArticles = async () => {
    try{
        const request = await fetch('https://jsonplaceholder.typicode.com/posts');
        const response = await request.json();
        return response;
    }catch(error){
        console.log(error);
    }
}