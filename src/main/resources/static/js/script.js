let equipmentChart;

window.onload = function () {

    showCurrentDate();

    showCurrentTime();

    setInterval(showCurrentTime, 1000);

    loadDashboard();

    loadRecentTransactions();

};

function showCurrentDate() {

    const dateElement = document.getElementById("currentDate");

    if (dateElement) {

        const today = new Date();

        dateElement.textContent = today.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    }

}

function showCurrentTime(){

    const now = new Date();

    document.getElementById("currentTime").textContent =
        "🕒 " +
        now.toLocaleTimeString("en-IN",{
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit"
        });

}



function loadDashboard() {

    fetch("/api/dashboard")

        .then(response => {

            console.log("Status:", response.status);

            return response.json();

        })

        .then(data => {

            console.log("Dashboard Data:", data);

			animateCounter(
			    "equipmentCount",
			    data.totalEquipment ?? 0
			);

			animateCounter(
			    "studentCount",
			    data.totalStudents ?? 0
			);

			animateCounter(
			    "facultyCount",
			    data.totalFaculty ?? 0
			);

			animateCounter(
			    "transactionCount",
			    data.totalTransactions ?? 0
			);
			
			loadChart(data);

        })

        .catch(error => {

            console.error("Dashboard Error:", error);

        });

}
function loadRecentTransactions() {

    fetch("/api/transactions")

        .then(response => response.json())

        .then(data => {

            const table = document.getElementById("recentTransactionTable");

            if (!table) return;

            table.innerHTML = "";

            if (data.length === 0) {

                table.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align:center;">
                            No transactions available
                        </td>
                    </tr>
                `;

                return;

            }

            const recent = [...data].reverse().slice(0, 5);

            recent.forEach(transaction => {

                table.innerHTML += `
                    <tr>
                        <td>${transaction.id}</td>
                        <td>${transaction.studentName}</td>
                        <td>${transaction.equipmentName}</td>
                        <td>${transaction.status}</td>
                        <td>${transaction.issueDate}</td>
                    </tr>
                `;

            });

        })

        .catch(error => {

            console.error("Recent Transactions Error:", error);

        });

}

function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

function animateCounter(id, endValue) {

    const element = document.getElementById(id);

    if (!element) return;

    let current = 0;

    const increment = Math.max(1, Math.ceil(endValue / 40));

    const timer = setInterval(() => {

        current += increment;

        if (current >= endValue) {

            current = endValue;

            clearInterval(timer);

        }

        element.textContent = current;

    }, 30);

}

function loadChart(data){

    const ctx = document.getElementById("equipmentChart");

    if(!ctx) return;

    if(equipmentChart){
        equipmentChart.destroy();
    }

    equipmentChart = new Chart(ctx,{

    type:"doughnut",
        data:{

			labels:[
			    "Equipment",
			    "Students",
			    "Faculty"
			],

			datasets:[{

			    label:"System Statistics",

				data: [
				    data.totalEquipment || 5,
				    data.totalStudents || 3,
				    data.totalFaculty || 2
				],

				backgroundColor:[
				    "#1565C0",   // Equipment (Blue)
				    "#2E7D32",   // Students (Green)
				    "#7B1FA2"    // Faculty (Purple)
				],

				borderRadius:8,
				borderWidth:4,
				borderColor:"#ffffff",
				hoverOffset:12
            }]

        },

		options:{

		    responsive:true,

		    maintainAspectRatio:false,

		    cutout:"50%",

		    plugins:{

		        legend:{
		            position:"bottom"
		        }

		    }

		}
    });

}