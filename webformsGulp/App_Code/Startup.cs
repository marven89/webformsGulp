using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(webformsGulp.Startup))]
namespace webformsGulp
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
