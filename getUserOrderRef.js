let categories = [
  "animation",
  "animations",
  "background",
  "background clip",
  "background color",
  "background gradient",
  "border color",
  "borders",
  "box",
  "colors",
  "display",
  "divide",
  "flex",
  "flexbox",
  "forms",
  "grid",
  "group hover",
  "height",
  "list",
  "margins",
  "nums",
  "opacity",
  "outline",
  "paddings",
  "positioning",
  "pseudo class",
  "responsive",
  "ring",
  "scroll",
  "shadows",
  "sizing",
  "spacing",
  "svg",
  "table",
  "text",
  "text color",
  "transform",
  "typography",
  "utilities",
  "visibility",
  "width",
];

const list = document.getElementById("categoryList");
const output = document.getElementById("output");

function renderList() {
  list.innerHTML = "";

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.dataset.value = cat;

    list.appendChild(li);
  });
}

renderList();

new Sortable(list, {
  animation: 150,
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const newCategories = Array.from(list.children).map((li) => li.dataset.value);

  // save array to localStorage
  localStorage.setItem("userCategoryOrder", JSON.stringify(newCategories));

  // redirect to next page
  window.location.href = "index.html";
});

// add this to the second page
// const savedCategories = JSON.parse(localStorage.getItem("userCategoryOrder"));

// console.log(savedCategories);
