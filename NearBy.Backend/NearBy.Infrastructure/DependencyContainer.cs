using Microsoft.Extensions.DependencyInjection;
using NearBy.Bussiness.FeedService;
using NearBy.Data.FeedRepository;
using NearBy.Data.Interfaces;
using NearBy.Data.Repository;

namespace CenterAdmin.Infrastructure
{
    public class DependencyContainer
    {
        public static void Resolver(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped(typeof(IAsyncRepository<>), typeof(Repository<>));

            //Repository
            services.AddTransient<IFeedRepository, FeedRepository>();

            //Services
            services.AddTransient<IFeedService, FeedService>();
        }
    }
}
