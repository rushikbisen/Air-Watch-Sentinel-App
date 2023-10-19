namespace WatchList.Models
{
    public class WatchListDbDatabaseSettings
    {
       
        public string ConnectionString { get; set; } = null;
        public string DatabaseName { get; set; } = null;
        public string WatchListCollectionName { get; set; } = null;
    }
}
