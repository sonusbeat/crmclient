import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

import Layout from "../components/Layout";

const NEW_ACCOUNT = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      first_name
      last_name
      email
    }
  }
`;

const NewAccount = () => {

  // Message State
  const [message, setMessage] = useState(null);
  const [formError, setFormError] = useState(false);

  // Mutation
  const [ newUser ] = useMutation( NEW_ACCOUNT );

  // Routing
  const router = useRouter();

  const inputStyles = "shadow-md appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";
  const errorStyles = "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4";

  // Form Validation and Submit
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      first_name: Yup.string().required("First Name is required!"),
      last_name: Yup.string().required("Last Name is required!"),
      email: Yup.string().email("Email is not valid").required("Email is required!"),
      password: Yup.string().required("Password is required!").min(6, "Password should be at least 6 characters!"),
    }),

    onSubmit: async ( values ) => {
      const { first_name, last_name, email, password } = values;

      try {

        const { data } = await newUser({
          variables: {
            input: {
              first_name,
              last_name,
              email,
              password
            }
          }
        });

        // Create Message, "User created successfully"
        setMessage( `User "${ data.newUser.first_name  } ${ data.newUser.last_name }" created successfully!` );

        setTimeout(() => {
          // Redirect to login
          router.push("/login");
        }, 3000);

      } catch ( error ) {

        setMessage( error.message.replace( "GraphQL error: ", "" ) );
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

      <h1 className="text-center text-white text-2xl font-light">New Account</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">

          { message && showMessage() }

          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={ formik.handleSubmit }
          >
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className={ labelStyles }
              >First Name</label>

              <input
                className={ inputStyles }
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="off"
                value={ formik.values.first_name }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
            </div>

            {
              formik.touched.first_name && formik.errors.first_name && (
                <div className={ errorStyles }>
                  <p className="font-bold">Error</p>
                  <p>{ formik.errors.first_name }</p>
                </div>
              )
            }

            <div className="mb-4">
              <label
                htmlFor="last_name"
                className={ labelStyles }
              >Last Name</label>

              <input
                className={ inputStyles }
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="off"
                value={ formik.values.last_name }
                onChange={ formik.handleChange }
              />
            </div>

            {
              formik.touched.last_name && formik.errors.last_name && (
                <div className={ errorStyles }>
                  <p className="font-bold">Error</p>
                  <p>{ formik.errors.last_name }</p>
                </div>
              )
            }

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

            <div className="mt-9">
              <button
                type="submit"
                className="bg-gray-800 w-full p-2 text-white rounded hover:bg-gray-900 uppercase"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

    </Layout>
  );
}
 
export default NewAccount;