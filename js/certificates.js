const certificateTrack = document.querySelector(".certificate-track");
const certificateSlides = document.querySelectorAll(".certificate-slide");

const certificateNext = document.querySelector(".certificate-next");
const certificatePrev = document.querySelector(".certificate-prev");

const certificateDots = document.querySelectorAll(".certificate-dots .dot");

if (
    certificateTrack &&
    certificateSlides.length &&
    certificateNext &&
    certificatePrev &&
    certificateDots.length
) {

    let certificateIndex = 0;

    function updateCertificateSlider() {

        certificateTrack.style.transform =
            `translateX(-${certificateIndex * 100}%)`;

        certificateDots.forEach(dot => dot.classList.remove("active"));

        certificateDots[certificateIndex].classList.add("active");

    }

    certificateNext.addEventListener("click", () => {

        certificateIndex++;

        if (certificateIndex >= certificateSlides.length) {

            certificateIndex = 0;

        }

        updateCertificateSlider();

    });

    certificatePrev.addEventListener("click", () => {

        certificateIndex--;

        if (certificateIndex < 0) {

            certificateIndex = certificateSlides.length - 1;

        }

        updateCertificateSlider();

    });

    certificateDots.forEach((dot, i) => {

        dot.addEventListener("click", () => {

            certificateIndex = i;

            updateCertificateSlider();

        });

    });

    setInterval(() => {

        certificateIndex++;

        if (certificateIndex >= certificateSlides.length) {

            certificateIndex = 0;

        }

        updateCertificateSlider();

    }, 6000);

}