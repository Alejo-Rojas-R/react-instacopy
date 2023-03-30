import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export const PostActions = ({ post, user }) => {

    const pairLikedData = (postId) => {
        const likedData = JSON.parse(localStorage.getItem('saved'));

        const isLiked = likedData.some(post => (post.postId === postId && post.userId === user.id), user)

        return (isLiked === true) ? 'list-item__action-like--liked' : '';
    }

    const savePost = (postId) => {
        // Validate if user is logged in
        if (Object.keys(user).length == 0) {
            alert('Please login to do this action.');
            return false;
        }

        let savedItems = JSON.parse(localStorage.getItem('saved'));

        if (savedItems == null) {
            savedItems = [];
        }

        const itemToSave = {
            'userId': user.id,
            'postId': postId
        };

        savedItems.push(itemToSave);

        localStorage.setItem('saved', JSON.stringify(savedItems));
    }

    return (
        <>
            <div className='list-item__user'>
                <img className='avatar list-item__avatar' src={post.user.avatar} />
                &nbsp;
                <strong><NavLink to={`profile/${post.user.id}`}>{post.user.first_name} {post.user.last_name}</NavLink></strong>
            </div>
            <div className='list-item__actions'>
                <div className={'list-item__action-like ' + pairLikedData(post.photo.id)} onClick={e => savePost(post.photo.id)}>
                    <FontAwesomeIcon icon={faHeart} color={'black'} />
                </div>
            </div>
            <div className='list-item__caption'>
                {post.photo.title}
            </div>
        </>
    )
}
