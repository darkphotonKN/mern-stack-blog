import Head from 'next/head';
import Link from 'next/link';

import AdminBar from '../MainContent/AdminBar';

export default class AdminLayout extends React.Component {
  static async getInitialProps(context) {
    return {
      query: context.query
    };
  }
  render() {
    const { user, loginPage, query } = this.props;
    console.log('User:', user);
    console.log('Query:', this.props.pathname);

    return (
      <div className="admin-app">
        <Head>
          <title>用戶專區</title>
        </Head>
        <AdminBar user={user} />
        {/* mobile nav */}
        <div
          className={
            loginPage
              ? 'nav-section mobile mt-4'
              : 'nav-section mobile mt-4 d-block d-md-none'
          }
        >
          <nav>
            <ul>
              <li>
                <Link href="/admin/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/admin/blog">
                  <a>Blog Posts</a>
                </Link>
              </li>
              {/* <li>
                <Link href="/admin/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link href="/admin/profile">
                  <a>Contact</a>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
        <section id="admin-area">
          {!loginPage ? (
            <>
              {/* Desktop */}
              <div className="nav-section d-none d-md-block">
                <nav>
                  <ul>
                    <li className="title mb-3">Menu</li>

                    <li>
                      <Link href="/admin/profile">
                        <a>Profile</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/blog">
                        <a>Blog Posts</a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/admin/about">
                        <a>About</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/profile">
                        <a>Contact</a>
                      </Link>
                    </li> */}
                  </ul>
                </nav>
              </div>
            </>
          ) : null}
          <div
            className="bg-overlay"
            style={loginPage ? { backgroundColor: 'rgba(0, 0, 0, 0)' } : null}
          >
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
}
