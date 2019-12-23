using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using newApi.Data;
using newApi.Dtos;
using newApi.Models;

namespace newApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _repo;
    public AuthController(IAuthRepository repo)
    {
      _repo = repo;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      // TODO: Validate request

      userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

      if (await _repo.UserExists(userForRegisterDto.Username)) return BadRequest("Username already taken");

      var userToCreate = new User
      {
        Username = userForRegisterDto.Username
      };

      var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

      return StatusCode(201); 
    }
  }
}