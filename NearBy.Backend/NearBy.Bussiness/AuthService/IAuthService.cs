using NearBy.Model;
using NearBy.Model.Response;
using NearBy.Model.User;
using System.Threading.Tasks;

namespace NearBy.Bussiness.AuthService
{
    public  interface IAuthService
    {
        Task<ResponseModel> CreateUser(UserRegistrationModel userRegisterModel);
        Task<UserResponseModel> Login(LoginModel model);
    }
}
