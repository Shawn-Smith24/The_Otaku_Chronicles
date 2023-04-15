import {useFormik} from "formik";
import { redirect, useNavigate } from "react-router-dom";
import * as yup from "yup";


function Login({user, setUser}) {

    const navigate = useNavigate();

    const redirectUser = () => {
        navigate("/mangas")
    }

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
                        redirectUser()
                    }) 
                }
            });
        },
    });
    

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="w-500px h-350px  p-8 mx-[500px] ">
                

                <label htmlFor="username" className="text-[#beef00]">Username:</label>
                <br />
                <input
                    id="username"
                    name="username"
                    className="rounded-xl"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p className="text-[#beef00]"> {formik.errors.username}</p>

                <label htmlFor="password" className="text-[#beef00]">Password:</label>
                <br />
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="rounded-xl"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p className="text-[#beef00]">  {formik.errors.password}</p>
                <button type="submit" className="text-[#beef00] animate-pulse">Login</button>
            </form>
        </div>
    )
}

export default Login;