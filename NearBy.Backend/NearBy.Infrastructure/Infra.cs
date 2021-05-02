using CenterAdmin.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NearBy.Model.HelperModel.AppSetting;
using System;

namespace CenterAdmin.Infra
{
    public class Infra
    {
        public static void Configure(IServiceCollection services, IConfiguration Configuration)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            DependencyContainer.Resolver(services);
        }
    }
}
