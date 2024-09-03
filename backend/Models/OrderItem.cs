using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.Models
{
    public class OrderItem
    {
       
    public long OrderItemId { get; set; }

    public long OrderId { get; set; }  // Foreign key linking to the Order

    public long? ProductId { get; set; }  // Reference to the Product being ordered

    public int Quantity { get; set; }  // Quantity of the product ordered

    public double UnitPrice { get; set; }  // Price per unit at the time of the order

    public double TotalPrice { get; set; }  // Calculated as Quantity * UnitPrice

    public double? Discount { get; set; }  // Optional discount applied to this item


    public DateTime? DateCreated { get; set; }  // Timestamp for when the order item was created

    // Navigation property back to the Order
    [JsonIgnore]  public Order? Order { get; set; }

    // Optionally, a navigation property to the Product
    [JsonIgnore] public Product? Product { get; set; }

    }
}