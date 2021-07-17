import React from 'react';
import { useState, useEffect } from 'react';
import FullArticleCSS from './fullArticle.module.css';
import {useSelector} from 'react-redux';
import {getArticle} from '../../requests/getArticle';
import {ArticleComments} from '../articleComments/ArticleComments';

export const FullArticle = () => {

    const [article, setArticle] = useState([]);
    const selectedArticleId = useSelector(state => state.chooseArticleReducer);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        getArticleRequest();
        checkIfFavorite();
    },[]);

    const checkIfFavorite = () => {
        let favorites = localStorage.getItem('favorites');
        favorites = favorites ? favorites.split(',') : [];

        favorites = favorites.filter(value => parseInt(value) === selectedArticleId ? true : false);

        setFavorite(favorites.length > 0 ? true : false);
    }

    const addToFavorite = () => {
        let favorites = localStorage.getItem('favorites');
        favorites = favorites ? favorites.split(',') : [];
        favorites.push(selectedArticleId);
        localStorage.setItem('favorites', favorites.toString());
        setFavorite(true);
    }

    const getArticleRequest = async () => {
        const response = await getArticle(selectedArticleId);
        setArticle(response);
    }

    if(article !== undefined){
        return(
            <div className={FullArticleCSS.articleContainer}>
                <div className={FullArticleCSS.articleContainer__heroContainer}>
                    <div className={FullArticleCSS.articleContainer__heroContainer__imageContainer}></div>
                    <div className={FullArticleCSS.articleContainer__heroContainer__textContainer}>
                        <h2 className={FullArticleCSS.articleContainer__heroContainer__textContainer__header}>{article.title}</h2>
                        <p className={FullArticleCSS.articleContainer__heroContainer__textContainer__author}>07/12/2021 | John Doe</p>
                        { favorite ?
                        <div className={FullArticleCSS.articleContainer__heroContainer__textContainer__favorite}></div>
                        :
                        null
                    }
                    </div>
                </div>

                <div className={FullArticleCSS.articleContainer__fullTextContainer}>
                    <p className={FullArticleCSS.articleContainer__fullTextContainer__text}>
                        {article.body}
                    </p>
                </div>
                {!favorite ?
                    <div className={FullArticleCSS.articleContainer__addToFavoritesContainer}>
                        <h2 className={FullArticleCSS.articleContainer__addToFavoritesContainer__text}>Did you enjoy reading this article? Add it to 
                            <button className={FullArticleCSS.articleContainer__addToFavoritesContainer__text__button} onClick={addToFavorite}>favorites</button>
                        </h2>
                    </div>
                :
                null
                }
                <ArticleComments/>
            </div>
        )
    }else{
        return(
            <div className={FullArticleCSS.articleContainer}></div>
        )
    }
}