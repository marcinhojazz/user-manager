using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAll()
        {
            var pessoas = await _context.Pessoas.ToListAsync();
            return Ok(pessoas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> GetById(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null)
                return NotFound(new { message = "Pessoa não encontrada." });

            return Ok(pessoa);
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> Create([FromBody] Pessoa pessoa)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, pessoa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Pessoa pessoa)
        {
            if (id != pessoa.Id)
                return BadRequest(new { message = "ID da URL não corresponde ao ID do corpo da requisição." });

            if (!await _context.Pessoas.AnyAsync(p => p.Id == id))
                return NotFound(new { message = "Pessoa não encontrada para atualização." });

            _context.Entry(pessoa).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Pessoa atualizada com sucesso." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null)
                return NotFound(new { message = "Pessoa não encontrada para exclusão." });

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Pessoa removida com sucesso." });
        }
    }
}
