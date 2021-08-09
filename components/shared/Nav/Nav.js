import Link from 'next/link';
import Date from '../MainContent/Date';

class Nav extends React.Component {
  state = {
    currentURL: '',
  };

  componentDidMount() {
    this.setState({
      currentURL: window.location.pathname,
    });
  }
  render() {
    const { currentURL } = this.state;

    console.log('Url:', currentURL);

    return (
      <div className="row nav-bar px-4">
        <div className="col-md-7 col-12 nav-date">
          <Date />
        </div>
        <div className="col-md-5 col-12 text-center">
          <nav className="main-nav">
            <ul className="nav-list d-none d-md-block mb-0">
              <li className="list-item">
                <Link prefetch href="/">
                  <a className={currentURL === '/' ? 'active' : ''}>Blog</a>
                </Link>
              </li>
              <li className="list-item">
                <Link prefetch href="/about">
                  <a className={currentURL === '/about' ? 'active' : ''}>
                    About
                  </a>
                </Link>
              </li>
              <li className="list-item">
                <Link prefetch href="/contact">
                  <a className={currentURL === '/contact' ? 'active' : ''}>
                    Contact
                  </a>
                </Link>
              </li>

              {/* Intagram */}

              <li className="list-item">
                <a href="https://www.instagram.com/">
                  <i className="fab fa-instagram" />
                </a>
              </li>

              {/* Facebook */}
              <li className="list-item">
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
            </ul>

            <ul className="nav-list d-block d-md-none mt-2">
              <li className="list-item">
                <Link prefetch href="/">
                  <a className={currentURL === '/' ? 'active' : ''}>Blog</a>
                </Link>
              </li>
              <li className="list-item">
                <Link prefetch href="/about">
                  <a className={currentURL === '/about' ? 'active' : ''}>
                    About
                  </a>
                </Link>
              </li>
              <li className="list-item">
                <Link prefetch href="/contact">
                  <a className={currentURL === '/contact' ? 'active' : ''}>
                    Contact
                  </a>
                </Link>
              </li>
              <li className="list-item ml-3">
                <a href="https://www.instagram.com/">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li className="list-item">
                <a href="">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile fb and instagram */}

          {/* <div className="row">
            <li className="list-item d-flex d-sm-none">
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
            </li>

            <li className="list-item d-flex d-sm-none">
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Nav;
