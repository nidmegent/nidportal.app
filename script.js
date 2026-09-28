/* ==================================================
   NID PORTAL
   GitHub Pages Authentication
================================================== */


/* ==================================================
   GLOBAL
================================================== */

let currentUser = null;


/* ==================================================
   PASSWORD HASH
================================================== */

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(
            byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
        )
        .join("");
}


/* ==================================================
   LOGIN
================================================== */

const loginForm =
    document.getElementById("login-form");

const loginScreen =
    document.getElementById("login-screen");

const portal =
    document.getElementById("portal");

const loginError =
    document.getElementById("login-error");


loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const id =
            document
                .getElementById("login-id")
                .value
                .trim()
                .toUpperCase();

        const password =
            document
                .getElementById("login-password")
                .value;

        loginError.textContent = "";


        if (!id || !password) {

            loginError.textContent =
                "NID IDとパスワードを入力してください。";

            return;
        }


        const user =
            NID_USERS.find(
                item =>
                    item.id.toUpperCase() === id
            );


        if (!user) {

            loginError.textContent =
                "NID IDまたはパスワードが正しくありません。";

            return;
        }


        if (user.status !== "ACTIVE") {

            loginError.textContent =
                "このアカウントは現在利用できません。";

            return;
        }


        const passwordHash =
            await hashPassword(password);


        if (
            passwordHash !==
            user.passwordHash
        ) {

            loginError.textContent =
                "NID IDまたはパスワードが正しくありません。";

            return;
        }


        /* ログイン成功 */

        currentUser = user;


        localStorage.setItem(
            "nid_portal_user",
            user.id
        );


        showPortal(user);

    }
);


/* ==================================================
   SHOW PORTAL
================================================== */

function showPortal(user) {

    loginScreen.classList.add("hidden");

    portal.classList.remove("hidden");

    updateUserUI(user);

}


/* ==================================================
   USER UI
================================================== */

function updateUserUI(user) {

    const sidebarName =
        document.getElementById(
            "sidebar-name"
        );

    const sidebarRole =
        document.getElementById(
            "sidebar-role"
        );

    const sidebarAvatar =
        document.getElementById(
            "sidebar-avatar"
        );

    const topbarName =
        document.getElementById(
            "topbar-name"
        );

    const welcomeName =
        document.getElementById(
            "welcome-name"
        );

    const memberSelfName =
        document.getElementById(
            "member-self-name"
        );


    const settingsId =
        document.getElementById(
            "settings-id"
        );

    const settingsName =
        document.getElementById(
            "settings-name"
        );

    const settingsRole =
        document.getElementById(
            "settings-role"
        );

    const settingsDepartment =
        document.getElementById(
            "settings-department"
        );


    if (sidebarName) {

        sidebarName.textContent =
            user.name;

    }


    if (sidebarRole) {

        sidebarRole.textContent =
            user.role;

    }


    if (sidebarAvatar) {

        sidebarAvatar.textContent =
            user.name
                .charAt(0)
                .toUpperCase();

    }


    if (topbarName) {

        topbarName.textContent =
            user.name;

    }


    if (welcomeName) {

        welcomeName.textContent =
            user.name;

    }


    if (memberSelfName) {

        memberSelfName.textContent =
            user.name;

    }


    if (settingsId) {

        settingsId.textContent =
            user.id;

    }


    if (settingsName) {

        settingsName.textContent =
            user.name;

    }


    if (settingsRole) {

        settingsRole.textContent =
            user.role;

    }


    if (settingsDepartment) {

        settingsDepartment.textContent =
            user.department;

    }

}


/* ==================================================
   SESSION CHECK
================================================== */

function checkSession() {

    const savedUserId =
        localStorage.getItem(
            "nid_portal_user"
        );


    if (!savedUserId) {

        loginScreen.classList.remove(
            "hidden"
        );

        portal.classList.add(
            "hidden"
        );

        return;
    }


    const user =
        NID_USERS.find(
            item =>
                item.id === savedUserId
        );


    if (!user || user.status !== "ACTIVE") {

        localStorage.removeItem(
            "nid_portal_user"
        );

        loginScreen.classList.remove(
            "hidden"
        );

        portal.classList.add(
            "hidden"
        );

        return;
    }


    currentUser = user;

    showPortal(user);

}


/* ==================================================
   LOGOUT
================================================== */

const logoutButton =
    document.getElementById(
        "logout-button"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            currentUser = null;

            localStorage.removeItem(
                "nid_portal_user"
            );

            location.reload();

        }
    );

}


/* ==================================================
   PASSWORD TOGGLE
================================================== */

const passwordInput =
    document.getElementById(
        "login-password"
    );

const togglePassword =
    document.getElementById(
        "toggle-password"
    );


if (
    passwordInput &&
    togglePassword
) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

                togglePassword.textContent =
                    "○";

            } else {

                passwordInput.type =
                    "password";

                togglePassword.textContent =
                    "◉";

            }

        }
    );

}


/* ==================================================
   PAGE NAVIGATION
================================================== */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );

const pages =
    document.querySelectorAll(
        ".page"
    );


function showPage(pageName) {

    pages.forEach(
        page => {

            page.classList.remove(
                "active-page"
            );

        }
    );


    const target =
        document.getElementById(
            `page-${pageName}`
        );


    if (target) {

        target.classList.add(
            "active-page"
        );

    }


    navItems.forEach(
        item => {

            item.classList.remove(
                "active"
            );


            if (
                item.dataset.page ===
                pageName
            ) {

                item.classList.add(
                    "active"
                );

            }

        }
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            function () {

                showPage(
                    item.dataset.page
                );

            }
        );

    }
);


/* ==================================================
   INTERNAL PAGE LINKS
================================================== */

const pageLinks =
    document.querySelectorAll(
        "[data-page-link]"
    );


pageLinks.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                showPage(
                    button.dataset.pageLink
                );

            }
        );

    }
);


/* ==================================================
   TASK CHECK
================================================== */

const taskChecks =
    document.querySelectorAll(
        ".task-check"
    );


taskChecks.forEach(
    check => {

        check.addEventListener(
            "click",
            function () {

                check.classList.toggle(
                    "checked"
                );

                if (
                    check.classList.contains(
                        "checked"
                    )
                ) {

                    check.textContent =
                        "✓";

                } else {

                    check.textContent =
                        "";

                }

            }
        );

    }
);


/* ==================================================
   PASSWORD HASH GENERATOR
==================================================

   開発者向け。ブラウザのコンソールで、generatePasswordHash("あなたのパスワード")と入力すると、users.js に貼り付けるハッシュを生成できます。

================================================== */

window.generatePasswordHash =
    async function(password) {

        const hash =
            await hashPassword(password);

        console.log(
            "PASSWORD HASH:"
        );

        console.log(hash);

        return hash;
    };


/* ==================================================
   START
================================================== */

checkSession();
