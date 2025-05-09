// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const currentYearElements = document.querySelectorAll("#current-year")
  const currentYear = new Date().getFullYear()

  currentYearElements.forEach((element) => {
    element.textContent = currentYear
  })

  // Mobile menu toggle (if implemented)
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open")
    })
  }

  // Property filters (if on properties page)
  const tabButtons = document.querySelectorAll(".tab-button")
  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        tabButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        button.classList.add("active")

        // Get filter value
        const filterValue = button.getAttribute("data-filter")

        // Filter properties
        filterProperties(filterValue)
      })
    })

    // Check URL parameters for initial filter
    const urlParams = new URLSearchParams(window.location.search)
    const tipoParam = urlParams.get("tipo")
    if (tipoParam) {
      const filterButton = document.querySelector(`.tab-button[data-filter="${tipoParam}"]`)
      if (filterButton) {
        filterButton.click()
      }
    }
  }

  // Form validation (if on contact or auth pages)
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault()

      // Basic validation
      let isValid = true
      const requiredFields = form.querySelectorAll("input[required], textarea[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })

      // Email validation
      const emailField = form.querySelector('input[type="email"]')
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(emailField.value)) {
          isValid = false
          emailField.classList.add("error")
        }
      }

      if (isValid) {
        // In a real application, you would submit the form here
        alert("Formulario enviado correctamente!")
        form.reset()
      } else {
        alert("Por favor, completa todos los campos requeridos correctamente.")
      }
    })
  })
})

// Function to filter properties (for properties page)
function filterProperties(filter) {
  const propertyCards = document.querySelectorAll(".property-card")

  propertyCards.forEach((card) => {
    if (filter === "todos") {
      card.style.display = "flex"
    } else {
      const propertyType = card.getAttribute("data-type")
      if (propertyType === filter) {
        card.style.display = "flex"
      } else {
        card.style.display = "none"
      }
    }
  })
}
