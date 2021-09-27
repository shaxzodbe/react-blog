import React from 'react';
import './Footer.css'

export const Footer = ({year}) => {
    return (
        <footer>
            <span>React Blog - {year}</span>
        </footer>
    );
};