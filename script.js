const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

function createSignupModal() {
  const modal = document.createElement("div");
  modal.className = "signup-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "signup-title");
  modal.hidden = true;
  modal.innerHTML = `
    <div class="signup-backdrop" data-close-signup></div>
    <div class="signup-panel">
      <button class="signup-close" type="button" aria-label="Close sign up" data-close-signup>x</button>
      <p class="eyebrow">// <span>Start free</span></p>
      <h2 id="signup-title">Create your Audra workspace</h2>
      <p class="lead">Start with your best content and generate your first on-brand campaign draft.</p>
      <form class="signup-form">
        <label>
          Full name
          <input name="name" type="text" autocomplete="name" required>
        </label>
        <label>
          Work email
          <input name="email" type="email" autocomplete="email" required>
        </label>
        <label>
          Company
          <input name="company" type="text" autocomplete="organization" required>
        </label>
        <button class="btn primary wide" type="submit">Start free workspace</button>
      </form>
      <p class="signup-success" hidden>Your Audra workspace request is ready. We will contact you at the email entered.</p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelectorAll("[data-close-signup]").forEach((button) => {
    button.addEventListener("click", () => closeSignupModal());
  });

  modal.querySelector(".signup-form").addEventListener("submit", (event) => {
    event.preventDefault();
    modal.querySelector(".signup-form").hidden = true;
    modal.querySelector(".signup-success").hidden = false;
  });

  return modal;
}

const signupModal = createSignupModal();

function openSignupModal() {
  signupModal.hidden = false;
  document.body.classList.add("modal-open");
  signupModal.querySelector("input").focus();
}

function closeSignupModal() {
  signupModal.hidden = true;
  document.body.classList.remove("modal-open");
  const form = signupModal.querySelector(".signup-form");
  form.hidden = false;
  form.reset();
  signupModal.querySelector(".signup-success").hidden = true;
}

document.querySelectorAll("[data-signup]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openSignupModal();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !signupModal.hidden) closeSignupModal();
});

document.querySelectorAll(".faq-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector("span:last-child").textContent = isOpen ? "x" : "+";
  });
});

const billingButtons = document.querySelectorAll("[data-billing]");
const prices = document.querySelectorAll("[data-monthly]");

billingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.billing;
    billingButtons.forEach((item) => item.classList.toggle("active", item === button));
    prices.forEach((price) => {
      const value = mode === "annual" ? price.dataset.annual : price.dataset.monthly;
      price.textContent = `$${value}`;
    });
  });
});
