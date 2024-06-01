import { createHashRouter } from "react-router-dom";
import App from "./App";
import DemoPage from "./Demo/DemoPage";
import PhrasesPage from "./Phrases/PhrasesPage";
import SignInPage from "./SignIn/SignInPage";
import SignUpPage from "./SignUp/SignUpPage";

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
  {
    path: "sign-in",
    element: <SignInPage />,
  },
  {
    path: "sign-up",
    element: <SignUpPage />,
  },
]);

export default router;
