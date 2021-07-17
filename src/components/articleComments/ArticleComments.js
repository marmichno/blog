import React from 'react';
import { useEffect, useState } from 'react';
import ArticleCommentsCSS from './articleComments.module.css';
import {useSelector} from 'react-redux';
import {getArticleComments} from '../../requests/getArticleComments';
import {postArticleComment} from "../../requests/postArticleComment";

export const ArticleComments = () => {

    const [comments, setComments] = useState([]);
    const selectedArticleId = useSelector(state => state.chooseArticleReducer);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userComment, setUserComment] = useState("");

    useEffect(() => {
        getComments();
    },[]);

    const getComments = async () => {
        const response = await getArticleComments(selectedArticleId);
        setComments(response);
    }

    const postComment = async () => {
        const request = await postArticleComment(selectedArticleId, userName, userEmail, userComment);
        getComments();
    }

    //inputs
    const handleUserCommentChange = (e) => {
        setUserComment(e.target.value);
    }

    const handleUserEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }   

    if(comments !== undefined){
        return(
            <div className={ArticleCommentsCSS.commentsContainer}>
                <div className={ArticleCommentsCSS.commentsContainer__postCommentContainer}>
                    <label htmlFor="userName" className={ArticleCommentsCSS.commentsContainer__postCommentContainer__label}>
                        <span className={ArticleCommentsCSS.commentsContainer__postCommentContainer__span}>
                            <p className={ArticleCommentsCSS.commentsContainer__postCommentContainer__span__paragraph}>Name</p>
                        </span>
                    </label>
                    
                    <input type="text" autoComplete="off" name="userName" 
                    className={ArticleCommentsCSS.commentsContainer__postCommentContainer__input}
                    onChange = {handleUserNameChange}
                    required>
                    </input>

                    <label htmlFor="userEmail" className={ArticleCommentsCSS.commentsContainer__postCommentContainer__label}>
                        <span className={ArticleCommentsCSS.commentsContainer__postCommentContainer__span}>
                            <p className={ArticleCommentsCSS.commentsContainer__postCommentContainer__span__paragraph}>Email</p>
                        </span>
                    </label>

                    <input type="text" autoComplete="off" name="userEmail" 
                    className={ArticleCommentsCSS.commentsContainer__postCommentContainer__input}
                    onChange = {handleUserEmailChange}
                    required>
                    </input>

                    <label htmlFor="commentBody" className={ArticleCommentsCSS.commentsContainer__postCommentContainer__label}>
                        <span className={ArticleCommentsCSS.commentsContainer__postCommentContainer__span}>
                            <p className={ArticleCommentsCSS.commentsContainer__postCommentContainer__span__paragraph}>Comment</p>
                        </span>
                    </label>

                    <textarea type="text" autoComplete="off" name="commentBody" 
                    className={ArticleCommentsCSS.commentsContainer__postCommentContainer__textArea}
                    onChange = {handleUserCommentChange}
                    required>
                    </textarea>
                    <button className={ArticleCommentsCSS.commentsContainer__postCommentContainer__button} onClick={postComment}>Add comment</button>
                </div>

                {comments.map(value => {
                    return <div className={ArticleCommentsCSS.commentsContainer__commentContainer}>
                        <p className={ArticleCommentsCSS.commentsContainer__commentContainer__name}>{value.name} 
                            <span className={ArticleCommentsCSS.commentsContainer__commentContainer__name__date}> - 07/12/2021 14:26</span>
                        </p>
                        <p className={ArticleCommentsCSS.commentsContainer__commentContainer__email}>{value.email}</p>
                        <p className={ArticleCommentsCSS.commentsContainer__commentContainer__body}>{value.body}</p>
                    </div>
                })}
            </div>
        )
    }else{
        return(
            <div className={ArticleCommentsCSS.commentsContainer}></div>
        )
    }
}