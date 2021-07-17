export const chooseArticle = (articleId) => {
    return{
        type: 'CHOOSEARTICLE',
        payload: articleId
    }
}