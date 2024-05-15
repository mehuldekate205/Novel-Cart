using NovelCart.Models;
using NovelCart.Dto;

namespace NovelCart.Interfaces
{
    public interface IOrderService
    {
        Task<int> CreateOrder(int userId, List<CartItemDto> orderDetails);
        Task<List<OrdersDto>> GetOrderList(int userId);
        Task<List<OrdersDto>> GetOrders();
    }
}
