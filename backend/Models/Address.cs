using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Address
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string AddressLine1 { get; set; } // Update this
        public required string PostCode { get; set; }
        public required string City { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
    }
}