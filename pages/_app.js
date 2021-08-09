import App from 'next/app';

import '../public/static/css/main.css';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}
