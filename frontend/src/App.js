import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Addevents from './components/addEvents/Addevents';
import ViewEvents from './components/Viewevents/Viewevents';
import Dashboard from '../src/Dashboard/Dashboard';
import Events from './components/Events/Events';
import Scholarship from './components/Scholorship/Scholarship';
import FileUploadForm from './print/FileUploadForm';
import FileUpload from '../src/File/FileUpload';
import Chatbot from '../src/chatbot/Chatbot';
import EventRegistrationForm from './components/Events/EventRegistrationForm';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />, // Root component for general layout
      children: [
        {
          path: '',
          element: <Home /> // Default route when accessing '/'
        },
        {
          path: 'signup',
          element: <Registration />
        },
        {
          path: 'signin',
          element: <Login />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'fileuploadform',
          element: <FileUploadForm />
        },
        {
          path: 'scholarship',
          element: <Scholarship />
        },
        {
          path: 'fileupload',
          element: <FileUpload />
        },
        {
          path: 'eventregister',
          element: <EventRegistrationForm />
        },
        {
          path: 'events',
          element: <Events />, // Events section with nested routes
          children: [
            {
              path: 'addevents',
              element: <Addevents />
            },
            {
              path: 'viewevents',
              element: <ViewEvents />
            }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="App">
      
      <RouterProvider router={router} />
      <Chatbot/>
    </div>
  );
}

export default App;
