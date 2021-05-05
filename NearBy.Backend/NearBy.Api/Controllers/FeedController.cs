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
        private IFeedService _FeedService { get; set; }
        public FeedController(IFeedService feedService)
        {
            _FeedService = feedService;
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
