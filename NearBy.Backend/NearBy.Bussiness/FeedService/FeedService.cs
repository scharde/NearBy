using NearBy.Data.Context.Entity.Feed;
using NearBy.Data.FeedRepository;
using NearBy.Model.Feeds;
using NearBy.Model.Response;
using NetTopologySuite.Geometries;
using System.Collections.Generic;

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
                Location = string.Concat(feedModel.Location.Latitude, ", ", feedModel.Location.Longitude),
                Geometry = new Point(feedModel.Location.Longitude, feedModel.Location.Latitude) { SRID = 4326 }
            };
            FeedEntity result = _FeedRepository.Add(feedEntity);
            if (result == null)
                return new ResponseModel { Status = false, Failed = new FailedModel { Message = "" } };

            return new ResponseModel { Status = true, Success = new SuccessModel { Message = "Record Created" } };
        }

        public List<FeedResultModel> GetDistanceFeeds(double latitude, double longitude, string city, int distance)
        {
           return _FeedRepository.GetDistanceFeeds(latitude, longitude, city, distance);
        }
    }
}
