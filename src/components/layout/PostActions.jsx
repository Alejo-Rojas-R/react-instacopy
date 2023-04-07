import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export const PostActions = ({ postProp, userProp }) => {

    const [color, setColor] = useState('black');

    useEffect(() => {
        const likedStorage = JSON.parse(localStorage.getItem('saved')) ?? [];

        // Get liked elements
        const isLiked = likedStorage.some(post => (post.postId === postProp.photo.id && post.userId === userProp.id));

        setColor(isLiked ? 'red' : 'black');
    }, [color]);

    const savePost = (postId) => {
        // Validate if user is logged in
        if (Object.keys(userProp).length == 0) {
            alert('Please login to perform this action.');
            return false;
        }

        let likedStorage = JSON.parse(localStorage.getItem('saved')) ?? [];

        // Validate if clicked post is inside the liked elements
        const isLiked = likedStorage.some(post => (post.postId === postId && post.userId === userProp.id));

        // If item is already liked, remove it by filtering the others
        if (isLiked) {
            likedStorage = likedStorage.filter(post => (post.postId !== postId || post.userId !== userProp.id));

            localStorage.setItem('saved', JSON.stringify(likedStorage));

            setColor('black');
        }
        // If item is not in the array add it
        else {
            const itemToSave = {
                'userId': userProp.id,
                'postId': postId
            };

            likedStorage.push(itemToSave);

            localStorage.setItem('saved', JSON.stringify(likedStorage));

            setColor('red');
        }
    }

    return (
        <>
            <div className='list-item__user'>
                <img className='avatar list-item__avatar' src={postProp.user.avatar} />
                &nbsp;
                <strong><NavLink to={`profile/${postProp.user.id}`}>{postProp.user.first_name} {postProp.user.last_name}</NavLink></strong>
            </div>
            <div className='list-item__actions'>
                <div className={'list-item__action-like'} onClick={() => { savePost(postProp.photo.id) }}>
                    <FontAwesomeIcon icon={faHeart} color={color} />
                </div>
            </div>
            <div className='list-item__caption'>
                {postProp.photo.title}
            </div>
        </>
    )
}
