import moment from 'moment';

import Layout from '../../components/shared/Layout/Layout';
import BlogPostFull from '../../components/shared/MainContent/BlogPostFull';
import Loading from '../../components/shared/MainContent/Loading';

import { fetchData } from '../../api/helper';

export default class BlogDetail extends React.Component {
  static async getInitialProps(context) {
    const { req } = context;
    console.log('Request:', req);
    const { id } = context.query;

    // const { data } = fetchData(`http://localhost:3069/api/posts/${id}`);

    return {
      id
      // post: data
    };
  }

  state = {
    post: undefined
  };

  async componentDidMount() {
    const response = await fetchData(`/api/posts/${this.props.id}`);
    this.setState({ post: response });
  }

  render() {
    const { id } = this.props;
    const { post } = this.state;

    console.log('Blog Post:', post);
    return (
      <Layout>
        <div className="blog-detail">
          {post ? (
            <BlogPostFull
              content={post.content}
              title={post.title}
              date={moment(post.date).format('YYYY/MM/DD')}
            />
          ) : (
            <Loading />
          )}
        </div>
      </Layout>
    );
  }
}
