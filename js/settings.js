try {
    var body_DOM = document.querySelector("body");
    let swLocation = "sw.js";
    if (navigator.serviceWorker) {
        if (window.location.href.includes("localhost")) swLocation = "/sw.js";
        navigator.serviceWorker.register(swLocation);
    }

    var wifiIndicator = document.querySelector(".wifi_indicator");
    var offlineIndication = document.querySelectorAll(".offline_indication");
    var inOnline = document.querySelectorAll(".in_online");

    function addEach(elementEach, classtoadd) {
        elementEach.forEach((object) => {
            object.classList.add(classtoadd);
        });
    }

    function removeEach(elementEach, classtoremove) {
        elementEach.forEach((object) => {
            object.classList.remove(classtoremove);
        });
    }

    window.addEventListener("online", () => {
        wifiIndicator.classList.add("hidden");
        setTimeout(wifiIndicator.classList.remove("visible"), 3000);

        removeEach(offlineIndication, "visible");
        removeEach(inOnline, "d-none");
    });
    window.addEventListener("offline", function () {
        wifiIndicator.classList.add("visible");
        wifiIndicator.classList.remove("hidden");

        addEach(offlineIndication, "visible");
        addEach(inOnline, "d-none");
    });
    wifiIndicator.addEventListener("click", () => {
        if (navigator.onLine === false) {
        }
    });

    window.addEventListener("DOMContentLoaded", function () {
        if (navigator.onLine === false) {

            wifiIndicator.classList.add("visible");
            addEach(offlineIndication, "visible");
            addEach(inOnline, "d-none");
        }
    });
} catch (error) {
    console.log(error);
}
