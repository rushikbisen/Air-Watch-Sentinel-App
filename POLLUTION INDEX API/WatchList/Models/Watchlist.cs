using System.ComponentModel.DataAnnotations;

namespace WatchList.Models
{
    public class Watchlist
    {
        [Key]
        public int id { get; set; }
        public string emailId { get; set; }
        public string city { get; set; }
    }
}
