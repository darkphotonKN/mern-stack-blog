import { useState, useEffect } from 'react';
import Link from 'next/link';

import AdminLayout from '../../../components/shared/Layout/AdminLayout';

import withAuthentication from '../../../components/HOC/withAuthentication';
import { getUserProfile } from '../../../utils/auth';
import { fetchData } from '../../../api/helper';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const profileData = await fetchData('/api/profile/all');
      setProfileData(profileData);
    }

    getData();
  }, []);

  console.log('User Data:', user);
  console.log('Profile Data:', profileData);

  console.log('Profile Data', 1000);

  return (
    <AdminLayout user={user}>
      <section id="admin-pages">
        <div className="post row">
          <Link href="/admin/profile/edit">
            <div className="col-12 col-md-10">
              <div className="title">作家介紹</div>
              <p>
                <span>標題</span>
                {profileData ? profileData[0].title : null}
              </p>
              <p>
                <span>內容</span>
                {profileData ? profileData[0].content : null}
              </p>
            </div>
          </Link>
        </div>
        <div className="post row mt-4">
          <Link href="/admin/profile/edit">
            <div className="col-12 col-md-10">
              <div className="title">關於我 About</div>
              {/* <p>
                <span>標題</span>
                {profileData ? profileData[1].title : null}
              </p> */}
              <p>
                <span>內容</span>
                {profileData ? profileData[1].content : null}
              </p>
            </div>
          </Link>
        </div>
      </section>
    </AdminLayout>
  );
};

export default withAuthentication(Profile);
