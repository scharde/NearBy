using NearBy.Data.Repository.AuthRepository;
using NearBy.Model;
using NearBy.Model.Response;
using System.Threading.Tasks;

namespace NearBy.Bussiness.AuthService
{
    public class AuthService : IAuthService
    {
        private IAuthRepository _authRepository { get; set; }
        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<ResponseModel>  CreateUser(UserRegisterModel userRegisterModel)
        {
          return await  _authRepository.CreateUser(userRegisterModel);
        }
    }
}
