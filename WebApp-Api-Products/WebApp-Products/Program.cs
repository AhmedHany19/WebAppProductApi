using Microsoft.EntityFrameworkCore;
using WebApp_Products.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(option =>
                   option.UseSqlServer(builder.Configuration.GetConnectionString("ProductionConnection"),

                   sqlServerOptionsAction: sqlOptions =>
                   {
                       sqlOptions.EnableRetryOnFailure();
                   }
                   ));
builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", build =>
{
    build.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
}
));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
