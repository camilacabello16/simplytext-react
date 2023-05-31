import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { Button, Col, Image, Row, Upload } from "antd";
import { useState } from "react";

const ImageRecognition = () => {
    const [imageSrc, setImageSrc] = useState("");

    const propsUpload = {
        name: 'file',
        action: '',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setImageSrc(info.file.originFileObj)
            }
            if (info.file.status === 'done') {
                console.log(info.file, info.fileList);
            }
        },
    };

    return (
        <Row>
            <Col span={24}>
                <div style={{
                    border: '1px solid rgb(215 214 214)',
                    borderRadius: 8,
                    textAlign: 'center'
                }}>
                    {imageSrc &&
                        <Image
                            src={URL.createObjectURL(imageSrc)}
                            preview={false}
                        />
                    }
                </div>
            </Col>
            <Col span={24} style={{ marginTop: 16 }}>
                <Upload {...propsUpload} accept="image/*" maxCount={1} onPreview={false}>
                    <Button type="primary">Upload Image</Button>
                </Upload>
            </Col>
        </Row>
    );
}

export default ImageRecognition;