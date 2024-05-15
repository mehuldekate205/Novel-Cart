using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NovelCart.Models
{
    public class UserMaster
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(20)]
        public string Username { get; set; }
        [Required]
        [MaxLength(40)]
        public string Password { get; set; }
        [Required]
        [MaxLength(6)]
        public string Gender { get; set; }
        public int UserTypeId { get; set; }
    }
}