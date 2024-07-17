using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Models
{
    public class EcommerceContext : DbContext
    {
        public EcommerceContext(DbContextOptions <EcommerceContext> options) : base(options)
        {}

        public DbSet <Product> Products { get; set; }
        public DbSet<backend.Models.Category> Category { get; set; } = default!;
    }
}