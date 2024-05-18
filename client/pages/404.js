import React from 'react';

import Link from 'next/link';

const Custom404 = () => {
    return (
        <div>
            <h1>404 - Página no encontrada</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            
            <Link href="/">Volver a la página de inicio</Link>
        </div>
    );
}

export default Custom404;