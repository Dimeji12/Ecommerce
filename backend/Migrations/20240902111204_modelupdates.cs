using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class modelupdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StreetAddress",
                table: "Addresses",
                newName: "PostCode");

            migrationBuilder.RenameColumn(
                name: "CompanyName",
                table: "Addresses",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "CityOrTown",
                table: "Addresses",
                newName: "City");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostCode",
                table: "Addresses",
                newName: "StreetAddress");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Addresses",
                newName: "CompanyName");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Addresses",
                newName: "CityOrTown");
        }
    }
}
