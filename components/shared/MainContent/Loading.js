import Loader from 'react-spinners/ClipLoader';

const Loading = ({ isLoading }) => {
  return (
    <div className="loading">
      <Loader
        css={`
          display: block;
          margin: 0 auto;
          margin-top: 80px;
        `}
        sizeUnit={'px'}
        size={120}
        color={'#FFDBCC'}
        loading={isLoading}
      />
    </div>
  );
};

export default Loading;
