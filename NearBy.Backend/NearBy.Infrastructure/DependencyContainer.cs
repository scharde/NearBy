using Microsoft.Extensions.DependencyInjection;
using NearBy.Bussiness.AuthService;
using NearBy.Bussiness.FeedService;
using NearBy.Data.FeedRepository;
using NearBy.Data.Interfaces;
using NearBy.Data.Repository;
using NearBy.Data.Repository.AuthRepository;

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
            services.AddTransient<IAuthRepository, AuthRepository>();

            //Services
            services.AddTransient<IFeedService, FeedService>();
            services.AddTransient<IAuthService, AuthService>();
        }
    }
}
