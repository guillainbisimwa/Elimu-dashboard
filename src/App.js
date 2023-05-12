import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux'; // Add this import statement
import { store } from './redux/Store'; // Import your Redux store
import Router from './routes';
import ThemeProvider from './theme';

export default function App() {
  return (
    <Provider store={store}>
      <style>{`body { background-color: #f2f8ff; }`}</style>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
