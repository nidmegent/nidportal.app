const NID_USERS = [

    {
        nid_id: "NID-0001",
        password: "Nidmegent123",
        display_name: "湖夢はな",
        role: "ADMIN",
        department: "CREATIVE",
        status: "ACTIVE"
    },

    {
        nid_id: "NID-0002",
        password: "Nidmegent456",
        display_name: "Test Member",
        role: "STAFF",
        department: "STAFF",
        status: "ACTIVE"
    },

    {
        nid_id: "NID-0003",
        password: "Nidmegent789",
        display_name: "Player One",
        role: "PLAYER",
        department: "VALORANT",
        status: "ACTIVE"
    }

];

/* ========================================
   SAVE USERS
======================================== */

function saveUsers() {

    localStorage.setItem(
        "nid_users",
        JSON.stringify(
            NID_USERS
        )
    );

}

const savedUsers =
    localStorage.getItem(
        "nid_users"
    );

if (savedUsers) {

    try {

        const parsedUsers =
            JSON.parse(savedUsers);

        NID_USERS.length = 0;

        parsedUsers.forEach(
            user =>
                NID_USERS.push(user)
        );

    }

    catch(error) {

        console.error(error);

    }

}

/* ========================================
   NOTICE MANAGEMENT
======================================== */

let NID_NOTICES =
    JSON.parse(
        localStorage.getItem(
            "nid_notices"
        )
    ) || [

        {
            title:
                "NID PORTAL v0.3 公開",

            content:
                "内部ポータルの運用を開始しました。",

            date:
                "2026.09.28"

        }

    ];


function saveNotices() {

    localStorage.setItem(
        "nid_notices",
        JSON.stringify(
            NID_NOTICES
        )
    );

}


function renderAdminNotices() {

    const list =
        document.getElementById(
            "admin-notice-list"
        );

    if (!list) return;


    list.innerHTML = "";


    NID_NOTICES.forEach(
        (notice, index) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "admin-notice-row";


            row.innerHTML = `

                <div>

                    <strong>
                        ${notice.title}
                    </strong>

                    <p>
                        ${notice.content}
                    </p>

                    <span>
                        ${notice.date}
                    </span>

                </div>

                <button
                    class="admin-delete-button"
                    onclick="deleteNotice(${index})"
                >
                    DELETE
                </button>

            `;


            list.appendChild(row);

        }
    );

}


function deleteNotice(index) {

    if (
        !confirm(
            "このお知らせを削除しますか？"
        )
    ) return;


    NID_NOTICES.splice(
        index,
        1
    );


    saveNotices();

    renderAdminNotices();

}

const noticeForm =
    document.getElementById(
        "notice-form"
    );


noticeForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            document.getElementById(
                "notice-title"
            ).value.trim();


        const content =
            document.getElementById(
                "notice-content"
            ).value.trim();


        const now =
            new Date();


        const date =
            now.getFullYear()
            + "."
            + String(
                now.getMonth() + 1
            ).padStart(2, "0")
            + "."
            + String(
                now.getDate()
            ).padStart(2, "0");


        NID_NOTICES.unshift({

            title:
                title,

            content:
                content,

            date:
                date

        });


        saveNotices();

        renderAdminNotices();

        noticeForm.reset();

        closeModal(
            "notice-modal"
        );


        alert(
            "お知らせを作成しました。"
        );

    }
);

/* ========================================
   TASK MANAGEMENT
======================================== */

let NID_TASKS =
    JSON.parse(
        localStorage.getItem(
            "nid_tasks"
        )
    ) || [];


function saveTasks() {

    localStorage.setItem(
        "nid_tasks",
        JSON.stringify(
            NID_TASKS
        )
    );

}


function renderAdminTasks() {

    const list =
        document.getElementById(
            "admin-task-list"
        );

    if (!list) return;


    list.innerHTML = "";


    NID_TASKS.forEach(
        (task, index) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "admin-task-row";


            row.innerHTML = `

                <div>

                    <strong>
                        ${task.title}
                    </strong>

                    <span>
                        ${task.assignee}
                    </span>

                </div>

                <div>

                    <span class="task-priority ${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>

                    <button
                        class="admin-delete-button"
                        onclick="deleteTask(${index})"
                    >
                        DELETE
                    </button>

                </div>

            `;


            list.appendChild(row);

        }
    );

}


function deleteTask(index) {

    if (
        !confirm(
            "このタスクを削除しますか？"
        )
    ) return;


    NID_TASKS.splice(
        index,
        1
    );


    saveTasks();

    renderAdminTasks();

}

const taskForm =
    document.getElementById(
        "task-form"
    );


function updateTaskAssignees() {

    const select =
        document.getElementById(
            "task-assignee"
        );

    if (!select) return;


    select.innerHTML = "";


    NID_USERS.forEach(
        user => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                user.nid_id;

            option.textContent =
                `${user.display_name} (${user.nid_id})`;


            select.appendChild(
                option
            );

        }
    );

}


taskForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            document.getElementById(
                "task-title"
            ).value.trim();


        const assignee =
            document.getElementById(
                "task-assignee"
            ).value;


        const priority =
            document.getElementById(
                "task-priority"
            ).value;


        NID_TASKS.push({

            title:
                title,

            assignee:
                assignee,

            priority:
                priority

        });


        saveTasks();

        renderAdminTasks();

        taskForm.reset();

        closeModal(
            "task-modal"
        );


        alert(
            "タスクを作成しました。"
        );

    }
);

/* ========================================
   MODALS
======================================== */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("show");

}


document
    .getElementById(
        "open-member-modal"
    )
    ?.addEventListener(
        "click",
        () =>
            openModal(
                "member-modal"
            )
    );


document
    .getElementById(
        "open-notice-modal"
    )
    ?.addEventListener(
        "click",
        () =>
            openModal(
                "notice-modal"
            )
    );


document
    .getElementById(
        "open-task-modal"
    )
    ?.addEventListener(
        "click",
        () =>
            openModal(
                "task-modal"
            )
    );


document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        }
    );


document
    .querySelectorAll(
        ".modal-background"
    )
    .forEach(
        background => {

            background.addEventListener(
                "click",
                function() {

                    this.parentElement
                        .classList
                        .remove("show");

                }
            );

        }
    );
