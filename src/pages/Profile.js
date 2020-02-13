import React, { useState, useEffect, useContext } from "react";

import { uploadAvatar } from "../api/uploadController";
import { getUser } from "../utils/localStorage";
import { getMe, updateMe } from "../api/authController";

import Layout from "../hoc/Layout";
import Input from "../components/forms/Input";
import { AvatarContext } from "../context/AvatarContext";
import FileUpload from "../components/forms/FileUpload";
import Button from '../components/ui/Button';

function Profile() {
  const [user, setUser] = useState({});
  const { avatar, updateContextAvatar } = useContext(AvatarContext);
  const [ password, setPassword ] = useState('');

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const localUser = getUser();
    const [err, response] = await getMe(localUser._id);
    if (err) return;
    setUser(response.data);
  };

  const handleFile = async e => {
    const user = localStorage.getItem("user");
    const file = new FormData();
    await file.append("avatar", e.target.files[0]);
    file.append("user", user);
    console.log(file)

    const [err, response] = await uploadAvatar(file);
    if (err) return;

    updateContextAvatar(response.data.path);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === 'password') setPassword(value);
  };

  const onUpdateInfo = async (e) => {
    e.preventDefault();

    const updateInfo = {...user};
    const [err, response] = await updateMe(updateInfo._id, updateInfo);
    console.log(err, response);
  }

  return (
    <Layout>
      <h1>Profile</h1>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-3">
              <div className="border-bottom pb-4">
                <div className="user-avatar bg-primary">
                  <img style={{ width: "100%" }} src={avatar} alt="" />
                  <FileUpload onChange={handleFile} name="avatar" />
                </div>
                <div className="mb-2">
                  <h3>
                    {user.firstname} {user.lastname}
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <h3 className="pb-4">Update profile</h3>
              <form action="" onSubmit={onUpdateInfo}>
                <Input
                  label="First name"
                  name="firstname"
                  value={user.firstname}
                  onChange={onChange}
                  className="form-control"
                  mb={true}
                />
                <Input
                  label="Last name"
                  name="lastname"
                  value={user.lastname}
                  onChange={onChange}
                  className="form-control"
                  mb={true}
                />

                <Input
                  label="User name"
                  name="username"
                  value={user.username}
                  onChange={onChange}
                  className="form-control"
                  mb={true}
                />

                <Input
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={onChange}
                  className="form-control"
                  mb={true}
                />

                <Input
                  label="Change password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChange}
                  className="form-control"
                  mb={true}
                />

                <Button type="submit" text="Update profile" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
