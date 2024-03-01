import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import checkPermission from "../../../utils/permissions";
import api from "../../../api";

import Layout from "../../Layout";
import Pagination from "../../Base/Pagination";
import { ButtonDelete, ButtonEdit, ButtonAdd } from "../../Base/Button";
import Input from "../../Base/Input";
import { ModalDelete } from "../../Base/Modal";
import Alert from "../../Base/Alert";


export default function CategoriesIndex() {
  const token = Cookies.get("token");
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [id, setId] = useState(0);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const fetchData = async (pageNumber = 1, keywords = "") => {
    try {
      const page = pageNumber ? pageNumber : pagination.currentPage;
      const response = await api.get(`/api/admin/categories?search=${keywords}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCategories(response.data.data.data);
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

  const deleteCategory = async (id) => {
    try {
      const response = await api.delete(`/api/admin/categories/${id}`, {
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
    <Layout title="List Categories">
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

          {checkPermission(["roles.create"]) && <ButtonAdd linkTo={`/categories/create`} />}
        </div>

        <table className="table-auto min-w-full border divide-y divide-gray-200 w-full">
          <thead className="bg-gray-50 table-auto">
            <tr>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-10">
                No
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-20">
                Image
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-40">
                Category Name
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase w-40">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {++index + (pagination.currentPage - 1) * pagination.perPage}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500">
                    <img src={category.image} width="50" alt={category.name}/>
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500">{category.name}</td>
                  <td className="px-3 py-2 text-sm text-gray-500 text-center">
                    {checkPermission(["categories.edit"]) && (
                      <ButtonEdit linkTo={`/categories/edit/${category.id}`} />
                    )}

                    {checkPermission(["categories.delete"]) && (
                      <ButtonDelete onClick={() => handleDelete(category.id)} />
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
        onClick={() => deleteCategory(id)}
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
