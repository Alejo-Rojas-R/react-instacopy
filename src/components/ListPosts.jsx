import React from 'react'
import { PostActions } from './PostActions'

export const ListPosts = ({ data, user, showDetails }) => {

    return (
        data.map(post => {
            return (
                <div key={post.id ?? post.photo.id} className='list-item'>
                    <div className='list-item__top'>
                        <img className='list-item__image' src={post.url ?? post.photo.url} alt='' />
                    </div>
                    {showDetails &&
                        <div className='list-item__bottom'>
                            <PostActions post={post} user={user} />
                        </div>
                    }
                </div>)
        })
    )
}
