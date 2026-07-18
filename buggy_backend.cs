
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static List<TaskItem> tasks = new List<TaskItem>();

        [HttpGet]
        public IEnumerable<TaskItem> GetTasks()
        {
            return tasks;
        }

        [HttpPost]
        public IActionResult AddTask(TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
            {
                return BadRequest("Title is required");
            }
            
            task.Priority = "Low"; 
            tasks.Add(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult CompleteTask(int id)
        {
            var task = tasks.Find(t => t.Id == id);
          
            task.Completed = true;
            return Ok(task);
        }
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Priority { get; set; }
        public bool Completed { get; set; }
    }
}
