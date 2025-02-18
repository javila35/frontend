import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import "./base.css";
import { SeasonPage, SeasonsPage } from "./pages/Seasons";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <h1>Rainbow Comp Stuff</h1>
          <Routes>
            <Route path="/seasons" element={<SeasonsPage />} />
            <Route path="/seasons/:id" element={<SeasonPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
