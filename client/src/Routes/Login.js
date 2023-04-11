import {useFormik} from "formik";
import * as yup from "yup";
import './Login.css'

function Login({user, setUser}) {

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
        password: yup.string().required("Must enter a password"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
    
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            
            fetch("login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values, null, 2),
            })
            .then((res) => {
                if (res.status === 401) {
                    window.alert("No Profile with this name! Please check your input.")
                    resetForm()
                } else {
                    res.json()
                    .then((user) => {
                        setUser(user)
                        window.alert(`Welcome back ${user.username}!`)
                    })
                    .then(() => {
                        resetForm()
                        
                    }) 
                }
            });
        },
    });
    

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h1>Login</h1>

                <label htmlFor="username">Username:</label>
                <br />
                <input
                    id="username"
                    name="username"
                    className="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p > {formik.errors.username}</p>

                <label htmlFor="password">Password:</label>
                <br />
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p> {formik.errors.password}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;