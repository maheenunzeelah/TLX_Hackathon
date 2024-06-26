import React, { useState } from 'react'
import { Button, Card, Container, Modal, Spinner, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { HtmlStringToImage } from './HTMLtoImg'
import { CustomModal } from '../Components/CustomModel';
import { base64ToBlob,downloadImage } from "../helpers"

const DisplayAPI = ({ ind, el }) => {
    return (

        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{`${ind + 1}. ${el}`}</p>
    )
}
export const ImageManipulation = ({ detectedElements, annotatedImage, image }) => {

    const location = useLocation();
    const [show, setShow] = useState(false);
    const [newImage, setNewImage] = useState("")
    const [showPromptsModal, setShowPromptsModal] = useState(false)
    const [htmlCode, setHtmlCode] = useState('')
    const [inProgress, setInProgress] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const [fileSelect, setFileSelect] = useState(false)
    const [codeModal, setCodeModal] = useState(false)
    const [file, setFile] = useState(null);
    const [suggestions, setSuggestions] = useState("");
    const [promptBox, showPromptBox] = useState(false)
    const [prompt, setPrompt] = useState("");
    const [isSampleButton, setIsSampleButton] = useState(false)
    const [samplePromptsArr, setSamplePromptsArr] = useState("")
    const [apiExtract, setAPIExtract] = useState(false)
    const [apisDoc, setApisDoc] = useState("")
    const [imageModal, setImageModal] = useState(false)
    const [dalleImage, setDalleImage] = useState("")
    const [dalleButton, setDalleButton] = useState(false)
    let navigate = useNavigate();

    const handleClose = () => {
        setShow(false)
        setShowCode(false)
        setFileSelect(false)
        setCodeModal(false)
        setShowPromptsModal(false)
        setSamplePromptsArr("")
        setAPIExtract(false)
        setApisDoc("")
        setImageModal(false)
        setDalleImage("")
        setPrompt("")
        setFile(null)
        setIsSampleButton(false)
        setDalleButton(false)
        showPromptBox(false)
    };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

    }
    const handlePromptChange = (event) => {
        event.preventDefault()
        setPrompt(event.target.value)
    }
    const handlePreview = () => {
        //  navigate('../showHTML',{state:{'htmlCode':htmlCode}})


        setShowCode(true)
    }
    const extractHtmlString = (str, startDel, endDel) => {
        const startDelimiter = startDel;
        const endDelimiter = endDel;

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
        setShowPromptsModal(false)
        setShow(true)
        setInProgress(true)
        let analyzeImag
        let userPrompt = "no"
        if (suggestions) {
            userPrompt = "Given the detected elements and given image, and improvement suggestions write it's html and inline css code." + suggestions
        }
        else if (prompt) {
            userPrompt = "Given the detected elements, given image and prompt, write it's html and inline css code." + prompt
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
        console.log(image)
        analyzeImag = image
        // }
        if (!analyzeImag) return;

        const formData = new FormData();

        formData.append('upload_file', analyzeImag);
        formData.append('userPrompt', userPrompt)
        const startDel = '```html'
        const endDel = '```'
        try {

            const res = await fetch('http://127.0.0.1:4000/code', {
                method: 'POST',
                body: formData,

            })

            if (res.ok) {
                res.json().then(dt => {

                    setHtmlCode(extractHtmlString(dt.result, startDel, endDel))
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
    const manipulateImage = () => {
        showPromptBox(true)
    }
    const samplePrompts = () => {
        showPromptBox(true)
        setIsSampleButton(true)
    }
    const downloadJson = () => {
        const jsonData = extractHtmlString(apisDoc, '```json', '```')


        // Create a Blob object for the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Create a link element
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'api_data.json'; // File name

        // Append the link to the body
        document.body.appendChild(downloadLink);

        // Programmatically click the link to trigger the download
        downloadLink.click();

        // Clean up: remove the link from the body
        document.body.removeChild(downloadLink);
    }
    const generateSamplePrompt = async (event) => {
        event.preventDefault();
        setShowPromptsModal(true)

        setInProgress(true)


        const formData = new FormData();

        formData.append('prompt', prompt);
        try {

            const res = await fetch('http://127.0.0.1:4000/samplePrompts', {
                method: 'POST',
                body: formData,

            })

            if (res.ok) {
                res.json().then(dt => {
                    setSamplePromptsArr(dt.result)
                })
                setInProgress(false)
            }
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    const extractAPIs = () => {
        setAPIExtract(true)
    }
    const handleAPIFileSubmit = async (event) => {
        event.preventDefault();
        setInProgress(true)
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('upload_file', image);
        formData.append('userStory', file);
        try {

            const res = await fetch('http://127.0.0.1:4000/apiExtract', {
                method: 'POST',
                body: formData,

            })

            if (res.ok) {
                res.json().then(dt => {
                    console.log(dt.result, "result")

                    setApisDoc(dt.result)


                })
                setInProgress(false)
            }


        }

        catch (error) {
            console.error('Error uploading file:', error);
            setInProgress(false)
        }
    }
    const handleImageFileSubmit = async (event) => {
        event.preventDefault();
      
        setInProgress(true)
        if (!file) {
            alert("Please select a file");
            return;
        }


        const formData = new FormData();
        formData.append('userStory', file);
        formData.append('user_prompt', prompt);
        try {

            const res = await fetch('http://127.0.0.1:4000/generateImage', {
                method: 'POST',
                body: formData,

            })

            if (res.ok) {
                res.json().then(dt => {
                    setDalleImage(dt?.result?.data[0]?.b64_json)
                })
                setInProgress(false)
            }
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    const inputPrompt = () => {
        showPromptBox(true)
        setDalleButton(true)
    }
    const generateImage=()=>{
        setImageModal(true)
    }
    const handleFileSubmit = async (event) => {
        event.preventDefault();
        setInProgress(true)
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('upload_file', image);
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
            setInProgress(false)
        }
    }
    
    return (
        <Container className='py-5'>
            <div className='row justify-content-between equal-height-row'>
                <div className='col-md-4'> <img src={`data:image/png;base64,${annotatedImage}`} /></div>

                <div className='col-md-6'>
                    <Card className='py-2 text-black' style={{ fontWeight: "bold", lineHeight: "18px", backgroundColor: "#ffffff", opacity: "0.6" }}>

                        {detectedElements?.map((el, ind) => {
                            return <Card.Text className="px-5 my-2">{`${ind + 1}.  ${el}`}</Card.Text>
                        })}
                    </Card>
                </div>
            </div>
            {promptBox && <>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Prompt</Form.Label>
                        <Form.Control type="text" placeholder="Enter prompt" onChange={handlePromptChange} />
                    </Form.Group>
                    <    Button className="mt-3" variant="primary" onClick={isSampleButton ? generateSamplePrompt : (dalleButton ? generateImage : generateCode)}>Enter</Button>{' '}
                </Form>
            </>}
            <div>
                <Card className='py-2 mt-5' >
                    <Card.Text className="px-5 my-2">
                        <Button variant="secondary" onClick={generateCode}>Generate Code</Button>{" "}
                        <Button variant="secondary" onClick={generateSuggestions}>Generate Improvement Suggestions</Button>{" "}
                        <Button variant="secondary" onClick={manipulateImage}>Prompt for Manipulation</Button>{" "}
                        <Button variant="secondary" onClick={samplePrompts}>Sample Prompts</Button>{" "}
                        <Button variant="secondary" onClick={extractAPIs}>Extract APIs</Button>{" "}
                        <Button variant="secondary" onClick={inputPrompt}>Dalle Image</Button>{" "}
                        
                    </Card.Text>

                </Card>

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
                body={inProgress ? <Spinner /> : suggestions ? suggestions?.split(/\d+\.\s/).filter(Boolean).map((el, ind) => <p style={{ fontSize: "18px", fontWeight: "bold" }}>{`${ind + 1}. ${el}`}</p>) : <><Form.Label>Upload User Story</Form.Label><Form.Control type="file" onChange={handleFileChange} /></>}

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
            {apiExtract && <CustomModal
                show={apiExtract}
                title="Extract APIs"
                handleClose={handleClose}
                body={inProgress ? <Spinner /> : apisDoc ? apisDoc?.split(/\d+\.\s/).filter(Boolean).map((el, ind) => <DisplayAPI ind={ind} el={el} />) : <><Form.Label>Upload User Story</Form.Label><Form.Control type="file" onChange={handleFileChange} /></>}

                buttons={<><Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                    {!apisDoc ? <Button variant="primary" onClick={handleAPIFileSubmit}>
                        Upload User Story
                    </Button> :
                        <Button variant="primary" onClick={downloadJson}>
                            Download JSON
                        </Button>
                    }
                </>}
            />}
            {imageModal && <CustomModal
                show={imageModal}
                title="Image Generation"
                handleClose={handleClose}
                body={inProgress ? <Spinner /> : (dalleImage ? <img src={"data:image/jpeg;base64," + dalleImage }  />: <><Form.Label>Upload User Story</Form.Label><Form.Control type="file" onChange={handleFileChange} /></>)}

                buttons={<><Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                    {!dalleImage ? <Button variant="primary" onClick={handleImageFileSubmit}>
                        Upload User Story
                    </Button> :
                        <Button variant="primary" onClick={()=>downloadImage(`data:image/jpeg;base64,${dalleImage}`,"dallImg")}>
                            Download Image
                        </Button>
                    }
                </>}
            />}
            {showPromptsModal && <CustomModal
                show={showPromptsModal}
                title="Sample Prompts"
                handleClose={handleClose}
                body={inProgress ? <Spinner /> : samplePromptsArr?.split(/\d+\.\s/).filter(Boolean).map((el, ind) => <p>{`${ind + 1}. ${el}`}</p>)}

                buttons={<><Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

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