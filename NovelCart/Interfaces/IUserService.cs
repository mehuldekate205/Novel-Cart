using NovelCart.Dto;
using NovelCart.Models;

namespace NovelCart.Interfaces
{
    public interface IUserService
    {
        Task<UserDetailsDto?> AuthenticateUser(string Username, string Password);
        Task<int> RegisterUser(UserMaster userData);
        Task<bool> CheckUserAvailabity(string userName);
        Task<bool> isUserExists(int userId);
        string GenrateToken(UserDetailsDto userInfo);
    }
}
