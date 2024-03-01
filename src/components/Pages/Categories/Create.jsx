import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";

import Layout from "../../Layout";
import { ButtonBack, ButtonSave, ButtonReset } from "../../Base/Button";
import Input from "../../Base/Input";
import File from "../../Base/File";


export default function CategoryCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const inputFile = useRef(null);

  const token = Cookies.get("token");

  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setImage("");
    if (inputFile.current) {
        inputFile.current.value = "";
        inputFile.current.type = "text";
        inputFile.current.type = "file";
    }    
    setErrors([]);
  };

  const storeCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);

    try {
      const response = await api.post("/api/admin/categories", formData, {
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
    <Layout title="Create Category">
      <form onSubmit={storeCategory}>
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
            <ButtonReset onClick={handleCancel} />
            <ButtonSave />
          </div>
        </div>
      </form>
    </Layout>
  );
}
