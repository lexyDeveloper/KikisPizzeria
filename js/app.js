document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú responsivo para celulares
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Sistema de Pestañas para las Categorías del Menú
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            menuContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const targetId = button.getAttribute('data-category');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 3. Botón de WhatsApp directo al negocio
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    if (btnWhatsApp) {
        btnWhatsApp.addEventListener('click', () => {
            const telefono = '524454585767';
            const mensaje = encodeURIComponent("¡Hola Kiki's Pizza! Vi su menú en su página web y me gustaría hacer un pedido.");
            window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
        });
    }

    // 4. Año automático en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 5. Indicador automático de Abierto / Cerrado (Horario Moroleón, Gto.)
    function actualizarEstadoNegocio() {
        const statusBadge = document.getElementById('statusBadge');
        const statusText = document.getElementById('statusText');
        if (!statusBadge || !statusText) return;

        // Obtener fecha y hora actual exacta en la zona horaria del centro de México
        const ahoraMexico = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }));
        const dia = ahoraMexico.getDay(); // 0 = Domingo, 1 = Lunes, 2 = Martes, ..., 6 = Sábado
        const minutosActuales = (ahoraMexico.getHours() * 60) + ahoraMexico.getMinutes();

        // Tabla de horarios en minutos desde las 00:00 (22:00 = 1320 mins)
        const horarios = {
            0: { apertura: 13 * 60,      cierre: 22 * 60 }, // Domingo: 1:00 PM - 10:00 PM
            1: { apertura: 13 * 60 + 30, cierre: 22 * 60 }, // Lunes: 1:30 PM - 10:00 PM
            2: null,                                        // Martes: Cerrado
            3: { apertura: 13 * 60 + 30, cierre: 22 * 60 }, // Miércoles: 1:30 PM - 10:00 PM
            4: { apertura: 13 * 60 + 30, cierre: 22 * 60 }, // Jueves: 1:30 PM - 10:00 PM
            5: { apertura: 13 * 60 + 30, cierre: 22 * 60 }, // Viernes: 1:30 PM - 10:00 PM
            6: { apertura: 13 * 60,      cierre: 22 * 60 }  // Sábado: 1:00 PM - 10:00 PM
        };

        const horarioHoy = horarios[dia];
        const estaAbierto = horarioHoy !== null &&
                            minutosActuales >= horarioHoy.apertura &&
                            minutosActuales < horarioHoy.cierre;

        if (estaAbierto) {
            statusBadge.classList.remove('status-closed');
            statusBadge.classList.add('status-open');
            statusText.textContent = 'Abierto';
        } else {
            statusBadge.classList.remove('status-open');
            statusBadge.classList.add('status-closed');
            statusText.textContent = 'Cerrado';
        }
    }

    // Ejecutar al cargar y actualizar cada minuto automáticamente
    actualizarEstadoNegocio();
    setInterval(actualizarEstadoNegocio, 60000);
});