import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {

  const router = useRouter();

  const activeLink = "bg-blue-800";

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clients</p>
      </div>
      <nav className="mt-5 list-none text-white">
        <li className={ router.pathname === "/" ? activeLink : null }>
          <Link href="/"><a className="p-3 block">Clients</a></Link>
        </li>
        <li className={ router.pathname === "/orders" ? activeLink : null }>
          <Link href="/orders"><a className="p-3 block">Orders</a></Link>
        </li>
        <li className={ router.pathname === "/products" ? activeLink : null }>
          <Link href="/products"><a className="p-3 block">Products</a></Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
