import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";

import Layout from "../../Layout";
import Input from "../../Base/Input";
import { ButtonBack, ButtonSave } from "../../Base/Button";
import File from "../../Base/File";


export default function CategoryEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = Cookies.get("token");
  const inputFile = useRef(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  
  const fetchDataCategory = async () => {
    try {
      const response = await api.get(`/api/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setName(response.data.data.name);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    formData.append("_method", "PUT");

    try {
      const response = await api.post(`/api/admin/categories/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/categories");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Layout title="Edit Category">
      <form onSubmit={updateCategory}>
        <div className="py-2 w-1/2">
          <Input
            htmlFor="name"
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Role Name"
          />
          {errors.name && <div className="alert-input">{errors.name[0]}</div>}
        </div>

        <File refFile={inputFile} accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        {errors.image && <div className="alert-input">{errors.image[0]}</div>}

        <div className="flex items-center justify-between pt-4">
          <div>
            <ButtonBack linkTo="/categories" />
          </div>
          <div>
            <ButtonSave />
          </div>
        </div>
      </form>
    </Layout>
  );
}
