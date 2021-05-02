using NetTopologySuite.Geometries;

namespace NearBy.Data.Context.Entity.Feed
{
    public class FeedEntity : BaseEntity
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }      
        public Geometry Geometry { get; set; }
    }
}
