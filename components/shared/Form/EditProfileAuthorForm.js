import Router from 'next/router';
import { withFormik } from 'formik';

import { postData } from '../../../api/helper';

const EditProfileAuthorForm = (props) => {
  const {
    // passed down from higher order component
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    handleReset,
    dirty
  } = props;

  console.log('Edit Form Props:', props);
  // console.log('Post Data:', postData);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="title">作家介紹</div>
        <div className="row input-label-group">
          <label
            htmlFor="title"
            className="col-12 col-md-2 d-flex align-items-center"
          >
            標題
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="col-md-8"
            placeholder="輸入.."
            onChange={handleChange}
            value={values.title}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="row input-label-group">
          <label
            htmlFor="post"
            className="col-12 col-md-2 d-flex align-items-center"
          >
            內容
          </label>
          <textarea
            id="post"
            name="post"
            type="text"
            className="col-md-8"
            placeholder="輸入.."
            rows="6"
            onChange={handleChange}
            value={values.post}
          />
          {/* validation */}
          {errors.post && touched.post && (
            <div className="form-validation col-12 col-md-9 mt-4">
              {errors.post}
            </div>
          )}
        </div>
      </div>
      <button type="submit" className="submit-btn ">
        更新
      </button>
    </form>
  );
};

const EditProfileAuthorFormValidated = withFormik({
  // Makes values props that holds the form state
  mapPropsToValues: (props) => {
    const { data } = props;

    return {
      title: data.title,
      post: data.content
    };
  },

  // Custom validation
  validate: (values) => {
    const errors = {};

    if (!values.post) {
      errors.post = '必填欄位!';
    }

    return errors;
  },

  // Submitting Form
  handleSubmit: async (values, { props, setSubmitting }) => {
    console.log('Post Values Before:', values);
    console.log('And props:', props);

    const { data } = await postData(`/api/profile/sidebar`, {
      title: values.title,
      content: values.post
    });

    console.log('Data after posting:', data);

    Router.push('/admin/profile');
  },

  displayName: 'BasicForm'
})(EditProfileAuthorForm);

export default EditProfileAuthorFormValidated;
