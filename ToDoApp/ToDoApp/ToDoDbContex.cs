using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;

namespace ToDoApp
{
    public class ToDoDbContex : DbContext
    {
        public ToDoDbContex([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }


        public DbSet<ToDo> ToDos { get; set; }
    }
}
