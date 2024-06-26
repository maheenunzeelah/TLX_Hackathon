import {Button, Card, Container, Modal,Spinner,Form} from 'react-bootstrap';
import './CustomModel.css'

export const CustomModal=({title,body,buttons,show,inProgress,htmlString, handleClose,handlePreview,handleFileSubmit})=>{
    return (
        <Modal   
       
        show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{margin:"0 auto", width:"100%"}}> {
        body

    }</Modal.Body>
   
        <Modal.Footer>
         {buttons}
        </Modal.Footer>
      </Modal>
    
    // <Modal show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>{}</Modal.Title>
    //     </Modal.Header>
    // {
        
    //     fileSelect?<Modal.Body style={{margin:"0 auto"}}>{inProgress?<Spinner/>:
    //     suggestions?suggestions:<><Form.Label>Upload User Story</Form.Label><Form.Control type="file" onChange={handleFileChange} /></>
    //     }</Modal.Body>:
    //     <Modal.Body style={{margin:"0 auto"}}>{inProgress?<Spinner/>:htmlCode}</Modal.Body>

    // }
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={handleClose}>
    //         Close
    //       </Button>
    //      {!fileSelect? <Button variant="primary" onClick={handlePreview}>
    //        Preview
    //       </Button>:
    //       <Button variant="primary" onClick={handleFileSubmit}>
    //       Upload User Story
    //       </Button>}
    //     </Modal.Footer>
    //   </Modal>
      
    )
}
