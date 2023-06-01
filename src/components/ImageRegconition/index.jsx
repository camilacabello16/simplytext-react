import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { Button, Col, Image, Row, Upload, message } from "antd";
import { useRef, useState } from "react";

const ImageRecognition = () => {
    const wrapRef = useRef();

    const [imageSrc, setImageSrc] = useState("");
    const [prediction, setPrediction] = useState([]);
    const [loadingPredict, setLoadingPredict] = useState(false);
    const [widthWrap, setWidthWrap] = useState(0);
    const [imageWidth, setImageWidth] = useState(null);

    const propsUpload = {
        name: 'file',
        action: '',
        // onChange(info) {
        //     if (info.file.status !== 'uploading') {
        //         // setImageSrc(info.file.originFileObj);
        //         const imgElement = document.createElement("img");
        //         imgElement.src = URL.createObjectURL(info.file.originFileObj);

        //         imgElement.onload = async () => {
        //             await detectImageObject(imgElement);
        //         }

        //     }
        //     if (info.file.status === 'done') {
        //         console.log(info.file, info.fileList);
        //     }
        // },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                const imgElement = document.createElement('img');
                imgElement.src = URL.createObjectURL(info.file.originFileObj);

                imgElement.onload = async () => {
                    setImageWidth(imgElement.width);
                    setImageSrc(info.file.originFileObj);
                    await detectImageObject(imgElement);
                };
            }

            if (info.file.status === 'done') {
                console.log(info.file, info.fileList);
            }
        },
    };

    const detectImageObject = async (image) => {
        setLoadingPredict(true);
        setWidthWrap(wrapRef.current.offsetWidth);
        console.log(wrapRef.current.offsetWidth);
        const model = await cocoSsd.load({});
        const predictions = await model.detect(image, 10);

        console.log(predictions);
        setPrediction(predictions);
        setLoadingPredict(false);
    }

    return (
        <Row>
            <Col span={24}>
                <div style={{
                    border: '1px solid rgb(215 214 214)',
                    borderRadius: 8,
                    textAlign: 'center',
                    position: 'relative',
                    margin: 'auto',
                }}
                    className="image-recognize-box"
                    ref={wrapRef}
                >
                    {imageSrc &&
                        <img
                            src={URL.createObjectURL(imageSrc)}
                        />
                    }
                    {prediction.map((item, index) => {
                        return (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: (widthWrap / 2 - imageWidth / 2) + item.bbox[0],
                                    top: item.bbox[1],
                                    width: item.bbox[2],
                                    height: item.bbox[3],
                                    border: '2px solid green'
                                }}
                                key={index}
                                className="recognize-box"
                                datacustomattribute={item.class + " " + (item.score * 100).toFixed(2) + "%"}
                            ></div>
                        );
                    })}
                </div>
            </Col>
            <Col span={24} style={{ marginTop: 16, textAlign: 'center' }}>
                <Upload
                    {...propsUpload}
                    accept="image/*"
                    maxCount={1}
                    showUploadList={false}
                >
                    <Button type="primary" loading={loadingPredict}>{loadingPredict ? "Recognizing..." : "Upload Image"}</Button>
                </Upload>
            </Col>
        </Row>
    );
}

export default ImageRecognition;