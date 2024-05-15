using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NovelCart.Models;

namespace NovelCart.Configurations
{
    public class CustomerOrdersConfiguration : IEntityTypeConfiguration<CustomerOrders>
    {
        public void Configure(EntityTypeBuilder<CustomerOrders> builder)
        {
            builder
                .HasMany<CustomerOrderDetails>()
                .WithOne()
                .HasForeignKey(c => c.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .Property(s => s.DateCreated)
                .HasDefaultValueSql("getdate()");
        }
    }
}