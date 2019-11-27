import React, {useState} from 'react';

import { uploadAvatar } from '../api/uploadController';

import Layout from '../hoc/Layout';

function Profile() {
  const [uploadFile, setUploadFile] = useState({});
  const handleFile = async (e) => {
    setUploadFile(e.target.files[0]);

  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');

    const file = new FormData();
    await file.append("avatar", uploadFile);
    file.append('user', user);

    const [err, response] = await uploadAvatar(file);
    console.log(err.response, response);
  }

  return (
    <Layout>
      <h1>Profile</h1>
      <form action="/api/upload" onSubmit={handleUpload} method="post" encType="multipart/form-data">
        <input type="file" onChange={handleFile} name="avatar" />
        <button type="submit">Upload</button>
      </form>
    </Layout>
  );

}

export default Profile;
