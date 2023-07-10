let go = document.querySelector("button");
go.onclick = function() {
    let username = document.querySelector("input[name=name]").value;
    if (username.trim() === "") {
        let errorMsg = document.getElementById("error-msg");
        errorMsg.textContent = "Please enter a valid name";
        return;
    }

    localStorage.setItem("name", username);

    window.location.href = "game.html";

}


