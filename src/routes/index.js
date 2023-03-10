import { Route, Routes } from "react-router-dom";

import App from "../pages/App";
import Calendar from "../pages/Calendar";

const PageRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/calendar" element={<Calendar />} />
      {/* TODO: Implement NotFound route*/}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default PageRouter;
