using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
       public int CartId { get; set; } 

    public int ProductId { get; set; }

    public int Quantity { get; set; } 
    public double UnitPrice { get; set; } 

    public double TotalPrice => Quantity * UnitPrice; 
    public DateTime DateAdded { get; set; } 

    public required  Cart Cart { get; set; } 

    public required  Product Product { get; set; } 

    }
}