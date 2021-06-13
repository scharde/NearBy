using NearBy.Model;
using NearBy.Model.Response;
using System.Threading.Tasks;

namespace NearBy.Bussiness.AuthService
{
    public  interface IAuthService
    {
        Task<ResponseModel> CreateUser(UserRegisterModel userRegisterModel);
    }
}
