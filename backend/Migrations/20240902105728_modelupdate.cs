using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class modelupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaxAmount",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "ZipCode",
                table: "Addresses",
                newName: "StreetAddress");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "Addresses",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Addresses",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "Addresses",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Addresses",
                newName: "CompanyName");

            migrationBuilder.AddColumn<string>(
                name: "AddressLine1",
                table: "Addresses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CityOrTown",
                table: "Addresses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressLine1",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "CityOrTown",
                table: "Addresses");

            migrationBuilder.RenameColumn(
                name: "StreetAddress",
                table: "Addresses",
                newName: "ZipCode");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Addresses",
                newName: "Street");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Addresses",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Addresses",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "CompanyName",
                table: "Addresses",
                newName: "City");

            migrationBuilder.AddColumn<double>(
                name: "TaxAmount",
                table: "OrderItems",
                type: "REAL",
                nullable: true);
        }
    }
}
