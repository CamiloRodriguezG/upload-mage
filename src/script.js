let mainBox = document.getElementById("main-box");
let dropZone = document.querySelector(".drop-file");
let inputFile = document.getElementById("file");


const imageUploadTemplate = (image, name) => {
  return `
    <div class="uploaded-card">
        <header>
            <i class="fas fa-check-circle"></i>
            <h1>Uploaded Successfully!</h1>
        </header>
        <div class="image">
            <img src=${image} alt="${name}">
        </div>
        <div class="down-sec">
            <p class="to-copy">${name}</p>
            <button class="copy-btn">Copy link</button>
        </div>
    </div>
    `;
};

dropZone.addEventListener("dragover", function (e) {
  e.preventDefault();
  dropZone.classList.add("over");
});
dropZone.addEventListener("dragleave", function (e) {
  dropZone.classList.remove("over");
});
dropZone.addEventListener("drop", function (e) {
  let file = e.dataTransfer.files;
  e.preventDefault();
  //se verifica que solo se haya dejado un archivo
  if (file.length > 1) {
    alert("mas de un archivo ingresado");
  } else {
    let type = file[0].type;
    let title = file[0].name;
    //se verifica que sea una imagen
    if (type.startsWith("image/")) {
      mainBox.innerHTML = `
      <div class="load-box">
        <h1>Uploading...</h1>
        <div class="upload-bar"></div>
    </div>`;

      setTimeout(function () {
        const reader = new FileReader();

        reader.readAsDataURL(file[0]);

        reader.onload = () => {
          mainBox.innerHTML = imageUploadTemplate(reader.result, title);
          document
            .querySelector(".copy-btn")
            .addEventListener("click", async function clipboardCopy() {
              await navigator.clipboard.writeText(
                document.querySelector(".to-copy").textContent
              );
            });
        };
      }, 4000);
    } else {
      alert("solo imagenes");
    }
  }
});

inputFile.onchange = function (e) {
  let file = inputFile.files;
  let title = file[0].name;

  if (file.length > 1) {
    alert("solo un archivo");
  } else {
    mainBox.innerHTML = `<div class="load-box">
        <h1>Uploading...</h1>
        <div class="upload-bar"></div>
    </div>`;

    setTimeout(function () {
      const reader = new FileReader();

      reader.readAsDataURL(file[0]);

      reader.onload = () => {
        mainBox.innerHTML = imageUploadTemplate(reader.result, title);
        document
          .querySelector(".copy-btn")
          .addEventListener("click", async function clipboardCopy() {
            await navigator.clipboard.writeText(
              document.querySelector(".to-copy").textContent
            );
          });
      };
    }, 4000);
  }
};
