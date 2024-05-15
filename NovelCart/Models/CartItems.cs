using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NovelCart.Models
{
    public class CartItems
    {
        [Key]
        public int CartItemId { get; set; }
        public string CartId { get; set; }
        public int ProductId { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
