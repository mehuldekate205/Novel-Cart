using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NovelCart.Models
{
    public class UserType
    {
        [Key]
        public int UserTypeId { get; set; }
        [Required]
        [MaxLength(20)]
        public string UserTypeName { get; set; }
    }
}