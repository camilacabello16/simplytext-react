import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

const TextFromImage = () => {
    const [text, setText] = useState('');

    useEffect(() => {
        console.log(Tesseract);
    }, [])

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];

        // Load the Tesseract.js library and set the language for text recognition
        // await Tesseract.load();
        // await Tesseract.setLanguage('eng');

        // Perform OCR on the uploaded image
        const { data } = await Tesseract.recognize(imageFile);
        console.log(data);
        setText(data.text);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div>
                <h3>Extracted Text:</h3>
                <p>{text}</p>
            </div>
        </div>
    );
}
export default TextFromImage;