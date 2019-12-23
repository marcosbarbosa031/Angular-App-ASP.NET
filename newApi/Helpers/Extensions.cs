using Microsoft.AspNetCore.Http;

namespace newApi.Helpers
{
  public static class Extensions
  {
    public static void addApplicationError (this HttpResponse response, string message)
    {
      response.Headers.Add("Application-Error", message);
      response.Headers.Add("Access-Control-Expose-HEaders", "Application-Error");
      response.Headers.Add("Access-Control-Allow-Origin", "*");
    }
  }
}