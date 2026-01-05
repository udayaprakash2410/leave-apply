// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  if (role === "employee" && user === "user" && pass === "123") {
    localStorage.setItem("role", "employee");
    window.location.href = "index.html";
  }
  else if (role === "admin" && user === "admin" && pass === "admin123") {
    localStorage.setItem("role", "admin");
    window.location.href = "admin.html";
  }
  else {
    alert("Invalid credentials");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

// LEAVE FORM
if (document.getElementById("leaveForm")) {
  document.getElementById("leaveForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let leave = {
      name: name.value,
      empId: empId.value,
      type: leaveType.value,
      from: fromDate.value,
      to: toDate.value,
      reason: reason.value,
      status: "Pending"
    };

    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    leaves.push(leave);
    localStorage.setItem("leaves", JSON.stringify(leaves));

    alert("Leave Applied");
    this.reset();
  });
}

// ADMIN TABLE
if (document.getElementById("leaveTable")) {
  let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
  let table = document.getElementById("leaveTable");

  leaves.forEach((l, i) => {
    let row = table.insertRow();
    row.innerHTML = `
      <td>${l.name}</td>
      <td>${l.empId}</td>
      <td>${l.type}</td>
      <td>${l.from}</td>
      <td>${l.to}</td>
      <td>${l.status}</td>
      <td>
        <button onclick="update(${i}, 'Approved')">Approve</button>
        <button onclick="update(${i}, 'Rejected')">Reject</button>
      </td>
    `;
  });

  window.update = function(i, status) {
    leaves[i].status = status;
    localStorage.setItem("leaves", JSON.stringify(leaves));
    location.reload();
  }
}