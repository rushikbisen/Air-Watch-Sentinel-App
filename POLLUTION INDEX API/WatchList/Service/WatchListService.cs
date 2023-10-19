using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WatchList.Models;

namespace WatchList.Service
{
    public class WatchListService:IWatchListService
    {
        private readonly IMongoCollection<Watchlist> _watchlistCollection;
        public WatchListService(IOptions<WatchListDbDatabaseSettings> watchlistdbDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                watchlistdbDatabaseSettings.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                watchlistdbDatabaseSettings.Value.DatabaseName
                );

            _watchlistCollection = mongoDatabase.GetCollection<Watchlist>(
                watchlistdbDatabaseSettings.Value.WatchListCollectionName
                );

        }
        //public List<Watchlist> _list;
        //public WatchListService()
        //{
        // _list=new List<Watchlist>()
        //    {
        //        new Watchlist()
        //        {
        //            id = 1,
        //            emailId="JohnSmith@gmail.com",
        //            city="Los Angeles"
        //        },
        //        new Watchlist()
        //        {
        //            id = 2,
        //            emailId = "DavidJames@gmail.com",
        //            city = "California"
        //        },
        //        new Watchlist()
        //        {
        //            id = 3,
        //            emailId = "JimMichaels@gmail.com",
        //            city = "New York"
        //        },
        //        new Watchlist()
        //        {
        //            id = 4,
        //            emailId="PeterParker@gmail.com",
        //            city="San Francisco"
        //        },
        //    };
        //}
        //public IEnumerable<Watchlist> GetList()
        //{
        //    return _list;
        //}

        //public Watchlist Add(Watchlist newList)
        //{
        //    newList.id = newList.id + 1;
        //    _list.Add(newList);
        //    return newList;
        //}

        //public Watchlist GetById(int id) => _list.Where(a => a.id == id).FirstOrDefault();

        //public void Remove(int id)
        //{
        //    var existing = _list.First(a => a.id == id);
        //    _list.Remove(existing);
        //}
        public async Task<List<Watchlist>> GetAsync() =>
         await _watchlistCollection.Find(_ => true).ToListAsync();

        public async Task<Watchlist> GetAsync(int id) =>
            await _watchlistCollection.Find(x => x.id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Watchlist newCity) =>
            await _watchlistCollection.InsertOneAsync(newCity);

        public async Task UpdateAsync(int id, Watchlist updatedCity) =>
            await _watchlistCollection.ReplaceOneAsync(x => x.id == id, updatedCity);

        public async Task RemoveAsync(int id) =>
            await _watchlistCollection.DeleteOneAsync(x => x.id == id);
    }
}
    

