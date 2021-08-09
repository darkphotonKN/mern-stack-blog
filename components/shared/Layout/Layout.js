import { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import NProgress from 'nprogress';

import Nav from '../Nav/Nav';
import MainTitle from '../../shared/MainTitle';
import SideBar from '../../shared/Layout/SideBar';
import Footer from '../../shared/Layout/Footer';

import { fetchData } from '../../../api/helper';

/* 
  Props 
  ------

  subtitle = determines the inital primary title of the page

  sidebar = wether or not there is a sidebar
            aboutMe - about me side bar

*/

/* Page Routing Animation */
Router.onRouteChangeStart = (url) => {
  // console.log(url); // checking path routed to
  // Start NProgress loaders on route change
  NProgress.start();
};

// check when route change is complete, then end NProgress
Router.onRouteChangeComplete = () => NProgress.done();
// also check for errors and stop the progress bar if there is one
Router.onRouteChangeError = () => NProgress.done();

const Layout = ({ subtitle, sidebar, children }) => {
  const [profileData, setProfileData] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const profileData = await fetchData('/api/profile/all');
      const profileSideBarData = profileData.find(
        (item) => item.type === 'sidebar'
      );
      console.log('Layout Profile Data ', profileData);
      setProfileData(profileSideBarData);
    }

    getData();
  }, []);

  const siteTitle = 'Girl Life Blog';

  return (
    <div className="app">
      <Head>
        <title>Jane's Blog</title>
      </Head>
      <div className="bg-overlay">
        <div className="container-fluid main-area px-md-0">
          <MainTitle title={siteTitle} /> <Nav />
          <div className="row sub-header mb-4">
            <div className="title col-md-4 col-12 offset-md-1 ">
              <div className="title-wrap">
                <div className="subtitle" id="subtitle">
                  {subtitle}
                </div>
                <div className="underline" />
              </div>
            </div>
          </div>
          <section className="row" id="main-content-section">
            {sidebar ? (
              <>
                <div className="col-md-6 offset-md-1 col-12">
                  <div className="main-content">{children}</div>
                </div>

                <div className="col-md-4 offset-md-0 col-lg-3 offset-lg-1 col-10 offset-1">
                  <SideBar data={profileData} />
                </div>
              </>
            ) : (
              <div className="col-md-12 col-12 px-3">
                <div className="main-content">{children}</div>
              </div>
            )}
          </section>
          <Footer title={siteTitle} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
