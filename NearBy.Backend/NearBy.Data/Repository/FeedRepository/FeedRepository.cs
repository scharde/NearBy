using NearBy.Data.Context;
using NearBy.Data.Context.Entity.Feed;
using NearBy.Data.Repository;

namespace NearBy.Data.FeedRepository
{
    public class FeedRepository : Repository<FeedEntity>, IFeedRepository
    {
        public FeedRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
