namespace NearBy.Model.Feeds
{
    public class FeedModel
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public LocationModel Location { get; set; }
    }

    public class LocationModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

}
