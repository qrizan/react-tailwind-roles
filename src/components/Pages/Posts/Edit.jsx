import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import dompurify from 'dompurify';
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { editorState } from "../../../store";
import api from "../../../api";

import Layout from "../../Layout";
import Input from "../../Base/Input";
import File from "../../Base/File";
import Select from "../../Base/Select";
import TextEditor from "../../Base/TextEditor";
import { ButtonBack, ButtonSave } from "../../Base/Button";


export default function PostEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [contentState, setContentState] = useAtom(editorState);
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const inputFile = useRef(null);

  const token = Cookies.get("token");

  const fetchDataCategories = async () => {
    try {
      const response = await api.get("/api/admin/categories/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataPost = async () => {
    try {
      const response = await api.get(`/api/admin/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setTitle(response.data.data.title);
        setCategoryID(response.data.data.category_id);
        setContentState(dompurify.sanitize(response.data.data.content));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataCategories();
    fetchDataPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("category_id", categoryID);
    formData.append("content", contentState);
    formData.append("_method", "PUT");

    try {
      const response = await api.post(`/api/admin/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setContentState("");

        navigate("/posts");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Layout title="Edit Post">
      <form onSubmit={updatePost}>
        <div className="py-2 w-1/2">
          <Input
            htmlFor="name"
            label="Name"
            type="text"
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Role Name"
          />
          {errors.name && <div className="alert-input">{errors.name[0]}</div>}
        </div>
        <div className="my-2">
          <File
            refFile={inputFile}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {errors.image && <div className="alert-input">{errors.image[0]}</div>}
        </div>
        <div className="mb-3 w-1/2">
          <Select
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            options={categories}
          />

          {errors.category_id && <div className="alert alert-danger">{errors.category_id[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Content</label>
          <TextEditor content={contentState}/>  

        </div>
        {errors.content && <div className="alert alert-danger">{errors.content[0]}</div>}

        <div className="flex items-center justify-between pt-4">
          <div>
            <ButtonBack linkTo="/posts" />
          </div>
          <div>
            <ButtonSave />
          </div>
        </div>
      </form>
    </Layout>
  );
}
