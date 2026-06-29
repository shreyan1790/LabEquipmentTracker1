const API_URL = "/api/students";

// =========================
// Load Students on Startup
// =========================

window.onload = () => {
    loadStudents();
};

// =========================
// Load Students
// =========================

function loadStudents() {

    fetch(API_URL)

    .then(res => res.json())

    .then(data => {

        showTable(data);

    })

    .catch(error => {

        console.error(error);
        alert("Unable to load students.");

    });

}

// =========================
// Save Student
// =========================

function saveStudent() {

    const id = document.getElementById("studentId").value;

    const studentName = document.getElementById("studentName").value.trim();
    const rollNumber = document.getElementById("rollNumber").value.trim();
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const section = document.getElementById("section").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (
        studentName === "" ||
        rollNumber === "" ||
        department === "" ||
        year === "" ||
        section === "" ||
        email === "" ||
        phone === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    const student = {

        studentName,
        rollNumber,
        department,
        year,
        section,
        email,
        phone

    };

    let url = API_URL;
    let method = "POST";

    if (id !== "") {

        url = API_URL + "/" + id;
        method = "PUT";

    }

    fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(student)

    })

    .then(res => {

        if (!res.ok) {
            throw new Error("Request Failed");
        }

        return res.json();

    })

    .then(() => {

        alert(id === ""
            ? "Student Added Successfully!"
            : "Student Updated Successfully!");

        clearForm();

        loadStudents();

    })

    .catch(error => {

        console.error(error);
        alert("Something went wrong.");

    });

}

// =========================
// Delete Student
// =========================

function deleteStudent(id) {

    if (!confirm("Delete this student?")) {

        return;

    }

    fetch(API_URL + "/" + id, {

        method: "DELETE"

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg || "Student Deleted Successfully!");

        loadStudents();

    })

    .catch(error => {

        console.error(error);
        alert("Unable to delete student.");

    });

}

// =========================
// Edit Student
// =========================

function editStudent(id) {

    fetch(API_URL + "/" + id)

    .then(res => res.json())

    .then(student => {

        document.getElementById("studentId").value = student.id;

        document.getElementById("studentName").value = student.studentName;

        document.getElementById("rollNumber").value = student.rollNumber;

        document.getElementById("department").value = student.department;

        document.getElementById("year").value = student.year;

        document.getElementById("section").value = student.section;

        document.getElementById("email").value = student.email;

        document.getElementById("phone").value = student.phone;

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    })

    .catch(error => {

        console.error(error);

        alert("Unable to load student details.");

    });

}

// =========================
// Search Student
// =========================

function searchStudent() {

    const search = document.getElementById("searchInput").value.toLowerCase();

    fetch(API_URL)

    .then(res => res.json())

    .then(data => {

        const filtered = data.filter(student =>

            student.studentName.toLowerCase().includes(search) ||

            student.rollNumber.toLowerCase().includes(search)

        );

        showTable(filtered);

    });

}

// =========================
// Filter Department
// =========================

function filterDepartment() {

    const department = document.getElementById("departmentFilter").value;

    if(department === ""){

        loadStudents();

        return;

    }

    fetch(API_URL)

    .then(res => res.json())

    .then(data => {

        const filtered = data.filter(student =>

            student.department === department

        );

        showTable(filtered);

    });

}

// =========================
// Show Table
// =========================

function showTable(data){

    let table = "";

    data.forEach(student =>{

        table += `

        <tr>

            <td>${student.id}</td>

            <td>${student.studentName}</td>

            <td>${student.rollNumber}</td>

            <td>${student.department}</td>

            <td>${student.year}</td>

            <td>${student.section}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">

                    ✏ Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

    if(data.length===0){

        table = `

        <tr>

            <td colspan="9">

                No Students Found

            </td>

        </tr>

        `;

    }

    document.getElementById("studentTable").innerHTML = table;

}

// =========================
// Clear Form
// =========================

function clearForm(){

    document.getElementById("studentId").value="";

    document.getElementById("studentName").value="";

    document.getElementById("rollNumber").value="";

    document.getElementById("department").value="";

    document.getElementById("year").value="";

    document.getElementById("section").value="";

    document.getElementById("email").value="";

    document.getElementById("phone").value="";

}
