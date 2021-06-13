using Microsoft.AspNetCore.Mvc;
using NearBy.Bussiness.AuthService;
using NearBy.Model;
using NearBy.Model.Response;
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

        [HttpPost("Register")]
        public async Task<IActionResult> Post(UserRegisterModel model)
        {
            ResponseModel responseModel = await _authService.CreateUser(model);
            if (responseModel.Status)
                return Ok(new { message = responseModel.Success.Message });

            return BadRequest(new { message = responseModel.Failed.Message });
        }
    }
}
