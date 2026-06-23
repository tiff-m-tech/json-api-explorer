const postList = document.getElementById("postList");
const form = document.getElementById("postForm");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");
const loading = document.getElementById("loading");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const fetchButton = document.getElementById("fetchButton");

// Counter for adding 5 new posts with fetch button
let postIndex = 0;

// To Display Existing Posts
fetchButton.addEventListener("click", async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${postIndex}&_limit=5`);
        const data = await response.json();
        console.log("existing posts", data);
        for (let obj of data) {
            postList.innerHTML += `
                <div>
                    <div><strong>Title:</strong> ${obj.title}</div>
                    <div><strong>Body:</strong> ${obj.body}</div>
                </div>
                <hr>`;
        }
    } catch (error) {
        console.error(error);
    }
});

// To Make New Post
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    loading.innerHTML = "<p>Loading...</p>";
    loading.style.color = "green";
    loading.style.fontSize = "2em";

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleInput.value,
                body: bodyInput.value,
                userId: 1,
            }),
        });
        const data = await response.json();
        console.log("new post", data);
        loading.innerHTML = "";
        formSuccess.innerHTML = `
            <p>
                <div>Post created!</div>
                ID: ${data.id} <br>
                Title: ${data.title} <br>
                Body: ${data.body} <br>
            </p>`;
    } catch (error) {
        console.error(error);
        loading.innerHTML = "";
        formError.innerHTML = `<p>Something went wrong: ${error.message}</p>`;
    }
});

// - async goes on the arrow function itself — async () =>
// - .then() chains become await on separate lines
// - .catch() becomes a try/catch block wrapping everything
// - The setTimeout becomes await new Promise((resolve) => setTimeout(resolve, 2000)),
//      this is the standard trick for awaiting a delay since setTimeout doesn't return a Promise on its own
