using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyApp.Pages
{
    public class LoginModel : PageModel
    {
        [BindProperty]
        public InputModel Input { get; set; } = new();

        public string? ErrorMessage { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "El email es obligatorio")]
            [EmailAddress(ErrorMessage = "El email no es válido")]
            public string Email { get; set; } = string.Empty;

            [Required(ErrorMessage = "La contraseña es obligatoria")]
            [DataType(DataType.Password)]
            public string Password { get; set; } = string.Empty;

            [Display(Name = "Recordarme")]
            public bool RememberMe { get; set; }
        }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            // TODO: Aquí iría la llamada a tu API para autenticar
            // Ejemplo:
            // var result = await _httpClient.PostAsJsonAsync("api/auth/login", Input);
            
            // Por ahora, solo mostramos un mensaje de ejemplo
            TempData["Message"] = $"Intento de login con: {Input.Email}";
            
            // Redirigir al dashboard o página principal después del login exitoso
            return RedirectToPage("/Index");
        }
    }
}
