import React,{useState} from 'react'
import {Form, Button ,Container,Spinner} from 'react-bootstrap';
import {HtmlStringToImage} from './HTMLtoImg'
import { useNavigate } from "react-router-dom";
export const FileUploader=()=>{
    let navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prompt,setPrompt]=useState("");
    const [inProgress,setInProgress]=useState(false)
 
    
    const handlePromptChange=(event)=>{
     event.preventDefault()
     setPrompt(event.target.value)
    }
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
  
      // Generate a preview of the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    };
  
    const handleSubmit = async (event) => {
        setInProgress(true)
      event.preventDefault();
      if (!file) return;
  
      const formData = new FormData();
      
      formData.append('upload_file', file);
   
      // Mock upload process (you should replace this with your actual upload logic)
      try {
    
        const res = await fetch('http://127.0.0.1:4000/detectedElements', {
        method: 'POST',
        body: formData,
       
    })
  
        if(res.ok){
         res.json().then(dt=>{
            console.log(dt,"dtt")
            navigate('./showImage',{state:{image:file,annotated_img:dt.annotated_img,detectedElements:dt.detected_elements}})
        //    setHtmlCode(extractHtmlString(dt.code))
         })
         setInProgress(false)
        }
    
      
      } catch (error) {
        console.error('Error uploading file:', error);
        setInProgress(false)

      }
    };
  
    return (
        <Container >
     {inProgress?<Spinner/>:
       
        <Form  onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Prompt</Form.Label>
          <Form.Control type="text" placeholder="Enter prompt" onChange={handlePromptChange}/>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload UI image</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      {preview && <div><img src={preview} alt="Preview" style={{ width: '400px', height: '300px' }} /></div> }
      <Button className="mt-3" variant="primary" type="submit">Upload</Button>{' '}
      </Form>
}

      </Container>
    //   <div>
    //     <form onSubmit={handleSubmit}>
    //     <Form.Label>Enter Prompt</Form.Label>
    //   <Form.Control
    //     type="text"
    //   />
    //       <input type="file" onChange={handleFileChange} />
    //       {preview && <img src={preview} alt="Preview" style={{ width: '200px', height: '200px' }} />}
    //       <button type="submit">Upload</button>
    //     </form>
    //   </div>
    );
}