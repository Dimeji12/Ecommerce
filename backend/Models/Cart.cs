using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Cart
    {
    public int CartId { get; set; }

   
    public int CustomerId { get; set; }  // ID of the user to whom the cart belongs

    public DateTime DateCreated { get; set; }  // Timestamp for when the cart was created

    public DateTime? LastUpdated { get; set; }  // Timestamp for when the cart was last updated

    public List<CartItem> CartItems { get; set; }  // Collection of CartItems in the Cart

    public Cart()
    {
        CartItems = new List<CartItem>();  // Initialize CartItems to avoid null references
    }
    }
}