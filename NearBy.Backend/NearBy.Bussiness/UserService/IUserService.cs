using NearBy.Model.User;

namespace NearBy.Bussiness.UserService
{
    public interface IUserService
    {
        UserModel Get(int userId);
    }
}
