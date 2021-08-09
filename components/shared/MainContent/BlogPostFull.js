import QuoteBlock from '../../shared/MainContent/QuoteBlock';
import BackButton from '../../shared/MainContent/BackButton';

const BlogPostFull = ({ id, content, title, date, noContent }) => {
  console.log('Id:', id);

  if (!content) {
    return (
      <div className="blog-post-full container">
        <div className="row">
          <div className="blog-title text-center col-12">
            There is no content for this blog story! Sorry please check again
            later :)
          </div>
        </div>

        <BackButton />
      </div>
    );
  } else {
    return (
      <div className="blog-post-full container px-3 px-md-5">
        <div className="row">
          <div className="blog-title text-center col-12">
            {title}
            {id}
          </div>
        </div>
        <div className="row">
          <div className="blog-date mt-3 col-12 text-center">{date}</div>
        </div>

        <div className="row">
          <div className="col-12 my-5">
            <QuoteBlock
              content={
                'Grant me the serenity to accept the things I cannot change, the courage to change the things that I can, and the wisdom to know the difference.'
              }
              author={'Anonymous'}
            />
          </div>
        </div>

        <div className="row">
          <div className="blog-content mt-2 col-12 col-md-10 offset-md-1">
            {' '}
            {content.split('\n').map((paragraph) => (
              <p>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="blog-author col-12 mt-4">Jane Doh</div>
        </div>

        <BackButton />
        {/* Comments Section */}
      </div>
    );
  }
};

export default BlogPostFull;
