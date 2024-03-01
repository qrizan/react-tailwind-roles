import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";

import Layout from "../../Layout";
import { ButtonBack, ButtonSave, ButtonReset } from "../../Base/Button";
import Input from "../../Base/Input";
import Checkbox from "../../Base/Checkbox";

export default function RoleCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [permissionsData, setPermissionsData] = useState([]);
  const [errors, setErrors] = useState([]);

  const [permissions, setPermissions] = useState([]);
  const token = Cookies.get("token");

  const fetchDataPermissions = async () => {
    try {
      const response = await api.get(
        "/api/admin/permissions/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setPermissions(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataPermissions();
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


  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setPermissionsData([]);
    setErrors([]);
  };

  const storeRole = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/api/admin/roles",
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
    <Layout title="Create Role">
      <form onSubmit={storeRole}>
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
                defaultChecked={false}
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
            <ButtonReset onClick={handleCancel} />
            <ButtonSave />
          </div>
        </div>        
      </form>
    </Layout>
  );
}
