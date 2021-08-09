import Link from 'next/link';
import Router from 'next/router';
import moment from 'moment';

import AdminLayout from '../../../components/shared/Layout/AdminLayout';
import withAuthentication from '../../../components/HOC/withAuthentication';
import Loading from '../../../components/shared/MainContent/Loading';
import { fetchData, postData } from '../../../api/helper';

class BlogIndex extends React.Component {
  state = {
    blogPosts: null,

    deletedPost: undefined
  };

  async componentDidMount() {
    const blogPosts = await fetchData('/api/posts');

    this.setState({
      blogPosts: blogPosts.currentPosts
    });
  }

  handleDelete = async (e, id) => {
    // stops event bubbling
    e.stopPropagation();
    const { data } = await postData(`/api/posts/delete/${id}`);

    this.setState({
      deletedPost: data
    });
  };

  render() {
    const { blogPosts, deletedPost } = this.state;

    console.log('BlogPosts:', blogPosts);

    return (
      <AdminLayout user={this.props.user}>
        <section id="admin-pages">
          <div className="row">
            <div className="col-12 text-right">
              <Link href="/admin/blog/add">
                <button className="submit-btn">新增</button>
              </Link>
            </div>
          </div>

          {blogPosts ? (
            blogPosts.map((post, index) => (
              <div className="post row pr-0" key={post._id}>
                {deletedPost && deletedPost._id === post._id ? (
                  <div className="mt-4 col-12 col-md-10 pr-0">
                    <div className="post-no">Post {index + 1}</div>
                    <hr />
                    <div>
                      <span>名稱</span> {post.title}{' '}
                    </div>
                    <div className="date">
                      <span>日期</span> {moment(post.date).format('YYYY/MM/DD')}
                    </div>
                    <div className="content-title">
                      <span>內容</span>
                    </div>
                    <div className="content-detail">{post.content}</div>
                  </div>
                ) : (
                  <Link href={`/admin/blog/edit?id=${post._id}`}>
                    <div className="mt-4 col-12 col-md-10 pr-0">
                      <div className="post-no">Post {index + 1}</div>
                      <hr />
                      <div>
                        <span>名稱</span> {post.title}{' '}
                        <div
                          className="btns d-flex justify-content-center"
                          style={{ float: 'right' }}
                        >
                          <Link href={`/admin/blog/edit?id=${post._id}`}>
                            <button className="edit-btn mr-3">更新</button>
                          </Link>
                          <button
                            className="delete-btn"
                            onClick={(e) => this.handleDelete(e, post._id)}
                          >
                            刪除
                          </button>
                        </div>
                      </div>
                      <div className="date">
                        <span>日期</span>{' '}
                        {moment(post.date).format('YYYY/MM/DD')}
                      </div>
                      <div className="content-title">
                        <span>內容</span>
                      </div>
                      <div className="content-detail">{post.content}</div>
                    </div>
                  </Link>
                )}
                {deletedPost && deletedPost._id === post._id ? (
                  <div className="col-12 mt-3">
                    <p className="deleted-post-msg">
                      成功刪除了 “{post.title}”
                    </p>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <Loading />
          )}
        </section>
      </AdminLayout>
    );
  }
}

export default withAuthentication(BlogIndex);
