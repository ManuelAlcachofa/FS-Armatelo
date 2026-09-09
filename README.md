# Armatelo — Módulo de Cotización y Ensamblaje de PC para SoloTodo

> Prototipo web frontend interactivo diseñado para **SoloTodo**, enfocado en la selección, cotización y configuración de computadores de escritorio (PC Desktop) a la medida.

---

## 1. Descripción del Proyecto

**Armatelo** es una extensión web frontend desarrollada para modernizar y enriquecer los servicios de **SoloTodo**, integrando una experiencia interactiva para cotizar configuraciones de hardware y guiar a usuarios novatos y entusiastas en el ensamblaje de sus equipos.

El proyecto implementa en esta primera entrega:
- **Catálogo de Builds Pre-armadas:** Muestrario de equipos probados y balanceados para diferentes perfiles de usuario y presupuestos.
- **Zona de Ensamble (Stub):** Espacio preparado para la futura implementación de filtros interactivos por presupuesto, marca, almacenamiento y RAM.
- **Centro de Ayuda (Stub):** Sección educativa proyectada para alojar guías paso a paso, glosario técnico y prevención de errores comunes.
- **Módulo de Registro con Validación Reactiva:** Formulario de captura de usuarios con validaciones de campos en tiempo real mediante JavaScript Vanilla, control de errores accesible y foco en cascada.
- **Diseño Visual Moderno ("Ember Dark"):** Sistema de diseño oscuro de alto contraste con acentos naranja fuego, tipografía técnica y compatibilidad completa con dispositivos móviles.

---

## 2. Estructura de Archivos del Proyecto

El repositorio cuenta con una arquitectura desacoplada y modular compuesta exclusivamente por tecnologías web estándar:

```text
armatelo/
├── index.html          # Página principal: Hero, catálogo de builds y paneles de acceso rápido
├── ensamble.html       # Vista para la zona de ensamble y configuración por criterios (Stub)
├── ayuda.html          # Vista para el centro de ayuda, guías técnicas y glosario (Stub)
├── registro.html       # Vista con formulario de creación de cuenta de usuario
├── style.css           # Hoja de estilos global, variables CSS, layout responsive y temas
├── main.js             # Lógica global del DOM: Menú responsive desplegable y año de copyright
├── validacion.js       # Lógica de validación reactiva en tiempo real del formulario de registro
└── README.md           # Documentación técnica y guía de arquitectura del proyecto
```

---

## 3. Detalle Técnico de los Componentes

### 3.1. Estructura Semántica (HTML5)
* **`index.html`:**
  * Barra de navegación fija con efecto translúcido (`.nav`, `backdrop-filter`).
  * Sección Hero interactiva (`.hero`) que incorpora trazados vectoriales SVG (`.hero__traces`) simulando pistas de circuitos integrados con gradientes radiales de luz (`.hero__glow`).
  * Grilla CSS de tarjetas de modelos armados (`.build-card`) con especificaciones técnicas detalladas (CPU, GPU, RAM y Almacenamiento NVMe/SATA) y precios en pesos chilenos ($CLP).
  * Paneles de navegación inferior (`.panels`) hacia Ensamble y Ayuda.
* **`ensamble.html` & `ayuda.html`:**
  * Estructura estándar tipo pantalla de espera/construcción (`.stub`), manteniendo la consistencia de cabecera y pie de página, indicando las futuras funcionalidades y proveyendo un botón de retorno (`btn--ghost`).
* **`registro.html`:**
  * Contenedor de tarjeta de autenticación (`.auth__card`) con formulario accesible (`#form-registro`) configurado con `novalidate` para delegar la validación completa en el script del cliente.
  * Agrupaciones de campos (`.field`) con etiquetas semánticas (`<label>`), entradas tipadas (`type="text"`, `type="email"`, `type="password"`) y elementos para despliegue de error (`.field__error`).

### 3.2. Sistema de Diseño y Estilos (`style.css`)
* **Variables CSS Globales (`:root`):**
  * **Paleta de Fondos:** `--bg-void: #0a0908`, `--bg-panel: #15120f`, `--bg-panel-2: #1c1815`, fondo general `#050403`.
  * **Acentos de Marca:** `--ember-core: #ff5714`, `--ember-glow: #ff9142`, `--ember-deep: #7a1f00`.
  * **Tipografía y Legibilidad:** `--text-primary: #f4ede4`, `--text-muted: #9b8f86`.
  * **Bordes y Contornos:** `--border: rgba(255, 113, 45, 0.18)`, `--border-strong: rgba(255, 113, 45, 0.4)`.
* **Tipografías Externas (Google Fonts):**
  * *Chakra Petch* (`--font-display`): Títulos de sección, logotipo y nombres de modelos.
  * *Inter* (`--font-body`): Textos informativos, párrafos y enlaces.
  * *JetBrains Mono* (`--font-mono`): Especificaciones de hardware, etiquetas (`.build-card__tag`), precios y campos técnicos.
* **Layout y Diseño Adaptable (Responsive):**
  * Uso de **CSS Grid** con columnas autorregulables (`repeat(auto-fit, minmax(250px, 1fr))`) para las tarjetas de computadores.
  * Media Queries para pantallas móviles (`max-width: 760px`), ocultando los enlaces horizontales y activando el menú colapsable (`.nav__toggle`).
  * Soporte de accesibilidad para navegación por teclado (`:focus-visible`) y anulación de animaciones si el usuario lo prefiere (`@media (prefers-reduced-motion: reduce)`).

### 3.3. Lógica e Interactividad (JavaScript ES6+)
* **`main.js` (Control de Interfaz y Navegación):**
  * Inyección dinámica del año en curso en nodos marcados con `[data-year]`.
  * Manejo del estado del menú móvil: Al accionar `.nav__toggle`, alterna la clase `nav__links--open` y sincroniza el atributo de accesibilidad `aria-expanded` entre `"true"` y `"false"`.
* **`validacion.js` (Validación de Formularios en el Cliente):**
  * Monitoreo de eventos `input` en tiempo real para respuesta reactiva inmediata.
  * **Reglas implementadas:**
    * **Nombre:** Obligatorio; verifica que el valor no esté vacío ni compuesto únicamente de espacios (`trim() !== ""`).
    * **Correo electrónico:** Validación mediante expresión regular estricta RFC-like (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
    * **Contraseña:** Obligatoria con verificación de longitud mínima mayor o igual a 6 caracteres.
    * **Confirmación de contraseña:** Verificación de igualdad estricta (`===`) con el campo de contraseña.
  * **Gestión de Errores y UX:**
    * Inserción dinámica de la clase `.is-invalid` en el contenedor `.field` y renderizado de mensajes descriptivos en `.field__error`.
    * Limpieza automática de advertencias una vez corregido el valor.
    * Manejo del evento `submit`: En caso de datos inválidos, previene el envío (`event.preventDefault()`) y ejecuta un **foco en cascada** (`focus()`), posicionando el cursor en el primer campo erróneo en orden secuencial (Nombre → Correo → Contraseña → Confirmar).

---

## 4. Modelos de Builds Definidos en Catálogo

| Perfil / Etiqueta | Modelo | CPU | Tarjeta Gráfica (GPU) | RAM | Almacenamiento | Precio Estimado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Entrada gamer** | Modelo Piola | AMD Ryzen 5 5600 | NVIDIA RTX 4060 | 16 GB | 1 TB SSD NVMe | $780.000 CLP |
| **Streaming** | Modelo Stream | AMD Ryzen 7 7700X | NVIDIA RTX 4070 | 32 GB | 1 TB SSD NVMe | $1.280.000 CLP |
| **Workstation** | Modelo Teni Lukas | AMD Ryzen 9 7950X | NVIDIA RTX 5080 | 64 GB | 4 TB SSD NVMe | $2.850.000 CLP |
| **Oficina silenciosa** | Modelo Pato | AMD Ryzen 5 5500 | Gráficos Integrados | 16 GB | 512 GB SSD SATA | $490.000 CLP |

---

## 5. Requisitos y Ejecución

Al tratarse de un prototipo construido con tecnologías nativas del navegador, no requiere gestores de dependencias (como npm o yarn) ni procesos de compilación (bundlers).

### Modo de Uso:
1. Clonar o descargar el directorio del proyecto en un equipo local.
2. Abrir el archivo `index.html` directamente en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari).
3. Para una experiencia óptima de desarrollo (recarga en caliente y resolución de URLs relativas), se recomienda servir mediante extensiones como *Live Server* (VS Code) o un servidor HTTP local en Python:
   ```bash
   # En la raíz del proyecto
   python -m http.server 8000
   ```
   Acceder a `http://localhost:8000` en el navegador.

---

## 6. Proyección y Mejoras Futuras

* **Fase 2 - Zona de Ensamble:** Implementación del recomendador y cotizador dinámico con filtros interactivos por marca, socket y presupuesto.
* **Fase 3 - Backend y Persistencia:** Integración de APIs RESTful / microservicios para autenticación persistente con JWT y guardado de configuraciones por usuario.
* **Fase 4 - Renovación de Imagen SoloTodo:** Migración gradual de la plataforma principal hacia el sistema de diseño oscuro y componentes modulares de Armatelo.
