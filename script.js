/* ========================================
   NID PORTAL
   Authentication
======================================== */

const loginScreen = document.getElementById("login-screen");
const portal = document.getElementById("portal");

const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

const nidInput = document.getElementById("nid-id");
const passwordInput = document.getElementById("password");

let currentUser = null;


/* ========================================
   LOGIN
======================================== */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nidId =
        nidInput.value
            .trim()
            .toUpperCase();

    const password =
        passwordInput.value;

    loginError.textContent = "";


    const user = NID_USERS.find(
        item =>
            item.nid_id.toUpperCase() === nidId &&
            item.password === password
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


    currentUser = user;


    sessionStorage.setItem(
        "nid_current_user",
        JSON.stringify(user)
    );


    showPortal(user);

});


/* ========================================
   SHOW PORTAL
======================================== */

function showPortal(user) {

    loginScreen.classList.add("hidden");

    portal.classList.remove("hidden");

    updateUserInformation(user);

}


/* ========================================
   USER INFORMATION
======================================== */

function updateUserInformation(user) {

    const elements = {

        userName:
            document.getElementById("user-name"),

        userRole:
            document.getElementById("user-role"),

        headerUser:
            document.getElementById("header-user"),

        headerRole:
            document.getElementById("header-role"),

        welcomeName:
            document.getElementById("welcome-name"),

        welcomeId:
            document.getElementById("welcome-id"),

        statRole:
            document.getElementById("stat-role"),

        memberName:
            document.getElementById("member-name"),

        memberRole:
            document.getElementById("member-role"),

        settingId:
            document.getElementById("setting-id"),

        settingName:
            document.getElementById("setting-name"),

        settingRole:
            document.getElementById("setting-role")

    };


    elements.userName.textContent =
        user.display_name;

    elements.userRole.textContent =
        user.role;

    elements.headerUser.textContent =
        user.display_name;

    elements.headerRole.textContent =
        user.role;

    elements.welcomeName.textContent =
        user.display_name;

    elements.welcomeId.textContent =
        user.nid_id;

    elements.statRole.textContent =
        user.role;

    elements.memberName.textContent =
        user.display_name;

    elements.memberRole.textContent =
        user.role;

    elements.settingId.textContent =
        user.nid_id;

    elements.settingName.textContent =
        user.display_name;

    elements.settingRole.textContent =
        user.role;

}


/* ========================================
   SESSION CHECK
======================================== */

function checkSession() {

    const savedUser =
        sessionStorage.getItem(
            "nid_current_user"
        );


    if (!savedUser) {

        loginScreen.classList.remove("hidden");

        portal.classList.add("hidden");

        return;
    }


    try {

        const user =
            JSON.parse(savedUser);


        const validUser =
            NID_USERS.find(
                item =>
                    item.nid_id === user.nid_id
            );


        if (!validUser) {

            sessionStorage.removeItem(
                "nid_current_user"
            );

            return;
        }


        currentUser = validUser;

        showPortal(validUser);

    }

    catch (error) {

        console.error(error);

        sessionStorage.removeItem(
            "nid_current_user"
        );

    }

}


/* ========================================
   LOGOUT
======================================== */

const logoutButton =
    document.getElementById("logout-button");


logoutButton.addEventListener(
    "click",
    function () {

        sessionStorage.removeItem(
            "nid_current_user"
        );

        currentUser = null;

        location.reload();

    }
);


/* ========================================
   PASSWORD TOGGLE
======================================== */

const togglePassword =
    document.getElementById(
        "toggle-password"
    );


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


/* ========================================
   NAVIGATION
======================================== */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );

const pages =
    document.querySelectorAll(
        ".page"
    );

const pageTitle =
    document.getElementById(
        "page-title"
    );


navItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const target =
                    item.dataset.page;


                navItems.forEach(
                    nav =>
                        nav.classList.remove(
                            "active"
                        )
                );


                pages.forEach(
                    page =>
                        page.classList.remove(
                            "active"
                        )
                );


                item.classList.add(
                    "active"
                );


                const targetPage =
                    document.getElementById(
                        "page-" + target
                    );


                if (targetPage) {

                    targetPage.classList.add(
                        "active"
                    );

                }


                pageTitle.textContent =
                    target === "match"
                        ? "MATCH CENTER"
                        : target.toUpperCase();

            }
        );

    }
);


/* ========================================
   START
======================================== */

checkSession();
