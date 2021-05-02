using NearBy.Data.Context.Entity.Feed;
using NearBy.Data.Interfaces;
using NearBy.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NearBy.Data.FeedRepository
{
    public interface IFeedRepository : IRepository<FeedEntity>, IAsyncRepository<FeedEntity>
    {
    }
}
