import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Addevents from './components/addEvents/Addevents';
import ViewEvents from './components/Viewevents/Viewevents';
import Dashboard from '../src/Dashboard/Dashboard';
import Events from './components/Events/Events';
import Scholorship from './components/Scholorship/Scholorship';
import Chatbot from "../src/chatbot/Chatbot";
import FileUploadForm from "./print/FileUploadForm";
import FileUpload from "../src/File/FileUpload";
import payment from './payment/payment';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Root />,
      children: [
        {
          path: '',
          element: <Home />
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
          path:'/payment',
          element:<payment/>
        },
        {
          path: 'dashboard',
          element: <Dashboard />
          // children: [
          //   {
          //     path: 'fileuploadform',
          //     element: <FileUploadForm />
          //   },
          //   {
          //     path: 'scholorship',
          //     element: <Scholorship />
          //   },
          //   {
          //     path: 'fileupload',
          //     element: <FileUpload />
          //   }
          // ]
        },
        {
          path:'/fileuploadform',
          element:<FileUploadForm/>


        },
        {
          path:'/scholarship',
          element:<Scholorship/>

        },
        {
          path:'/fileupload',
          element:<FileUpload/>
        },


        {
          // "Events" route should be outside the "Dashboard" so that it opens in a separate page.
          path: 'events',
          element: <Events />,
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
      
        <Chatbot />
      
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
