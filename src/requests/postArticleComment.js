export const postArticleComment = async (postId, name, email, body) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify(
        {
            "postId":1,
            "name":name,
            "email":email,
            "body":body
        }
    );

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
    };

    const request = await fetch("https://jsonplaceholder.typicode.com/comments", requestOptions)
    const response = await request.json();
    return response;
}