export const chooseArticleReducer = (state = localStorage.getItem('articleId'), action) => {

    const articleId = action.payload;
    
    switch(action.type){
        case 'CHOOSEARTICLE':

        return state = parseInt(articleId);

        default:
            if(state !== null){
                return parseInt(state);
            }else{
                return state;
            }
    }
}

export default chooseArticleReducer