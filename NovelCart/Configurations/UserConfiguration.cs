using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NovelCart.Models;

namespace NovelCart.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<UserMaster>
    {
        public void Configure(EntityTypeBuilder<UserMaster> builder)
        {
            builder
                .HasOne<Cart>()
                .WithOne()
                .HasForeignKey<Cart>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .HasOne<CustomerOrders>()
                .WithOne()
                .HasForeignKey<CustomerOrders>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .HasOne<UserType>()
                .WithMany()
                .HasForeignKey(c => c.UserTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
