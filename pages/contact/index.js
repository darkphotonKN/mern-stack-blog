import Layout from '../../components/shared/Layout/Layout';

const ContactIndex = () => {
  return (
    <Layout subtitle={'Contact'} sidebar>
      <section id="contact">
        <div className="row mt-4">
          <div className="col-12 ">
            <p>There are a few ways you can reach me.</p>

            <p className="mt-5">
              For business or related inquiries please use this email:
            </p>
            <p className="important">myworkemail@gmail.com</p>
            <p>
              Anything unrelated to business sent to this email{' '}
              <span style={{ fontWeight: '600' }}>will be ignored</span>.
            </p>
            <p className="mt-5">
              For general questions or comments don't hesitate to email me at:
            </p>
            <p className="important">janedoe@gmail.com</p>
            <p className="mt-5">
              And you are also welcome to follow or comment on my social media
              accounts shown below.
            </p>
          </div>
        </div>

        <div className="mt-5 social-media-icons">
          <div className="icon-row row">
            <div className="col-4 text-center">
              <a href="#">
                <i className="fab fa-facebook-f mr-4" />
              </a>
            </div>
            <div className="col-4 text-center">
              <a href="#">
                <i className="fab fa-twitter mr-4" />
              </a>
            </div>
            <div className="col-4 text-center">
              <a href="https://www.instagram.com/">
                <i className="fab fa-instagram mr-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactIndex;
