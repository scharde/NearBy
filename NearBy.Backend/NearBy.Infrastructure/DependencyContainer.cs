using Microsoft.Extensions.DependencyInjection;
using NearBy.Bussiness.AuthService;
using NearBy.Bussiness.FeedService;
using NearBy.Bussiness.UserService;
using NearBy.Data.FeedRepository;
using NearBy.Data.IAsyncRepository;
using NearBy.Data.Repository;
using NearBy.Data.Repository.AuthRepository;
using NearBy.Data.Repository.UserRepository;

namespace NearBy.Infrastructure
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
            services.AddTransient<IUserRepository, UserRepository>();

            //Services
            services.AddTransient<IFeedService, FeedService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IUserService, UserService>();
        }
    }
}
