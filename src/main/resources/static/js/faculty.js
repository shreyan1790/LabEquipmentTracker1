const API_URL = "/api/faculty";

// =========================
// Load Faculty on Startup
// =========================

window.onload = () => {
    loadFaculty();
};

// =========================
// Load Faculty
// =========================

function loadFaculty() {

    fetch(API_URL)

    .then(res => res.json())

    .then(data => {

        showTable(data);

    })

    .catch(error => {

        console.error(error);

        alert("Unable to load faculty.");

    });

}

// =========================
// Save Faculty
// =========================

function saveFaculty() {

    const id = document.getElementById("facultyId").value;

    const facultyName = document.getElementById("facultyName").value.trim();

    const employeeId = document.getElementById("employeeId").value.trim();

    const department = document.getElementById("department").value;

    const designation = document.getElementById("designation").value;

    const email = document.getElementById("email").value.trim();

const phoneNumber = document.getElementById("phone").value.trim();
    if (

        facultyName === "" ||

        employeeId === "" ||

        department === "" ||

        designation === "" ||

        email === "" ||

        phoneNumber === ""

    ) {

        alert("Please fill all fields.");

        return;

    }

	const faculty = {

	    facultyName,

	    employeeId,

	    department,

	    designation,

	    email,

	    phoneNumber

	};

	
console.log("Faculty Object:", faculty);	
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

        body: JSON.stringify(faculty)

    })

    .then(res => {

        if (!res.ok) {

            throw new Error("Request Failed");

        }

        return res.json();

    })

    .then(() => {

        alert(

            id === ""

            ? "Faculty Added Successfully!"

            : "Faculty Updated Successfully!"

        );

        clearForm();

        loadFaculty();

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong.");

    });

}


// =========================
// Edit Faculty
// =========================

function editFaculty(id) {

    fetch(API_URL + "/" + id)

    .then(res => res.json())

    .then(faculty => {

        document.getElementById("facultyId").value = faculty.id;

        document.getElementById("facultyName").value = faculty.facultyName;

        document.getElementById("employeeId").value = faculty.employeeId;

        document.getElementById("department").value = faculty.department;

        document.getElementById("designation").value = faculty.designation;

        document.getElementById("email").value = faculty.email;

        document.getElementById("phone").value = faculty.phoneNumber;
        
		window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    })

    .catch(error => {

        console.error(error);

        alert("Unable to load faculty details.");

    });

}

// =========================
// Delete Faculty
// =========================

function deleteFaculty(id) {

    if (!confirm("Delete this faculty?")) {

        return;

    }

    fetch(API_URL + "/" + id, {

        method:"DELETE"

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg || "Faculty Deleted Successfully!");

        loadFaculty();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to delete faculty.");

    });

}

// =========================
// Search Faculty
// =========================

function searchFaculty() {

    const search = document.getElementById("searchInput").value.toLowerCase();

    fetch(API_URL)

    .then(res => res.json())

    .then(data => {

        const filtered = data.filter(faculty =>

            faculty.facultyName.toLowerCase().includes(search) ||

            faculty.employeeId.toLowerCase().includes(search)

        );

        showTable(filtered);

    });

}

// =========================
// Filter Department
// =========================

function filterDepartment() {

    const department = document.getElementById("departmentFilter").value;

    if (department === "") {

        loadFaculty();

        return;

    }

    fetch(API_URL)

    .then(res => res.json())

    .then(data => {

        const filtered = data.filter(faculty =>

            faculty.department === department

        );

        showTable(filtered);

    });

}

// =========================
// Show Table
// =========================

function showTable(data) {

    let table = "";

    data.forEach(faculty => {

        table += `

        <tr>

            <td>${faculty.id}</td>

            <td>${faculty.facultyName}</td>

            <td>${faculty.employeeId}</td>

            <td>${faculty.department}</td>

            <td>${faculty.designation}</td>

            <td>${faculty.email}</td>

            <td>${faculty.phoneNumber}</td>
            <td>

                <button
                    class="edit-btn"
                    onclick="editFaculty(${faculty.id})">

                    ✏ Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteFaculty(${faculty.id})">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

    if (data.length === 0) {

        table = `

        <tr>

            <td colspan="8">

                No Faculty Found

            </td>

        </tr>

        `;

    }

    document.getElementById("facultyTable").innerHTML = table;

}

// =========================
// Clear Form
// =========================

function clearForm() {

    document.getElementById("facultyId").value = "";

    document.getElementById("facultyName").value = "";

    document.getElementById("employeeId").value = "";

    document.getElementById("department").value = "";

    document.getElementById("designation").value = "";

    document.getElementById("email").value = "";

    document.getElementById("phone").value = "";

}