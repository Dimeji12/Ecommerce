using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace backend.Models
{
    public class EcommerceContext : IdentityDbContext<IdentityUser>
    {
        public EcommerceContext(DbContextOptions<EcommerceContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<ImageData> ImageData { get; set; }
        
        public DbSet<OtherImageData> OtherImageData { get; set; }
        
        //
        //    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        //    {
        //        var addedProducts = ChangeTracker.Entries<Product>()
        //                                         .Where(e => e.State == EntityState.Added)
        //                                         .Select(e => e.Entity);
        //
        //        foreach (var product in addedProducts)
        //        {
        //            var category = await Categories.Include(c => c.Products)
        //                                           .FirstOrDefaultAsync(c => c.CategoryId == product.CategoryId);
        //            if (category != null)
        //            {
        //                category.Products.Add(product);
        //            }
        //        }
        //
        //        return await base.SaveChangesAsync(cancellationToken);
        //    }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasOne(o => o.ShippingAddress)
                .WithMany()
                .HasForeignKey(o => o.ShippingAddressId)
                .OnDelete(DeleteBehavior.Restrict); // Or cascade if you want to delete related entities

            modelBuilder.Entity<Order>()
                .HasOne(o => o.BillingAddress)
                .WithMany()
                .HasForeignKey(o => o.BillingAddressId)
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<Product>()
                    .HasOne(p => p.Img)
                    .WithOne()
                    .HasForeignKey<Product>(p => p.ImgId)
                    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.OtherImages)
                .WithOne(oi => oi.Product)
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Cascade);


          

            base.OnModelCreating(modelBuilder);
        }

    }
}
