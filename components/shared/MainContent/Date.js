import Moment from 'react-moment';

class Date extends React.Component {
  state = {
    dateToFormat: ''
  };

  render() {
    const { dateToFormat } = this.state;
    console.log('Date to format:', dateToFormat);

    return <Moment format="YYYY, MMMM Do" />;
  }
}

export default Date;
