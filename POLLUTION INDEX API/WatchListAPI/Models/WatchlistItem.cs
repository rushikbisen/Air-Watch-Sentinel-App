using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;


namespace WatchListAPI.Models
{
    public class WatchlistItem
    {


        [BsonId]
        public ObjectId Id { get; set; }

        public string Username { get; set; }

        public string City { get; set; }

        public int Aqi { get; set; }
        public string Time { get; set; }
        //public string Location { get; set; }
        //public string Iaqi { get; set; }
    }
}



