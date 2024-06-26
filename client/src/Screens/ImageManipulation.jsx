import React, { useState } from 'react'
import { Button, Card, Container, Modal, Spinner, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { HtmlStringToImage } from './HTMLtoImg'
import { CustomModal } from '../Components/CustomModel';
import { base64ToBlob } from "../helpers"

export const ImageManipulation = () => {

    const location = useLocation();
    const [show, setShow] = useState(false);
    const [newImage, setNewImage] = useState("")
    const [htmlCode, setHtmlCode] = useState('')
    const [inProgress, setInProgress] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const [fileSelect, setFileSelect] = useState(false)
    const [codeModal, setCodeModal] = useState(false)
    const [file, setFile] = useState(null);
    const [suggestions, setSuggestions] = useState("");
    let navigate = useNavigate();

    const handleClose = () => {
        setShow(false)
        setShowCode(false)
        setFileSelect(false)
        setCodeModal(false)
    };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

    }
    const handlePreview = () => {
        //  navigate('../showHTML',{state:{'htmlCode':htmlCode}})


        setShowCode(true)
    }
    const extractHtmlString = (str) => {
        const startDelimiter = '```html';
        const endDelimiter = '```';

        // Find the starting position of the content after startDelimiter
        const startIndex = str.indexOf(startDelimiter);
        if (startIndex === -1) {
            throw new Error(`Start delimiter "${startDelimiter}" not found`);
        }

        // Calculate the actual start position of the content
        const contentStartIndex = startIndex + startDelimiter.length;

        // Find the end position of the content before endDelimiter
        const endIndex = str.indexOf(endDelimiter, contentStartIndex);
        if (endIndex === -1) {
            throw new Error(`End delimiter "${endDelimiter}" not found`);
        }

        // Extract the substring
        const extractedString = str.substring(contentStartIndex, endIndex).trim();

        return extractedString;
    }
    const generateCode = async () => {
        setCodeModal(true)
        setFileSelect(false)
        setShow(true)
        setInProgress(true)
        let analyzeImag
        let userPrompt=""
        if(suggestions){
         userPrompt=suggestions
        }
        // if (suggestions) {
        //     console.log()
        //     const base64Data = newImage.split(',')[1];

        //     // Convert base64 to Blob
        //     const blob = base64ToBlob(base64Data, 'image/png');

        //     // Create a File object from Blob
        //     const file = new File([blob], 'image.jpg', { type: 'image/png' });
        //     analyzeImag = file
        // }
        // else {
            analyzeImag = location.state.image
        // }
        if (!analyzeImag) return;

        const formData = new FormData();

        formData.append('upload_file', analyzeImag);
        formData.append('userPrompt',userPrompt)
        try {

            const res = await fetch('http://127.0.0.1:4000/code', {
                method: 'POST',
                body: formData,

            })

            if (res.ok) {
                res.json().then(dt => {
                    setHtmlCode(extractHtmlString(dt.result))
                    setInProgress(false)
                })

            }


        } catch (error) {
            console.error('Error uploading file:', error);

            setInProgress(false)
        }
    }
    const generateSuggestions = async () => {
        setFileSelect(true)
        setShow(true)

    }
    const handleFileSubmit = async (event) => {
        event.preventDefault();
        setInProgress(true)
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('upload_file', location.state.image);
        formData.append('userStory', file);
        try {

            const res = await fetch('http://127.0.0.1:4000/suggestions', {
                method: 'POST',
                body: formData,

            })

            if (res.ok) {
                res.json().then(dt => {
                    setSuggestions(dt.result)

                })
                setInProgress(false)
            }


        }

        catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    return (
        <Container className='py-5'>
            <div className='row justify-content-between equal-height-row'>
                <div className='col-md-4'> <img src={`data:image/png;base64,${location.state.annotated_img}`} /></div>

                <div className='col-md-6'>
                    <Card className='py-2 bg-dark text-white-50'>

                        {location?.state?.detectedElements?.map((el, ind) => {
                            return <Card.Text className="px-5 my-2">{`${ind + 1}.  ${el}`}</Card.Text>
                        })}
                    </Card>
                </div>
            </div>
            <div>
                <Button variant="secondary" onClick={generateCode}>Generate Code</Button>{" "}
                <Button variant="secondary" onClick={generateSuggestions}>Generate Improvement Suggestions</Button>
            </div>
            {/* {showCode && <HtmlStringToImage htmlCode={htmlCode} />} */}
            {codeModal && <CustomModal
                show={codeModal}
                title="Code Generated"
                handleClose={handleClose}
                body={inProgress ? <Spinner /> : (showCode ? <HtmlStringToImage htmlCode={htmlCode} setNewImage={setNewImage} /> : htmlCode)}
                htmlString={htmlCode}
                buttons={<><Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                    <Button variant="primary" onClick={handlePreview}>
                        Preview
                    </Button>
                </>}
            />}
            {fileSelect && <CustomModal
                show={fileSelect}
                title="Improvement Suggestions"
                handleClose={handleClose}
                body={inProgress ? <Spinner /> : suggestions ? suggestions : <><Form.Label>Upload User Story</Form.Label><Form.Control type="file" onChange={handleFileChange} /></>}

                buttons={<><Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                    {!suggestions ? <Button variant="primary" onClick={handleFileSubmit}>
                        Upload User Story
                    </Button> :
                        <Button variant="primary" onClick={generateCode}>
                            Implement
                        </Button>
                    }
                </>}
            />}
            {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Code Generated</Modal.Title>
        </Modal.Header>
    {
        
        fileSelect?<Modal.Body style={{margin:"0 auto"}}>{inProgress?<Spinner/>:
        suggestions?suggestions:<><Form.Label>Upload User Story</Form.Label><Form.Control type="file" onChange={handleFileChange} /></>
        }</Modal.Body>:
        <Modal.Body style={{margin:"0 auto"}}>{inProgress?<Spinner/>:htmlCode}</Modal.Body>

    }
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         {!fileSelect? <Button variant="primary" onClick={handlePreview}>
           Preview
          </Button>:
          <Button variant="primary" onClick={handleFileSubmit}>
          Upload User Story
          </Button>}
        </Modal.Footer>
      </Modal> */}
        </Container>
    )
}