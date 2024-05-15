using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NovelCart.Models;

namespace NovelCart.Configurations
{
    public class CartConfiguration : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder
                .HasMany<CartItems>()
                .WithOne()
                .HasForeignKey(c => c.CartId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .Property(s => s.DateCreated)
                .HasDefaultValueSql("getdate()");
        }
    }
}
