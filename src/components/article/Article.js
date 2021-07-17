import ArticlesCSS from './article.module.css';
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { chooseArticle } from '../../actions';
import React from 'react';

export const Article = ({id, title, paragraph}) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const navigateTofullArticle = (e) => {

        const id = e.target.dataset.articleid;

        dispatch(chooseArticle(id));
        localStorage.setItem('articleId', id)

        const location = {
            pathname: '/article',
            state: {
                articleId:id
            }
        }
        history.push(location);
    }

    const favorites = (e) => {
        let target = e.target;
        const articleId = target.dataset.articleid;
        let favorites = localStorage.getItem('favorites');
        favorites = favorites ? favorites.split(',') : [];

        if(!target.classList.contains(`${ArticlesCSS['articleContainer__favourite--active']}`)){
            e.target.classList.add(`${ArticlesCSS['articleContainer__favourite--active']}`);
            favorites.push(articleId);
        }else{
            e.target.classList.remove(`${ArticlesCSS['articleContainer__favourite--active']}`);
            favorites = favorites.filter(value => value === articleId ? false : true);
        }

        localStorage.setItem('favorites', favorites.toString());
    }

    const checkIfFavorite = (id) => {
        const favorites = localStorage.getItem('favorites');
        if(favorites){
            return favorites.split(',').filter(value => parseInt(value) === id ? true : false).length > 0 ? true : false;
        }else{
            return false;
        }
    }

    return(
        <div data-testid="articleContainer" className={ArticlesCSS.articleContainer}>
            <span className={ArticlesCSS.articleContainer__image}></span>
            <div className={ArticlesCSS.articleContainer__textContainer}>
                <h2 className={ArticlesCSS.articleContainer__textContainer__header}>{title}</h2>
                <p className={ArticlesCSS.articleContainer__textContainer__published}>07/12/2021 | John Doe</p>
                <p className={ArticlesCSS.articleContainer__textContainer__paragraph}>{paragraph}</p>
                <button className={ArticlesCSS.articleContainer__textContainer__button} data-articleid={id} onClick={navigateTofullArticle}>Read more ⤴</button>
            </div>
            {
                checkIfFavorite(id) ? 
                <div className=
                {`${ArticlesCSS.articleContainer__favourite} ${ArticlesCSS['articleContainer__favourite--active']}`}
                onClick={favorites}
                data-testid="favorite"
                data-articleid={id}>
                </div>
                :
                <div data-testid="addToFavorite" className={ArticlesCSS.articleContainer__favourite} data-articleid={id} onClick={favorites}></div>
            }
        </div>
    )
}