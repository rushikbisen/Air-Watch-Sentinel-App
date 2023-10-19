using WatchList.Models;

namespace WatchList.Service
{
    public interface IWatchListService
    {
        //IEnumerable<Watchlist> GetList();
        Task CreateAsync(Watchlist item);
        Task<List<Watchlist>> GetAsync();
        Task<Watchlist> GetAsync(int id);
        Task RemoveAsync(int id);
        Task UpdateAsync(int id, Watchlist updatedCity);
        //Watchlist Add(Watchlist newList);
        //Watchlist GetById(int id);
        //void Remove(int id);
    }
}
