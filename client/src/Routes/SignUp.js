import { useFormik } from "formik";
import * as yup from 'yup';
import './SignUp.css';


function SignUp({ setUser, user }) {

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter username"),
    password: yup.string()
      .required("Must enter a password")
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),


    confirmPassword: yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref("password")],
      )
    })
  });

const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
    
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
      
          fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values, null, 2),
        })
        .then((res) => {
            if (res.status === 201) {
                res.json()
                .then((user) => {
                    setUser(user)
                    window.alert(`Welcome ${user.username}!`)
                })
                .then(() => {
                    resetForm()
                    // redirectAccount()
                })
            } else if (res.status === 500) {
                window.alert("Username in use!")
                resetForm()
            }
        });
        },
    });

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          id="username"
          className='username'
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <p > {formik.errors.name}</p>

        <label htmlFor="password">Password:</label>
        <br />
        <input
          id="password"
          name="password"
          className='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p> {formik.errors.password}</p>

        <label htmlFor="confirm-password">Confirm Password:</label>
        <br />
        <input
          id="confirm-password"
          name="confirmPassword"
          className='password'
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <p> {formik.errors.confirmPassword}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUp;
