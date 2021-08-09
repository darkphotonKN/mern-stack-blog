import { useEffect, useState } from 'react';

import AdminLayout from '../../../components/shared/Layout/AdminLayout';
import EditPostForm from '../../../components/shared/Form/EditPostForm';
import BackButton from '../../../components/shared/MainContent/BackButton';

import { fetchData } from '../../../api/helper';
import withAuthentication from '../../../components/HOC/withAuthentication';
import Layout from '../../../components/shared/Layout/Layout';

const AdminBlogEdit = (props) => {
  console.log('AdminBlogEdit Props:', props);

  const [data, setData] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const data = await fetchData(`/api/posts/${props.query.id}`);

      setData(data);
    }

    getData();
  }, []);

  return (
    <AdminLayout user={props.user}>
      <BackButton admin />
      {data ? <EditPostForm id={props.query.id} data={data} /> : null}
    </AdminLayout>
  );
};

export default withAuthentication(AdminBlogEdit);
