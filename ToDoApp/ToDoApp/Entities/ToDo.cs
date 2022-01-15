using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Entities
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DateTime DueDate { get; set; }

        public bool Done { get; set; }
    }
}



