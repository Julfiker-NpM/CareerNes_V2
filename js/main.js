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
  const email = document.getElementById("email").value.trim();
  const fathersName = document.getElementById("fathersName")?.value.trim();
  const summary = document.getElementById("summary")?.value.trim();

  // Collect education
  const education = [];
  document.querySelectorAll("#education-section input").forEach(input => {
    if (input.value.trim()) education.push(input.value.trim());
  });

  // Experience
  const experience = [];
  document.querySelectorAll("#experience-section input").forEach(input => {
    if (input.value.trim()) experience.push(input.value.trim());
  });

  // Skills
  const skills = [];
  document.querySelectorAll("#skills-section input").forEach(input => {
    if (input.value.trim()) skills.push(input.value.trim());
  });

  // Projects
  const projects = [];
  document.querySelectorAll("#projects-section input").forEach(input => {
    if (input.value.trim()) projects.push(input.value.trim());
  });

  // Start building the template
  let html = "";

  if (template === "modern") {
    html = `
      <div class="p-4 text-gray-800 font-sans">
        <h2 class="text-2xl font-bold mb-2">${name}</h2>
        <p><strong>Email:</strong> ${email}</p>

        ${summary ? `<h3 class="mt-4 font-semibold">Summary</h3><p>${summary}</p>` : ""}

        ${education.length ? `<h3 class="mt-4 font-semibold">Education</h3><ul class="list-disc list-inside">${education.map(e => `<li>${e}</li>`).join('')}</ul>` : ""}

        ${experience.length ? `<h3 class="mt-4 font-semibold">Experience</h3><ul class="list-disc list-inside">${experience.map(e => `<li>${e}</li>`).join('')}</ul>` : ""}

        ${skills.length ? `<h3 class="mt-4 font-semibold">Skills</h3><ul class="flex flex-wrap gap-2">${skills.map(s => `<li class="bg-gray-200 px-2 py-1 rounded">${s}</li>`).join('')}</ul>` : ""}

        ${projects.length ? `<h3 class="mt-4 font-semibold">Projects</h3><ul class="list-disc list-inside">${projects.map(p => `<li>${p}</li>`).join('')}</ul>` : ""}
      </div>
    `;
  } else if (template === "biodata") {
    html = `
      <div class="p-4 text-black" style="font-family: 'Noto Sans Bengali', sans-serif;">
        <h2 class="text-xl font-bold text-center mb-4">বায়োডাটা</h2>
        <p><strong>নাম:</strong> ${name}</p>
        <p><strong>পিতার নাম:</strong> ${fathersName}</p>
        <p><strong>ইমেইল:</strong> ${email}</p>
        
        ${education.length ? `<h3 class="mt-4 font-semibold">শিক্ষাগত যোগ্যতা</h3><ul class="list-disc list-inside">${education.map(e => `<li>${e}</li>`).join('')}</ul>` : ""}

        ${skills.length ? `<h3 class="mt-4 font-semibold">দক্ষতা</h3><ul class="flex flex-wrap gap-2">${skills.map(s => `<li class="bg-gray-200 px-2 py-1 rounded">${s}</li>`).join('')}</ul>` : ""}

        ${projects.length ? `<h3 class="mt-4 font-semibold">প্রকল্পসমূহ</h3><ul class="list-disc list-inside">${projects.map(p => `<li>${p}</li>`).join('')}</ul>` : ""}
      </div>
    `;
  }

  document.getElementById("cv-preview").innerHTML = html;
}
function downloadPDF() {
  const preview = document.getElementById("cv-preview");

  if (!preview.innerHTML.trim()) {
    alert("Please generate the CV first.");
    return;
  }

  const opt = {
    margin: 0.5,
    filename: 'CareerNest_CV.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(preview).save();
}

