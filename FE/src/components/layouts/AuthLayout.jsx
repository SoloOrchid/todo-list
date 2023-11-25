import NavBar from "../NavBar.jsx";

export const AuthLayout = ({children}) => {
    return (
        <>
            <NavBar/>
            <div className="px-36">
                {children}
            </div>
        </>
    )
}


export default AuthLayout;