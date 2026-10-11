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
    const currentStepEl = steps[stepIndex];
    if (!currentStepEl) return true;
    const currentInputs = currentStepEl.querySelectorAll("input[required], select[required]");
    let isValid = true;
    let firstInvalid = null;

    currentInputs.forEach((input) => {
      const parent = input.closest(".form-group") || input.parentElement;
      const errorSpan = parent ? parent.querySelector(".field-error") : null;
      let fieldValid = true;
      let errorMsg = "";

      if (input.type === "checkbox") {
        fieldValid = input.checked;
        if (!fieldValid) {
          errorMsg = "Please agree to the college rules to proceed.";
        }
      } else if (input.id === "studentPhone") {
        const cleanPhone = input.value.replace(/\D/g, "");
        if (cleanPhone.length !== 11) {
          fieldValid = false;
          errorMsg = "Phone number must be exactly 11 digits (e.g. 0300-1234567).";
        }
      } else if (input.id === "studentCNIC") {
        const cleanCNIC = input.value.replace(/\D/g, "");
        if (cleanCNIC.length !== 13) {
          fieldValid = false;
          errorMsg = "B-Form / CNIC must be exactly 13 digits (e.g. 36603-1234567-1).";
        }
      } else if (input.id === "matricRollNo") {
        const cleanRoll = input.value.trim().replace(/\D/g, "");
        if (cleanRoll.length < 5 || cleanRoll.length > 6 || cleanRoll !== input.value.trim()) {
          fieldValid = false;
          errorMsg = "Matric roll number must be 5 or 6 digits (cannot exceed 6 or be less than 5).";
        }
      } else if (input.id === "matricMarks") {
        const valStr = input.value.trim();
        const marks = parseFloat(valStr);
        if (valStr === "" || isNaN(marks)) {
          fieldValid = false;
          errorMsg = "Please enter your Matric obtained marks.";
        } else if (marks < 0 || marks > 1200) {
          fieldValid = false;
          errorMsg = "Matric marks must be between 0 and 1200 (cannot exceed 1200).";
        }
      } else if (input.type === "tel") {
        const cleanPhone = input.value.replace(/\D/g, "");
        if (cleanPhone.length !== 11) {
          fieldValid = false;
          errorMsg = "Phone number must be exactly 11 digits (e.g. 0300-1234567).";
        }
      } else if (!input.checkValidity() || input.value.trim() === "") {
        fieldValid = false;
        errorMsg = input.validationMessage || "This field is required.";
      }

      if (!fieldValid) {
        isValid = false;
        input.style.borderColor = "var(--color-danger)";
        if (errorSpan) errorSpan.textContent = errorMsg;
        if (!firstInvalid) firstInvalid = input;
      } else {
        input.style.borderColor = "var(--color-border)";
        if (errorSpan) errorSpan.textContent = "";
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return isValid;
  };

  // Real-time input clearing for better UX
  form.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "var(--color-border)";
      const parent = input.closest(".form-group") || input.parentElement;
      const errorSpan = parent ? parent.querySelector(".field-error") : null;
      if (errorSpan) errorSpan.textContent = "";
    });
  });

  // Dedicated input formatting & live validation handlers
  const phoneInput = form.querySelector("#studentPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let digits = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (e.target.value.includes("-")) {
        e.target.value = e.target.value.replace(/[^0-9-]/g, "").slice(0, 12);
      } else {
        e.target.value = digits;
      }
    });
    phoneInput.addEventListener("blur", (e) => {
      const digits = e.target.value.replace(/\D/g, "");
      if (digits.length === 11 && !e.target.value.includes("-")) {
        e.target.value = `${digits.slice(0, 4)}-${digits.slice(4)}`;
      }
    });
  }

  const cnicInput = form.querySelector("#studentCNIC");
  if (cnicInput) {
    cnicInput.addEventListener("input", (e) => {
      let digits = e.target.value.replace(/\D/g, "").slice(0, 13);
      if (e.target.value.includes("-")) {
        e.target.value = e.target.value.replace(/[^0-9-]/g, "").slice(0, 15);
      } else {
        e.target.value = digits;
      }
    });
    cnicInput.addEventListener("blur", (e) => {
      const digits = e.target.value.replace(/\D/g, "");
      if (digits.length === 13 && !e.target.value.includes("-")) {
        e.target.value = `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
      }
    });
  }

  const rollInput = form.querySelector("#matricRollNo");
  if (rollInput) {
    rollInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
    });
  }

  const marksInput = form.querySelector("#matricMarks");
  if (marksInput) {
    marksInput.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      const parent = marksInput.closest(".form-group") || marksInput.parentElement;
      const errorSpan = parent ? parent.querySelector(".field-error") : null;
      if (val > 1200) {
        marksInput.style.borderColor = "var(--color-danger)";
        if (errorSpan) errorSpan.textContent = "Matric obtained marks cannot exceed 1200.";
      }
    });
  }

  // Step navigation buttons
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

  // Step Pills Click Navigation
  stepPills.forEach((pill, idx) => {
    pill.style.cursor = "pointer";
    pill.addEventListener("click", () => {
      if (idx < currentStep) {
        showStep(idx);
      } else if (idx > currentStep) {
        if (validateStep(currentStep)) {
          showStep(idx);
        }
      }
    });
  });

  // Quick Apply Program Buttons from cards above
  document.querySelectorAll(".apply-program-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedProg = btn.getAttribute("data-program");
      const targetSelect = document.getElementById("targetProgram");
      if (targetSelect && selectedProg) {
        targetSelect.value = selectedProg;
      }
    });
  });

  // Form Submit Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Verify all steps from 0 to last step
    for (let s = 0; s < steps.length; s++) {
      if (!validateStep(s)) {
        showStep(s);
        return;
      }
    }

    // Extract all registration data
    const studentName = (form.querySelector("#studentName")?.value || "Student").trim();
    const fatherName = (form.querySelector("#fatherName")?.value || "Guardian").trim();
    const phone = (form.querySelector("#studentPhone")?.value || "").trim();
    const cnic = (form.querySelector("#studentCNIC")?.value || "N/A").trim();
    const address = (form.querySelector("#homeAddress")?.value || "Mailsi").trim();

    const previousSchool = (form.querySelector("#previousSchool")?.value || "N/A").trim();
    const previousBoard = form.querySelector("#previousBoard")?.value || "BISE Multan";
    const rollNo = (form.querySelector("#matricRollNo")?.value || "N/A").trim();
    const marks = (form.querySelector("#matricMarks")?.value || "N/A").trim();

    const program = form.querySelector("#targetProgram")?.value || "Intermediate";
    const transport = form.querySelector("#transportRequired")?.value || "No";

    const refNo = `ASP-MLSI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submissionDate = new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });

    // Populate Modal Slip elements
    const slipRef = document.getElementById("slipRefNo");
    const slipName = document.getElementById("slipStudentName");
    const slipFather = document.getElementById("slipFatherName");
    const slipPhone = document.getElementById("slipPhone");
    const slipCNIC = document.getElementById("slipCNIC");
    const slipProgram = document.getElementById("slipProgram");
    const slipMarks = document.getElementById("slipMarks");
    const slipTransport = document.getElementById("slipTransport");
    const slipDate = document.getElementById("slipDate");

    if (slipRef) slipRef.textContent = refNo;
    if (slipName) slipName.textContent = studentName;
    if (slipFather) slipFather.textContent = fatherName;
    if (slipPhone) slipPhone.textContent = phone;
    if (slipCNIC) slipCNIC.textContent = cnic;
    if (slipProgram) slipProgram.textContent = program;
    if (slipMarks) slipMarks.textContent = `${marks} / 1200 Marks (${previousBoard}, Roll #${rollNo})`;
    if (slipTransport) slipTransport.textContent = transport;
    if (slipDate) slipDate.textContent = submissionDate;

    // Construct Comprehensive WhatsApp Admission Details
    const waMsg = 
`🎓 *NEW ONLINE ADMISSION REGISTRATION - ASPIRE COLLEGE MAILSI*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *Voucher Ref No:* ${refNo}

👤 *STUDENT INFORMATION:*
• Name: ${studentName}
• Father / Guardian: ${fatherName}
• Mobile / WhatsApp: ${phone}
• B-Form / CNIC: ${cnic}
• Residential Address: ${address}

📚 *ACADEMIC RECORD:*
• Previous School: ${previousSchool}
• Board: ${previousBoard}
• Matric Roll No: ${rollNo}
• Obtained Marks: ${marks} / 1200

🎯 *ADMISSION PREFERENCE:*
• Desired Program: ${program}
• College Transport: ${transport}

📅 *Date Submitted:* ${submissionDate}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Respected Admissions Office, I have submitted my online application. Please confirm receipt and share the admission process details._`;

    const waUrl = `https://api.whatsapp.com/send?phone=923037376611&text=${encodeURIComponent(waMsg)}`;

    // Set link on modal WhatsApp share button
    const waShareBtn = document.getElementById("slipWhatsAppShareBtn");
    if (waShareBtn) {
      waShareBtn.href = waUrl;
    }

    // Show Confirmation Modal (supports both .active and .is-open)
    if (confirmationModal) {
      confirmationModal.classList.add("active");
      confirmationModal.classList.add("is-open");
    }

    // Automatically trigger WhatsApp in a new tab/window
    try {
      window.open(waUrl, "_blank");
    } catch (err) {
      console.warn("Popup blocked by browser, user can click modal WhatsApp button.", err);
    }

    form.reset();
    showStep(0);
  });

  // Modal Close Handlers
  const closeModal = () => {
    if (confirmationModal) {
      confirmationModal.classList.remove("active");
      confirmationModal.classList.remove("is-open");
    }
  };

  const closeSlipBtn = document.getElementById("closeSlipModal");
  if (closeSlipBtn) {
    closeSlipBtn.addEventListener("click", closeModal);
  }

  if (confirmationModal) {
    confirmationModal.addEventListener("click", (e) => {
      if (e.target === confirmationModal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && confirmationModal && (confirmationModal.classList.contains("active") || confirmationModal.classList.contains("is-open"))) {
      closeModal();
    }
  });
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

  const calculate = () => {
    const marks = parseFloat(marksInput.value);
    const total = parseFloat(totalMarksInput?.value || 1200);
    const quota = quotaSelect?.value || "general";

    if (isNaN(marks) || marks < 0 || marks > total) {
      alert("Please enter a valid obtained mark between 0 and " + total);
      marksInput.focus();
      return;
    }

    const percentage = parseFloat(((marks / total) * 100).toFixed(1));

    // Merit-based scholarship evaluation
    let meritPercent = 0;
    let meritTitle = "Standard Merit";
    let meritRemarks = "";

    if (percentage >= 95) {
      meritPercent = 100;
      meritTitle = "100% Full Tuition Waiver";
      meritRemarks = "Congratulations! Full 100% tuition waiver awarded for top board position holders and high achievers.";
    } else if (percentage >= 90) {
      meritPercent = 50;
      meritTitle = "50% High-Merit Concession";
      meritRemarks = "Outstanding achievement! 50% tuition fee concession awarded for scoring 90%+ marks in examinations.";
    } else if (percentage >= 75) {
      meritPercent = 25;
      meritTitle = "25% Merit Concession";
      meritRemarks = "Commendable academic standing! 25% tuition fee concession granted for scoring above 75% marks.";
    } else {
      meritPercent = 10;
      meritTitle = "10% Early Bird Admission Concession";
      meritRemarks = "10% admission concession applicable during the current enrollment phase at Aspire College Mailsi.";
    }

    // Special quota / humanitarian evaluation
    let quotaPercent = 0;
    let quotaTitle = "";
    let quotaRemarks = "";

    if (quota === "orphan") {
      quotaPercent = 100;
      quotaTitle = "100% Free Education (Orphan Support)";
      quotaRemarks = "Aspire College Mailsi honors deserving students with complete 100% free education.";
    } else if (quota === "kinship") {
      quotaPercent = 25;
      quotaTitle = "25% Kinship Concession (Sibling Studying)";
      quotaRemarks = "25% fee concession granted for brothers/sisters of currently enrolled Aspire students.";
    } else if (quota === "teacher") {
      quotaPercent = 25;
      quotaTitle = "25% Teacher's Child Concession";
      quotaRemarks = "25% fee concession granted for children of respected government and private educators.";
    }

    // Determine highest entitled concession for the student
    let finalPercentage = meritPercent;
    let finalTitle = meritTitle;
    let finalRemarks = meritRemarks;

    if (quotaPercent > meritPercent) {
      finalPercentage = quotaPercent;
      finalTitle = quotaTitle;
      finalRemarks = quotaRemarks;
    } else if (quotaPercent === meritPercent && quotaPercent > 0 && quota !== "general") {
      finalTitle = `${meritTitle} (${quotaTitle.split(" (")[0]} Category)`;
      finalRemarks = `${quotaRemarks} (Combined merit & quota entitlement)`;
    }

    // Calculate fee payable breakdown
    const feePayablePercent = 100 - finalPercentage;
    const feeStatusLine = finalPercentage === 100
      ? `<div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed rgba(200, 16, 46, 0.25); font-size: 13px; color: var(--color-success); font-weight: 700;">
           🎉 <strong>Fee Payable:</strong> 100% Free Education (Rs. 0 Tuition Fee to pay)
         </div>`
      : `<div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed rgba(200, 16, 46, 0.25); font-size: 13px; color: var(--color-primary-dark);">
           💰 <strong>Fee Payable:</strong> Pay only <strong>${feePayablePercent}%</strong> of standard tuition fee (<strong>${finalPercentage}% concession</strong> applied)
         </div>`;

    if (percentText) {
      percentText.textContent = `${percentage}% Marks (${marks} / ${total})`;
    }

    if (scholarshipBadge) {
      scholarshipBadge.textContent = `${finalPercentage}% SCHOLARSHIP`;
      scholarshipBadge.className = `badge ${finalPercentage >= 50 ? 'badge-gold' : 'badge-primary'}`;
    }

    if (remarksText) {
      remarksText.innerHTML = `
        <strong style="color: var(--color-primary); display: block; margin-bottom: 2px;">${finalTitle}</strong>
        <span>${finalRemarks}</span>
        ${feeStatusLine}
        <div style="margin-top: 6px; font-size: 12px; color: var(--color-text-muted);">
          📌 <em>Visit the Aspire College Mailsi admissions desk with your original Matric mark sheet and documents within 3 days to collect your finalized fee voucher.</em>
        </div>
      `;
    }

    resultBox.style.display = "block";
    resultBox.classList.add("reveal-zoom", "revealed");
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  calcBtn.addEventListener("click", calculate);

  // Allow pressing Enter key in inputs
  marksInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
  });

  if (totalMarksInput) {
    totalMarksInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        calculate();
      }
    });
  }
}
