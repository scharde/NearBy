using NearBy.Model.Feeds;
using NearBy.Model.Response;

namespace NearBy.Bussiness.FeedService
{
    public interface IFeedService
    {
        public ResponseModel Create(FeedModel feedModel);
    }
}
