import React from 'react';


function Footer() {
    return (
        <footer className="footer">
            <p>Kanto Pokedex - {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer;