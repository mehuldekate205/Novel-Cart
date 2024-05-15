namespace NovelCart.Interfaces
{
    public interface ICartService
    {
        Task<int> AddNovelToCart(int userId, int novelId);
        Task<int> RemoveCartItem(int userId, int novelId);
        Task<int> RemoveOneCartItem(int userId, int novelId);
        Task<int> GetCartItemCount(int userId);
        Task<int> ClearCart(int userId);
        Task<string> GetCartId(int userId);
    }
}
