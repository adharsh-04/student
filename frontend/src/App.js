
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import AddEvents from './components/addEvents/Addevents';
import ViewEvents from './components/Viewevents/Viewevents';
import Events from './components/Events/Events';
import Chatbot from "../src/chatbot/Chatbot";
import Dashboard from './Dashboard/Dashboard';
import Scholorship from './components/Scholorship/Scholorship';
import FileUploadForm from "./print/FileUploadForm";
// import FileUpload from "./File/FileUpload";

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
        path:'dashboard',
        element:<Dashboard/>,
        children:[
        {path:'fileuploadform',
        element:<FileUploadForm/>,
        },
        {
          path: 'events',
          element: <Events/>,
          children: [
            {
              path: 'addevents',
              element: <AddEvents />
            },
            {
              path: 'viewevents',
              element: <ViewEvents />
            }
          ]
        },
        {
          path:"scholorship",
          element:<Scholorship/>
        },
        ]
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <h1 className="text-center text-danger" style={{ fontWeight: 'bold' }}>
        Welcome to the Project
        <Chatbot/>
      </h1>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
