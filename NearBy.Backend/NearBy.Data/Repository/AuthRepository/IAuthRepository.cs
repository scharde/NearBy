using NearBy.Model;
using NearBy.Model.Response;
using System.Threading.Tasks;

namespace NearBy.Data.Repository.AuthRepository
{
    public interface IAuthRepository
    {
        Task<ResponseModel> CreateUser(UserRegisterModel userRegisterModel);
    }
}
