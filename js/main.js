// main.js
let language = "en";
let template = "modern";

document.getElementById("languageSwitcher").addEventListener("change", (e) => {
  language = e.target.value;
  updateFormLabels();
});

document.getElementById("templateSelector").addEventListener("change", (e) => {
  template = e.target.value;
  updateFormLabels();
});

function updateFormLabels() {
  if (language === "bn" || template === "biodata") {
    document.getElementById("labelName").innerText = "নাম";
    document.getElementById("bnFields").style.display = "block";
  } else {
    document.getElementById("labelName").innerText = "Full Name";
    document.getElementById("bnFields").style.display = "none";
  }
}

function generateCV() {
  const name = document.getElementById("name").value;
  const fathersName = document.getElementById("fathersName").value;
  let html = "";

  if (template === "modern") {
    html = `
      <div>
        <h2>${name}</h2>
        <p>Email: example@example.com</p>
        <p>Education, skills, etc.</p>
      </div>`;
  } else if (template === "biodata") {
    html = `
      <div style="font-family: 'Noto Sans Bengali', sans-serif;">
        <h3 style="text-align:center;">বায়োডাটা</h3>
        <p><strong>নাম:</strong> ${name}</p>
        <p><strong>পিতার নাম:</strong> ${fathersName}</p>
        <p>ঠিকানা, জন্ম তারিখ, শিক্ষাগত যোগ্যতা ইত্যাদি</p>
      </div>`;
  }

  document.getElementById("cv-preview").innerHTML = html;
}

function downloadPDF() {
  const element = document.getElementById("cv-preview");
  html2pdf().from(element).save("CareerNest_CV.pdf");
}
