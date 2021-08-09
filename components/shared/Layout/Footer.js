import Link from 'next/link';

const Footer = ({ title }) => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4  text-center">
            <h4 className="title mb-5">Disclaimer</h4>
            <p className="footer-content text-left d-flex align-items-center justify-content-center flex-column">
              This site is not intended to provide and does not constitute
              medical, legal, or other professional advice. The content on{' '}
              {title} is designed to support, not replace, medical or
              psychiatric treatment. Please seek professional care if you
              believe you may have a condition.
              {/* Before using the site, please
              read our Privacy Policy and Terms of Use. */}
            </p>
          </div>

          <div className="col-md-4 text-center ">
            <h4 className="title mb-5">Learn More</h4>
            <ul className="social-list text-left">
              <li>
                <i className="fab fa-facebook-f mr-4" />

                <a href="#">Facebook</a>
              </li>
              <li>
                <i className="far fa-envelope mr-4" />
                <a href="#">Email</a>
              </li>
              <li>
                <i className="fab fa-twitter mr-4" />
                <a href="#">Twitter</a>
              </li>
              <li>
                <i className="fab fa-instagram mr-4" />
                <a href="https://www.instagram.com/">Instagram</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 text-center ">
            <h4 className="title mb-5">Credits & Copyright</h4>
            <p className="text-left">Hosted on Heroku</p>
            <p className="text-left">Copyright &#169; 2020 Jane Doe</p>
            <p className="text-left">
              <Link href="/admin/login">
                <a className="admin-login-redirect-btn">用戶登入</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
