using Microsoft.AspNetCore.Mvc;
using NearBy.Bussiness.FeedService;
using NearBy.Model.Feeds;
using NearBy.Model.Response;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NearBy.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {
        private IFeedService _FeedService { get; set; }
        public FeedController(IFeedService feedService)
        {
            _FeedService = feedService;
        }

        [HttpGet]
        public IActionResult Get(double latitude, double longitude, string city, int distance)
        {
            List<FeedResultModel> results = _FeedService.GetDistanceFeeds(latitude, longitude, city, distance);
            return Ok(results);
        }

        [HttpPost]
        public IActionResult Post([FromBody] FeedModel feedModel)
        {
            ResponseModel response = _FeedService.Create(feedModel);
            if (response.Status)
                return Ok(new { Message = response.Success.Message });

            return BadRequest(new { Message = response.Failed.Message });
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
