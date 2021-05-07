using NearBy.Data.Context.Entity.Feed;
using NearBy.Data.Interfaces;
using NearBy.Data.Repository;
using NearBy.Model.Feeds;
using System.Collections.Generic;

namespace NearBy.Data.FeedRepository
{
    public interface IFeedRepository : IRepository<FeedEntity>, IAsyncRepository<FeedEntity>
    {
        List<FeedResultModel> GetDistanceFeeds(double latitude, double longitude, string city, int distance);
    }
}
