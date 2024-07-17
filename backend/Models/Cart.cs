using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Cart
    {
    public int CartId { get; set; }
    public List<CartItem>? CartItems { get; set; } 
    }
}