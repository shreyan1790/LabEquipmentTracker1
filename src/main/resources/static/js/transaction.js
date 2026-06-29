const API_URL = "/api/transactions";

// =========================
// Load Transactions
// =========================

window.onload = () => {
    loadTransactions();
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
// Save Transaction
// =========================

function saveTransaction(){

    const id=document.getElementById("transactionId").value;

    const studentName=document.getElementById("studentName").value;

    const equipmentName=document.getElementById("equipmentName").value;

	const issueDate = document.getElementById("issueDate").value;

	const issueTime = document.getElementById("issueTime").value;

	const expectedReturnDate = document.getElementById("expectedReturnDate").value;

	const expectedReturnTime = document.getElementById("expectedReturnTime").value;

	const actualReturnDate = document.getElementById("actualReturnDate").value;

	const actualReturnTime = document.getElementById("actualReturnTime").value;

    const status=document.getElementById("status").value;

    const remarks=document.getElementById("remarks").value.trim();

    if(

        studentName===""||

        equipmentName===""||

		issueDate==""||

		issueTime==""||

		expectedReturnDate==""||

		expectedReturnTime==""||

        status===""

    ){

        alert("Please fill all fields.");

        return;

    }

	const transaction = {

	    studentName,

	    equipmentName,

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

		document.getElementById("issueDate").value = transaction.issueDate;

		document.getElementById("issueTime").value = transaction.issueTime;

		document.getElementById("expectedReturnDate").value = transaction.expectedReturnDate;

		document.getElementById("expectedReturnTime").value = transaction.expectedReturnTime;

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

			<td>${transaction.issueDate}</td>

			<td>${transaction.issueTime}</td>

			<td>${transaction.expectedReturnDate}</td>

			<td>${transaction.expectedReturnTime}</td>

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

	document.getElementById("issueDate").value="";

	document.getElementById("issueTime").value="";

	document.getElementById("expectedReturnDate").value="";

	document.getElementById("expectedReturnTime").value="";

	document.getElementById("actualReturnDate").value="";

	document.getElementById("actualReturnTime").value="";
    document.getElementById("status").value="";

    document.getElementById("remarks").value="";

}