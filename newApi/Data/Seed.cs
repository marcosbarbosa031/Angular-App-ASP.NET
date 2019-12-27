using System;
using System.Collections.Generic;
using System.Linq;
using newApi.Models;
using Newtonsoft.Json;

namespace newApi.Data
{
  public class Seed
  {
    public static void SeedUsers(DataContext context)
    {
      if (!context.Users.Any())
      {
        var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
        var users = JsonConvert.DeserializeObject<List<User>>(userData);
        foreach(var user in users)
        {
          byte[] passwordHash, passwordSalt;
          createPasswordHash("password", out passwordHash, out passwordSalt);

          user.PasswordHash = passwordHash;
          user.PasswordSalt = passwordSalt;
          user.Username = user.Username.ToLower();
          context.Users.Add(user);
        }
        context.SaveChanges();
      }
    }

    internal static void SeedUsers()
    {
      throw new NotImplementedException();
    }

    private static void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using(var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }
  }
}