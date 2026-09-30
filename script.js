console.log("SCRIPT JS LOADED");

const SUPABASE_URL = "https://cpbttbxvyhtcmnpjhpec.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_a5SRTKPHe52kjBSaTDfrTw_DCbTkmZh";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navbar =
    document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");
    navbar.style.transition = "0.4s ease";

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


searchInput.addEventListener(
    "input",
    filterDocuments
);


filterDocuments();


/* =====================================================
   DOCUMENT MODAL
===================================================== */

const documentModal =
    document.getElementById("documentModal");

const modalBody =
    document.getElementById("modalBody");


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


function closeDocument() {

    documentModal.classList.remove("active");

    modalBody.innerHTML = "";

    document.body.style.overflow =
        "";

}


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


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeDocument();

        }

    }
);



/* =====================================================
   SUPABASE CONNECTION TEST
===================================================== */

async function testSupabaseConnection() {

    const { data, error } =
        await supabaseClient
            .from("profile")
            .select("*")
            .limit(1);

    if (error) {

        console.error(
            "Supabase Error:",
            error
        );

        return;

    }

    console.log(
        "Supabase Connected Successfully:",
        data
    );

}

testSupabaseConnection();
/* =====================================================
   LOAD PROJECTS FROM SUPABASE
===================================================== */

async function loadProjects() {

    const { data, error } = await supabaseClient
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

    if (error) {

        console.error("Projects Error:", error);

        return;

    }

    const projectsGrid =
        document.querySelector(".projects-grid");

    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    data.forEach(project => {

        const article =
            document.createElement("article");

        article.className = "project-card";

        article.innerHTML = `
            <div class="project-image">

                <img src="${project.image_url || ""}"
                     alt="${project.title || "مشروع"}">

            </div>

            <div class="project-content">

                <span class="project-category">
                    مشروع
                </span>

                <h3>
                    ${project.title || ""}
                </h3>

                <p>
                    ${project.description || ""}
                </p>

            </div>
        `;

        projectsGrid.appendChild(article);

    });

}

loadProjects();
/* =====================================================
   LOAD EXPERIENCES FROM SUPABASE
===================================================== */

async function loadExperiences() {

    const { data, error } = await supabaseClient
        .from("experiences")
        .select("*")
        .order("start_year", { ascending: true });

    if (error) {

        console.error("Experiences Error:", error);

        return;

    }

    const timeline =
        document.querySelector(".timeline");

    if (!timeline) return;

    timeline.innerHTML = "";

    data.forEach(experience => {

        const item =
            document.createElement("div");

        item.className =
            "timeline-item";

        item.innerHTML = `
            <div class="timeline-dot"></div>

            <div class="timeline-date">
                ${experience.start_year || ""} -
                ${experience.end_year || ""}
            </div>

            <div class="timeline-content">

                <h3>
                    ${experience.job_title || ""}
                </h3>

                <h4>
                    ${experience.company || ""}
                </h4>

                <p>
                    ${experience.description || ""}
                </p>

            </div>
        `;

        timeline.appendChild(item);

    });

}

loadExperiences();
/* =====================================================
   LOAD DOCUMENTS FROM SUPABASE
===================================================== */

async function loadDocuments() {

    const { data, error } = await supabaseClient
        .from("documents")
        .select("*")
        .order("id", { ascending: true });

    if (error) {

        console.error("Documents Error:", error);

        return;

    }

    const documentsGrid =
        document.getElementById("documentsGrid");

    if (!documentsGrid) return;

    documentsGrid.innerHTML = "";

    data.forEach(documentItem => {

        const card =
            document.createElement("article");

        card.className =
            "document-card";

        card.dataset.category =
            documentItem.document_type || "all";

        card.dataset.title =
            documentItem.title || "";

        card.innerHTML = `
            <div class="document-image">

                ${
                    documentItem.image_url
                    ? `<img src="${documentItem.image_url}"
                            alt="${documentItem.title || "وثيقة"}">`
                    : ""
                }

            </div>

            <div class="document-content">

                <h3>
                    ${documentItem.title || ""}
                </h3>

                <p>
                    ${documentItem.description || ""}
                </p>

            </div>
        `;

        documentsGrid.appendChild(card);

    });

}

loadDocuments();
/* =====================================================
   LOAD PROFILE FROM SUPABASE
===================================================== */

async function loadProfile() {

    const { data, error } = await supabaseClient
        .from("profile")
        .select("*")
        .limit(1)
        .single();

    if (error) {

        console.error("Profile Error:", error);

        return;

    }

    const profileImage =
        document.querySelector('img[alt="الصورة الشخصية"]');

    if (profileImage && data.image_url) {

        profileImage.src = data.image_url;

    }

}

loadProfile();
/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const formMessage =
            document.getElementById("formMessage");

        formMessage.textContent = "جاري الإرسال...";

        const { error } = await supabaseClient
            .from("messages")
            .insert([
                {
                    name: name,
                    email: email,
                    message: message
                }
            ]);

        if (error) {

            console.error("Message Error:", error);

            formMessage.textContent =
                "حدث خطأ أثناء إرسال الرسالة.";

            return;
        }

        formMessage.textContent =
            "تم إرسال رسالتك بنجاح ✅";

        contactForm.reset();

    });

}
