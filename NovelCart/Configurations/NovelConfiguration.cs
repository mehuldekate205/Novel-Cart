using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NovelCart.Models;

namespace NovelCart.Configurations
{
    public class NovelConfiguration : IEntityTypeConfiguration<Novel>
    {
        public void Configure(EntityTypeBuilder<Novel> builder)
        {
            builder
                .HasOne<CustomerOrderDetails>()
                .WithOne()
                .HasForeignKey<CustomerOrderDetails>(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .HasOne<CartItems>()
                .WithOne()
                .HasForeignKey<CartItems>(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .HasOne<Categories>()
                .WithMany()
                .HasForeignKey(c => c.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
