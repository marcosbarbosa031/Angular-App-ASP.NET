using System.Threading.Tasks;
using newApi.Models;

namespace newApi.Data
{
    public interface IAuthRepository
    {
         Task<User> Register (User user, string password);
         Task<User> Login (string username, string password);
         Task<bool> UserExists (string username);
    }
}