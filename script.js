document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");

    const pageTitle = document.getElementById("page-title");
    const breadcrumb = document.getElementById("breadcrumb");


    const pageNames = {

        home: {
            title: "Dashboard",
            breadcrumb: "HOME"
        },

        notice: {
            title: "Notice",
            breadcrumb: "NOTICE"
        },

        task: {
            title: "Tasks",
            breadcrumb: "TASK"
        },

        event: {
            title: "Events",
            breadcrumb: "EVENT"
        },

        member: {
            title: "Members",
            breadcrumb: "MEMBER"
        },

        wiki: {
            title: "NID Wiki",
            breadcrumb: "WIKI"
        },

        match: {
            title: "Match Center",
            breadcrumb: "MATCH"
        },

        settings: {
            title: "Settings",
            breadcrumb: "SETTINGS"
        }

    };


    function showPage(page){

        pages.forEach(item => {
            item.classList.remove("active");
        });


        navItems.forEach(item => {
            item.classList.remove("active");
        });


        const targetPage =
            document.getElementById(`page-${page}`);

        const targetNav =
            document.querySelector(
                `.nav-item[data-page="${page}"]`
            );


        if(targetPage){
            targetPage.classList.add("active");
        }


        if(targetNav){
            targetNav.classList.add("active");
        }


        if(pageNames[page]){

            pageTitle.textContent =
                pageNames[page].title;

            breadcrumb.textContent =
                pageNames[page].breadcrumb;

        }

    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const page =
                item.dataset.page;

            showPage(page);

        });

    });


    /*
    ========================================
    DASHBOARD "VIEW ALL" BUTTONS
    ========================================
    */

    document.querySelectorAll(".text-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const text =
                    button.parentElement
                    .querySelector("h3")
                    ?.textContent;


                if(text === "My Tasks"){
                    showPage("task");
                }

                else if(text === "Important Notice"){
                    showPage("notice");
                }

                else if(text === "Today's Schedule"){
                    showPage("event");
                }

            });

        });


    /*
    ========================================
    TASK CHECK
    ========================================
    */

    document.querySelectorAll(".task-check")
        .forEach(check => {

            check.addEventListener("click", () => {

                check.classList.toggle("completed");

                const row =
                    check.closest(".task-row");

                const text =
                    row.querySelector(".task-main");

                const priority =
                    row.querySelector(".priority");


                if(check.classList.contains("completed")){

                    text.classList.add("completed-text");

                    if(priority){
                        priority.textContent = "DONE";
                        priority.className =
                            "priority done";
                    }

                }

                else{

                    text.classList.remove("completed-text");

                    if(priority){
                        priority.textContent = "NORMAL";
                        priority.className =
                            "priority normal";
                    }

                }

            });

        });


    /*
    ========================================
    NOTIFICATION
    ========================================
    */

    const notification =
        document.querySelector(
            ".notification-button"
        );


    if(notification){

        notification.addEventListener(
            "click",
            () => {

                showPage("notice");

            }
        );

    }


});
