using Microsoft.EntityFrameworkCore;
using newApi.Models;

namespace newApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<User> Users { get; set; }

        public DbSet<Value> Values { get; set; }

        public DbSet<Photo> Photos { get; set; }
    }
}