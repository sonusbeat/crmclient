import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";

const GET_USER_CLIENTS = gql`
  query getSellerClients {
    getSellerClients {
      id
      first_name
      last_name
      company
      email
    }
  }
`;

const Index = () => {

  const { data, loading, error } = useQuery( GET_USER_CLIENTS );

  if (loading) return "Loading ...";

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 px-4 py-2 border border-gray-600 text-left">Name</th>
              <th className="w-1/5 px-4 py-2 border border-gray-600 text-left">Email</th>
              <th className="w-1/5 px-4 py-2 border border-gray-600 text-left">Company</th>
              <th className="w-1/5 px-4 py-2 border border-gray-600 text-left">&nbsp;</th>
              <th className="w-1/5 px-4 py-2 border border-gray-600 text-left">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
              data.getSellerClients.map( client => (
                <tr key={ client.id }>
                  <td className="border border-gray-300 px-4 py-2">{ client.first_name } { client.last_name }</td>
                  <td className="border border-gray-300 px-4 py-2">{ client.email }</td>
                  <td className="border border-gray-300 px-4 py-2">{ client.company }</td>
                  <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                  <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Layout>
    </>
  )
}

export default Index;