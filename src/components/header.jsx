import { Link } from "react-router-dom"

export default function Header() {
   
   return(
    <>
        <nav className = "header-container">
            <div>
                <h1 className="header-title" onClick={() => window.location.href = "/movie-calendar/"}>
    Box Office Calendar
</h1>
            </div>

            <div className = "header-links">
                <Link to = "/">
                <button className = "header-button">Calendar</button>
                </Link>

                <Link to = "/about">
                <button className = "header-button">About</button>
                </Link>
            </div>
            
        </nav>


    </>

   )
    
}