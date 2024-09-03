using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
       public int CartId { get; set; }  // Foreign key linking to the Cart

    public int ProductId { get; set; }  // Reference to the Product being added to the cart

    public int Quantity { get; set; }  // Number of units of the product in the cart

    public double UnitPrice { get; set; }  // Price per unit at the time the item was added to the cart

    public double TotalPrice => Quantity * UnitPrice;  // Calculated as Quantity * UnitPrice

    public DateTime DateAdded { get; set; }  // Timestamp for when the item was added to the cart

    public required  Cart Cart { get; set; }  // Navigation property back to the Cart

    public required  Product Product { get; set; }  // Navigation property to the Product

    }
}