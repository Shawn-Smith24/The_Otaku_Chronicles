import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';



function SignUp({ setUser, user }) {

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter username"),
    password: yup.string()
      .required("Must enter a password")
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    confirmPassword: yup.string()
      .required("Must confirm password")

  });

  const navigate = useNavigate();
      
  const redirectAccount = () => {
    navigate("/anime")
  }


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
            body: JSON.stringify(values, null, 3),
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
                    redirectAccount()
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
      <form className="w-500px h-350px  p-6 mx-[500px] " onSubmit={formik.handleSubmit}>
        <label htmlFor="username" className="text-[#beef00]">Username:</label>
        <br />
        <input
          id="username"
          className='rounded-xl'
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <p className="text-[#beef00]"> {formik.errors.username}</p>

        <label htmlFor="password" className="text-[#beef00]" >Password:</label>
        <br />
        <input
          id="password"
          name="password"
          className='rounded-xl'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p className="text-[#beef00]"> {formik.errors.password}</p>

        <label htmlFor="confirm-password" className="text-[#beef00]">Confirm Password:</label>
        <br />
        <input
          id="confirm-password"
          name="confirmPassword"
          className='rounded-xl'
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <p className="text-[#beef00]"> {formik.errors.confirmPassword}</p>

        <button type="submit" className="text-[#beef00] animate-pulse">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp;
