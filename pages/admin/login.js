import Router from 'next/router';

import AdminLayout from '../../components/shared/Layout/AdminLayout';

import { loginUser } from '../../utils/auth';

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmit = (e) => {
    console.log('E:', e);
    e.preventDefault();

    const { username, password } = this.state;

    loginUser(username, password)
      .then((res) => {
        // reject unauthorized users
        if (!res) {
          return Promise.reject();
        }

        // redirect authorized users
        console.log('Logged in, response was:', res);
        Router.push('/admin/profile');
      })
      .catch((err) => {
        this.setState({
          errMsg: '名稱或密碼錯誤'
        });
        console.log('Error while logging in:', err);
      });
  };

  handleInpChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { username, password, errMsg } = this.state;

    return (
      <AdminLayout loginPage>
        <section id="login">
          <div className="login-form">
            <div className="login-title">
              <h3>會員登入</h3>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="input-wrap">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="username" className="mr-3 mt-4">
                      登入名稱
                    </label>
                    <input
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      onChange={this.handleInpChange}
                      value={username}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <label htmlFor="Password" className="mt-3 r-3">
                      密碼
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      onChange={this.handleInpChange}
                      value={password}
                    />
                  </div>
                </div>

                {/* Error Message */}

                {errMsg ? (
                  <div className="error-msg text-danger mt-3">{errMsg}</div>
                ) : null}

                <button type="submit" className="submit-btn mt-5">
                  登入
                </button>
              </div>
            </form>
          </div>
        </section>
      </AdminLayout>
    );
  }
}

export default Login;
