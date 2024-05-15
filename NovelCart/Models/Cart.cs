using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NovelCart.Models
{
    public class Cart
    {
        [Key]
        public string CartId { get; set; }
        public int UserId { get; set; }
        [Required(ErrorMessage = "Will set current date and time.")]
        public DateTime DateCreated { get; set; }
    }
}