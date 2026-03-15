//This function takes the user input file and converts it to a string.

function htmlString() {
  return new Promise((resolve) => {
    const userFileInput = document.getElementById("userFileInput");

    userFileInput.addEventListener("change", async (event) => {
      const htmlFile = event.target.files[0];
      const readObj = new FileReader();
      readObj.readAsText(htmlFile);
      readObj.onload = (e) => {
        resolve(e.target.result);
      };
    });
  });
}

async function readData() {
  const str = await htmlString();
  console.log(str);
  return str;
}

export { htmlString, readData };
// document.getElementById("userFileInput").addEventListener("click", func);
