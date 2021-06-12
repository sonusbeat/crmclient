import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const AUTHENTICATE_USER = gql`
  mutation authenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

const Login = () => {

  const inputStyles = "shadow-md appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";
  const errorStyles = "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4";

  // Mutation
  const [ authenticateUser ] = useMutation(AUTHENTICATE_USER);

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

        console.log( data.authenticateUser.token );

      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <Layout>
      <h1 className="text-center text-white text-2xl font-light">Login</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
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