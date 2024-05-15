using NovelCart.Models;
using NovelCart.Dto;

namespace NovelCart.Interfaces
{
    public interface INovelService
    {
        Task<List<Novel>> GetAllNovels();
        Task<int> AddNovel(Novel novel);
        Task<int> UpdateNovel(Novel novel);
        Task<Novel> GetNovelData(int novelId);
        Task<string> DeleteNovel(int novelId);
        Task<List<Categories>> GetCategories();
        Task<List<Novel>> GetSimilarNovels(int novelId);
        Task<List<CartItemDto>> GetNovelsAvailableInCart(string cartId);
    }
}
