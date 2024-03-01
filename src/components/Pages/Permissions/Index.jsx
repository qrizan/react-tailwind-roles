import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";

import Layout from "../../Layout";
import Pagination from "../../Base/Pagination";
import Input from "../../Base/Input";
import Alert from "../../Base/Alert";


export default function PermissionsIndex() {
  const [permissions, setPermissions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState("");
  const token = Cookies.get("token");

  const fetchData = async (pageNumber = 1, keywords = "") => {
    try {
      const page = pageNumber ? pageNumber : pagination.currentPage;
      const response = await api.get(`/api/admin/permissions?search=${keywords}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setPermissions(response.data.data.data);
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

  return (
    <Layout title="Permissions">
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
        </div>

        <table className="table-auto min-w-full border divide-y divide-gray-200 w-full">
          <thead className="bg-gray-50 table-auto">
            <tr>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-10">
                No
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Permissions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {permissions.length > 0 ? (
              permissions.map((permission, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {++index + (pagination.currentPage - 1) * pagination.perPage}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500">
                    {permission.name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>
                    <Alert text="Data not found" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
