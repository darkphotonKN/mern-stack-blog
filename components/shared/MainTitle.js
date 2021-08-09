import Link from 'next/link';

const MainTitle = ({ title }) => {
  return (
    <div className="row mb-2 px-4">
      <div className="col-12 text-center text-md-left">
        <h2>
          <div className="title-wrap">
            <div className="main-title">
              <Link href="/">
                <a>{title}</a>
              </Link>
            </div>
            {/* Add for Underline */}
            {/* <div className="main-title-underline" /> */}
          </div>
        </h2>
      </div>
    </div>
  );
};

export default MainTitle;
