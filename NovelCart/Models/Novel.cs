using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NovelCart.Models;

public class Novel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int NovelId { get; set; }
    [Required(ErrorMessage = "Enter the Title.")]
    [StringLength(100)]
    public string Title { get; set; }
    [Required(ErrorMessage = "Enter Author name.")]
    [StringLength(100)]
    public string Author { get; set; }
    public int CategoryId { get; set; }
    [Required(ErrorMessage = "Enter price.")]
    [Column(TypeName = "smallmoney")]
    public decimal Price { get; set; }
    public string? CoverFile { get; set; }
}
