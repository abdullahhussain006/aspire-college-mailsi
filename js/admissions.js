/**
 * ASPIRE GROUP OF COLLEGES MAILSI 
 * Admissions Portal: Multi-Step Application Form, Validation, & Scholarship Calculator
 */

document.addEventListener("DOMContentLoaded", () => {
  initMultiStepForm();
  initScholarshipCalculator();
});

/**
 * Multi-Step Admission Form Navigation & Validation
 */
function initMultiStepForm() {
  const form = document.getElementById("admissionForm");
  if (!form) return;

  const steps = form.querySelectorAll(".form-step");
  const stepPills = document.querySelectorAll(".step-pill");
  const nextBtns = form.querySelectorAll(".btn-step-next");
  const prevBtns = form.querySelectorAll(".btn-step-prev");
  const confirmationModal = document.getElementById("admissionSlipModal");
  let currentStep = 0;

  const showStep = (stepIndex) => {
    steps.forEach((step, idx) => {
      step.classList.toggle("active", idx === stepIndex);
    });

    stepPills.forEach((pill, idx) => {
      pill.classList.toggle("active", idx === stepIndex);
      pill.classList.toggle("completed", idx < stepIndex);
    });

    currentStep = stepIndex;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateStep = (stepIndex) => {
    const currentInputs = steps[stepIndex].querySelectorAll("input[required], select[required]");
    let isValid = true;

    currentInputs.forEach((input) => {
      const errorSpan = input.parentElement.querySelector(".field-error");
      if (!input.checkValidity() || input.value.trim() === "") {
        isValid = false;
        input.style.borderColor = "var(--color-danger)";
        if (errorSpan) errorSpan.textContent = input.validationMessage || "This field is required.";
      } else {
        input.style.borderColor = "var(--color-border)";
        if (errorSpan) errorSpan.textContent = "";
      }
    });

    return isValid;
  };

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        if (currentStep < steps.length - 1) {
          showStep(currentStep + 1);
        }
      }
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  // Submit Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;

    // Extract form data
    const studentName = form.querySelector("#studentName")?.value || "Student";
    const fatherName = form.querySelector("#fatherName")?.value || "Guardian";
    const program = form.querySelector("#targetProgram")?.value || "Intermediate";
    const phone = form.querySelector("#studentPhone")?.value || "03070891119";
    const marks = form.querySelector("#matricMarks")?.value || "N/A";

    const refNo = `ASP-MLSI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Populate Modal Slip
    const slipRef = document.getElementById("slipRefNo");
    const slipName = document.getElementById("slipStudentName");
    const slipFather = document.getElementById("slipFatherName");
    const slipProgram = document.getElementById("slipProgram");
    const slipPhone = document.getElementById("slipPhone");
    const slipDate = document.getElementById("slipDate");

    if (slipRef) slipRef.textContent = refNo;
    if (slipName) slipName.textContent = studentName;
    if (slipFather) slipFather.textContent = fatherName;
    if (slipProgram) slipProgram.textContent = program;
    if (slipPhone) slipPhone.textContent = phone;
    if (slipDate) slipDate.textContent = new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });

    // Set WhatsApp Share Link for the Voucher
    const waShareBtn = document.getElementById("slipWhatsAppShareBtn");
    if (waShareBtn) {
      const waMsg = 
`*Online Admission Registration - Aspire College Mailsi*
🔖 *Voucher No:* ${refNo}
👤 *Student Name:* ${studentName}
👨 *Father/Guardian:* ${fatherName}
🎓 *Program Applied:* ${program}
📞 *Contact Phone:* ${phone}
📊 *Matric Marks:* ${marks}
📅 *Date:* ${new Date().toLocaleDateString("en-PK")}`;

      waShareBtn.href = `https://api.whatsapp.com/send?phone=923037376611&text=${encodeURIComponent(waMsg)}`;
    }

    // Show Confirmation Modal
    if (confirmationModal) {
      confirmationModal.classList.add("is-open");
    }

    form.reset();
    showStep(0);
  });

  // Modal Close Button
  const closeSlipBtn = document.getElementById("closeSlipModal");
  if (closeSlipBtn && confirmationModal) {
    closeSlipBtn.addEventListener("click", () => {
      confirmationModal.classList.remove("is-open");
    });
  }
}

/**
 * Interactive Scholarship & Concession Calculator
 */
function initScholarshipCalculator() {
  const calcBtn = document.getElementById("calculateScholarshipBtn");
  const marksInput = document.getElementById("calcMatricMarks");
  const totalMarksInput = document.getElementById("calcTotalMarks");
  const quotaSelect = document.getElementById("calcQuota");
  const resultBox = document.getElementById("calcResultBox");
  const percentText = document.getElementById("calcPercentageText");
  const scholarshipBadge = document.getElementById("calcScholarshipBadge");
  const remarksText = document.getElementById("calcRemarks");

  if (!calcBtn || !marksInput || !resultBox) return;

  calcBtn.addEventListener("click", () => {
    const marks = parseFloat(marksInput.value);
    const total = parseFloat(totalMarksInput?.value || 1100);
    const quota = quotaSelect?.value || "general";

    if (isNaN(marks) || marks < 0 || marks > total) {
      alert("Please enter a valid obtained mark between 0 and " + total);
      return;
    }

    const percentage = ((marks / total) * 100).toFixed(1);
    let scholarshipPercentage = 0;
    let title = "Standard Merit";
    let remarks = "";

    if (quota === "orphan") {
      scholarshipPercentage = 100;
      title = "100% Free Education (Orphan Support Scheme)";
      remarks = "Aspire College Mailsi honors deserving students with complete tuition waiver.";
    } else if (quota === "kinship") {
      scholarshipPercentage = 30;
      title = "30% Kinship Concession";
      remarks = "Sibling discount applicable for active students studying at Aspire Colleges.";
    } else if (quota === "teacher") {
      scholarshipPercentage = 50;
      title = "50% Teacher's Child Concession";
      remarks = "Applicable for children of government and private educators.";
    } else {
      // Merit based
      if (percentage >= 95) {
        scholarshipPercentage = 100;
        title = "100% Syed Omer Nazar Shah Gold Merit Scholarship";
        remarks = "Congratulations! Full 100% tuition waiver for outstanding academic excellence.";
      } else if (percentage >= 90) {
        scholarshipPercentage = 75;
        title = "75% Silver Academic Merit Award";
        remarks = "Exceptional performance! 75% waiver on overall tuition fees.";
      } else if (percentage >= 80) {
        scholarshipPercentage = 50;
        title = "50% Bronze Merit Scholarship";
        remarks = "Very good academic standing! 50% concession on monthly tuition.";
      } else if (percentage >= 70) {
        scholarshipPercentage = 30;
        title = "30% Aspire Encouragement Concession";
        remarks = "30% concession granted to encourage higher studies at Aspire College Mailsi.";
      } else {
        scholarshipPercentage = 10;
        title = "Early Bird Admission Concession (10%)";
        remarks = "Available on direct admissions confirmed during first phase.";
      }
    }

    if (percentText) percentText.textContent = `${percentage}% Marks`;
    if (scholarshipBadge) {
      scholarshipBadge.textContent = `${scholarshipPercentage}% SCHOLARSHIP - ${title}`;
      scholarshipBadge.className = `badge ${scholarshipPercentage >= 50 ? 'badge-gold' : 'badge-primary'}`;
    }
    if (remarksText) remarksText.textContent = remarks;

    resultBox.style.display = "block";
    resultBox.classList.add("reveal-zoom", "revealed");
  });
}
