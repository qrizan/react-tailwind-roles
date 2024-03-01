import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";

import Layout from "../../Layout";


export default function Dashboard() {
  const [countCategories, setCountCategories] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [countUsers, setCountUsers] = useState(0);

  const token = Cookies.get("token");

  const fetchData = async () => {
    try {
      const response = await api.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCountCategories(response.data.data.categories);
        setCountPosts(response.data.data.posts);
        setCountUsers(response.data.data.users);  
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

  return (
    <Layout title="Dashboard">
      <div className="max-w-full mx-4 py-6">
        <div className="flex space-x-4">
          <div className="inline-block bg-white shadow transform transition-all mb-4 w-1/3">
            <div className="bg-white p-5">
                <div className="text-center">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">Total Categories</h3>
                  <p className="text-3xl font-bold text-black">{countCategories}</p>
                </div>
            </div>
          </div>
          <div className="inline-block bg-white shadow transform transition-all mb-4 w-1/3">
            <div className="bg-white p-5">
                <div className="text-center">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">Total Posts</h3>
                  <p className="text-3xl font-bold text-black">{countPosts}</p>
                </div>
            </div>
          </div>
          <div className="inline-block bg-white shadow transform transition-all mb-4 w-1/3">
            <div className="bg-white p-5">
                <div className="text-center">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">Total Users</h3>
                  <p className="text-3xl font-bold text-black">{countUsers}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
