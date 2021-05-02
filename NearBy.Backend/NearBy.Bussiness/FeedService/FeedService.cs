using NearBy.Data.Context.Entity.Feed;
using NearBy.Data.FeedRepository;
using NearBy.Model.Feeds;
using NearBy.Model.Response;
using NetTopologySuite.Geometries;

namespace NearBy.Bussiness.FeedService
{
    public class FeedService : IFeedService
    {
        private IFeedRepository _FeedRepository { get; set; }
        public FeedService(IFeedRepository feedRepository)
        {
            _FeedRepository = feedRepository;
        }

        public ResponseModel Create(FeedModel feedModel)
        {
            FeedEntity feedEntity = new FeedEntity
            {
                Title = feedModel.Title,
                Message = feedModel.Message,
                City = feedModel.City,
                Address = feedModel.Address,
                Geometry = new Point(feedModel.Location.Latitude, feedModel.Location.Longitude) { SRID = 4326 }
            };
            _FeedRepository.Add(feedEntity);
            return new ResponseModel { Status = true };
        }
    }
}
