using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Controllers;
using Xunit;

namespace backend.tests;

public class TaskControllerTests
{
    [Fact]
    public void AddTask_ValidTask_ReturnsOk()
    {
        var controller = new TasksController();
        var testTask = new TaskItem
        {
            Title = "Learn C# Unit Testing",
            Priority = "High"
        };

        var result = controller.AddTask(testTask);

        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnedTask = Assert.IsType<TaskItem>(okResult.Value);

        Assert.Equal("Learn C# Unit Testing", returnedTask.Title);
        Assert.Equal("High", returnedTask.Priority);
        Assert.True(returnedTask.Id > 0, "Expected task ID to be greater than 0");

    }

}
