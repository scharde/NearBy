using Microsoft.EntityFrameworkCore.Migrations;

namespace NearBy.Data.Migrations
{
    public partial class Userentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "Token",
                table: "Users",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "CenterName",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "CenterCode",
                table: "Users",
                newName: "AspNetUsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Users",
                newName: "Token");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "CenterName");

            migrationBuilder.RenameColumn(
                name: "AspNetUsersId",
                table: "Users",
                newName: "CenterCode");
        }
    }
}
