import logo from './logo.svg';
import './App.css';
// import {ControlledAccordions} from './components/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './setup/routes'

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ControlledAccordions /> */}
      <AppRoutes />
    </QueryClientProvider>
    
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <Routes />
    //   </PersistGate>
    // </Provider>

  );
};

export default App;
