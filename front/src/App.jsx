import HomePage from "./pages/HomePage";
import ViewPage from "./pages/ViewPage"; // Contains Display Component
import Logout from "./components/Logout";
import Comb from "./pages/Comb";
import BlogDetails from "./components/BlogDetails"; // Blog Details Component
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Aitest from "./pages/Aitest";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<Comb isSIGN={false} />} />
      <Route path='/login' element={<Comb isSIGN={true} />} />
      <Route path="/logout" element={<Logout />} />
      <Route path='/Dashboard' element={<ViewPage />} /> {/* This will have Display component */}
      <Route path='/posts/:id' element={<BlogDetails />} /> {/* Route for blog details */}
      <Route path='/ai' element={<Aitest/>}/>
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
