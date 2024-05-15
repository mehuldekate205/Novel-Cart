using NovelCart.Interfaces;
using NovelCart.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace NovelCart.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class NovelController : ControllerBase
    {
        readonly INovelService _novelService;

        public NovelController(INovelService novelService)
        {
            _novelService = novelService;
        }

        /// <summary>
        /// Get the list of available novels.
        /// </summary>
        /// <returns>List of novels.</returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Novel>>> Get()
        {
            return Ok(await _novelService.GetAllNovels());
        }

        /// <summary>
        /// Get the specific novel data corresponding to the NovelId.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Novel data.</returns>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            Novel novel = await _novelService.GetNovelData(id);
            if(novel!=null)
            {
                return Ok(novel);
            }
            return NotFound("Novel not found.");
        }

        /// <summary>
        /// Get the list of available categories.
        /// </summary>
        /// <returns>List of Categories.</returns>
        [HttpGet]
        [Route("GetCategoriesList")]
        [AllowAnonymous]
        public async Task<IEnumerable<Categories>> CategoryDetails()
        {
            return await _novelService.GetCategories();
        }

        /// <summary>
        /// Get the random five novels from the category of novel whose NovelId is supplied.
        /// </summary>
        /// <param name="novelId"></param>
        /// <returns>List of five novels of same category.</returns>
        [HttpGet]
        [Route("GetSimilarNovels/{novelId}")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Novel>>> SimilarNovels(int novelId)
        {
            return Ok(await _novelService.GetSimilarNovels(novelId));
        }

        /// <summary>
        /// Add a new novel record
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("AddNovel")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<string>> Post([FromBody] Novel novel)
        {
            novel.CoverFile = novel.CoverFile ?? "Default_image.jpg";
            if(await _novelService.AddNovel(novel) == 1)
            {
                return Ok("Novel added successfully.");
            }
            return StatusCode(400, "Novel not added.");
        }


        /// <summary>
        /// Update a particular novel record
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [Route("UpdateNovel")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<string>> Put([FromBody] Novel novel)
        {
            if(await _novelService.UpdateNovel(novel) == 1)
            {
                return Ok("Novel updated successfully.");
            }
            return StatusCode(400, "Novel not updated.");
        }

        /// <summary>
        /// Delete a particular novel record
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("DeleteNovel")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<string>> Delete(int id)
        {
            string coverFile = await _novelService.DeleteNovel(id);
            if(coverFile == null)
            {
                return NotFound(0);
            }
            // implemetation for deleting coverFile from storage
            return Ok(1);
        }
    }
}
