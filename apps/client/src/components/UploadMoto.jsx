import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";;

const checkImageDimensions = (file, requiredWidth, requiredHeight) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === requiredWidth && img.height === requiredHeight) {
          resolve();
        } else {
          reject(
            new Error(
              `Image dimensions must be exactly ${requiredWidth}x${requiredHeight}px`
            )
          );
        }
      };
      img.onerror = () => reject(new Error("Invalid image file"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("File reading error"));
    reader.readAsDataURL(file);
  });
};

const UploadMoto = () => {
  
  const requiredWidth = 400; 
  const requiredHeight = 400; 

  return (
    <>
      <Upload
      action="https://example.com/upload"
        accept="image/*"
        maxCount={1}
        onChange={(info) => {
          if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
        beforeUpload={(file) => {
            // Validar dimensiones exactas
            return checkImageDimensions(file, 400, 400)
            .then(() => true) // Dimensiones válidas
            .catch((err) => {
              message.error(err.message);
              return Upload.LIST_IGNORE; // Rechazar carga
            });
        }}
      >
        <Button icon={<UploadOutlined />}>Subir imagen</Button>
      </Upload>
    </>
  );
};

export default UploadMoto;
