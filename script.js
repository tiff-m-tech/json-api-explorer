const postList = document.getElementById("postList");
const form = document.getElementById("postForm");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");
const loading = document.getElementById("loading");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const fetchButton = document.getElementById("fetchButton");

// To Display Existing Posts
fetchButton.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
            console.log("existing posts", data);

            for (let obj of data) {
                postList.innerHTML += `
                <div>
                    <div><strong>Title:</strong> ${obj.title}</div>
                    <div><strong>Body:</strong> ${obj.body}</div>
                </div>
                <hr>`;
            }
        })
        .catch((error) => console.error(error));
});

// To Make New Post
form.addEventListener("submit", (event) => {
    event.preventDefault();
    loading.innerHTML = "<p>Loading...</p>";
    loading.style.color = "green";
    loading.style.fontSize = "2em";

    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleInput.value,
                body: bodyInput.value,
                userId: 1,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("new post", data);
                loading.innerHTML = "";
                formSuccess.innerHTML = `
                    <p>
                        <h3>Post created!</h3>
                        ID: ${data.id} <br>
                        Title: ${data.title} <br>
                        Body: ${data.body} <br>
                    </p>`;
            })
            .catch((error) => {
                console.error(error);
                loading.innerHTML = "";
                formError.innerHTML = `<p>Something went wrong: ${error.message}</p>`;
            });
    }, 2000);
});
