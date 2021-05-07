using NearBy.Model.Feeds;
using NearBy.Model.Response;
using System.Collections.Generic;

namespace NearBy.Bussiness.FeedService
{
    public interface IFeedService
    {
        ResponseModel Create(FeedModel feedModel);
        List<FeedResultModel> GetDistanceFeeds(double latitude, double longitude, string city, int distance);
    }
}
