import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";
import checkPermission from "../../../utils/permissions";

import Layout from "../../Layout";
import Pagination from "../../Base/Pagination";
import { ButtonDelete, ButtonEdit, ButtonAdd } from "../../Base/Button";
import Input from "../../Base/Input";
import Alert from "../../Base/Alert";
import { BadgeDefault } from "../../Base/Badge";
import { ModalDelete } from "../../Base/Modal";


export default function RolesIndex() {
  const [roles, setRoles] = useState([]);
  const token = Cookies.get("token");

  const [id, setId] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const fetchData = async (pageNumber = 1, keywords = "") => {
    try {
      const page = pageNumber ? pageNumber : pagination.currentPage;
      const response = await api.get(`/api/admin/roles?search=${keywords}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setRoles(response.data.data.data);
        setPagination(() => ({
          currentPage: response.data.data.current_page,
          perPage: response.data.data.per_page,
          total: response.data.data.total,
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchData = async (e) => {
    setKeywords(e.target.value);
    fetchData(1, e.target.value);
  };

  const handleDelete = (id) => {
    setId(id);
    setShowModalDelete(true);
  };

  const deleteRole = async (id) => {
    try {
      const response = await api.delete(`/api/admin/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setShowModalDelete(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title="List Roles">
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center pt-2 mb-3 text-gray-600">
          <div className="width-1/4">
            <Input
              htmlFor=""
              label=""
              type="text"
              name="search"
              value={keywords}
              onChange={(e) => searchData(e)}
              placeholder="Search"
            />
          </div>

          {checkPermission(["roles.create"]) && <ButtonAdd linkTo={`/roles/create`} />}
        </div>

        <table className="table-auto min-w-full border divide-y divide-gray-200 w-full">
          <thead className="bg-gray-50 table-auto">
            <tr>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-10">
                No
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-40">
                Role Name
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Permissions
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase w-40">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {roles.length > 0 ? (
              roles.map((role, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {++index + (pagination.currentPage - 1) * pagination.perPage}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500">{role.name}</td>
                  <td className="px-3 py-2 text-sm text-gray-500">
                    {role.permissions.map((permission, index) => (
                      <span key={index}>
                        <BadgeDefault text={permission.name} />
                      </span>
                    ))}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500 text-center">
                    {checkPermission(["roles.edit"]) && (
                      <ButtonEdit linkTo={`/roles/edit/${role.id}`} />
                    )}

                    {checkPermission(["roles.delete"]) && (
                      <ButtonDelete onClick={() => handleDelete(role.id)} />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <Alert text="Data not found" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModalDelete
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        onClick={() => deleteRole(id)}
      />

      <Pagination
        currentPage={pagination.currentPage}
        perPage={pagination.perPage}
        total={pagination.total}
        onChange={(pageNumber) => fetchData(pageNumber, keywords)}
        position="end"
      />
    </Layout>
  );
}
