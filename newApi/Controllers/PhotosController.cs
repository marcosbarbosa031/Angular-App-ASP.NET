using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using newApi.Data;
using newApi.Dtos;
using newApi.Helpers;
using newApi.Models;

namespace newApi.Controllers
{
  [Authorize]
  [Route("api/users/{userId}/photos")]
  [ApiController]
  public class PhotosController : ControllerBase
  {
    private readonly IDatingRepository _repo;
    private readonly IMapper _mapper;
    private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
    private Cloudinary _cloudinary;

    public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
    {
      _cloudinaryConfig = cloudinaryConfig;
      _mapper = mapper;
      _repo = repo;

      Account acc = new Account(
        _cloudinaryConfig.Value.CloudName,
        _cloudinaryConfig.Value.ApiKey,
        _cloudinaryConfig.Value.ApiSecret
      );

      _cloudinary = new Cloudinary(acc);
    }

    [HttpGet("{id}", Name = "GetPhoto")]
    public async Task<IActionResult> GetPhoto (int id)
    {
      var photoFromRepo = await _repo.GetPhoto(id);

      var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

      return Ok(photo);
    }

    [HttpPost]
    public async Task<IActionResult> addPhotoForUser(int userId, [FromForm]PhotoForCreationDto photoForCreationDto)
    {
      if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

      var userFromRepo = await _repo.GetUser(userId);

      var file = photoForCreationDto.File;

      var uploadResult = new ImageUploadResult();

      if (file.Length > 0)
      {
        using(var stream = file.OpenReadStream())
        {
          var uploadParams = new ImageUploadParams()
          {
            File = new FileDescription(file.Name, stream),
            Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
          };

          uploadResult = _cloudinary.Upload(uploadParams);
        }
      }

      photoForCreationDto.Url = uploadResult.Uri.ToString();
      photoForCreationDto.PublicId = uploadResult.PublicId;

      var photo = _mapper.Map<Photo>(photoForCreationDto);

      if (!userFromRepo.Photos.Any(u => u.IsMain))
        photo.IsMain = true;
      
      userFromRepo.Photos.Add(photo);


      if (await _repo.SaveAll())
      {
        var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
         
        return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);
      }

      return BadRequest("Could not save the photo");
    }

    [HttpPost("{photoId}/setMain")]
    public async Task<IActionResult> SetMainPhoto(int userId, int photoId)
    {
      if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

      var userFromRepo = await _repo.GetUser(userId);

      if (!userFromRepo.Photos.Any(p => p.Id == photoId)) return Unauthorized();

      var photoFromRepo = await _repo.GetPhoto(photoId);

      if (photoFromRepo.IsMain) return BadRequest("This is already your main photo");

      var currentMainPhoto = await _repo.GetMainPhoto(userId);

      currentMainPhoto.IsMain = false;

      photoFromRepo.IsMain = true;

      if(await _repo.SaveAll()) return NoContent();

      return BadRequest("Could not set photo to main");
    }

    [HttpPost("{photoId}/delete")]
    public async Task<IActionResult> DeletePhoto(int userId, int photoId)
    {
      if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

      var userFromRepo = await _repo.GetUser(userId);

      if (!userFromRepo.Photos.Any(p => p.Id == photoId)) return Unauthorized();

      var photoFromRepo = await _repo.GetPhoto(photoId);

      if (photoFromRepo.IsMain) return BadRequest("You can't delete your main photo. You have to select another main photo before.");

      if (photoFromRepo.PublicId != null) 
      {
        var deleteParams = new DeletionParams(photoFromRepo.PublicId);

        var result = _cloudinary.Destroy(deleteParams);

        if (result.Result == "ok") {
          userFromRepo.Photos.Remove(photoFromRepo);
        }
      }
      else
      {
        userFromRepo.Photos.Remove(photoFromRepo);
      }

      if (await _repo.SaveAll()) return Ok();

      return BadRequest("Failed to delete photo.");

    }
  }
}