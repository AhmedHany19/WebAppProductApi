using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApp_Products.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Quntity { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        public decimal Total { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]

        public Category? Category { get; set; }
    }
}
