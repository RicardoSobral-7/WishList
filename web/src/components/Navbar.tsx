import React from 'react';
import { useHistory } from "react-router-dom";
import backIcon from "../styles/icons/keyboard_backspace-24px.svg";
import "../styles/components/Navbar.css";

function Navbar() {
    const history = useHistory();

    function back() {
        history.push("/")
    }

    return (
        <nav className="create">
            <div onClick={back}>
                <img src={backIcon} alt="Home" />
            </div>
            <span>Informações</span>
        </nav>
    )
}

export default Navbar;