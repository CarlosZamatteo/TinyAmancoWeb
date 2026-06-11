using Microsoft.AspNetCore.Mvc;
using MyApp.Models;
using MyApp.Services;

namespace MyApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IMyService _myService;

    public WeatherForecastController(
        ILogger<WeatherForecastController> logger,
        IMyService myService)
    {
        _logger = logger;
        _myService = myService;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IEnumerable<WeatherForecast>> Get()
    {
        _logger.LogInformation("Getting weather forecasts");
        return await _myService.GetWeatherForecastsAsync();
    }
}
