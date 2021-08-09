import Link from 'next/link';

import { logoutUser } from '../../utils/auth';
import AdminLayout from '../../components/shared/Layout/AdminLayout';

import { checkUserAuthenticated } from '../../utils/auth';

const withAuthentication = (WrappedComponent) => {
  return class AuthenticatedComponent extends React.Component {
    static async getInitialProps(ctx) {
      // get wrapped component's getInitialProps
      let componentProps = {};

      if (WrappedComponent.getInitialProps) {
        componentProps = await WrappedComponent.getInitialProps();
      }

      console.log('withAuthentication PROPS:', componentProps);

      // return those props
      return {
        // nextjs ctx props passed down to component from our HOC
        pathname: ctx.pathname,
        query: ctx.query,
        ...componentProps
      };
    }

    state = {
      authenticatedUser: false
    };

    async componentDidMount() {
      // check for authenticated user from server
      const authenticatedUser = await checkUserAuthenticated();

      console.log('Authentication Response:', authenticatedUser);

      this.setState({
        authenticatedUser
      });
    }

    // async componentDidUpdate(prevProps, prevState) {
    //   console.log('prevState', prevState);
    //   console.log('Current State:', this.state);

    //   if (prevState !== this.state) {
    //     const authenticatedUser = await checkUserAuthenticated();
    //     this.setState({
    //       authenticatedUser
    //     });
    //   }
    // }

    render() {
      const { authenticatedUser } = this.state;

      console.log('Authenticated User:', authenticatedUser);

      // if authenticated, return the wrapped component
      if (authenticatedUser) {
        // pass initial props back to wrapped component
        return <WrappedComponent {...this.props} user={authenticatedUser} />;
      }
      // else show error message and request log in
      else {
        return (
          <AdminLayout>
            <div className="pt-5">您未登入, 請登入後在回到這一頁</div>
            <div className="mt-5">
              <a href="javascript:;" onClick={() => logoutUser()}>
                登入
              </a>
            </div>
            <div className="mt-5">
              <Link href="/">
                <a>首頁</a>
              </Link>
            </div>
          </AdminLayout>
        );
      }
    }
  };
};

export default withAuthentication;
