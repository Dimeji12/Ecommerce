using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace backend.Models
{
    public class Customer
    {
    public long CustomerId { get; set; }
    
    public string? UserName { get; set; }

    public string Email { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? PhoneNumber { get; set; }

    public int? AddressId { get; set; }

    public Address? Address { get; set; }

    [JsonIgnore]
    public ICollection<Order> Orders { get; set; }

    [JsonIgnore]
    public ICollection<Cart> Carts { get; set; }

    public Customer()
    {
        Orders = new List<Order>();
        Carts = new List<Cart>();
    }
    
    }
}