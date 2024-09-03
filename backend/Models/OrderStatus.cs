using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class OrderStatus
    {
           public long Id { get; set; }  // Unique identifier for the order status

    public string StatusName { get; set; }  // Name of the status (e.g., "Pending", "Shipped")

    public string? Description { get; set; }  // Optional description of the status

    public ICollection<Order> Orders { get; set; }  // Collection of orders associated with this status

    public OrderStatus()
    {
        Orders = new List<Order>();
    }
    }
}