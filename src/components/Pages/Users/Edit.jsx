import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";

import Layout from "../../Layout";
import { ButtonBack, ButtonSave } from "../../Base/Button";
import Input from "../../Base/Input";
import Checkbox from "../../Base/Checkbox";


export default function UserEdit() {
  const { id } = useParams();
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [errors, setErrors] = useState([]);

  const [roles, setRoles] = useState([]);

  const fetchDataRoles = async () => {
    try {
      const response = await api.get("/api/admin/roles/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRoles(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataUser = async () => {
    try {
      const response = await api.get(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setRolesData(response.data.data.roles.map((obj) => obj.name));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataRoles();
    fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (e) => {
    let data = rolesData;
    if (data.some((name) => name === e.target.value)) {
      data = data.filter((name) => name !== e.target.value);
    } else {
      data.push(e.target.value);
    }

    setRolesData(data);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/api/admin/users/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
          roles: rolesData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/users");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  return (
    <Layout title="Edit User">
      <form onSubmit={updateUser}>
        <div className="flex">
          <div className="w-1/2 mr-8">
            <div className="py-2">
              <Input
                htmlFor="name"
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full name"
              />
              {errors.name && <div className="alert-input">{errors.name[0]}</div>}
            </div>

            <div className="py-2">
              <Input
                htmlFor="email"
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
              />
              {errors.email && <div className="alert-input">{errors.email[0]}</div>}
            </div>

            <div className="py-2">
              <Input
                htmlFor="password"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              {errors.password && <div className="alert-input">{errors.password[0]}</div>}
            </div>

            <div className="py-2">
              <Input
                htmlFor="password_confirmation"
                label="Password confirmation"
                type="password"
                name="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Enter Password Confirmation"
              />
            </div>
          </div>
          <div className="w-1/2 p-4">
            <legend>Roles</legend>

            <div className="">
              {roles.map((role) => (
                <div key={Math.random()}>
                  <Checkbox
                    value={role.name}
                    onChange={handleCheckboxChange}
                    id={`check-${role.id}`}
                    label={role.name}
                    htmlFor={`check-${role.id}`}
                    defaultChecked={rolesData.some((name) => name === role.name ?? true)}
                  />
                </div>
              ))}

              {errors.roles && <div className="alert-input">{errors.roles[0]}</div>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <ButtonBack linkTo="/users" />
          <ButtonSave />
        </div>
      </form>
    </Layout>
  );
}
