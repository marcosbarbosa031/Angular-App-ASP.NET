using AutoMapper;
using newApi.Dtos;
using newApi.Models;

namespace newApi.Helpers
{
  public class AutoMapperProfiles: Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<User, UserForListDto>();
      CreateMap<User, UserForDetailDto>();
    }
  }
}