using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Address
    {
        public int Id { get; set; }
        public required string StreetAddress { get; set; }
        public required string? City { get; set; }
        public required string? PhoneNumber { get; set; }
        public required string Email { get; set; }
        
    }
}