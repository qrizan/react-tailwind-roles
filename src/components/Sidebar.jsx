import checkPermission from "../utils/permissions";

import Menu from "./Base/Menu";


const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">

          <Menu label="Dashboard" path="/dashboard" />
          <hr className="border-1 border-gray-50"/>

          {checkPermission(["categories.index"]) && <Menu label="Categories" path="/categories" />}

          {checkPermission(["posts.index"]) && <Menu label="Posts" path="/posts" />}

          {checkPermission(["roles.index"]) && <Menu label="Roles" path="/roles" />}

          {checkPermission(["permissions.index"]) && (
            <Menu label="Permissions" path="/permissions" />
          )}

          {checkPermission(["users.index"]) && <Menu label="Users" path="/users" />}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
