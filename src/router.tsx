import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PhrasesPage from "./Phrases/PhrasesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "phrases",
        element: <PhrasesPage />,
      }
    ]
  },
]);

export default router;
