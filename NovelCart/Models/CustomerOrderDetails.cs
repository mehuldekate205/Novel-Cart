using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NovelCart.Models
{
    public class CustomerOrderDetails
    {
        [Key]
        public int OrderDetailsId { get; set; }
        public string OrderId { get; set; }
        public int ProductId { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        [Column(TypeName = "smallmoney")]
        public decimal Price { get; set; }
    }
}
