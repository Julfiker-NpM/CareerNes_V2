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

// Update form labels based on language/template
function updateFormLabels() {
  const labelName = document.getElementById("labelName");
  const bnFields = document.getElementById("bnFields");

  if (language === "bn" || template === "biodata") {
    labelName.innerText = "নাম";
    bnFields.classList.remove("hidden");
  } else {
    labelName.innerText = "Full Name";
    bnFields.classList.add("hidden");
  }
}

// Generate CV Preview
function generateCV() {
  const name = document.getElementById("name").value.trim();
  const fathersName = document.getElementById("fathersName")?.value.trim() || "";
  const email = document.getElementById("email").value.trim();

  let html = "";

  if (template === "modern") {
    html = `
      <div class="p-4 text-gray-800 font-sans">
        <h2 class="text-2xl font-bold mb-2">${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Profile Summary:</strong> Passionate individual seeking opportunities...</p>
        <h3 class="mt-4 font-semibold">Education</h3>
        <ul class="list-disc list-inside">
          <li>BSc in CSE - ABC University (2020)</li>
        </ul>
        <h3 class="mt-4 font-semibold">Skills</h3>
        <p>HTML, CSS, JavaScript</p>
      </div>
    `;
  } else if (template === "biodata") {
    html = `
      <div class="p-4 text-black font-sans" style="font-family: 'Noto Sans Bengali', sans-serif;">
        <h2 class="text-xl font-bold text-center mb-4">বায়োডাটা</h2>
        <p><strong>নাম:</strong> ${name}</p>
        <p><strong>পিতার নাম:</strong> ${fathersName}</p>
        <p><strong>ইমেইল:</strong> ${email}</p>
        <p><strong>জন্ম তারিখ:</strong> ০১ জানুয়ারি ২০০০</p>
        <p><strong>ঠিকানা:</strong> ঢাকা, বাংলাদেশ</p>
        <p><strong>শিক্ষাগত যোগ্যতা:</strong> বিএসসি ইন কম্পিউটার সায়েন্স</p>
      </div>
    `;
  }

  document.getElementById("cv-preview").innerHTML = html;
}

// Download CV as PDF
function downloadPDF() {
  const element = document.getElementById("cv-preview");
  const opt = {
    margin: 0.5,
    filename: 'CareerNest_CV.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}

// Initialize labels correctly
updateFormLabels();
