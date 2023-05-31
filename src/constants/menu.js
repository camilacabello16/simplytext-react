import Blockchain from "../components/Blockchain";
import ImageRecognition from "../components/ImageRegconition";
import TextFromImage from "../components/TextFromImage";
import VoiceToText from "../components/VoiceToText";

export const menu = [
    {
        path: "/",
        element: <div>Hello world</div>,
        text: "Home"
    },
    {
        path: "/text-from-image",
        element: <TextFromImage />,
        text: "Text From Image"
    },
    {
        path: "/image-recognition",
        element: <ImageRecognition />,
        text: "Image Recognition"
    },
    {
        path: "/voice-to-text",
        element: <VoiceToText />,
        text: "Voice to text"
    },
    {
        path: "/blockchain",
        element: <Blockchain />,
        text: "Blockchain"
    },
]