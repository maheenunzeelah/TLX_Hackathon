import React, { useEffect, useRef,useState } from 'react';
import { toPng } from 'html-to-image';
import placeholder from "../images/placeholder.png"
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
export const HtmlStringToImage = ({htmlCode,setNewImage,showCode}) => {
    const elementRef = useRef(null);
    const [preImg,setPreImage]=useState("")
    const htmlString = htmlCode
    const downloadImage = (base64Data, fileName) => {
        // Convert base64 to blob
        const byteCharacters = atob(base64Data.split(',')[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: 'image/png' });

        // Create a temporary URL
        const url = URL.createObjectURL(blob);

        // Create a link element, set its attributes, and click it programmatically
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'download.png';
        document.body.appendChild(link);
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };
    const handleDownloadImage = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        // const node=document.getElementById('my-node')
        // if (node === null) {
        //     return;
        // }
        try {
            // const images =node.getElementsByTagName('img');
            // const promises = [];
            // for (let img of images) {

            //     img.src = placeholder
            //     // promises.push(new Promise((resolve, reject) => {
            //     //     img.onload = () => {
            //     //         console.log(placeholder)
            //     //         img.src = placeholder; // Replace src once image is loaded
            //     //       resolve();
            //     //     };
            //     //     img.onerror = reject;
            //     //   }));


            // }
            // // await Promise.all(promises);
            // const dataUrl = await toPng(elementRef.current);
            const randomString = Math.random().toString(36).substring(2, 8); // Random string of length 6

            // Get current timestamp
            const timestamp = new Date().getTime();

            // Combine timestamp and random string
            const fileName = `${timestamp}_${randomString}`;
            downloadImage(preImg,fileName)
        } catch (error) {
            console.error('Oops, something went wrong!', error);
        }
    };
    const doSomething = async() =>{
        try {
            const node=document.getElementById('my-node')
            const images = node.getElementsByTagName('img');
           
            for (let img of images) {

                img.src = placeholder
        


            }
           
            const dataUrl = await toPng(node);
            var img = new Image();
            img.src = dataUrl;
            setNewImage(dataUrl)
            setPreImage(dataUrl)
            console.log(node)
            node.innerHTML=""
           node.appendChild(img);
        } catch (error) {
            console.error('Oops, something went wrong!', error);
        }
  
        }
useEffect(()=>{
    doSomething()
     
    
    
},[])
    return (
        <div>
      
            <div id="my-node" dangerouslySetInnerHTML={{ __html:htmlString }} />
            {/* <div   dangerouslySetInnerHTML={{ __html:htmlString }} ></div> */}
            
           <div style={{marginRight:"40px", float:'right'}} >
            <Button size="lg" variant="outline-primary" className="mt-5 px-5" onClick={handleDownloadImage}>Download as Image</Button>
            </div>
         
        </div>
    );
};


