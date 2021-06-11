import Layout from "../components/Layout";

const NewAccount = () => {

  const inputStyles = "shadow-md appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <Layout>
      <h1 className="text-center text-white text-2xl font-light">New Account</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
              />
            </div>

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
              />
            </div>

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
              />
            </div>

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
              />
            </div>

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