import HomePage from "./pages/HomePage";
import ViewPage from "./pages/ViewPage";
import Logout from "./components/Logout";
import Comb from "./pages/Comb";
import BlogDetails from "./components/BlogDetails";
import ChangeName from "./pages/ChangeName";

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
      <Route path='/Dashboard' element={<ViewPage />} /> 
      <Route path='/posts/:id' element={<BlogDetails />} />
      <Route path='/ai' element={<Aitest/>}/>
      <Route path='/changename' element={<ChangeName/>}/>
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
