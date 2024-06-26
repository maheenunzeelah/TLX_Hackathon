from inference_sdk import InferenceHTTPClient
import supervision as sv
import base64
import numpy as np
from PIL import Image
import io
import cv2
from helpers import convert_image_to_base64
def display_detected_objects(img_bytes,generate_mask=False):
     result = CLIENT.infer(img_bytes, model_id="ui-elemebts/1")
     label_annotator = sv.LabelAnnotator(text_scale=0.3,text_padding=5)
     bounding_box_annotator = sv.BoxAnnotator()
     labels = []
     
     image_data = base64.b64decode(img_bytes)
     image = Image.open(io.BytesIO(image_data))
  
     detections = sv.Detections.from_roboflow(result)
     for i in range(len(detections.xyxy)):
    # labels = [f'{item["class"]} at({item["x"]},{item["y"]})' for item in result["predictions"]] 
        label=f"{detections.data['class_name'][i]} located at({detections.xyxy[i].tolist()[0]}, {detections.xyxy[i].tolist()[1]}) "
        labels.append(label)
     prompts=[]

     if result["predictions"]:
             for detection in detections:
                print(detection)
                 # detection=list(detection.values())
                 
                (array_inside, extra, prob,class_id,detect_id,class_obj)=detection
            # print(array_inside)
                x,y,w,h=array_inside
                class_name=class_obj["class_name"]
                # x, y, w,h,prob, class_name,class_id_no,detect_id = detection
                x = round(x)
                y = round(y)
                w = round(w)
                h = round(h)
                # Draw rectangle around the detected object
                if generate_mask == True:
                  if class_name == "BackgroundImage":
                     height, width = image.shape[:2]
                     x = max(0, min(x, width - 1))
                     y = max(0, min(y, height - 1))
                     w = min(w, width - x)
                     h = min(h, height - y)
                  #    mask = np.zeros_like(image, dtype=np.uint8)
                  
                     mask_2 = Image.new("RGBA", (width, height), (0, 0, 0, 1))  # create an opaque image mask
                  
                     # set the detected element to be transparent
                    
                     for a in range(x,x+w):
                         for b in range(y, y+h):  # only loop over the bottom half of the mask
                             # set alpha (A) to zero to turn pixel transparent
                             alpha = 0
                             mask_2.putpixel((a, b), (0, 0, 0, alpha))
                  
                     # Save or display the result
                     output_path = 'login2_mask.png'
                     mask_2.save(output_path)
                prompts.append(f'{class_name} located at coordinates ({x,y}) to ({x+w,y+h})')
     
     annotated_image = bounding_box_annotator.annotate(
      scene=image, detections=detections)
     annotated_image = label_annotator.annotate(
        scene=annotated_image, detections=detections, labels=labels)  
     encoded_img=convert_image_to_base64(annotated_image)
    
     return  prompts,encoded_img
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="c943ObuEDr0C12trZv37"
)


# prompt_text=display_detected_objects(image_path="1.png", detections=result['predictions'])
# print(prompt_text)