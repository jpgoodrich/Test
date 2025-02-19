import PropTypes from 'prop-types'

export function Post({ title, contents, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}

/*
PropTypes are used to validate the props passed to React components and to 
ensure that we are passing the correct props when using JavaScript. When 
using a type-safe language, such as TypeScript, we can instead do this by 
directly typing the props passed to the component.
*/
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
