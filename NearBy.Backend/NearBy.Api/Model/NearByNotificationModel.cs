using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NearBy.Api.Model
{
    public class NearByNotificationModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public LocationModel Location { get; set; }
    }

    public class LocationModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
