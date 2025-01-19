import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";;

// const checkImageDimensions = (file, requiredWidth, requiredHeight) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         if (img.width === requiredWidth && img.height === requiredHeight) {
//           resolve();
//         } else {
//           reject(
//             new Error(
//               `Image dimensions must be exactly ${requiredWidth}x${requiredHeight}px`
//             )
//           );
//         }
//       };
//       img.onerror = () => reject(new Error("Invalid image file"));
//       img.src = e.target.result;
//     };
//     reader.onerror = () => reject(new Error("File reading error"));
//     reader.readAsDataURL(file);
//   });
// };

const UploadMoto = ({ setImageBase64 }) => {
  
  // const requiredWidth = 400; 
  // const requiredHeight = 400; 

  const handleChange = (info) => {
    console.log(info)
    message.success(`${info.file.name} file uploaded successfully`);
      const file = info.file.originFileObj;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const base64Image = reader.result;
        console.log(base64Image);
        setImageBase64(base64Image);
      };
      
  };

  

  return (
    <>
      <Upload
        accept="image/*"
        maxCount={1}
        onChange={handleChange}
        beforeUpload={() => false} // Evita que el componente intente subir la imagen automáticamente
      >
        <Button icon={<UploadOutlined />}>Subir imagen</Button>
      </Upload>
    </>
  );
};

export default UploadMoto;
