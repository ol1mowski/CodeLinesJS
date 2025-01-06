import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { router } from "./routes/routes";
import { GOOGLE_CLIENT_ID } from "./config/google.config";

function App() {
  return (
    <GoogleOAuthProvider 
      clientId={GOOGLE_CLIENT_ID}
      onScriptLoadError={() => console.error('Google Script failed to load')}
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
