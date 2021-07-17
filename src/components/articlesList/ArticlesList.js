import ArticlesListCSS from './articlesList.module.css';
import React from 'react';
import {Article} from '../article/Article';
import {useEffect, useState} from 'react';
import {getArticles} from '../../requests/getArticles';

export const ArticlesList = () => {
    
    const [request, setRequest] = useState([]);

    useEffect(() => {
        getArticlesRequest();
    },[]);

    const getArticlesRequest = async () => {
        const response = await getArticles();
        setRequest(response);
    }

    if(request.length > 0){
        return(
            <div className={ArticlesListCSS.articlesSectionContainer}>
                <div className={ArticlesListCSS.articlesContainer}>
                    {request.map(value => {
                        return <Article key={value.id} id={value.id} title={value.title} paragraph={value.body}/>
                    })}
                </div>
            </div>
        )
    }else{
        return(
            <div className={ArticlesListCSS.articlesSectionContainer}></div>
        )
    }
}