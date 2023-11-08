import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import { AuthProvider } from "./context/AuthProvider";
import { EventosProvider } from "./context/EventosProvider";
import { GenerationProvider } from "./context/GenerationProvider";

import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Login from "./pages/Login";
import NuevoPassword from "./pages/NuevoPassword";
import OlvidePassword from "./pages/OlvidePassword";
import Registrar from "./pages/Registrar";
import MyProfile from "./pages/MyProfile";

import NotFound from "./components/NotFound";
import BorrarEvento from "./pages/BorrarEvento";
import EditarEvento from "./pages/EditarEvento";
import Evento from "./pages/Evento";
import Eventos from "./pages/Eventos";
import Inicio from "./pages/Inicio";
import NuevoColaborador from "./pages/NuevoColaborador";
import NuevoEvento from "./pages/NuevoEvento";

import Calendar from "./pages/Calendar";

import Generation from "./pages/Generation";
import Generations from "./pages/Generations";
import NewGeneration from "./pages/NewGeneration";

import { LineUpProvider } from "./context/LineUpProvider";
import LineUps from "./pages/LineUps";

const theme = extendTheme({
  fonts: {
    body: "'Nunito', sans-serif",
    heading: "'Nunito', sans-serif",
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <EventosProvider>
            <GenerationProvider>
              <LineUpProvider>
                <Routes>
                  <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="registrar" element={<Registrar />} />
                    <Route
                      path="olvide-password"
                      element={<OlvidePassword />}
                    />
                    <Route
                      path="olvide-password/:token"
                      element={<NuevoPassword />}
                    />
                    <Route
                      path="nuevo-password"
                      element={<NuevoPassword />}
                    />
                    <Route
                      path="confirmar/:id"
                      element={<ConfirmarCuenta />}
                    />
                  </Route>
                  <Route path="/inicio" element={<RutaProtegida />}>
                    <Route index element={<Inicio />} />
                  </Route>

                  <Route>
                    <Route path="/profilePlayer/:id" element={<MyProfile />} />
                  </Route>

                  <Route path="/events" element={<RutaProtegida />}>
                    <Route index element={<Eventos />} />
                    <Route path="crear-evento" element={<NuevoEvento />} />
                    <Route path=":id" element={<Evento />} />
                    <Route path="editar/:id" element={<EditarEvento />} />
                    <Route path="borrar/:id" element={<BorrarEvento />} />
                    <Route
                      path="nuevo-colaborador/:id"
                      element={<NuevoColaborador />}
                    />
                  </Route>
                  <Route path="/calendar" element={<RutaProtegida />}>
                    <Route index element={<Calendar />} />
                  </Route>

                  <Route path="/generations" element={<RutaProtegida />}>
                    <Route index element={<Generations />} />
                    <Route
                      path="crear-categoria"
                      element={<NewGeneration />}
                    />
                    <Route path=":id" element={<Generation />} />
                    <Route
                      path=":generation/lineups/:id?"
                      element={<LineUps />}
                    />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </LineUpProvider>
            </GenerationProvider>
          </EventosProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
