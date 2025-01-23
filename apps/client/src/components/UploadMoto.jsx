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

  const handleBeforeUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target.result;
      setImageBase64(base64); // Actualiza el estado en el componente padre
    };

    reader.readAsDataURL(file); // Convierte la imagen a base64

    // Evita que el archivo se suba automáticamente
    return false;
  };

  

  return (
    <>
      <Upload
        accept="image/*"
        maxCount={1}
        beforeUpload={handleBeforeUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Subir imagen</Button>
      </Upload>
    </>
  );
};

export default UploadMoto;
