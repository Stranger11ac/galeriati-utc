// Nombre del caché
const CACHE_DOCUMENT = "galeriati-cache3";

// Archivos para almacenar en caché
const urlsToCache = [
    "/",
    "index.html",
    "lib/owlcarousel/assets/owl.carousel.min.css",
    "lib/lightbox/css/lightbox.min.css",
    "css/style.css",
    "img/logo.jpeg",
    "img/carousel-1.jpeg",
    "img/carousel-2.jpeg",
    "img/codigo.jpeg",
    "img/app1.jpg",
    "img/app2.jpg",
    "img/juego2d.jpg",
    "img/juego3d.jpg",
    "img/blender.jpg",
    "img/programacion.jpg",
    "img/cuatri1.jpeg",
    "img/basedatos.png",
    "img/design.jpg",
    "img/paginaweb.png",
    "img/animacion.jpg",
    "img/cuatri8.png",
    "img/multijugador.jpeg",
    "img/cuatri9.jpeg",
    "img/usuario.png", 
    "js/settings.js",
    "lib/easing/easing.min.js",
    "lib/waypoints/waypoints.min.js",
    "lib/owlcarousel/owl.carousel.min.js",
    "lib/isotope/isotope.pkgd.min.js",
    "lib/lightbox/js/lightbox.min.js",
    "mail/jqBootstrapValidation.min.js",
    "mail/contact.js",
    "js/main.js",
];

// Definir una función que almacena en caché los archivos estáticos
async function cacheStaticFiles() {
    const cache = await caches.open(CACHE_DOCUMENT);
    return await cache.addAll(urlsToCache);
}

// Evento de instalación
self.addEventListener("install", (event) => {
    // Llamar a la función dentro de waitUntil
    event.waitUntil(cacheStaticFiles());
});

// Añadir un evento de activación al service worker
self.addEventListener("activate", (event) => {
    // Esperar a que se complete la eliminación de todas las cachés
    event.waitUntil(
        // Usar el método caches.keys para obtener una lista de los nombres de las cachés
        caches
            .keys()
            .then((cacheNames) => {
                if (navigator.onLine) {
                    // console.log('Deteled Chache');
                    return Promise.all(
                        cacheNames.map((cacheName) => {
                            return caches.delete(cacheName);
                        })
                    );
                }
            })
            .then(() => {
                // console.log("Update verse");
                // Llamar a la función después de eliminar las cachés
                return cacheStaticFiles();
            })
            .catch((error) => {
                console.error("Error Update: ", error);
            })
    );
});

// Evento de solicitud
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((res) => res || fetch(event.request))
            .catch(console.log)
    );
});
