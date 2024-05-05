// pages/404.js

import Link from 'next/link';
import NotFoundIcon from '../public/icons/NotFound';

export default function Custom404() {
    return (
        <div>
            <h1>404 - Página no encontrada</h1>
            <NotFoundIcon />
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            
            <Link href="/">Volver a la página de inicio</Link>
        </div>
    );
}