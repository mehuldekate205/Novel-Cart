using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NovelCart.Models
{
    public class Categories
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        public string CategoryName { get; set; }
    }
}
