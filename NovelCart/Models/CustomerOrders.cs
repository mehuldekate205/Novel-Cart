using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NovelCart.Models
{
    public class CustomerOrders
    {
        [Key]
        public string OrderId { get; set; }
        public int UserId { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        [Column(TypeName = "smallmoney")]
        public decimal CartTotal { get; set; }
    }
}
