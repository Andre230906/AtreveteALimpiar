// Espera a que todo el contenido de la página se haya cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene los elementos necesarios de la página
    const cursorFollower = document.getElementById('cursor-follower'); // Cursor que sigue al puntero
    const geometricBackground = document.getElementById('geometric-background'); // Fondo geométrico
    const sections = document.querySelectorAll('.section'); // Todas las secciones
    const guideItems = document.querySelectorAll('.guide-item'); // Elementos de la guía
    const objectiveTexts = document.querySelectorAll('.objective-text'); // Textos de los objetivos
    const contactForm = document.getElementById('contact-form'); // Formulario de contacto
  
    // Mueve el cursor que sigue al mouse
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; // Cambia la posición del cursor
    });

    // Cambia el color del mouse cuando pasas sobre enlaces
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('mouseenter', () => {
            cursorFollower.style.backgroundColor = '#FFC107'; // Color amarillo al pasar el ratón
        });
        anchor.addEventListener('mouseleave', () => {
            cursorFollower.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Color oscuro al quitar el ratón
        });
    });
  
    // Función para crear el fondo de figuritas
    function createGeometricBackground() {
        const shapes = ['triangle', 'circle', 'square']; // Tipos de formas
        const colors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63']; // Colores para las formas
    
        for (let i = 0; i < 50; i++) { // Crea 50 formas
            const shape = document.createElement('div'); // Crea un nuevo elemento div
            shape.classList.add('geometric-shape', shapes[Math.floor(Math.random() * shapes.length)]); // Añade clase de forma aleatoria
            shape.style.left = `${Math.random() * 100}%`; // Posición aleatoria en el eje X
            shape.style.top = `${Math.random() * 100}%`; // Posición aleatoria en el eje Y
            shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Color aleatorio
            shape.style.opacity = Math.random() * 0.5 + 0.1; // Opacidad aleatoria
            shape.style.transform = `scale(${Math.random() * 0.5 + 0.5})`; // Tamaño aleatorio
            geometricBackground.appendChild(shape); // Añade la forma al fondo
        }
    }
    
    // Interacción con las formas geométricas al hacer clic
    geometricBackground.addEventListener('click', (e) => {
        if (e.target.classList.contains('geometric-shape')) { // Si el clic fue en una forma
            e.target.style.backgroundColor = '#FF5722'; // Cambia a color naranja
            setTimeout(() => e.target.remove(), 500); // Elimina la forma después de medio segundo
        }
    });

    // Observador para las secciones
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { // Si la sección está visible
                entry.target.classList.add('visible'); // Añade clase visible
                if (entry.target.id === 'objetivo') { // Si es la sección de objetivos
                    objectiveTexts.forEach((text, index) => {
                        setTimeout(() => {
                            text.style.opacity = '1'; // Hace el texto visible
                            text.style.transform = 'translateY(0)'; // Mueve el texto a su posición original
                        }, index * 200); // Retraso para cada texto
                    });
                }
                if (entry.target.id === 'guia') { // Si es la sección de guía
                    guideItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1'; // Hace el elemento visible
                            item.style.transform = 'translateY(0)'; // Mueve el elemento a su posición original
                        }, index * 200); // Retraso para cada elemento
                    });
                }
            }
        });
    }, { threshold: 0.1 }); // Umbral para la visibilidad

    sections.forEach((section) => {
        sectionObserver.observe(section); // Observa cada sección
    });
  
    // Desplazamiento suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth' // Desplazamiento suave hacia la sección
            });
        });
    });
  
    // Envío del formulario con respuesta dinámica
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el envío por defecto del formulario
        const name = document.getElementById('name').value; // Obtiene el nombre del formulario
        alert(`¡Gracias, ${name}! Te contactaremos pronto.`); // Muestra un mensaje de agradecimiento
        contactForm.reset(); // Reinicia el formulario
    });
  
    // Efecto parallax para fondos de secciones en pantallas grandes
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) { // Solo en pantallas grandes
            const sections = document.querySelectorAll('.section');
            sections.forEach((section) => {
                const scrollPosition = window.pageYOffset; // Posición de desplazamiento
                const sectionSpeed = 0.5; // Velocidad de desplazamiento del fondo
                section.style.backgroundPositionY = `${scrollPosition * sectionSpeed}px`; // Ajusta la posición del fondo
            });
        }
    });
  
    // Movimiento suave de formas geométricas basado en el movimiento del ratón
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.geometric-shape');
        shapes.forEach((shape) => {
            const speed = shape.getAttribute('data-speed') || 0.1; // Velocidad del movimiento de la forma
            const x = (window.innerWidth - e.pageX * speed) / 100; // Movimiento en el eje X
            const y = (window.innerHeight - e.pageY * speed) / 100; // Movimiento en el eje Y
            shape.style.transform = `translateX(${x}px) translateY(${y}px)`; // Aplica el movimiento
        });
    });
});

// Espera a que se cargue completamente la ventana
window.addEventListener('load', function() {
    const video = document.getElementById('video-promo'); // Obtiene el video promocional
    let hasPlayedAutomatically = false;  // Para verificar si el video ya se ha reproducido automáticamente

    if (video) {
        // Configura la lógica del observador para el video
        const setupVideoObserver = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();  // Reproduce el video cuando está visible
                    } else {
                        video.pause(); // Pausa el video cuando no está visible
                    }
                });
            });
            observer.observe(video); // Observa el video
        };

        // Forzar la reproducción del video después de 6 segundos si no se ha iniciado
        const forcePlayAfterTimeout = () => {
            setTimeout(() => {
                if (!hasPlayedAutomatically) {
                    video.play().then(() => {
                        console.log("Video reproducido automáticamente después de 6 segundos.");
                        hasPlayedAutomatically = true;  // Marcar que ya se reprodujo
                    }).catch((error) => {
                        console.error("Error al intentar reproducir el video automáticamente: ", error);
                    });
                }
            }, 5000); // 5 segundos de espera
        };

        // Comprobar si el video está listo para la reproducción
        if (video.readyState >= 3) {
            setupVideoObserver();  // Si el video ya está listo, configurar el observador
        } else {
            // Si el video no está listo, esperar a que esté listo para configurarlo
            video.addEventListener('canplay', () => {
                setupVideoObserver();
            });
        }

        // Configurar el temporizador de respaldo para forzar la reproducción después de 6 segundos
        forcePlayAfterTimeout();

        // Escuchar cuando el video comience a reproducirse
        video.addEventListener('play', () => {
            hasPlayedAutomatically = true;  // Marcar que ya ha comenzado a reproducirse
        });
    }
});
