using NovelCart.Interfaces;
using NovelCart.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using NovelCart.Dto;

namespace NovelCart.DataAccess
{
    public class NovelRepository : INovelService
    {
        readonly NovelCartContext _dbContext;
        readonly ILogger<NovelRepository> _logger;

        public NovelRepository(NovelCartContext dbContext, ILogger<NovelRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<List<Novel>> GetAllNovels()
        {
            try
            {
                return await _dbContext.Novel.ToListAsync();
            }
            catch
            {
                throw;
            }
            finally
            {
                _logger.LogInformation("Got all available novels data");
            }
        }

        public async Task<int> AddNovel(Novel novel)
        {
            try
            {
                await _dbContext.Novel.AddAsync(novel);
                await _dbContext.SaveChangesAsync();

                return 1;
            }
            catch
            {
                return 0;
            }
            finally
            {
                _logger.LogInformation("Added novel to database");
            }
        }

        public async Task<int> UpdateNovel(Novel novel)
        {
            try
            {
                Novel oldNovelData = await GetNovelData(novel.NovelId);

                oldNovelData.Price = novel.Price;
                oldNovelData.Title = novel.Title;
                oldNovelData.Author = novel.Author;
                oldNovelData.CategoryId = novel.CategoryId;
                oldNovelData.CoverFile = novel.CoverFile;
                _dbContext.Entry(oldNovelData).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                return 1;
            }
            catch
            {
                return 0;
            }
            finally
            {
                _logger.LogInformation("Updated novel to database");
            }
        }

        public async Task<Novel> GetNovelData(int novelId)
        {
            try
            {
                return await _dbContext.Novel.FirstOrDefaultAsync(x => x.NovelId == novelId);
            }
            catch
            {
                throw;
            }
            finally
            {
                _logger.LogInformation("Got data of novel with id: " + novelId);
            }
        }

        public async Task<string> DeleteNovel(int novelId)
        {
            try
            {
                Novel novel = await _dbContext.Novel.FindAsync(novelId);
                _dbContext.Novel.Remove(novel);
                await _dbContext.SaveChangesAsync();

                return (novel.CoverFile);
            }
            catch
            {
                return null;
            }
            finally
            {
                _logger.LogInformation("Deleted novel with id: " + novelId);
            }
        }

        public async Task<List<Categories>> GetCategories()
        {
            List<Categories> lstCategories = new List<Categories>();
            lstCategories = await (from CategoriesList in _dbContext.Categories select CategoriesList).ToListAsync();

            return lstCategories;
        }

        public async Task<List<Novel>> GetSimilarNovels(int novelId)
        {
            try
            {
                List<Novel> lstNovel = new List<Novel>();
                Novel novel = await GetNovelData(novelId);

                lstNovel = await _dbContext.Novel.Where(x => x.CategoryId == novel.CategoryId && x.NovelId != novel.NovelId)
                    .OrderBy(u => Guid.NewGuid())
                    .Take(5)
                    .ToListAsync();
                return lstNovel;
            } 
            catch
            {
                return new List<Novel> { };
            }
            finally
            {
                _logger.LogInformation("Got similar novels based on category");
            }
        }

        public async Task<List<CartItemDto>> GetNovelsAvailableInCart(string cartID)
        {
            try
            {
                List<CartItemDto> cartItemList = new List<CartItemDto>();
                List<CartItems> cartItems = await _dbContext.CartItems.Where(x => x.CartId == cartID).ToListAsync();

                foreach (CartItems item in cartItems)
                {
                    Novel novel = await GetNovelData(item.ProductId);
                    CartItemDto objCartItem = new CartItemDto
                    {
                        Novel = novel,
                        Quantity = item.Quantity
                    };

                    cartItemList.Add(objCartItem);
                }
                return cartItemList;
            }
            catch
            {
                return new List<CartItemDto> { };
            }
            finally
            {
                _logger.LogInformation("Got novels available in cart");
            }
        }
    }
}
