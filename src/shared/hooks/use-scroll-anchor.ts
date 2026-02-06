import { useEffect, useRef } from 'react';

/**
 * useScrollAnchor
 * 
 * Este hook ayuda a mantener el scroll en una posición coherente cuando se colapsa contenido.
 * Útil para evitar que el usuario se pierda visualmente cuando una sección larga se cierra.
 * 
 * @param isExpanded - Booleano que indica si la sección está abierta
 * @param offset - Píxeles de separación desde el tope (default: 100)
 */
export function useScrollAnchor(isExpanded: boolean, offset: number = 100) {
    const elementRef = useRef<HTMLDivElement>(null);
    const wasExpanded = useRef(isExpanded);

    useEffect(() => {
        // Detectamos el momento exacto del colapso (de true a false)
        if (wasExpanded.current && !isExpanded) {
            if (elementRef.current) {
                const top = elementRef.current.getBoundingClientRect().top + window.scrollY - offset;

                // Solo ejecutamos el scroll si el elemento está fuera del viewport superior
                // o si queremos forzar el anclaje a la cabecera.
                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            }
        }
        wasExpanded.current = isExpanded;
    }, [isExpanded, offset]);

    return elementRef;
}
