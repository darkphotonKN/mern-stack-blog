import { useEffect, useState } from 'react';

import AdminLayout from '../../../components/shared/Layout/AdminLayout';
import EditProfileAuthorForm from '../../../components/shared/Form/EditProfileAuthorForm';
import EditProfileAboutForm from '../../../components/shared/Form/EditProfileAboutForm';
import BackButton from '../../../components/shared/MainContent/BackButton';

import { fetchData } from '../../../api/helper';
import withAuthentication from '../../../components/HOC/withAuthentication';
import Layout from '../../../components/shared/Layout/Layout';

const AdminProfileEdit = (props) => {
  console.log('AdminProfileEdit Props:', props);

  const [data, setData] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const data = await fetchData(`/api/profile/all`);
      setData(data);
    }

    console.log('Data:', data);

    getData();
  }, []);

  return (
    <AdminLayout user={props.user}>
      <BackButton admin />
      {data ? (
        <EditProfileAuthorForm
          data={data.find((item) => item.type === 'sidebar')}
        />
      ) : null}
      {data ? (
        <EditProfileAboutForm
          data={data.find((item) => item.type === 'about')}
        />
      ) : null}
    </AdminLayout>
  );
};

export default withAuthentication(AdminProfileEdit);
