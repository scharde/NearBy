using Microsoft.EntityFrameworkCore.Migrations;

namespace NearBy.Data.Migrations
{
	public partial class sp_GetFeeds : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"CREATE OR ALTER PROCEDURE sp_GetFeeds 
										-- Add the parameters for the stored procedure here
										@LATITUDE NVARCHAR(50),
										@LONGITUDE NVARCHAR(50),
										@CITY NVARCHAR(50),
										@DISTANCE INT
									AS
									BEGIN
										-- SET NOCOUNT ON added to prevent extra result sets from
										-- interfering with SELECT statements.
										SET NOCOUNT ON;

										-- Insert statements for procedure here
										DECLARE @CURRENTLOCATION GEOGRAPHY = GEOGRAPHY::Point(@LATITUDE, @LONGITUDE, 4326)

										SELECT Id, Title, [Message], [Geometry].STDistance(@CURRENTLOCATION)/1000 as [Distance] from Feeds
										WHERE City = @CITY AND [Geometry].STDistance(@CURRENTLOCATION)/1000 < @DISTANCE
										ORDER BY [Geometry].STDistance(@CURRENTLOCATION)	

										RETURN
									END
									GO");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql("drop procedure sp_GetFeeds");
		}
	}
}
