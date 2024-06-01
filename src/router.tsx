import { createHashRouter } from "react-router-dom";
import App from "./App";
import DemoPage from "./Demo/DemoPage";
import PhrasesPage from "./Phrases/PhrasesPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "phrases",
        element: <PhrasesPage />,
      },
      {
        path: "demo",
        element: <DemoPage />,
      }
    ]
  },
]);

export default router;
