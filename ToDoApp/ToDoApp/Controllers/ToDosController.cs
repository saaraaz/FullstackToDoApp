using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;

namespace ToDoApp.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class ToDosController : ControllerBase
    {
        private readonly ToDoDbContex contex;

        public ToDosController(ToDoDbContex contex)
        {
            this.contex = contex;
        }


        //*S: http methods
        [HttpGet]
        public ActionResult<List<ToDo>> GetAll()
        {
            return contex.ToDos.ToList();
        }


        [HttpPost]
        public ActionResult Post(ToDo item)
        {           
            contex.ToDos.Add(item);
            contex.SaveChanges();
            return NoContent();
        }



        [HttpPut("{Id:int}")]
        public ActionResult Put(int Id, ToDo itemUpdated)
        {
            var item = contex.ToDos.FirstOrDefault(x => x.Id == Id);
            if (item == null)
            {
                return NotFound();
            }
            item.Name = itemUpdated.Name;
            item.DueDate = itemUpdated.DueDate;
            item.Done = itemUpdated.Done;
            contex.SaveChanges();
            return NoContent();
        }


        [HttpDelete("{Id:int}")]
        public ActionResult Delete(int Id)
        {
            var exists = contex.ToDos.Any(x => x.Id == Id);

            if (!exists)
            {
                return NotFound();
            }

            contex.Remove(new ToDo() { Id = Id });
            contex.SaveChanges();
            return NoContent();
        }
    }
}