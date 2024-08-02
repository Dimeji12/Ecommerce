using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class EcommerceContext : IdentityDbContext<IdentityUser>
    {
        public EcommerceContext(DbContextOptions <EcommerceContext> options) : base(options)
        {}

        public DbSet <Product> Products { get; set; }
        public DbSet<backend.Models.Category> Category { get; set; } = default!;
        public DbSet<backend.Models.Cart> Cart { get; set; } = default!;
        public DbSet<backend.Models.Customer> Customer { get; set; } = default!;
        public DbSet<backend.Models.Order> Order { get; set; } = default!;
        public DbSet<backend.Models.Review> Review { get; set; } = default!;
        public DbSet<backend.Models.CartItem> CartItem { get; set; } = default!;
    }
}