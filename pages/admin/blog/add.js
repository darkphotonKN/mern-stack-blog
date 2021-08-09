import AdminLayout from '../../../components/shared/Layout/AdminLayout';
import AddPostForm from '../../../components/shared/Form/AddPostForm';
import BackButton from '../../../components/shared/MainContent/BackButton';

import withAuthentication from '../../../components/HOC/withAuthentication';

const AdminBlogAdd = (props) => {
  return (
    <AdminLayout user={props.user}>
      <BackButton admin />
      <AddPostForm />
    </AdminLayout>
  );
};

export default withAuthentication(AdminBlogAdd);
