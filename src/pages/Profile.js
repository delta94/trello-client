import React, {useState} from 'react';
import Layout from '../hoc/Layout';

import { uploadAvatar } from '../api/uploadController';

function Profile() {
  const [uploadFile, setUploadFile] = useState({});
  const handleFile = async (e) => {
    setUploadFile(e.target.files[0]);

  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = new FormData();
    await file.append("avatar", uploadFile);

    const [err, response] = await uploadAvatar(file);
    console.log(err, response);
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