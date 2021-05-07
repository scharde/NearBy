using NearBy.Data.Context;
using NearBy.Data.Context.Entity.Feed;
using NearBy.Data.Repository;
using NearBy.Model.Feeds;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace NearBy.Data.FeedRepository
{
    public class FeedRepository : Repository<FeedEntity>, IFeedRepository
    {
        public FeedRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public List<FeedResultModel> GetDistanceFeeds(double latitude, double longitude, string city, int distance)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@LATITUDE", latitude));
            parameter.Add(new SqlParameter("@LONGITUDE", longitude));
            parameter.Add(new SqlParameter("@CITY", city));
            parameter.Add(new SqlParameter("@DISTANCE", distance));

            List<FeedResultModel> feedResults = new List<FeedResultModel>();
            using (DataSet result = ExecuteSP("sp_GetFeeds", parameter))
            {
                if (result.Tables[0] != null)
                {
                    foreach (DataRow row in result.Tables[0].Rows)
                    {
                        row["Id"].ToString();
                        FeedResultModel feedResultModel = new FeedResultModel
                        {
                            Id = Convert.ToInt32(row["Id"]),
                            Title = row["Title"].ToString(),
                            Message = row["Message"].ToString(),
                            Distance = Convert.ToDouble(row["Distance"])
                        };
                        feedResults.Add(feedResultModel);
                    }
                }
            }
            return feedResults;
        }
    }
}
