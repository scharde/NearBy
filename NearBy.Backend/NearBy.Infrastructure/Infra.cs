using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NearBy.Model.HelperModel.AppSetting;
using System;

namespace NearBy.Infrastructure
{
    public class Infra
    {
        public static void Configure(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            DependencyContainer.Resolver(services);
        }
    }
}
