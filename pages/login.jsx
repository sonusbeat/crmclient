import { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const AUTHENTICATE_USER = gql`
  mutation authenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

const Login = () => {

  // Message State
  const [ message, setMessage ] = useState(null);
  const [ formError, setFormError ] = useState(false);

  const inputStyles = "shadow-md appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";
  const errorStyles = "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4";

  // Mutation
  const [ authenticateUser ] = useMutation(AUTHENTICATE_USER);

  // Routing
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Email is not valid!").required("Email is required!"),
      password: Yup.string().required("Password is required!").min(6, "Password should be at least 6 characters!"),
    }),

    onSubmit: async ( values ) => {
      const { email, password } = values;

      try {

        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password
            }
          }
        });

        // Set default form error
        setFormError(false);

        // Create Message
        setMessage( "Access Granted !" );

        // Save token to LocalStorage
        localStorage.setItem("token", data.authenticateUser.token);

        setTimeout(() => {

          // Clear Messages
          setMessage( null );

          // Redirect to clients
          router.push("/");
        }, 1500);

      } catch (error) {
        // Delete "GraphQL error: " from message
        setMessage( error.message.replace( "GraphQL error: ", "" ) );

        // Set FormError to true
        setFormError(true);

        setTimeout( () => {
          // Set default form error
          setFormError(false);

          // Clear Messages
          setMessage( null );
        }, 3000 );
      }
    }
  });

  const showMessage = () => {
    let messageStyles = "bg-";

    messageStyles += formError ? "red-500 " : "green-500 ";
    messageStyles += "py-2 px-3 w-full my-3";

    return (
      <div className={ messageStyles }>
        <p className="text-center font-bold text-white">{ message }</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-center text-white text-2xl font-light">Login</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">

          { message && showMessage() }

          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={ formik.handleSubmit }
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className={ labelStyles }
              >Email</label>

              <input
                className={ inputStyles }
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                value={ formik.values.email }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
            </div>

            {
              formik.touched.email && formik.errors.email && (
                <div className={ errorStyles }>
                  <p className="font-bold">Error</p>
                  <p>{ formik.errors.email }</p>
                </div>
              )
            }

            <div className="mb-4">
              <label
                htmlFor="password"
                className={ labelStyles }
              >Password</label>

              <input
                className={ inputStyles }
                id="password"
                name="password"
                type="password"
                value={ formik.values.password }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
            </div>

            {
              formik.touched.password && formik.errors.password && (
                <div className={ errorStyles }>
                  <p className="font-bold">Error</p>
                  <p>{ formik.errors.password }</p>
                </div>
              )
            }

            <div>
              <button
                type="submit"
                className="bg-gray-800 w-full p-2 text-white rounded hover:bg-gray-900 uppercase"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
 
export default Login;