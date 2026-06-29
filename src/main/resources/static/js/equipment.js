console.log("Equipment JS Loaded");

const API_URL = "/api/equipment";

// =========================
// Load Equipment on Startup
// =========================
window.onload = () => {
    loadEquipment();
};

// =========================
// Status Badge
// =========================
function getStatusBadge(status) {

    if (status === "Available") {
        return `<span class="status available">Available</span>`;
    }

    if (status === "Issued") {
        return `<span class="status issued">Issued</span>`;
    }

    return `<span class="status maintenance">Maintenance</span>`;
}

// =========================
// Load Equipment
// =========================
function loadEquipment() {

    fetch(API_URL)

    .then(res => res.json())

    .then(data => {

        let table = "";

        data.forEach(equipment => {

            table += `

            <tr>

                <td>${equipment.id}</td>

                <td>${equipment.equipmentName}</td>

                <td>${equipment.category}</td>

                <td>${equipment.totalQuantity}</td>

                <td>${equipment.availableQuantity}</td>

                <td>${getStatusBadge(equipment.status)}</td>

                <td>

                    <button class="edit-btn"
                    onclick="editEquipment(${equipment.id})">

                        ✏ Edit

                    </button>

                    <button class="delete-btn"
                    onclick="deleteEquipment(${equipment.id})">

                        🗑 Delete

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById("equipmentTable").innerHTML = table;

    });

}

// =========================
// Save Equipment
// =========================
function saveEquipment() {

    const id = document.getElementById("equipmentId").value;

    const equipmentName = document.getElementById("equipmentName").value.trim();
    const category = document.getElementById("category").value.trim();
    const totalQuantity = document.getElementById("totalQuantity").value;
    const availableQuantity = document.getElementById("availableQuantity").value;
    const status = document.getElementById("status").value;

    if (
        equipmentName === "" ||
        category === "" ||
        totalQuantity === "" ||
        availableQuantity === ""
    ) {

       showToast("Please fill all fields.");
        return;
    }

    const equipment = {

        equipmentName,

        category,

        totalQuantity: parseInt(totalQuantity),

        availableQuantity: parseInt(availableQuantity),

        status

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

        body: JSON.stringify(equipment)

    })

    .then(res => res.json())

	.then(() => {

	    showToast(

	        id === ""

	        ? "Equipment Added Successfully!"

	        : "Equipment Updated Successfully!"

	    );

	    clearForm();

	    loadEquipment();

	})

    .catch(() => {

         showToast("Something went wrong!");
    });

}

// =========================
// Delete Equipment
// =========================
function deleteEquipment(id) {

    if (!confirm("Delete this equipment?")) {

        return;

    }

    fetch(API_URL + "/" + id, {

        method: "DELETE"

    })

    .then(res => res.text())

    .then(msg => {

        showToast(msg);

        loadEquipment();

    });

}

// =========================
// Edit Equipment
// =========================
function editEquipment(id) {

    fetch(API_URL + "/" + id)

    .then(res => res.json())

    .then(equipment => {

        document.getElementById("equipmentId").value = equipment.id;

        document.getElementById("equipmentName").value = equipment.equipmentName;

        document.getElementById("category").value = equipment.category;

        document.getElementById("totalQuantity").value = equipment.totalQuantity;

        document.getElementById("availableQuantity").value = equipment.availableQuantity;

        document.getElementById("status").value = equipment.status;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// =========================
// Search Equipment
// =========================
function searchEquipment() {

    const name = document.getElementById("searchInput").value.trim();

    if (name === "") {

        loadEquipment();

        return;

    }

    fetch(API_URL + "/search/" + name)

    .then(res => res.json())

    .then(showTable);

}

// =========================
// Filter Category
// =========================
function filterCategory() {

    const category = document.getElementById("categoryFilter").value;

    if (category === "") {

        loadEquipment();

        return;

    }

    fetch(API_URL + "/category/" + category)

    .then(res => res.json())

    .then(showTable);

}

// =========================
// Show Table
// =========================
function showTable(data) {

    let table = "";

    data.forEach(equipment => {

        table += `

        <tr>

            <td>${equipment.id}</td>

            <td>${equipment.equipmentName}</td>

            <td>${equipment.category}</td>

            <td>${equipment.totalQuantity}</td>

            <td>${equipment.availableQuantity}</td>

            <td>${getStatusBadge(equipment.status)}</td>

            <td>

                <button class="edit-btn"
                onclick="editEquipment(${equipment.id})">

                    ✏ Edit

                </button>

                <button class="delete-btn"
                onclick="deleteEquipment(${equipment.id})">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("equipmentTable").innerHTML = table;

}

// =========================
// Clear Form
// =========================
function clearForm() {

    document.getElementById("equipmentId").value = "";

    document.getElementById("equipmentName").value = "";

    document.getElementById("category").value = "";

    document.getElementById("totalQuantity").value = "";

    document.getElementById("availableQuantity").value = "";

    document.getElementById("status").value = "Available";

}

// =========================
// show test
// =========================

function showToast(message){

    const toast=document.getElementById("toast");

    const toastMessage=document.getElementById("toastMessage");

    toastMessage.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

