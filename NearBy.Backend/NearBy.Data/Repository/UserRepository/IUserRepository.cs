using NearBy.Data.Context.Entity.User;
using NearBy.Data.IAsyncRepository;

namespace NearBy.Data.Repository.UserRepository
{
    public interface IUserRepository : IRepository<UserEntity>, IAsyncRepository<UserEntity>
    {
    }
}
