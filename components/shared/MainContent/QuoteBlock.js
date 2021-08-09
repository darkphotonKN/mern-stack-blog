const QuoteBlock = ({ content, author }) => {
  return (
    <div className="quote-wrap">
      <p className="quote" />
      {content}
      <div className="author text-right">- {author}</div>
    </div>
  );
};

export default QuoteBlock;
