import './Upload.css'
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

function Upload() {

  const [file, setFile] = useState();
  const [fileName, setFilename] = useState('Choose file');
  const [uploadedFile, setuploadedFile] = useState({});

  function onChange(e) {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const { fileName, filePath } = res.data;

      axios.post('/api/previous-sessions', {
        bill_image: fileName,
        contract_id: 1,
      })
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg)
      }
    }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='upload-input'>

          <label className="btn btn-outline-primary" >
            {fileName}
            <input type='file' onChange={onChange} style={{ display: "none" }} />
          </label>
        </div>

        <Button color="success">Upload</Button>
      </form>
    </>
  );
}

export default Upload;
