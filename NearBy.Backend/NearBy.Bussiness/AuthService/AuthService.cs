using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NearBy.Data.Repository.AuthRepository;
using NearBy.Model;
using NearBy.Model.HelperModel.AppSetting;
using NearBy.Model.Response;
using NearBy.Model.User;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NearBy.Bussiness.AuthService
{
    public class AuthService : IAuthService
    {
        private IAuthRepository _authRepository { get; set; }
        private readonly AppSettings _appSettings;

        public AuthService(IAuthRepository authRepository, IOptions<AppSettings> appSettings)
        {
            _authRepository = authRepository;
            _appSettings = appSettings.Value;
        }

        public async Task<ResponseModel> CreateUser(UserRegistrationModel userRegisterModel)
        {
            return await _authRepository.CreateUser(userRegisterModel);
        }

        public async Task<UserResponseModel> Login(LoginModel model)
        {
            UserModel userModel = await _authRepository.Login(model);
            if (userModel == null)
            {
                return null;
            }
            Tuple<string, DateTime> tuple = generateJwtToken(userModel);
            return new UserResponseModel { UserModel = userModel, Token = tuple.Item1, ExpiryDate = tuple.Item2 };
        }

        private Tuple<string, DateTime> generateJwtToken(UserModel user)
        {
            // generate token that is valid for 7 days
            int tokenExpiryDays = Convert.ToInt32(_appSettings.TokenExpiryDays);
            DateTime expiryDate = DateTime.UtcNow.AddDays(tokenExpiryDays);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = expiryDate,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Tuple.Create(tokenHandler.WriteToken(token), expiryDate);
        }
    }
}
