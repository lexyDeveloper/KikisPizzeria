document.addEventListener('DOMContentLoaded', () => {
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

    const btnWhatsApp = document.getElementById('btnWhatsApp');
    if (btnWhatsApp) {
        btnWhatsApp.addEventListener('click', () => {
            const telefono = '524454585767';
            const mensaje = encodeURIComponent("¡Hola Kiki's Pizza! Vi su menú en su página web y me gustaría hacer un pedido.");
            window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
        });
    }

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    function actualizarEstadoNegocio() {
        const statusBadge = document.getElementById('statusBadge');
        const statusText = document.getElementById('statusText');
        if (!statusBadge || !statusText) return;

        const ahoraMexico = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }));
        const dia = ahoraMexico.getDay();
        const minutosActuales = (ahoraMexico.getHours() * 60) + ahoraMexico.getMinutes();

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

    actualizarEstadoNegocio();
    setInterval(actualizarEstadoNegocio, 60000);
});


function cerrarPromo() {
    const overlay = document.getElementById('promoOverlay');
    const video = document.getElementById('promoVideo');
    video.pause();
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    }
    document.getElementById('cerrarPromo').addEventListener('click', cerrarPromo);
    document.getElementById('promoOverlay').addEventListener('click', function(e) {
    if (e.target === this) cerrarPromo();
    });
    document.body.style.overflow = 'hidden';




const DURACION_CARGA = 3000;
const NUM_REBANADAS = 8;

const pizza = document.getElementById("pizzaLoading");
const video = document.getElementById("promoVideo");
const loader = document.getElementById("pizzaLoader");

let rebanadas = [];

for (let i = 0; i < NUM_REBANADAS; i++) {
    const imagen = document.createElement("img");
    imagen.src = "img/Logos/pizza1.png";
    imagen.classList.add("rebanada");
    imagen.alt = "";
    imagen.style.transform = `rotate(${i * 45}deg)`;
    pizza.appendChild(imagen);
    rebanadas.push(imagen);
}

let actual = 0;
rebanadas[actual].classList.add("off");

const animacion = setInterval(() => {
    rebanadas[actual].classList.remove("off");
    actual = (actual + 1) % NUM_REBANADAS;
    rebanadas[actual].classList.add("off");
}, DURACION_CARGA / NUM_REBANADAS);

let cargaFinalizada = false;

function finalizarCarga() {
    if (cargaFinalizada) return;
    cargaFinalizada = true;

    clearInterval(animacion);
    loader.classList.add("hide");
}

video.addEventListener("canplay", finalizarCarga, { once: true });
video.addEventListener("error", finalizarCarga, { once: true });

if (video.readyState >= 3) {
    finalizarCarga();
}
