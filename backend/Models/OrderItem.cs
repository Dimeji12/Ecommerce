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

    public long OrderId { get; set; }

    public long? ProductId { get; set; }

    public int Quantity { get; set; } 

    public double UnitPrice { get; set; }

    public double TotalPrice { get; set; }

    public double? Discount { get; set; }


    public DateTime? DateCreated { get; set; }

    // Navigation property back to the Order
    [JsonIgnore]  public Order? Order { get; set; }

    // Optionally, a navigation property to the Product
    [JsonIgnore] public Product? Product { get; set; }

    }
}