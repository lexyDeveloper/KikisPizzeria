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
});