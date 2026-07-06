const API_URL = "/api/transactions";
const EQUIPMENT_API = "/api/equipment";
const STUDENT_API = "/api/students";

let equipmentNames = [];
let studentNames = [];

// =========================
// Load Transactions
// =========================

window.onload = () => {
    loadTransactions();
    loadEquipmentDropdown();
    loadStudentDropdown();
};

// =========================
// Status Badge
// =========================

function getStatusBadge(status){

    if(status === "Issued"){

        return `<span class="status issued">Issued</span>`;

    }

    if(status === "Returned"){

        return `<span class="status returned">Returned</span>`;

    }

    return `<span class="status overdue">Overdue</span>`;

}

// =========================
// Load Transactions
// =========================

function loadTransactions(){

    fetch(API_URL)

    .then(res => res.json())

    .then(data =>{

        showTable(data);

    })

    .catch(error=>{

        console.error(error);

        alert("Unable to load transactions.");

    });

}

// =========================
// Load Equipment Dropdown
// =========================

function loadEquipmentDropdown() {

    fetch(EQUIPMENT_API)

        .then(response => response.json())

        .then(data => {

            equipmentNames = [];

            const equipmentList = document.getElementById("equipmentList");

            equipmentList.innerHTML = "";

            data.forEach(equipment => {

                equipmentNames.push(equipment.equipmentName);

                const option = document.createElement("option");

                option.value = equipment.equipmentName;

                equipmentList.appendChild(option);

            });

        })

        .catch(error => {

            console.error("Error loading equipment:", error);

        });

}

// =========================
// Show Available Stock
// =========================

function showAvailableStock() {

    const equipmentName = document.getElementById("equipmentName").value;

    fetch("/api/equipment")

        .then(response => response.json())

        .then(data => {

            const equipment = data.find(
                e => e.equipmentName === equipmentName
            );

            if (equipment) {

                document.getElementById("availableStock").value =
                    equipment.availableQuantity;

            } else {

                document.getElementById("availableStock").value = "";

            }

        })

        .catch(error => {

            console.error(error);

        });

}

// =========================
// Load Student Dropdown
// =========================

function loadStudentDropdown() {

    fetch(STUDENT_API)

        .then(response => response.json())

        .then(data => {

            studentNames = [];

            const studentList = document.getElementById("studentList");

            studentList.innerHTML = "";

            data.forEach(student => {

                studentNames.push(student.studentName);

                const option = document.createElement("option");

                option.value = student.studentName;

                studentList.appendChild(option);

            });

        })

        .catch(error => {

            console.error("Error loading students:", error);

        });

}
// =========================
// Save Transaction
// =========================

function saveTransaction(){

    const id=document.getElementById("transactionId").value;
	
	const expectedReturnTime = document.getElementById("expectedReturnTime").value;



//	if (!studentNames.includes(studentName.trim())) {

//	    alert("Please select a valid student from the Student list.");

	//    return;

//	}
//	if (!equipmentNames.includes(equipmentName)) {

//'	    alert("Please select a valid equipment from the Equipment list.");

	//    return;

//	}

const studentName = document.getElementById("studentName").value.trim();

const equipmentName = document.getElementById("equipmentName").value.trim();

	
	const equipmentQuantity = parseInt(document.getElementById("equipmentQuantity").value);
	
	const issueDate = document.getElementById("issueDate").value;

	const issueTime = document.getElementById("issueTime").value;

	const expectedReturnDate = document.getElementById("expectedReturnDate").value;

	const actualReturnDate = document.getElementById("actualReturnDate").value;

	const actualReturnTime = document.getElementById("actualReturnTime").value;

    const status=document.getElementById("status").value;

    const remarks=document.getElementById("remarks").value.trim();

	if(

	    studentName==="" ||

	    equipmentName==="" ||

	    equipmentQuantity <= 0 ||

	    issueDate==="" ||

	    issueTime==="" ||

	    expectedReturnDate==="" ||

	    expectedReturnTime==="" ||

	    status===""

	){

        alert("Please fill all fields.");

        return;

    }

	const transaction = {
	    studentName,
	    equipmentName,
	    equipmentQuantity,
	    issueDate,
	    issueTime,
	    expectedReturnDate,
	    expectedReturnTime,
	    actualReturnDate,
	    actualReturnTime,
	    status,
	    remarks
	};
	
    let url=API_URL;

    let method="POST";

    if(id!==""){

        url=API_URL+"/"+id;

        method="PUT";

    }

    fetch(url,{

        method:method,

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(transaction)

    })

    .then(res=>{

        if(!res.ok){

            throw new Error("Request Failed");

        }

        return res.json();

    })

    .then(()=>{

        alert(

            id===""

            ? "Transaction Added Successfully!"

            : "Transaction Updated Successfully!"

        );

        clearForm();

        loadTransactions();

    })

    .catch(error=>{

        console.error(error);

        alert("Something went wrong.");

    });

}

// =========================
// Edit Transaction
// =========================

function editTransaction(id){

    fetch(API_URL + "/" + id)

    .then(res => res.json())

    .then(transaction =>{

        document.getElementById("transactionId").value = transaction.id;

        document.getElementById("studentName").value = transaction.studentName;

        document.getElementById("equipmentName").value = transaction.equipmentName;

		document.getElementById("equipmentQuantity").value = transaction.equipmentQuantity;
		
		document.getElementById("issueDate").value = transaction.issueDate;

		document.getElementById("issueTime").value = transaction.issueTime;

		document.getElementById("expectedReturnDate").value = transaction.expectedReturnDate;
		
		document.getElementById("expectedReturnTime").value =
		    transaction.expectedReturnTime || "";
			
		document.getElementById("actualReturnDate").value = transaction.actualReturnDate;

		document.getElementById("actualReturnTime").value = transaction.actualReturnTime;
        document.getElementById("status").value = transaction.status;

        document.getElementById("remarks").value = transaction.remarks;

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    })

    .catch(error=>{

        console.error(error);

        alert("Unable to load transaction.");

    });

}

// =========================
// Delete Transaction
// =========================

function deleteTransaction(id){

    if(!confirm("Delete this transaction?")){

        return;

    }

    fetch(API_URL + "/" + id,{

        method:"DELETE"

    })

    .then(res=>res.text())

    .then(msg=>{

        alert(msg || "Transaction Deleted Successfully!");

        loadTransactions();

    })

    .catch(error=>{

        console.error(error);

        alert("Unable to delete transaction.");

    });

}

// =========================
// Search Transaction
// =========================

function searchTransaction(){

    const search=document.getElementById("searchInput").value.toLowerCase();

    fetch(API_URL)

    .then(res=>res.json())

    .then(data=>{

        const filtered=data.filter(transaction=>

            transaction.studentName.toLowerCase().includes(search) ||

            transaction.equipmentName.toLowerCase().includes(search)

        );

        showTable(filtered);

    });

}

// =========================
// Filter Status
// =========================

function filterStatus(){

    const status=document.getElementById("statusFilter").value;

    if(status===""){

        loadTransactions();

        return;

    }

    fetch(API_URL)

    .then(res=>res.json())

    .then(data=>{

        const filtered=data.filter(transaction=>

            transaction.status===status

        );

        showTable(filtered);

    });

}

// =========================
// Show Table
// =========================

function showTable(data){

    let table="";

    data.forEach(transaction=>{

        table += `

        <tr>

            <td>${transaction.id}</td>

            <td>${transaction.studentName}</td>

            <td>${transaction.equipmentName}</td>

			<td>${transaction.equipmentQuantity}</td>
			
			<td>${transaction.issueDate}</td>

			<td>${transaction.issueTime}</td>

			<td>${transaction.expectedReturnDate}</td>

			<td>${transaction.expectedReturnTime || "-"}</td>

			<td>${transaction.actualReturnDate || "-"}</td>

			<td>${transaction.actualReturnTime || "-"}</td>

            <td>${getStatusBadge(transaction.status)}</td>

            <td>${transaction.remarks || "-"}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editTransaction(${transaction.id})">

                    ✏ Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

    if(data.length===0){

        table=`

        <tr>

            <td colspan="8">

                No Transactions Found

            </td>

        </tr>

        `;

    }

    document.getElementById("transactionTable").innerHTML=table;

}

// =========================
// Clear Form
// =========================

function clearForm(){

    document.getElementById("transactionId").value="";

    document.getElementById("studentName").value="";

    document.getElementById("equipmentName").value="";

	document.getElementById("equipmentQuantity").value = 1;
	
	document.getElementById("issueDate").value="";

	document.getElementById("issueTime").value="";

	document.getElementById("expectedReturnDate").value="";

	document.getElementById("actualReturnDate").value="";

	document.getElementById("actualReturnTime").value="";
    document.getElementById("status").value="";

    document.getElementById("remarks").value="";

}