using NearBy.Model;
using NearBy.Model.Response;
using NearBy.Model.User;
using System.Threading.Tasks;

namespace NearBy.Data.Repository.AuthRepository
{
    public interface IAuthRepository
    {
        Task<ResponseModel> CreateUser(UserRegistrationModel userRegisterModel);
        Task<UserModel> Login(LoginModel model);
    }
}
