document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-registro");
  if (!form) return;

  const password = form.querySelector("#password");
  const confirmar = form.querySelector("#confirmar-password");
  const errorEl = form.querySelector("#error-confirmar-password");
  const campoConfirmar = confirmar.closest(".field");

  function passwordsCoinciden() {
    const coinciden = password.value.length > 0 && password.value === confirmar.value;

    if (confirmar.value.length === 0) {
      campoConfirmar.classList.remove("is-invalid");
      errorEl.textContent = "";
      return false;
    }

    if (!coinciden) {
      campoConfirmar.classList.add("is-invalid");
      errorEl.textContent = "Las contraseñas no coinciden.";
    } else {
      campoConfirmar.classList.remove("is-invalid");
      errorEl.textContent = "";
    }

    return coinciden;
  }

  confirmar.addEventListener("input", passwordsCoinciden);
  password.addEventListener("input", () => {
    if (confirmar.value.length > 0) passwordsCoinciden();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!passwordsCoinciden()) {
      confirmar.focus();
      return;
    }

    alert("Formulario válido. (Próxima fase: enviar datos al servidor)");
    form.reset();
  });
});
