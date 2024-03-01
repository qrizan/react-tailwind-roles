import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";

import Layout from "../../Layout";
import { ButtonBack, ButtonSave } from "../../Base/Button";
import Input from "../../Base/Input";
import Checkbox from "../../Base/Checkbox";

export default function RoleEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [permissionsData, setPermissionsData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const token = Cookies.get("token");

  const fetchDataPermissions = async () => {
    try {
      const response = await api.get("/api/admin/permissions/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setPermissions(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataRole = async () => {
    try {
      const response = await api.get(`/api/admin/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setName(response.data.data.name);
        setPermissionsData(response.data.data.permissions.map((obj) => obj.name));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataPermissions();
    fetchDataRole();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (e) => {
    let data = permissionsData;
    if (data.some((name) => name === e.target.value)) {
      data = data.filter((name) => name !== e.target.value);
    } else {
      data.push(e.target.value);
    }

    setPermissionsData(data);
  };

  const updateRole = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/api/admin/roles/${id}`,
        {
          name: name,
          permissions: permissionsData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/roles");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Layout title="Edit Role">
      <form onSubmit={updateRole}>
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

        <legend>Permissions</legend>
        <div className="p-4">
          {permissions.map((permission) => (
            <div key={Math.random()}>
              <Checkbox
                value={permission.name}
                onChange={handleCheckboxChange}
                id={`check-${permission.id}`}
                label={permission.name}
                htmlFor={`check-${permission.id}`}
                defaultChecked={permissionsData.some((name) => name === permission.name ?? true)}
              />
            </div>
          ))}

          {errors.permissions && <div className="alert-input">{errors.permissions[0]}</div>}
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <ButtonBack linkTo="/roles" />
          </div>
          <div>
            <ButtonSave />
          </div>
        </div>
      </form>
    </Layout>
  );
}
