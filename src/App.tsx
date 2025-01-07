import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from "./routes/routes";
import { GOOGLE_CLIENT_ID } from "./config/google.config";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider 
        clientId={GOOGLE_CLIENT_ID}
        onScriptLoadError={() => console.error('Google Script failed to load')}
      >
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
