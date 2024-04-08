import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../../../api";

import Layout from "../../Layout";
import { ButtonBack, ButtonSave, ButtonReset } from "../../Base/Button";
import Input from "../../Base/Input";
import Checkbox from "../../Base/Checkbox";


export default function UserCreate() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

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

  useEffect(() => {
    fetchDataRoles();
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

  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");

    setRolesData([]);
    setErrors([]);
  };

  const storeUser = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/admin/users",
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
    <Layout title="Create User">
      <form onSubmit={storeUser}>
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

            <div>
              {roles.map((role) => (
                <div key={Math.random()}>
                  <Checkbox
                    value={role.name}
                    onChange={handleCheckboxChange}
                    id={`check-${role.id}`}
                    label={role.name}
                    htmlFor={`check-${role.id}`}
                    defaultChecked={false}
                  />
                </div>
              ))}

              {errors.roles && <div className="alert-input">{errors.roles[0]}</div>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <ButtonBack linkTo="/users" />
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
