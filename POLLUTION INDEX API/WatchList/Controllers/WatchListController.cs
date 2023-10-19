using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchList.Models;
using WatchList.Service;

namespace WatchList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchListController : ControllerBase
    {
        private readonly WatchListService _watchListService;

        public WatchListController(WatchListService watchlistService)
        {
            _watchListService = watchlistService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Watchlist>>> Get() =>
            await _watchListService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Watchlist>> Get(int id)
        {
            var city = await _watchListService.GetAsync(id);
            if (city == null)
            {
                return NotFound();
            }
            return city;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Watchlist newCity)
        {
            await _watchListService.CreateAsync(newCity);
            return Ok(newCity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Watchlist updatedCity)
        {
            var city = await _watchListService.GetAsync(id);
            if (city is null)
            {
                return NotFound();
            }
            updatedCity.id = city.id;
            await _watchListService.UpdateAsync(id, updatedCity);

            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id,string cityName)
        {
            var city = await _watchListService.GetAsync(id);
            if (city is null)
            {
                return NotFound();
            }
            await _watchListService.RemoveAsync(id);

            return NoContent();

        }
        //// GET api/books
        //[HttpGet]
        //public ActionResult<IEnumerable<Watchlist>> GetList()
        //{
        //    var items = _watchListService.GetList();
        //    return Ok(items);
        //}

        //// GET api/books/5
       

        //// POST api/books
        //[HttpPost]
        //public ActionResult Post([FromBody] Watchlist value)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var item = _watchListService.Add(value);
        //    return CreatedAtAction("Get", new { id = item.id }, item);
        //}

        //// DELETE api/books/5
        //[HttpDelete("{id}")]
        //public ActionResult Remove(int id)
        //{
        //    var existingItem = _watchListService.GetById(id);

        //    if (existingItem == null)
        //    {
        //        return NotFound();
        //    }

        //    _watchListService.Remove(id);
        //    return Ok();
        //}
    }
}
