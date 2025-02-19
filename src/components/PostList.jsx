import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'
import { deletePost } from '../api/posts.js'

export function PostList({ posts = [] }) {
  const queryClient = useQueryClient()
  const deletePostMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })
  const handleDelete = (e, id) => {
    e.preventDefault()
    deletePostMutation.mutate(id)
  }

  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <input
            type='button'
            value='Delete'
            onClick={(e) => handleDelete(e, post._id)}
          />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}
