using NovelCart.Models;

namespace NovelCart.Dto
{
    public class CartItemDto
    {
        public Novel Novel { get; set; }
        public int Quantity { get; set; }
    }
}
