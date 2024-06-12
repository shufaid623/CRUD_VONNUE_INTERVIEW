import Crudsetter from "./Crudsetter";

export default function Routeee(){
   
    return(
        <div>
            <AuthProvider>
                    <BrowserRouter>
                    <HeaderComponent/>
                        <Routes>
                                <Route path='' element={<Crudsetter/>} />
                        </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}