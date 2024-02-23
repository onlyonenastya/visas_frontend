import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import { useState } from "react"
import Header from "./Components/Header/Header"
import { Visa } from "./Types"
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import VisaPage from "./Pages/VisaPage/VisaPage"
import VisasList from "./Pages/VisasList/VisasList"
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import StartPage from "./Pages/StartPage/StartPage"
function App() {
  const [selectedVisa, setSelectedVisa] = useState<Visa | undefined>(undefined)

  return (
    <BrowserRouter basename="/services">
      <div className="App">
        <div className="wrapper">
          <Header />

          <div className="content-wrapper">
            <Breadcrumbs />

            <Routes>
              {/* <Route path="/" element={<Navigate to="/visas" replace />} /> */}
              <Route path="/" element={<StartPage />} />

              <Route path="/profile" element={<ProfilePage />} />

              <Route path="/visas" element={<VisasList />} />

              <Route
                path="/visas/:id"
                element={
                  <VisaPage
                    selectedVisa={selectedVisa}
                    setSelectedVisa={setSelectedVisa}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
