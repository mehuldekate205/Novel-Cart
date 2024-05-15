using Microsoft.EntityFrameworkCore;
using NovelCart.Configurations;

namespace NovelCart.Models
{
    public class NovelCartContext : DbContext
    {
        public NovelCartContext(DbContextOptions<NovelCartContext> options)
            : base(options)
        {}

        public DbSet<Novel> Novel { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<CartItems> CartItems { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<CustomerOrderDetails> CustomerOrderDetails { get; set; }
        public DbSet<CustomerOrders> CustomerOrders { get; set; }
        public DbSet<UserMaster> UserMaster { get; set; }
        public DbSet<UserType> UserType { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CartConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerOrdersConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new NovelConfiguration());

            modelBuilder.Entity<Categories>()
                .HasData(
                    new Categories { CategoryId = 1, CategoryName = "Biography" },
                    new Categories { CategoryId = 2, CategoryName = "Fiction" },
                    new Categories { CategoryId = 3, CategoryName = "Mystery" },
                    new Categories { CategoryId = 4, CategoryName = "Fantasy" },
                    new Categories { CategoryId = 5, CategoryName = "Romance" }
                );

            modelBuilder.Entity<UserType>()
                .HasData(
                    new UserType { UserTypeId = 1, UserTypeName = "Admin" },
                    new UserType { UserTypeId = 2, UserTypeName = "User" }
                );

            modelBuilder.Entity<UserMaster>()
                .HasData(
                    new UserMaster { UserId = 1, FirstName = "Mehul", LastName = "Dekate", Username = "admin", Password = "Admin@123", Gender = "Male", UserTypeId = 1 }
                );
        }

    }
}
