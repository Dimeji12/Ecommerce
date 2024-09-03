using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        public string? OrderTrackingNumber { get; set; }

        public int TotalQuantity { get; set; }

        public double TotalPrice { get; set; }

        public DateTime? DateCreated { get; set; }

        public DateTime? LastUpdated { get; set; } //TODO:

        public long? CustomerId { get; set; }

        [JsonIgnore]
        public Customer? Customer { get; set; }

        public int? ShippingAddressId { get; set; }

        [ForeignKey("ShippingAddressId")]
        [JsonIgnore]
        public Address? ShippingAddress { get; set; }

        public int? BillingAddressId { get; set; }

        [ForeignKey("BillingAddressId")]
        [JsonIgnore]
        public Address? BillingAddress { get; set; }

        public long? OrderStatusId { get; set; }

        [JsonIgnore]
        public OrderStatus? OrderStatus { get; set; }

        [JsonIgnore]
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }

}