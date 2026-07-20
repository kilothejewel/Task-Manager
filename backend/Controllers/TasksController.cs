using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

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
            task.Id = tasks.Count > 0 ? tasks.Max(t => t.Id) + 1 : 1;

            if (string.IsNullOrWhiteSpace(task.Title))
            {
                return BadRequest("Title is required");
            }

            if (string.Equals(task.Priority, "High", StringComparison.OrdinalIgnoreCase))

            {
                task.Priority = "High";
            }

            else if (string.Equals(task.Priority, "Medium", StringComparison.OrdinalIgnoreCase))

            {
                task.Priority = "Medium";
            }

            else if (string.Equals(task.Priority, "Low", StringComparison.OrdinalIgnoreCase))

            {
                task.Priority = "Low";
            }
            else
            {
                return BadRequest("Priority must be High, Medium, or Low");
            }

            tasks.Add(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult CompleteTask(int id)
        {
            var task = tasks.Find(t => t.Id == id);

            if (task == null)
            {
                return NotFound($"Task with ID {id} was not found.");
            }

            task.Completed = true;

            return Ok(task);
        }
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public bool Completed { get; set; }
    }
}