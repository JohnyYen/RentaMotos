import { Button, Flex } from "antd";
import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = () => {
    const [sign, setSign] = useState();
    const [url, setUrl] = useState();

    const handleClear = () => {
        sign.clear();
        setUrl('');
    }

    const handleSave = () => {
        if(!sign.isEmpty()) {
            setUrl(sign.toDataURL('image/png'));
        } else {
            alert('No hay ninguna firma para guardar');
        }
    }

  return (
    <>
      <Flex vertical="true" >
        <Flex style={{ border: '2px solid black', width: '300px', height: '100px' }}>
          <SignatureCanvas
            canvasProps={{
              width: "300px",
              height: "100px",
              className: "sigCanvas",
            }}
            ref={data => setSign(data)}
          />
        </Flex>
        <Flex style={{ marginTop: '5px' }} >
          <Button style={{marginRight: '2px'}} onClick={handleClear} type='primary' >Borrar</Button>
          <Button onClick={handleSave} type='primary' >Guardar</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default SignaturePad;