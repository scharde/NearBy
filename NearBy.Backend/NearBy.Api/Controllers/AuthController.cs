using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NearBy.Bussiness.AuthService;
using NearBy.Model;
using NearBy.Model.Response;
using NearBy.Model.User;
using System.Threading.Tasks;

namespace NearBy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService { get; set; }
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Post(UserRegistrationModel model)
        {
            ResponseModel responseModel = await _authService.CreateUser(model);
            if (responseModel.Status)
                return Ok(new { message = responseModel.Success.Message });

            return BadRequest(new { message = responseModel.Failed.Message });
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Post(LoginModel model)
        {
            UserResponseModel userResponseModel= await _authService.Login(model);
            if (userResponseModel == null)
                return BadRequest(new { message = "Failed to login"});

            return Ok(userResponseModel);
        }
    }
}
