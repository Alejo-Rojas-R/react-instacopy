import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export const PostActions = ({ post, user }) => {
    const liked = JSON.parse(localStorage.getItem('saved'));

    const [likedData, setLikedData] = useState(liked === null ? [] : liked);

    const pairLikedData = (postId) => {
        const isLiked = likedData.some(post => (post.postId === postId && post.userId === user.id), user)

        return (isLiked === true) ? 'list-item__action-like--liked' : '';
    }

    const savePost = (e, postId) => {

        // Validate if user is logged in
        if (Object.keys(user).length == 0) {
            alert('Please login to do this action.');
            return false;
        }

        let likedItems = likedData;

        // If item is already liked, remove it by filtering the others
        const isLiked = likedItems.some(post => (post.postId === postId && post.userId === user.id), user);
        if (isLiked) {
            likedItems = likedItems.filter(post => (post.postId !== postId || post.userId !== user.id), user);
        }
        // If item is not in the array add it
        else {
            const itemToSave = {
                'userId': user.id,
                'postId': postId
            };

            likedItems.push(itemToSave);
        }

        localStorage.setItem('saved', JSON.stringify(likedItems));
        setLikedData(likedItems);
    }

    return (
        <>
            <div className='list-item__user'>
                <img className='avatar list-item__avatar' src={post.user.avatar} />
                &nbsp;
                <strong><NavLink to={`profile/${post.user.id}`}>{post.user.first_name} {post.user.last_name}</NavLink></strong>
            </div>
            <div className='list-item__actions'>
                <div className={'list-item__action-like ' + pairLikedData(post.photo.id)} onClick={e => savePost(e, post.photo.id)}>
                    <FontAwesomeIcon icon={faHeart} color={'black'} />
                </div>
            </div>
            <div className='list-item__caption'>
                {post.photo.title}
            </div>
        </>
    )
}
