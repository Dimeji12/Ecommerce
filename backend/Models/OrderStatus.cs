using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class OrderStatus
    {
           public long Id { get; set; }  

    public string StatusName { get; set; }  

    public string? Description { get; set; } 

    public ICollection<Order> Orders { get; set; }  

    public OrderStatus()
    {
        Orders = new List<Order>();
    }
    }
}