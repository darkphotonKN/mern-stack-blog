import ReactPaginate from 'react-paginate';
import moment from 'moment';

import Layout from '../components/shared/Layout/Layout';
import BlogPost from '../components/shared/MainContent/BlogPost';
import Loading from '../components/shared/MainContent/Loading';

import { fetchData } from '../api/helper';

class Index extends React.Component {
  static async getInitialProps() {
    // const blogPosts = await fetchData('/api/posts');

    return {
      // posts,
      // blogPostsa
      blogPosts: []
    };
  }

  state = {
    posts: undefined,
    page: 1,
    pageSize: 6
  };

  async componentDidMount() {
    const { page, pageSize } = this.state;

    const posts = await fetchData(`/api/posts?page=${page}&size=${pageSize}`);

    this.setState({
      noOfPages: Math.ceil(posts.total / pageSize),
      posts: posts.currentPosts
    });
  }

  // Pagination
  handlePageClick = async (page) => {
    const upcomingPage = page.selected + 1;

    let data;

    try {
      data = await fetchData(
        `/api/posts?page=${upcomingPage}&size=${this.state.pageSize}`
      );
    } catch (err) {
      console.log(`Error: ${err}`);
    }

    if (data) {
      this.setState(
        {
          posts: data.currentPosts
        },
        () => window.scrollTo(0, 0)
      );
    }
  };

  render() {
    const { blogPosts } = this.props;
    const { posts, noOfPages } = this.state;

    console.log('POSTS:', posts);
    console.log('NO OF PAGES:', noOfPages);

    return (
      <Layout subtitle={'Latest Stories'} sidebar>
        <div className="blog-post-list">
          {posts ? (
            posts.map((post) => (
              <BlogPost
                key={post._id}
                id={post._id}
                date={moment(post.date).format('YYYY/MM/DD')}
                content={post.content}
                title={post.title}
              />
            ))
          ) : (
            <Loading />
          )}

          {/* <Pagination /> */}
          {posts ? (
            <div className="row pagination">
              <div className="col-12 d-flex justify-content-center">
                <ReactPaginate
                  previousLabel={'<'}
                  disabledClassName={'disabled'}
                  nextLabel={'>'}
                  pageCount={noOfPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                />
              </div>
            </div>
          ) : null}
        </div>
      </Layout>
    );
  }
}

export default Index;
