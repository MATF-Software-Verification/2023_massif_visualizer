import { Outlet } from "react-router-dom"

const RootLayout = () => {
    return (
        <div className="min-h-screen overflow-auto">
            <Outlet/>
        </div>
    )
}

export default RootLayout;