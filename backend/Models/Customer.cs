using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Customer
    {
    public string CustomerId { get; set; }
    public string UserName { get; set; }  // Username chosen by the user

    public string Email { get; set; }  // User's email address

    public string PasswordHash { get; set; }  // Hashed password for security

    public string FirstName { get; set; }  // User's first name

    public string LastName { get; set; }  // User's last name

    public DateTime DateOfBirth { get; set; }  // User's date of birth

    public DateTime DateCreated { get; set; }  // Timestamp for when the account was created

    public DateTime? LastLogin { get; set; }  // Timestamp for the last time the user logged in

    public string? PhoneNumber { get; set; }  // Optional phone number

    public int? AddressId { get; set; }  // Reference to the user's default address

    public Address? Address { get; set; }  // Navigation property to the user's address

    // Navigation properties for related entities
    public ICollection<Order> Orders { get; set; }  // Collection of orders placed by the user

    public ICollection<Cart> Carts { get; set; }  // Collection of shopping carts associated with the user

    public Customer()
    {
        Orders = new List<Order>();
        Carts = new List<Cart>();
    }
    
    }
}