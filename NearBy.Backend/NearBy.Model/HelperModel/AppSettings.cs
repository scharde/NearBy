namespace NearBy.Model.HelperModel.AppSetting
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string ImagePath { get; set; }
        public string SuperAdminBaseUrl { get; set; }
        public string SuperAdminImagesDomain { get; set; }
        public string CenteAdminImagesDomain { get; set; }
        public string CoonectionString { get; set; }
        public string DBBackupPath { get; set; }
        public int CacheTime { get; set; }
    }
}
