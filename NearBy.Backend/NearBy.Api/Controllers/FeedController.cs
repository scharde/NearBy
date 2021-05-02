using Microsoft.AspNetCore.Mvc;
using NearBy.Api.Model;
using NearBy.Bussiness.FeedService;
using NearBy.Model.Feeds;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NearBy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {
        //public List<NearByNotificationModel> NearByNotificationModels { get; set; }
        private IFeedService _FeedService { get; set; }
        public FeedController(IFeedService feedService)
        {
            _FeedService = feedService;
            //NearByNotificationModels = new List<NearByNotificationModel>();
            //NearByNotificationModels.Add(new NearByNotificationModel
            //{
            //    Id = 1,
            //    Title = "Covid 19 Testing Center",
            //    Message = "New covid center is open near manewada",
            //    Location = new LocationModel { Latitude = 21.1188026, Longitude = 79.117576 }
            //});

            //NearByNotificationModels.Add(new NearByNotificationModel
            //{
            //    Id = 2,
            //    Title = "Remedivisir injection is available",
            //    Message = "Injection is availeble at Govt Covid hospitals, Center govt provided 50 thousand doses",
            //    Location = new LocationModel { Latitude = 21.065317497458544, Longitude = 79.01532861432997 }
            //});

            //NearByNotificationModels.Add(new NearByNotificationModel
            //{
            //    Id = 2,
            //    Title = "Shaila Hardware is open all days",
            //    Message = "Govt has given us special permission, so we are open all days. But necessary is 1. Only person earing mask is allowed. ",
            //    Location = new LocationModel { Latitude = 21.16428160368022, Longitude = 78.88383600132632 }
            //});
        }
        // GET: api/<NearByNotifications>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<NearByNotifications>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<NearByNotifications>
        [HttpPost]
        public void Post([FromBody] FeedModel feedModel)
        {
            _FeedService.Create(feedModel);
        }

        // PUT api/<NearByNotifications>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<NearByNotifications>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
