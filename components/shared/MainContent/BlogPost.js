import Link from 'next/link';
import Router from 'next/router';

const BlogPost = ({ id, content, title, date }) => {
  let textContent = content;

  if (content.length > 200) {
    textContent = `${content.slice(0, 199)}...`;
  }
  return (
    <div className="blog-post">
      <Link prefetch href={`/blog/detail?id=${id}`}>
        <a>
          <div className="blog-title">{title}</div>
        </a>
      </Link>
      <div className="blog-date mt-1">{date}</div>
      <div className="blog-content mt-2">
        {textContent.split('\n').map((paragraph) => (
          <p>{paragraph}</p>
        ))}
      </div>
      <i className="facebook-f" />

      <button
        className="blog-btn"
        onClick={() => Router.push(`/blog/detail?id=${id}`)}
      >
        Read More
      </button>
      <hr />
    </div>
  );
};

export default BlogPost;
