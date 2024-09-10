using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public OrdersController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] CheckoutRequestBody checkoutRequest)
        {
            if (checkoutRequest == null || !checkoutRequest.Products.Any() || checkoutRequest.Customer == null)
            {
                return BadRequest("Invalid checkout request.");
            }

            var order = new Order
            {
                TotalQuantity = checkoutRequest.Products.Sum(p => p.Quantity),
                TotalPrice = checkoutRequest.Products.Sum(p => p.Discount > p.Price 
                    ? p.Price * p.Quantity 
                    : (p.Price - p.Discount) * p.Quantity),
                DateCreated = DateTime.Now,
                LastUpdated = DateTime.Now,
                OrderTrackingNumber = GenerateOrderTrackingNumber(),
            };

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == checkoutRequest.Customer.Email);

            if (customer == null)
            {
                customer = new Customer
                {
                    FirstName = checkoutRequest.Customer.FirstName,
                    LastName = checkoutRequest.Customer.LastName,
                    Email = checkoutRequest.Customer.Email,
                    PhoneNumber = checkoutRequest.Customer.PhoneNumber,
                    Address = new Address
                    {
                        StreetAddress = checkoutRequest.Customer.StreetAddress,
                        City = checkoutRequest.Customer.City,
                        PhoneNumber = checkoutRequest.Customer.PhoneNumber,
                        Email = checkoutRequest.Customer.Email,
                    }
                };

                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
            }

            // Set customer in the order
            order.CustomerId = customer.CustomerId;

            foreach (var productInfo in checkoutRequest.Products)
            {
                var orderItem = new OrderItem
                {
                    ProductId = productInfo.Id,
                    Quantity = productInfo.Quantity,
                    UnitPrice = productInfo.Price,
                    TotalPrice = productInfo.Discount > productInfo.Price
                        ? productInfo.Price * productInfo.Quantity
                        : (productInfo.Price - productInfo.Discount) * productInfo.Quantity,
                    Discount = productInfo.Discount,
                    DateCreated = DateTime.Now
                };

                order.OrderItems.Add(orderItem);
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { orderId = order.OrderId, trackingNumber = order.OrderTrackingNumber });
        }

        private string GenerateOrderTrackingNumber()
        {
            return Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10).ToUpper();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}