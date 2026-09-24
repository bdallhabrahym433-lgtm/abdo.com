```javascript
/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navbar =
    document.getElementById("navbar");


menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon =
        menuToggle.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


document.querySelectorAll(".nav-link")
.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon =
            menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const light =
        document.body.classList.contains("light-mode");


    if (light) {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 160;

        if (window.scrollY >= top) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   YEAR
===================================================== */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


/* =====================================================
   DOCUMENT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const documentCards =
    document.querySelectorAll(".document-card");

const searchInput =
    document.getElementById("documentSearch");

const noDocuments =
    document.getElementById("noDocuments");

const documentsCount =
    document.getElementById("documentsCount");


let currentFilter = "all";


/*
    تحديث عدد الوثائق
*/

function updateDocumentCount() {

    let visible = 0;

    documentCards.forEach(card => {

        if (card.style.display !== "none") {

            visible++;

        }

    });

    documentsCount.textContent =
        visible;

}


/*
    فلترة الوثائق
*/

function filterDocuments() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    let visible = 0;


    documentCards.forEach(card => {

        const category =
            card.dataset.category;

        const title =
            card.dataset.title
                .toLowerCase();


        const categoryMatch =
            currentFilter === "all"
            || category === currentFilter;


        const searchMatch =
            title.includes(search);


        if (
            categoryMatch
            && searchMatch
        ) {

            card.style.display =
                "block";

            visible++;

        } else {

            card.style.display =
                "none";

        }

    });


    if (visible === 0) {

        noDocuments.classList.add("show");

    } else {

        noDocuments.classList.remove("show");

    }


    updateDocumentCount();

}


/*
    أزرار الفلترة
*/

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentFilter =
            button.dataset.filter;


        filterDocuments();

    });

});


/*
    البحث
*/

searchInput.addEventListener(
    "input",
    filterDocuments
);


/*
    العدد عند فتح الصفحة
*/

filterDocuments();


/* =====================================================
   DOCUMENT MODAL
===================================================== */

const documentModal =
    document.getElementById("documentModal");

const modalBody =
    document.getElementById("modalBody");


/*
    فتح الوثيقة
*/

function openDocument(path, type) {

    modalBody.innerHTML = "";


    if (type === "image") {

        const image =
            document.createElement("img");

        image.src = path;

        image.alt =
            "معاينة الوثيقة";

        modalBody.appendChild(image);

    } else {

        const iframe =
            document.createElement("iframe");

        iframe.src = path;

        iframe.title =
            "عرض الوثيقة";

        modalBody.appendChild(iframe);

    }


    documentModal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/*
    إغلاق الوثيقة
*/

function closeDocument() {

    documentModal.classList.remove("active");

    modalBody.innerHTML = "";

    document.body.style.overflow =
        "";

}


/*
    الضغط خارج النافذة
*/

documentModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            documentModal
        ) {

            closeDocument();

        }

    }
);


/*
    زر ESC
*/

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeDocument();

        }

    }
);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById("name")
                .value.trim();

        const email =
            document.getElementById("email")
                .value.trim();

        const message =
            document.getElementById("message")
                .value.trim();


        if (
            !name ||
            !email ||
            !message
        ) {

            formMessage.textContent =
                "يرجى تعبئة جميع الحقول.";

            return;

        }


        formMessage.textContent =
            "تم إدخال الرسالة بنجاح. اربط النموذج بخدمة بريد إلكتروني لإرسالها فعليًا.";


        contactForm.reset();

    }
);
```