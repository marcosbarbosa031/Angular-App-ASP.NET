using System.ComponentModel.DataAnnotations;

namespace newApi.Dtos
{
  public class UserForRegisterDto
  {
    [Required]
    public string Username { get; set; }

    [Required]
    [StringLength(30, MinimumLength = 8, ErrorMessage = "The password must have, at least, 8 characters")]
    public string Password { get; set; }
  }
}