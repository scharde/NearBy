using Microsoft.EntityFrameworkCore.Migrations;

namespace NearBy.Data.SPMigration.GetFeeds
{
    public partial class sp_GetFeeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE OR ALTER PROCEDURE sp_GetFeeds
                                    AS
                                    BEGIN
                                        Select * FROM Feeds
                                    END");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("drop procedure sp_GetFeeds");
        }
    }
}
