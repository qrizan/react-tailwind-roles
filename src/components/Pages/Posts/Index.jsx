import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";
import checkPermission from "../../../utils/permissions";

import Layout from "../../Layout";
import Pagination from "../../Base/Pagination";
import { ButtonDelete, ButtonEdit, ButtonAdd } from "../../Base/Button";
import Input from "../../Base/Input";
import { ModalDelete } from "../../Base/Modal";
import Alert from "../../Base/Alert";


export default function PostsIndex() {
  const [posts, setPosts] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [id, setId] = useState(0);

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
      const response = await api.get(`/api/admin/posts?search=${keywords}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setPosts(response.data.data.data);
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

  const deletePost = async (id) => {
    try {
      const response = await api.delete(`/api/admin/posts/${id}`, {
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
    <Layout title="List Posts">
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

          {checkPermission(["posts.create"]) && <ButtonAdd linkTo={`/posts/create`} />}
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
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-20">
                Title
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-40">
                Category
              </th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {posts.length > 0 ? (
              posts.map((posts, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {++index + (pagination.currentPage - 1) * pagination.perPage}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500">
                    <img src={posts.image} width="100" alt={posts.category.name} />
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500">{posts.title}</td>
                  <td className="px-3 py-2 text-sm text-gray-500">{posts.category.name}</td>
                  <td className="px-3 py-2 text-sm text-gray-500 text-center">
                    {checkPermission(["posts.edit"]) && (
                      <ButtonEdit linkTo={`/posts/edit/${posts.id}`} />
                    )}

                    {checkPermission(["posts.delete"]) && (
                      <ButtonDelete onClick={() => handleDelete(posts.id)} />
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
        onClick={() => deletePost(id)}
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
