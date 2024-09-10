using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Cart
    {
    public int CartId { get; set; }

   
    public int CustomerId { get; set; }

    public DateTime DateCreated { get; set; }

    public DateTime? LastUpdated { get; set; }

    public List<CartItem> CartItems { get; set; }

    public Cart()
    {
        CartItems = new List<CartItem>();  // Initialize CartItems to avoid null references
    }
    }
}