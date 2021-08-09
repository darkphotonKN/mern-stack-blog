import AdminLayout from '../../../components/shared/Layout/AdminLayout';

export default class AboutIndex extends React.Component {
  render() {
    return (
      <AdminLayout user={this.props.user}>
        <div>About Edit</div>
      </AdminLayout>
    );
  }
}
