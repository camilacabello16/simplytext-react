import ImageRecognition from "../components/ImageRegconition";
import TextFromImage from "../components/TextFromImage";

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
]