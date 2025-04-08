import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import "./base.css";
import { SeasonPage, SeasonsPage } from "./pages/Seasons";
import { NavBar } from "./components";
import { PlayersPage } from "./pages/Players/PlayersPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <NavBar />
          <div className="mx-auto flex flex-col gap-4 p-4">
            <h1 className="mb-6 text-7xl">Rainbow Comp Stuff</h1>
            <Routes>
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/players/:id" element={<PlayersPage />} />
              <Route path="/seasons" element={<SeasonsPage />} />
              <Route path="/seasons/:id" element={<SeasonPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
