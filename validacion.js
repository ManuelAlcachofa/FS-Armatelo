document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-registro");
  if (!form) return;

  //Campos de entrada
  const nombre = form.querySelector("#nombre");
  const email = form.querySelector("#email");
  const password = form.querySelector("#password");
  const confirmar = form.querySelector("#confirmar-password");

  //Elementos usados para mensajes de error
  const errorNombre = form.querySelector("#error-nombre");
  const errorEmail = form.querySelector("#error-email");
  const errorPassword = form.querySelector("#error-password");
  const errorConfirmar = form.querySelector("#error-confirmar-password"); //Cambio de nombre errorEl a errorConfirmar

  //Contenedores .field
  const campoNombre = nombre.closest(".field");
  const campoEmail = email.closest(".field");
  const campoPassword = password.closest(".field");
  const campoConfirmar = confirmar.closest(".field");


  // Validacion de nombre (no este vacio o solo espacios)
  function validarNombre() {
    if (nombre.value.trim() === "") {
      campoNombre.classList.add("is-invalid");
      errorNombre.textContent = "El nombre no puede quedar en blanco.";

      return false;

    } else {
      campoNombre.classList.remove("is-invalid");
      errorNombre.textContent = "";

      return true;
    }
  }

  // Validacion de email (no este vacio y con formato correcto de email)
  function validarEmail() {
    const valorEmail = email.value.trim();
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valorEmail === "") {
      campoEmail.classList.add("is-invalid");
      errorEmail.textContent = "El correo no puede estar en blanco.";

      return false;

    } else if (!formatoEmail.test(valorEmail)) {
      campoEmail.classList.add("is-invalid");
      errorEmail.textContent = "Ingresa un correo electrónico válido (ej: usuario@correo.com).";

      return false;

    } else {
      campoEmail.classList.remove("is-invalid");
      errorEmail.textContent = "";

      return true;
    }
  }

  // Validacion contraseña (que tenga contenido y un largo minimo)
  function validarPassword() {
    if (password.value === "") {
      campoPassword.classList.add("is-invalid");
      errorPassword.textContent = "Debes ingresar una contraseña.";

      return false;

    } else if (password.value.length < 6) {
      campoPassword.classList.add("is-invalid");
      errorPassword.textContent = "La contraseña debe tener al menos 6 caracteres.";

      return false;

    } else {
      campoPassword.classList.remove("is-invalid");
      errorPassword.textContent = "";

      return true;
    }
  }


  function passwordsCoinciden() {
    const coinciden = password.value.length > 0 && password.value === confirmar.value;

    if (confirmar.value.length === 0) {
      campoConfirmar.classList.remove("is-invalid");
      errorConfirmar.textContent = "";
      return false;
    }

    if (!coinciden) {
      campoConfirmar.classList.add("is-invalid");
      errorConfirmar.textContent = "Las contraseñas no coinciden.";
    } else {
      campoConfirmar.classList.remove("is-invalid");
      errorConfirmar.textContent = "";
    }

    return coinciden;
  }


  nombre.addEventListener("input", validarNombre);
  email.addEventListener("input", validarEmail);
  password.addEventListener("input", () => {
    validarPassword();
    if (confirmar.value.length > 0) {
      passwordsCoinciden();
    }
  });
  confirmar.addEventListener("input", passwordsCoinciden);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const passwordValido = validarPassword();
    const confirmarValido = passwordsCoinciden();

    if (nombreValido && emailValido && passwordValido && confirmarValido) {
      alert("Formulario válido. (Próxima fase: enviar datos al servidor)");
      form.reset();

    } else {
      // Orden en cascada segun el orden del formulario
      if (!nombreValido) {
        nombre.focus();
      } else if (!emailValido) {
        email.focus();
      } else if (!passwordValido) {
        password.focus();
      } else if (!confirmarValido) {
        confirmar.focus();
      }
    }
    
  });
});
