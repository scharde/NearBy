using NearBy.Data.Context;
using NearBy.Data.Context.Entity.User;

namespace NearBy.Data.Repository.UserRepository
{
    public class UserRepository : Repository<UserEntity>, IUserRepository
    {
        public UserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
