import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes/routes';
import { GOOGLE_CLIENT_ID } from './config/google.config';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1E1E1E',
            color: '#fff',
            border: '1px solid rgba(247, 223, 30, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#F7DF1E',
              secondary: '#1E1E1E',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4b4b',
              secondary: '#1E1E1E',
            },
          },
        }}
      />
      <GoogleOAuthProvider
        clientId={GOOGLE_CLIENT_ID}
        onScriptLoadError={() => console.error('Google Script failed to load')}
      >
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
